import React from 'react';
import { useFraud } from '../../context/FraudContext';
import { History, Snowflake, CheckCircle2, Zap, FileText, Clock } from 'lucide-react';
import type { AuditAction } from '../../types';

export const AuditLogView: React.FC = () => {
  const { auditLogs } = useFraud();

  const getActionBadge = (action: AuditAction['action']) => {
    switch (action) {
      case 'FREEZE_VPA':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-rose-950/80 text-rose-300 border border-rose-800">
            <Snowflake className="w-3 h-3" />
            FREEZE VPA
          </span>
        );
      case 'CLEAR_ALERT':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
            <CheckCircle2 className="w-3 h-3" />
            DISMISSED / CLEARED
          </span>
        );
      case 'SIMULATE_ATTACK':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-950/80 text-amber-300 border border-amber-800">
            <Zap className="w-3 h-3" />
            ATTACK INJECTED
          </span>
        );
      case 'ADD_NOTE':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-800">
            <FileText className="w-3 h-3" />
            CASE NOTE
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            {action}
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              Statutory Security Audit Trail & Chain of Custody
              <span className="text-xs font-mono text-slate-400">({auditLogs.length} events logged)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Immutable forensic log of all analyst interventions complying with RBI digital payment oversight
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/60 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Investigator Identity</th>
              <th className="py-3 px-4">Action Type</th>
              <th className="py-3 px-4">Target Ref / VPA</th>
              <th className="py-3 px-4">Justification / Audit Rationale</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {auditLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-800/40 transition">
                <td className="py-3 px-4 text-slate-400 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {new Date(log.timestamp).toLocaleTimeString('en-IN', { hour12: false })}
                  </div>
                  <span className="text-[10px] text-slate-600 block">
                    {new Date(log.timestamp).toLocaleDateString('en-IN')}
                  </span>
                </td>
                <td className="py-3 px-4 font-sans">
                  <span className="font-semibold text-slate-200 block">{log.userName}</span>
                  <span className="text-[10px] text-slate-500">{log.userRole}</span>
                </td>
                <td className="py-3 px-4 font-sans">{getActionBadge(log.action)}</td>
                <td className="py-3 px-4 text-slate-300">
                  <span className="font-bold text-indigo-400 block">{log.targetTxId}</span>
                  <span className="text-[10px] text-slate-400 truncate max-w-[160px] block font-mono">
                    {log.targetVpa}
                  </span>
                </td>
                <td className="py-3 px-4 font-sans text-slate-300 text-xs">
                  {log.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
