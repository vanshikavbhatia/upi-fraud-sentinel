import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { UPITransaction, RealtimeMetrics, AuditAction, AlertStatus, MuleCluster } from '../types';
import { INITIAL_TRANSACTIONS, INITIAL_METRICS, MOCK_MULE_CLUSTERS } from '../data/mockTransactions';
import { streamEngine } from '../services/streamEngine';
import { soundService } from '../services/soundService';
import { useAuth } from './AuthContext';

interface FraudContextType {
  transactions: UPITransaction[];
  metrics: RealtimeMetrics;
  muleClusters: MuleCluster[];
  auditLogs: AuditAction[];
  selectedTx: UPITransaction | null;
  setSelectedTx: (tx: UPITransaction | null) => void;
  // Live Stream Controls
  isStreaming: boolean;
  setIsStreaming: (streaming: boolean) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  // Forensic Actions
  freezeVpa: (txId: string, vpa: string, reason: string) => void;
  clearAlert: (txId: string, reason: string) => void;
  updateStatus: (txId: string, status: AlertStatus) => void;
  addAnalystNote: (txId: string, note: string) => void;
  injectAttackScenario: (scenario: 'MULE_SYNDICATE' | 'PHISHING_STORM' | 'SIM_SWAP_TAKEOVER' | 'BOT_VELOCITY') => void;
}

const FraudContext = createContext<FraudContextType | undefined>(undefined);

export const FraudProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState<UPITransaction[]>(INITIAL_TRANSACTIONS);
  const [metrics, setMetrics] = useState<RealtimeMetrics>(INITIAL_METRICS);
  const [muleClusters] = useState<MuleCluster[]>(MOCK_MULE_CLUSTERS);
  const [selectedTx, setSelectedTx] = useState<UPITransaction | null>(null);
  const [isStreaming, setIsStreamingState] = useState<boolean>(true);
  const [speed, setSpeedState] = useState<number>(1);
  const [isMuted, setIsMutedState] = useState<boolean>(false);
  const [auditLogs, setAuditLogs] = useState<AuditAction[]>([
    {
      id: 'AUD-001',
      timestamp: new Date(Date.now() - 1000 * 120).toISOString(),
      userName: 'Vikram Sengupta',
      userRole: 'Lead Fraud Investigator (L3)',
      action: 'FREEZE_VPA',
      targetTxId: 'TXN-984206',
      targetVpa: 'reward.point.redeem@paytm',
      details: 'Account frozen under NPCI emergency rule 7.3. Phishing APK trojan confirmed.'
    }
  ]);

  // Handle incoming transaction from StreamEngine
  const handleNewTransaction = useCallback((tx: UPITransaction) => {
    setTransactions(prev => {
      const updated = [tx, ...prev.slice(0, 199)]; // Keep max 200 items in buffer
      return updated;
    });

    // Update real-time metrics
    setMetrics(prev => {
      const isFraud = tx.riskScore >= 70;
      const isCritical = tx.severity === 'CRITICAL';
      const newTotalProcessed = prev.totalProcessedCount + 1;
      const newTotalVolume = prev.totalVolumeINR + tx.amount;
      const newFraudCount = prev.fraudAlertCount + (isFraud ? 1 : 0);
      const newCriticalCount = prev.criticalAlertCount + (isCritical ? 1 : 0);
      const newPrevented = prev.preventedFraudAmountINR + (isCritical ? tx.amount : 0);
      const newRate = Number(((newFraudCount / newTotalProcessed) * 100).toFixed(2));
      const newLatency = Number((12 + Math.random() * 5).toFixed(1));

      return {
        ...prev,
        totalProcessedCount: newTotalProcessed,
        totalVolumeINR: newTotalVolume,
        fraudAlertCount: newFraudCount,
        criticalAlertCount: newCriticalCount,
        preventedFraudAmountINR: newPrevented,
        fraudRatePercent: newRate,
        avgDetectionLatencyMs: newLatency,
      };
    });

    // Sound ping on critical/high alert
    if (tx.severity === 'CRITICAL' || tx.riskScore >= 90) {
      soundService.playCriticalAlert();
    }
  }, []);

  // Initialize stream engine
  useEffect(() => {
    streamEngine.setCallback(handleNewTransaction);
    streamEngine.start();

    return () => {
      streamEngine.stop();
    };
  }, [handleNewTransaction]);

  const setIsStreaming = (streaming: boolean) => {
    setIsStreamingState(streaming);
    streamEngine.setRunning(streaming);
  };

  const setSpeed = (newSpeed: number) => {
    setSpeedState(newSpeed);
    streamEngine.setSpeed(newSpeed);
  };

  const setIsMuted = (muted: boolean) => {
    setIsMutedState(muted);
    soundService.setMuted(muted);
  };

  // Action: Freeze VPA
  const freezeVpa = (txId: string, vpa: string, reason: string) => {
    soundService.playActionChime();
    setTransactions(prev =>
      prev.map(tx => {
        if (tx.id === txId) {
          const notes = tx.analystNotes || [];
          return {
            ...tx,
            status: 'FROZEN',
            analystNotes: [...notes, `[FREEZE ACTION] ${reason} - By ${currentUser.name}`],
            resolvedBy: currentUser.name,
            resolvedAt: new Date().toISOString()
          };
        }
        return tx;
      })
    );

    if (selectedTx && selectedTx.id === txId) {
      setSelectedTx(prev => prev ? {
        ...prev,
        status: 'FROZEN',
        resolvedBy: currentUser.name,
        resolvedAt: new Date().toISOString(),
        analystNotes: [...(prev.analystNotes || []), `[FREEZE ACTION] ${reason} - By ${currentUser.name}`]
      } : null);
    }

    const logEntry: AuditAction = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      userName: currentUser.name,
      userRole: currentUser.badge,
      action: 'FREEZE_VPA',
      targetTxId: txId,
      targetVpa: vpa,
      details: reason || 'Emergency stop order executed on suspicious UPI node.'
    };
    setAuditLogs(prev => [logEntry, ...prev]);
  };

  // Action: Clear Alert
  const clearAlert = (txId: string, reason: string) => {
    soundService.playActionChime();
    setTransactions(prev =>
      prev.map(tx => {
        if (tx.id === txId) {
          return {
            ...tx,
            status: 'CLEARED',
            riskScore: Math.min(tx.riskScore, 15),
            resolvedBy: currentUser.name,
            resolvedAt: new Date().toISOString(),
            analystNotes: [...(tx.analystNotes || []), `[CLEARED] ${reason} - By ${currentUser.name}`]
          };
        }
        return tx;
      })
    );

    if (selectedTx && selectedTx.id === txId) {
      setSelectedTx(prev => prev ? {
        ...prev,
        status: 'CLEARED',
        riskScore: Math.min(prev.riskScore, 15),
        resolvedBy: currentUser.name,
        resolvedAt: new Date().toISOString(),
        analystNotes: [...(prev.analystNotes || []), `[CLEARED] ${reason} - By ${currentUser.name}`]
      } : null);
    }

    const logEntry: AuditAction = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      userName: currentUser.name,
      userRole: currentUser.badge,
      action: 'CLEAR_ALERT',
      targetTxId: txId,
      targetVpa: selectedTx?.receiverVpa || 'N/A',
      details: reason || 'Marked as false positive after biometric verification.'
    };
    setAuditLogs(prev => [logEntry, ...prev]);
  };

  // Action: Update Status
  const updateStatus = (txId: string, status: AlertStatus) => {
    setTransactions(prev =>
      prev.map(tx => (tx.id === txId ? { ...tx, status } : tx))
    );
    if (selectedTx && selectedTx.id === txId) {
      setSelectedTx(prev => prev ? { ...prev, status } : null);
    }

    const logEntry: AuditAction = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      userName: currentUser.name,
      userRole: currentUser.badge,
      action: 'CHANGE_STATUS',
      targetTxId: txId,
      targetVpa: 'N/A',
      details: `Status escalated to ${status}`
    };
    setAuditLogs(prev => [logEntry, ...prev]);
  };

  // Action: Add note
  const addAnalystNote = (txId: string, note: string) => {
    setTransactions(prev =>
      prev.map(tx => {
        if (tx.id === txId) {
          return {
            ...tx,
            analystNotes: [...(tx.analystNotes || []), `[${currentUser.name}] ${note}`]
          };
        }
        return tx;
      })
    );
    if (selectedTx && selectedTx.id === txId) {
      setSelectedTx(prev => prev ? {
        ...prev,
        analystNotes: [...(prev.analystNotes || []), `[${currentUser.name}] ${note}`]
      } : null);
    }

    const logEntry: AuditAction = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      userName: currentUser.name,
      userRole: currentUser.badge,
      action: 'ADD_NOTE',
      targetTxId: txId,
      targetVpa: 'N/A',
      details: note
    };
    setAuditLogs(prev => [logEntry, ...prev]);
  };

  // Inject attack
  const injectAttackScenario = (scenario: 'MULE_SYNDICATE' | 'PHISHING_STORM' | 'SIM_SWAP_TAKEOVER' | 'BOT_VELOCITY') => {
    soundService.playCriticalAlert();
    const injectedTxs = streamEngine.injectAttack(scenario);
    setTransactions(prev => [...injectedTxs, ...prev]);

    const logEntry: AuditAction = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      userName: currentUser.name,
      userRole: currentUser.badge,
      action: 'SIMULATE_ATTACK',
      targetTxId: injectedTxs[0]?.id || 'N/A',
      targetVpa: injectedTxs[0]?.receiverVpa || 'N/A',
      details: `Simulated live cyber-threat injected: ${scenario}`
    };
    setAuditLogs(prev => [logEntry, ...prev]);
  };

  return (
    <FraudContext.Provider
      value={{
        transactions,
        metrics,
        muleClusters,
        auditLogs,
        selectedTx,
        setSelectedTx,
        isStreaming,
        setIsStreaming,
        speed,
        setSpeed,
        isMuted,
        setIsMuted,
        freezeVpa,
        clearAlert,
        updateStatus,
        addAnalystNote,
        injectAttackScenario,
      }}
    >
      {children}
    </FraudContext.Provider>
  );
};

export const useFraud = () => {
  const context = useContext(FraudContext);
  if (!context) {
    throw new Error('useFraud must be used within a FraudProvider');
  }
  return context;
};
