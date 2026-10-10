import React, { useState, useMemo } from 'react';
import { useFraud } from '../../context/FraudContext';
import { useAuth } from '../../context/AuthContext';
import { SeverityBadge, StatusBadge, CategoryBadge } from '../common/Badge';
import type { UPITransaction } from '../../types';
import {
  Search,
  Shield,
  Snowflake,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export const AlertTable: React.FC = () => {
  const { transactions, setSelectedTx, freezeVpa } = useFraud();
  const { canExecuteFreeze } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Search
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        tx.id.toLowerCase().includes(query) ||
        tx.senderVpa.toLowerCase().includes(query) ||
        tx.receiverVpa.toLowerCase().includes(query) ||
        tx.senderName.toLowerCase().includes(query) ||
        tx.device.locationCity.toLowerCase().includes(query);

      // Severity
      const matchesSeverity = severityFilter === 'ALL' || tx.severity === severityFilter;

      // Status
      const matchesStatus = statusFilter === 'ALL' || tx.status === statusFilter;

      return matchesSearch && matchesSeverity && matchesStatus;
    });
  }, [transactions, searchQuery, severityFilter, statusFilter]);

  const handleRowClick = (tx: UPITransaction) => {
    setSelectedTx(tx);
  };

  const handleQuickFreeze = (e: React.MouseEvent, tx: UPITransaction) => {
    e.stopPropagation();
    if (!canExecuteFreeze) {
      alert('Only Lead Fraud Investigators are authorized to execute emergency VPA freezes.');
      return;
    }
    freezeVpa(tx.id, tx.receiverVpa, 'Quick freeze executed from live alert table.');
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-sm overflow-hidden">
      {/* Table Filter Header */}
      <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              Live UPI Transaction & Threat Registry
              <span className="text-xs font-mono font-normal text-slate-400">
                ({filteredTransactions.length} items)
              </span>
            </h3>
            <p className="text-xs text-slate-400">Click any row to open full AI Forensics & SAR generator</p>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search VPA, TxID, City..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Severity Dropdown */}
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical Only</option>
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low / Cleared</option>
          </select>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="INVESTIGATING">Investigating</option>
            <option value="FROZEN">Frozen</option>
            <option value="CLEARED">Cleared</option>
          </select>
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/60 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Transaction Ref</th>
              <th className="py-3 px-4">Sender & Payee VPAs</th>
              <th className="py-3 px-4">Amount (INR)</th>
              <th className="py-3 px-4">Risk Score</th>
              <th className="py-3 px-4">Severity & Vector</th>
              <th className="py-3 px-4">Origin / City</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredTransactions.slice(0, 50).map((tx) => {
              const isCritical = tx.severity === 'CRITICAL';
              const isHigh = tx.severity === 'HIGH';

              return (
                <tr
                  key={tx.id}
                  onClick={() => handleRowClick(tx)}
                  className={`cursor-pointer transition hover:bg-slate-800/60 ${
                    tx.status === 'FROZEN'
                      ? 'bg-rose-950/15'
                      : isCritical
                      ? 'bg-rose-950/20'
                      : isHigh
                      ? 'bg-amber-950/10'
                      : ''
                  }`}
                >
                  {/* Tx ID & Time */}
                  <td className="py-3.5 px-4 font-mono">
                    <span className="font-semibold text-slate-200 block">{tx.id}</span>
                    <span className="text-[10px] text-slate-500">
                      {new Date(tx.timestamp).toLocaleTimeString('en-IN', { hour12: false })}
                    </span>
                  </td>

                  {/* VPA Flow */}
                  <td className="py-3.5 px-4 max-w-[240px]">
                    <div className="truncate text-slate-300 font-medium">{tx.senderVpa}</div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate">
                      <ArrowRight className="w-3 h-3 shrink-0 text-slate-600" />
                      <span className={isCritical ? 'text-rose-400 font-medium' : 'text-slate-400'}>
                        {tx.receiverVpa}
                      </span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="py-3.5 px-4 font-mono">
                    <span className="text-sm font-bold text-white">
                      ₹{tx.amount.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-slate-500 font-sans">{tx.psp}</span>
                  </td>

                  {/* Risk Score */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            tx.riskScore >= 90
                              ? 'bg-rose-500'
                              : tx.riskScore >= 70
                              ? 'bg-amber-500'
                              : tx.riskScore >= 40
                              ? 'bg-yellow-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${tx.riskScore}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-xs text-slate-200">
                        {tx.riskScore}
                      </span>
                    </div>
                  </td>

                  {/* Severity & Category */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1 items-start">
                      <SeverityBadge severity={tx.severity} />
                      <CategoryBadge category={tx.fraudCategory} />
                    </div>
                  </td>

                  {/* City & Device */}
                  <td className="py-3.5 px-4 text-slate-400">
                    <span className="text-slate-300 font-medium block">
                      {tx.device.locationCity}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate block max-w-[120px]">
                      {tx.device.deviceModel}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <StatusBadge status={tx.status} />
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {tx.status !== 'FROZEN' && tx.riskScore >= 70 && (
                        <button
                          onClick={(e) => handleQuickFreeze(e, tx)}
                          title="Execute Emergency VPA Freeze"
                          className="p-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-300 transition"
                        >
                          <Snowflake className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleRowClick(tx)}
                        title="View AI Forensics & Details"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredTransactions.length === 0 && (
        <div className="p-12 text-center text-slate-500 text-xs">
          No transactions match your search and filter criteria.
        </div>
      )}
    </div>
  );
};
