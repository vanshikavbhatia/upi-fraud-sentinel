import React from 'react';
import type { RiskSeverity, AlertStatus, FraudCategory } from '../../types';

export const SeverityBadge: React.FC<{ severity: RiskSeverity }> = ({ severity }) => {
  const styles: Record<RiskSeverity, { bg: string; text: string; border: string; dot: string; pulse?: boolean }> = {
    CRITICAL: {
      bg: 'bg-rose-950/60',
      text: 'text-rose-400',
      border: 'border-rose-500/40',
      dot: 'bg-rose-500',
      pulse: true,
    },
    HIGH: {
      bg: 'bg-amber-950/60',
      text: 'text-amber-400',
      border: 'border-amber-500/40',
      dot: 'bg-amber-400',
      pulse: false,
    },
    MEDIUM: {
      bg: 'bg-yellow-950/60',
      text: 'text-yellow-400',
      border: 'border-yellow-500/40',
      dot: 'bg-yellow-400',
      pulse: false,
    },
    LOW: {
      bg: 'bg-emerald-950/60',
      text: 'text-emerald-400',
      border: 'border-emerald-500/40',
      dot: 'bg-emerald-400',
      pulse: false,
    },
  };

  const current = styles[severity];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${current.bg} ${current.text} ${current.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot} ${current.pulse ? 'animate-ping' : ''}`} />
      {severity}
    </span>
  );
};

export const StatusBadge: React.FC<{ status: AlertStatus }> = ({ status }) => {
  const styles: Record<AlertStatus, { bg: string; text: string; border: string }> = {
    OPEN: { bg: 'bg-sky-950/60', text: 'text-sky-400', border: 'border-sky-500/30' },
    INVESTIGATING: { bg: 'bg-indigo-950/60', text: 'text-indigo-400', border: 'border-indigo-500/30' },
    FROZEN: { bg: 'bg-rose-950/80', text: 'text-rose-400 font-bold', border: 'border-rose-500/50' },
    CLEARED: { bg: 'bg-emerald-950/60', text: 'text-emerald-400', border: 'border-emerald-500/30' },
    ESCALATED: { bg: 'bg-purple-950/60', text: 'text-purple-400', border: 'border-purple-500/30' },
  };

  const current = styles[status];

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${current.bg} ${current.text} ${current.border}`}>
      {status}
    </span>
  );
};

export const CategoryBadge: React.FC<{ category?: FraudCategory }> = ({ category }) => {
  if (!category) return null;

  const labels: Record<FraudCategory, string> = {
    MULE_SYNDICATE: 'Mule Syndicate',
    VELOCITY_ABUSE: 'Velocity Abuse',
    PHISHING_QR_SPOOF: 'QR Phishing',
    STRUCTURAL_SPLIT: 'Structuring Split',
    SIM_SWAP_DEVICE_ANOMALY: 'SIM-Swap Alert',
    GEO_TELEPORTATION: 'Geo Teleportation',
    SOCIAL_ENGINEERING_REVERSE: 'Social Engineering',
    REPEATED_COLLECT_SPAM: 'Collect Spam',
  };

  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
      {labels[category] || category}
    </span>
  );
};
