import React from 'react';
import { useFraud } from '../../context/FraudContext';
import { X, Zap, ShieldAlert, Smartphone, Network, Bot } from 'lucide-react';

interface AttackSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AttackSimulatorModal: React.FC<AttackSimulatorModalProps> = ({ isOpen, onClose }) => {
  const { injectAttackScenario } = useFraud();

  if (!isOpen) return null;

  const scenarios = [
    {
      id: 'MULE_SYNDICATE' as const,
      title: 'Mule Syndicate Rapid Layering',
      subtitle: 'Simulate high-value siphoning across multi-tier accounts into crypto sink',
      icon: Network,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      badge: '₹2,45,000 Volume',
      badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
      description: 'Triggers multi-hop fund transfer to an intermediary mule VPA registered with fake credentials in Jamtara corridor.'
    },
    {
      id: 'PHISHING_STORM' as const,
      title: 'Electricity Bill QR Phishing Wave',
      subtitle: 'Simulate utility fake collect request campaign targeting senior citizens',
      icon: ShieldAlert,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      badge: 'QR Spoofing',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
      description: 'Injects an SMS Trojan vector where an urgent power cut notice leads to an unauthorized ₹44,990 reverse mandate authorization.'
    },
    {
      id: 'SIM_SWAP_TAKEOVER' as const,
      title: 'SIM-Swap High-Value Takeover',
      subtitle: 'Simulate account hijack right after carrier IMSI re-registration',
      icon: Smartphone,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      badge: '₹1,95,000 Volume',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-800',
      description: 'SIM card cloned at store 19 mins prior with location teleportation from Mumbai home-base to Mewat cyber hub.'
    },
    {
      id: 'BOT_VELOCITY' as const,
      title: 'Distributed Botnet API Probing',
      subtitle: 'Simulate micro-transaction velocity barrage from cloud proxy VPS',
      icon: Bot,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      badge: 'High Velocity',
      badgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
      description: 'Burst of rapid ₹5 - ₹15 probing transfers to test bank settlement endpoints and brute-force recipient VPA lists.'
    }
  ];

  const handleTrigger = (scenario: 'MULE_SYNDICATE' | 'PHISHING_STORM' | 'SIM_SWAP_TAKEOVER' | 'BOT_VELOCITY') => {
    injectAttackScenario(scenario);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 flex items-center gap-2">
                Live Attack Simulation Studio
                <span className="text-[10px] font-mono bg-rose-950/80 text-rose-400 px-2 py-0.5 rounded border border-rose-800">
                  RED TEAM
                </span>
              </h3>
              <p className="text-xs text-slate-400">Inject realistic real-time UPI cyber threat scenarios into the live monitor</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          {scenarios.map((sc) => {
            const Icon = sc.icon;
            return (
              <div
                key={sc.id}
                onClick={() => handleTrigger(sc.id)}
                className="group relative p-4 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-800/60 hover:border-slate-700 cursor-pointer transition flex items-start gap-3.5"
              >
                <div className={`p-2.5 rounded-xl border shrink-0 ${sc.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-indigo-400 transition">
                      {sc.title}
                    </h4>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${sc.badgeColor}`}>
                      {sc.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-1.5">{sc.subtitle}</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{sc.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Click any scenario to inject into the live stream instantly.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
