import React, { useMemo } from 'react';
import { useFraud } from '../../context/FraudContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';

const COLORS = ['#f43f5e', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899', '#10b981'];

export const RiskDistributionChart: React.FC = () => {
  const { transactions } = useFraud();

  const data = useMemo(() => {
    const counts: Record<string, number> = {
      'QR Phishing': 0,
      'Mule Syndicate': 0,
      'Structuring Split': 0,
      'SIM-Swap Takeover': 0,
      'Velocity Abuse': 0,
      'Social Engineering': 0,
    };

    transactions.forEach((tx) => {
      if (tx.fraudCategory === 'PHISHING_QR_SPOOF') counts['QR Phishing']++;
      else if (tx.fraudCategory === 'MULE_SYNDICATE') counts['Mule Syndicate']++;
      else if (tx.fraudCategory === 'STRUCTURAL_SPLIT') counts['Structuring Split']++;
      else if (tx.fraudCategory === 'SIM_SWAP_DEVICE_ANOMALY') counts['SIM-Swap Takeover']++;
      else if (tx.fraudCategory === 'VELOCITY_ABUSE') counts['Velocity Abuse']++;
      else if (tx.fraudCategory === 'SOCIAL_ENGINEERING_REVERSE') counts['Social Engineering']++;
    });

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .filter((item) => item.value > 0);
  }, [transactions]);

  const totalFlagged = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <PieIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100">Fraud Vectors Distribution</h3>
            <p className="text-xs text-slate-400">Classification of detected threat vectors</p>
          </div>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
          {totalFlagged} Incidents
        </span>
      </div>

      <div className="h-52 w-full relative flex items-center justify-center">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0];
                    return (
                      <div className="bg-slate-900 border border-slate-700 p-2 rounded-xl text-xs shadow-xl">
                        <span className="font-semibold text-slate-200">{item.name}: </span>
                        <span className="text-indigo-400 font-mono font-bold">{item.value} alerts</span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-xs text-slate-500">No flagged vectors yet</div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
        {data.slice(0, 4).map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-400">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: COLORS[idx % COLORS.length] }}
            />
            <span className="truncate">{item.name}</span>
            <span className="font-mono text-slate-300 ml-auto font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
