import React from 'react';
import { useFraud } from '../../context/FraudContext';
import {
  IndianRupee,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Flame
} from 'lucide-react';

export const MetricCards: React.FC = () => {
  const { metrics, transactions } = useFraud();

  // Format INR in Lakhs/Crores
  const formatINR = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const criticalCount = transactions.filter((t) => t.severity === 'CRITICAL' && t.status !== 'CLEARED').length;
  const highCount = transactions.filter((t) => t.severity === 'HIGH' && t.status !== 'CLEARED').length;

  const cards = [
    {
      title: 'Monitored UPI Volume',
      value: formatINR(metrics.totalVolumeINR),
      subtext: `${metrics.totalProcessedCount.toLocaleString('en-IN')} transactions scanned`,
      icon: IndianRupee,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      badge: '99.98% SLA',
      badgeColor: 'text-indigo-300 bg-indigo-950/60 border-indigo-800'
    },
    {
      title: 'Prevented Fraud Loss',
      value: formatINR(metrics.preventedFraudAmountINR),
      subtext: 'Intercepted before inter-bank settlement',
      icon: ShieldCheck,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      badge: '+₹18.4L Today',
      badgeColor: 'text-emerald-300 bg-emerald-950/60 border-emerald-800'
    },
    {
      title: 'Active Fraud Incidents',
      value: `${criticalCount + highCount}`,
      subtext: `${criticalCount} Critical · ${highCount} High Priority`,
      icon: AlertTriangle,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      badge: 'Action Required',
      badgeColor: 'text-rose-300 bg-rose-950/60 border-rose-800'
    },
    {
      title: 'AI Detection Latency',
      value: `${metrics.avgDetectionLatencyMs} ms`,
      subtext: 'Multi-vector heuristic + LLM inference',
      icon: Zap,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      badge: 'Sub-20ms Engine',
      badgeColor: 'text-amber-300 bg-amber-950/60 border-amber-800'
    },
    {
      title: 'Mule Syndicates Tracked',
      value: `${metrics.activeSyndicatesCount}`,
      subtext: 'Jamtara & Mewat laundering clusters',
      icon: Flame,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      badge: 'Operation BlueVolt',
      badgeColor: 'text-purple-300 bg-purple-950/60 border-purple-800'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-sm hover:border-slate-700/80 transition relative overflow-hidden group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400">{card.title}</span>
              <div className={`p-2 rounded-xl border ${card.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-xl lg:text-2xl font-bold tracking-tight text-white font-mono">
                {card.value}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="truncate">{card.subtext}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
