import React, { useState } from 'react';
import { useFraud } from '../../context/FraudContext';
import { useAuth } from '../../context/AuthContext';
import { aiService } from '../../services/aiService';
import type { SARReportData } from '../../services/aiService';
import { X, FileText, Copy, Check, ShieldCheck, Printer } from 'lucide-react';

interface SARReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SARReportModal: React.FC<SARReportModalProps> = ({ isOpen, onClose }) => {
  const { selectedTx } = useFraud();
  const { currentUser } = useAuth();
  const [copied, setCopied] = useState(false);

  if (!isOpen || !selectedTx) return null;

  const sarData: SARReportData = aiService.generateSARReport(selectedTx, currentUser.name);

  const handleCopy = () => {
    const text = `
================================================================================
FINANCIAL INTELLIGENCE UNIT - INDIA (FIU-IND) & RESERVE BANK OF INDIA (RBI)
FORMAL SUSPICIOUS ACTIVITY REPORT (SAR) - ELECTRONIC FILING
================================================================================
REPORT REFERENCE ID    : ${sarData.reportId}
FILING TIMESTAMP       : ${sarData.generatedAt}
LEGAL AUTHORITY        : ${sarData.legalAct}
REPORTING ENTITY       : ${sarData.reportingEntity}
INVESTIGATOR SIGN-OFF  : ${sarData.investigator} (${currentUser.badge})

1. TRANSACTION IDENTIFIERS
--------------------------------------------------------------------------------
Transaction Reference  : ${sarData.transactionRef}
Remitter / Payer VPA   : ${sarData.senderVpa}
Beneficiary / Mule VPA : ${sarData.receiverVpa}
Settlement Amount      : ₹${sarData.amountINR.toLocaleString('en-IN')}
Risk Classification    : ${sarData.riskClassification}

2. EXECUTIVE SUMMARY & ATTACK VECTOR
--------------------------------------------------------------------------------
${sarData.executiveSummary}

3. FORENSIC TELEMETRY & HARDWARE EVIDENCE
--------------------------------------------------------------------------------
- Hardware Fingerprint : ${sarData.forensicEvidence.telemetry}
- Network Geo Trace    : ${sarData.forensicEvidence.geography}
- SIM & App Lifecycle  : ${sarData.forensicEvidence.deviceAnomaly}
- Money Mule Linkage   : ${sarData.forensicEvidence.networkHopStatus}

4. REGULATORY ACTION DIRECTIVE
--------------------------------------------------------------------------------
${sarData.recommendedLegalAction}

================================================================================
CONFIDENTIAL - LAW ENFORCEMENT & NPCI SPECIAL INVESTIGATION SQUAD ONLY
================================================================================
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                FIU-IND / RBI Suspicious Activity Report (SAR)
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  STATUTORY FILING
                </span>
              </h3>
              <p className="text-xs text-slate-400">Formal regulatory dossier for submission to financial intelligence agencies</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Document Body */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs text-slate-300 space-y-5 bg-slate-950/60">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px]">
            <div>
              <span className="text-slate-500 block">Report Reference:</span>
              <span className="text-indigo-400 font-bold">{sarData.reportId}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Filing Timestamp:</span>
              <span className="text-slate-300">{new Date(sarData.generatedAt).toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Statutory Act:</span>
              <span className="text-slate-300">{sarData.legalAct}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Investigator:</span>
              <span className="text-slate-200 font-semibold">{sarData.investigator}</span>
            </div>
          </div>

          {/* Section 1 */}
          <div className="space-y-1.5">
            <h4 className="text-indigo-300 font-bold border-b border-slate-800 pb-1">
              1. ENTITY & TRANSACTION IDENTIFIERS
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div>
                <span className="text-slate-500">Transaction ID:</span> {sarData.transactionRef}
              </div>
              <div>
                <span className="text-slate-500">Amount:</span> ₹{sarData.amountINR.toLocaleString('en-IN')}
              </div>
              <div>
                <span className="text-slate-500">Sender VPA:</span> {sarData.senderVpa}
              </div>
              <div>
                <span className="text-slate-500">Beneficiary VPA:</span> {sarData.receiverVpa}
              </div>
              <div className="col-span-2">
                <span className="text-slate-500">Risk Assessment:</span>{' '}
                <span className="text-rose-400 font-bold">{sarData.riskClassification}</span>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-1.5">
            <h4 className="text-indigo-300 font-bold border-b border-slate-800 pb-1">
              2. EXECUTIVE SUMMARY & MODUS OPERANDI
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed font-sans pt-1">
              {sarData.executiveSummary}
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-1.5">
            <h4 className="text-indigo-300 font-bold border-b border-slate-800 pb-1">
              3. FORENSIC TELEMETRY & HARDWARE EVIDENCE
            </h4>
            <ul className="space-y-1.5 text-[11px] pt-1 text-slate-400">
              <li>
                <strong className="text-slate-300">• Telemetry:</strong> {sarData.forensicEvidence.telemetry}
              </li>
              <li>
                <strong className="text-slate-300">• Geographic Trace:</strong> {sarData.forensicEvidence.geography}
              </li>
              <li>
                <strong className="text-slate-300">• Hardware Identity:</strong> {sarData.forensicEvidence.deviceAnomaly}
              </li>
              <li>
                <strong className="text-slate-300">• Syndicate Topology:</strong> {sarData.forensicEvidence.networkHopStatus}
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-1.5">
            <h4 className="text-indigo-300 font-bold border-b border-slate-800 pb-1">
              4. STATUTORY DIRECTIVES & INTERVENTION
            </h4>
            <p className="text-[11px] text-emerald-400 leading-relaxed font-sans pt-1">
              {sarData.recommendedLegalAction}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Digital Signature Verified · NPCI Compliance Grade</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-1.5 shadow-lg shadow-indigo-600/30"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied Dossier!' : 'Copy to Clipboard'}
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
