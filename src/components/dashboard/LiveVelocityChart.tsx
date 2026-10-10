import React, { useMemo } from 'react';
import { useFraud } from '../../context/FraudContext';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { Activity } from 'lucide-react';

export const LiveVelocityChart: React.FC = () => {
  const { transactions } = useFraud();

  // Create time buckets for the recent 12 transactions or last few minutes
  const chartData = useMemo(() => {
    // Take recent 20 transactions reversed so oldest is first
    const recent = [...transactions.slice(0, 18)].reverse();

    return recent.map((tx, idx) => {
      const timeStr = new Date(tx.timestamp).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      const isFraud = tx.riskScore >= 70;
      return {
        name: timeStr || `T-${18 - idx}s`,
        volumeINR: Math.round(tx.amount / 1000), // in Thousands
        riskScore: tx.riskScore,
        flaggedAmount: isFraud ? Math.round(tx.amount / 1000) : 0,
        normalAmount: !isFraud ? Math.round(tx.amount / 1000) : 0,
      };
    });
  }, [transactions]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100">Live Transaction Velocity & Threat Stream</h3>
            <p className="text-xs text-slate-400">Real-time throughput (₹ in Thousands) & flagged anomaly volume</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-indigo-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500"></span> Legitimate
          </span>
          <span className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-500"></span> Blocked / Flagged
          </span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="legitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="fraudGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `₹${val}k`} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-xl shadow-xl text-xs">
                      <p className="font-semibold text-slate-300 mb-1">{label}</p>
                      <p className="text-indigo-400">
                        Legitimate: ₹{(Number(payload[0]?.value || 0) * 1000).toLocaleString('en-IN')}
                      </p>
                      <p className="text-rose-400 font-semibold">
                        Flagged Anomaly: ₹{(Number(payload[1]?.value || 0) * 1000).toLocaleString('en-IN')}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="normalAmount"
              stroke="#6366f1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#legitGradient)"
            />
            <Area
              type="monotone"
              dataKey="flaggedAmount"
              stroke="#f43f5e"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#fraudGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
