import React, { useMemo } from 'react';
import { useFraud } from '../../context/FraudContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { Smartphone } from 'lucide-react';
import type { PSPProvider } from '../../types';

export const PSPComparisonChart: React.FC = () => {
  const { transactions } = useFraud();

  const data = useMemo(() => {
    const pspMap: Record<PSPProvider, { total: number; fraud: number }> = {
      PhonePe: { total: 0, fraud: 0 },
      GooglePay: { total: 0, fraud: 0 },
      Paytm: { total: 0, fraud: 0 },
      CRED: { total: 0, fraud: 0 },
      BHIM: { total: 0, fraud: 0 },
      AmazonPay: { total: 0, fraud: 0 },
    };

    transactions.forEach((tx) => {
      if (pspMap[tx.psp]) {
        pspMap[tx.psp].total++;
        if (tx.riskScore >= 70) {
          pspMap[tx.psp].fraud++;
        }
      }
    });

    return (Object.keys(pspMap) as PSPProvider[]).map((psp) => ({
      name: psp,
      normal: pspMap[psp].total - pspMap[psp].fraud,
      fraud: pspMap[psp].fraud,
    }));
  }, [transactions]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100">PSP & App Network Exposure</h3>
            <p className="text-xs text-slate-400">Total scan volume vs intercepted fraud attempts</p>
          </div>
        </div>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-xl shadow-xl text-xs">
                      <p className="font-semibold text-slate-200 mb-1">{label}</p>
                      <p className="text-slate-400">Legitimate: {payload[0]?.value}</p>
                      <p className="text-rose-400 font-bold">Blocked Anomaly: {payload[1]?.value}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="normal" stackId="a" fill="#334155" radius={[0, 0, 4, 4]} />
            <Bar dataKey="fraud" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
