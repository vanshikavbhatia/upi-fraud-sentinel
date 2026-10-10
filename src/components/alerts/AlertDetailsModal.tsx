import React, { useState, useEffect } from 'react';
import { useFraud } from '../../context/FraudContext';
import { useAuth } from '../../context/AuthContext';
import { aiService } from '../../services/aiService';
import type { AISummaryResult } from '../../services/aiService';
import { SeverityBadge, StatusBadge, CategoryBadge } from '../common/Badge';
import {
  X,
  Sparkles,
  ShieldAlert,
  Snowflake,
  CheckCircle2,
  FileText,
  Smartphone,
  MapPin,
  ArrowRight,
  Send,
  AlertTriangle,
  Cpu
} from 'lucide-react';

interface AlertDetailsModalProps {
  onOpenSAR: () => void;
}

export const AlertDetailsModal: React.FC<AlertDetailsModalProps> = ({ onOpenSAR }) => {
  const { selectedTx, setSelectedTx, freezeVpa, clearAlert, addAnalystNote } = useFraud();
  const { canExecuteFreeze, canClearAlert, canGenerateSAR } = useAuth();

  const [activeTab, setActiveTab] = useState<'FORENSICS' | 'AI_INSIGHTS'>('AI_INSIGHTS');
  const [aiAnalysis, setAiAnalysis] = useState<AISummaryResult | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [noteInput, setNoteInput] = useState('');

  // Fetch AI Analysis when selected transaction changes
  useEffect(() => {
    if (!selectedTx) {
      setAiAnalysis(null);
      return;
    }

    let isMounted = true;
    setIsAiLoading(true);

    aiService.analyzeTransaction(selectedTx).then((res) => {
      if (isMounted) {
        setAiAnalysis(res);
        setIsAiLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedTx]);

  if (!selectedTx) return null;

  const handleFreeze = () => {
    if (!canExecuteFreeze) {
      alert('Your current role does not have permission to freeze VPAs.');
      return;
    }
    const reason = prompt('Specify emergency freeze justification for audit record:', 'High confidence phishing / mule syndicate detection');
    if (reason) {
      freezeVpa(selectedTx.id, selectedTx.receiverVpa, reason);
    }
  };

  const handleClear = () => {
    if (!canClearAlert) {
      alert('Your current role does not have permission to clear alerts.');
      return;
    }
    const reason = prompt('Specify clearing rationale (e.g., verified via step-up biometric):', 'False positive - KYC biometric confirmed');
    if (reason) {
      clearAlert(selectedTx.id, reason);
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    addAnalystNote(selectedTx.id, noteInput.trim());
    setNoteInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-mono">{selectedTx.id}</h3>
                <SeverityBadge severity={selectedTx.severity} />
                <StatusBadge status={selectedTx.status} />
                <CategoryBadge category={selectedTx.fraudCategory} />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Timestamp: {new Date(selectedTx.timestamp).toLocaleString('en-IN')} · PSP Network: {selectedTx.psp}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedTx(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6">
          <button
            onClick={() => setActiveTab('AI_INSIGHTS')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition ${
              activeTab === 'AI_INSIGHTS'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            AI Incident Summary & Intelligence
          </button>
          <button
            onClick={() => setActiveTab('FORENSICS')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition ${
              activeTab === 'FORENSICS'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            Hardware & Network Telemetry
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Quick Flow Banner */}
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-5/12">
              <span className="text-[10px] uppercase font-mono text-slate-400">Payer (Sender)</span>
              <p className="font-semibold text-slate-200 text-sm truncate">{selectedTx.senderName}</p>
              <p className="text-xs font-mono text-slate-400 truncate">{selectedTx.senderVpa}</p>
              <p className="text-[11px] text-slate-500">
                {selectedTx.senderBank} · A/C Ending {selectedTx.senderAccountEnding}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center shrink-0">
              <span className="text-lg font-bold font-mono text-white">
                ₹{selectedTx.amount.toLocaleString('en-IN')}
              </span>
              <div className="flex items-center gap-1.5 text-indigo-400 my-0.5">
                <span className="h-[1px] w-6 bg-slate-700"></span>
                <ArrowRight className="w-4 h-4" />
                <span className="h-[1px] w-6 bg-slate-700"></span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Risk: {selectedTx.riskScore}/100</span>
            </div>

            <div className="w-full md:w-5/12 md:text-right">
              <span className="text-[10px] uppercase font-mono text-slate-400">Payee (Beneficiary)</span>
              <p className="font-semibold text-rose-400 text-sm truncate">{selectedTx.receiverName}</p>
              <p className="text-xs font-mono text-slate-300 truncate">{selectedTx.receiverVpa}</p>
              <p className="text-[11px] text-slate-500">
                {selectedTx.receiverBank} · A/C Ending {selectedTx.receiverAccountEnding}
              </p>
            </div>
          </div>

          {activeTab === 'AI_INSIGHTS' && (
            <div className="space-y-5">
              {/* AI Summary Box */}
              <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-2xl p-5 relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                    <h4 className="font-semibold text-sm text-indigo-200">
                      AI Autonomous Forensic Assessment
                    </h4>
                  </div>
                  {aiAnalysis && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-300 border border-indigo-700">
                      {aiAnalysis.isLiveAi ? 'GEMINI 1.5 FLASH ACTIVE' : 'NEURAL HEURISTICS ENGINE'}
                    </span>
                  )}
                </div>

                {isAiLoading ? (
                  <div className="flex items-center gap-3 py-6 text-slate-400 text-xs justify-center">
                    <span className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></span>
                    Synthesizing multi-vector telemetry & behavioral baseline...
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-xs text-indigo-100 leading-relaxed font-sans">
                      {aiAnalysis?.summary}
                    </p>

                    {/* Risk Vectors */}
                    <div className="space-y-2 pt-2 border-t border-indigo-500/20">
                      <h5 className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider">
                        Identified Risk Vectors & Confidence
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {aiAnalysis?.riskVectors.map((vec, i) => (
                          <div
                            key={i}
                            className="bg-slate-950/60 border border-indigo-500/20 p-2.5 rounded-xl text-xs"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-slate-200">{vec.category}</span>
                              <span className="text-[10px] font-mono text-rose-400 font-bold">
                                {vec.confidence}% Conf.
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-normal">{vec.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mitigation Steps */}
                    <div className="pt-2 border-t border-indigo-500/20">
                      <h5 className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider mb-2">
                        Recommended Immediate Countermeasures
                      </h5>
                      <ul className="space-y-1.5">
                        {aiAnalysis?.mitigationSteps.map((step, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* NPCI Detection Rules Triggered */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4">
                <h4 className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Deterministic Risk Triggers Flagged ({selectedTx.fraudReasons.length})
                </h4>
                <div className="space-y-1.5">
                  {selectedTx.fraudReasons.map((r, i) => (
                    <div key={i} className="text-xs text-slate-400 flex items-start gap-2">
                      <span className="text-amber-500 font-bold font-mono">[{i + 1}]</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'FORENSICS' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Device Hardware Card */}
                <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl space-y-3">
                  <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-indigo-400" />
                    Client Device Hardware Profile
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-500">Hardware Model:</span>
                      <span className="font-mono text-slate-300">{selectedTx.device.deviceModel}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-500">OS Version:</span>
                      <span className="font-mono text-slate-300">{selectedTx.device.osVersion}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-500">App Version:</span>
                      <span className="font-mono text-slate-300">{selectedTx.device.appVersion}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-500">Root / Emulator State:</span>
                      <span
                        className={`font-mono font-bold ${
                          selectedTx.device.isRootedOrEmulated ? 'text-rose-400' : 'text-emerald-400'
                        }`}
                      >
                        {selectedTx.device.isRootedOrEmulated ? 'ROOT / EMULATOR DETECTED' : 'UNCOMPROMISED'}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">24h Carrier SIM Swaps:</span>
                      <span
                        className={`font-mono font-bold ${
                          selectedTx.device.simSlotChanges24h > 0 ? 'text-rose-400' : 'text-slate-300'
                        }`}
                      >
                        {selectedTx.device.simSlotChanges24h} Swaps
                      </span>
                    </div>
                  </div>
                </div>

                {/* Network & Geo Card */}
                <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl space-y-3">
                  <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    Network & Geolocation Telemetry
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-500">Origin City & State:</span>
                      <span className="font-semibold text-slate-200">
                        {selectedTx.device.locationCity}, {selectedTx.device.locationState}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-500">Client IP Address:</span>
                      <span className="font-mono text-slate-300">{selectedTx.device.ipAddress}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-500">Internet Service Provider:</span>
                      <span className="font-medium text-slate-300 truncate max-w-[160px]">
                        {selectedTx.device.isp}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-500">VPN / Anonymizer Gateway:</span>
                      <span
                        className={`font-mono font-bold ${
                          selectedTx.device.isVpn ? 'text-amber-400' : 'text-slate-400'
                        }`}
                      >
                        {selectedTx.device.isVpn ? 'VPN ACTIVE' : 'DIRECT RESIDENTIAL'}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Mule Cluster Linkage:</span>
                      <span className="font-mono text-indigo-400 font-medium">
                        {selectedTx.clusterId || 'No active cluster'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analyst Audit Log on this Transaction */}
              {selectedTx.analystNotes && selectedTx.analystNotes.length > 0 && (
                <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl">
                  <h4 className="text-xs font-semibold text-slate-300 mb-2">Analyst Case Activity Log</h4>
                  <div className="space-y-1.5">
                    {selectedTx.analystNotes.map((note, idx) => (
                      <div key={idx} className="text-xs text-indigo-200 bg-indigo-950/30 p-2 rounded-xl">
                        {note}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Note Add */}
          <form onSubmit={handleAddNote} className="flex gap-2">
            <input
              type="text"
              placeholder="Add investigator case note to audit record..."
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium transition flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              Add Note
            </button>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {canGenerateSAR && (
              <button
                onClick={onOpenSAR}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                Generate FIU-IND SAR Report
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {selectedTx.status !== 'CLEARED' && (
              <button
                onClick={handleClear}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-emerald-400 hover:bg-emerald-950/40 border border-emerald-500/30 transition flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Dismiss as False Positive
              </button>
            )}

            {selectedTx.status !== 'FROZEN' && (
              <button
                onClick={handleFreeze}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30 transition flex items-center gap-1.5"
              >
                <Snowflake className="w-3.5 h-3.5" />
                Freeze Payee VPA & Account
              </button>
            )}

            <button
              onClick={() => setSelectedTx(null)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
