import React, { useState } from 'react';
import { useFraud } from '../../context/FraudContext';
import type { NetworkNode } from '../../types';
import { Network, Sparkles, ArrowRight, Info } from 'lucide-react';

export const MuleNetworkGraph: React.FC = () => {
  const { muleClusters } = useFraud();
  const [selectedClusterIndex, setSelectedClusterIndex] = useState(0);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);

  const cluster = muleClusters[selectedClusterIndex] || muleClusters[0];

  const getNodeColor = (type: NetworkNode['type']) => {
    switch (type) {
      case 'VICTIM':
        return 'border-sky-500/50 bg-sky-950/40 text-sky-300';
      case 'MULE_1':
        return 'border-amber-500/60 bg-amber-950/40 text-amber-300';
      case 'MULE_2':
        return 'border-orange-500/60 bg-orange-950/40 text-orange-300';
      case 'SINK_CRYPTO':
        return 'border-purple-500/70 bg-purple-950/50 text-purple-300';
      case 'SINK_CASH':
        return 'border-rose-500/70 bg-rose-950/50 text-rose-300';
      default:
        return 'border-slate-700 bg-slate-900 text-slate-300';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-5">
      {/* Header & Cluster Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              UPI Mule Syndicate Flow & Layering Graph
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                AI TOPOLOGY
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Interactive multi-hop laundering pathways mapped in real-time
            </p>
          </div>
        </div>

        {/* Cluster Tabs */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {muleClusters.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedClusterIndex(idx);
                setSelectedNode(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedClusterIndex === idx
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {c.name.split('(')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* AI Cluster Brief */}
      <div className="bg-purple-950/25 border border-purple-500/25 p-3.5 rounded-xl flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <div className="text-xs text-purple-200 leading-relaxed">
          <span className="font-semibold text-purple-300">Cluster Forensics: </span>
          {cluster.aiAnalysis}
        </div>
      </div>

      {/* Interactive Node Flow Display */}
      <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 overflow-x-auto">
        <div className="min-w-[700px] flex items-center justify-between py-6 px-4 relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-sky-500 via-amber-500 to-rose-500 -translate-y-1/2 z-0 opacity-40"></div>

          {cluster.nodes.map((node, i) => {
            const isSelected = selectedNode?.id === node.id;
            const nodeStyle = getNodeColor(node.type);

            return (
              <div key={node.id} className="relative z-10 flex flex-col items-center">
                <button
                  onClick={() => setSelectedNode(node)}
                  className={`w-28 p-3 rounded-2xl border text-center transition hover:scale-105 shadow-lg ${nodeStyle} ${
                    isSelected ? 'ring-2 ring-white scale-105' : ''
                  }`}
                >
                  <span className="text-[10px] uppercase font-mono font-bold block mb-1 opacity-80">
                    {node.type.replace('_', ' ')}
                  </span>
                  <p className="text-xs font-semibold truncate text-slate-100">{node.label.split('(')[0]}</p>
                  <p className="text-xs font-mono font-bold text-white mt-1">
                    ₹{node.amount.toLocaleString('en-IN')}
                  </p>
                  <div className="mt-1.5 flex items-center justify-center gap-1 text-[10px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
                    <span>Risk: {node.riskScore}</span>
                  </div>
                </button>

                {i < cluster.nodes.length - 1 && (
                  <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-slate-500 hidden sm:block">
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Node Inspector Drawer */}
      {selectedNode ? (
        <div className="bg-slate-950/90 border border-slate-700/80 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in duration-150">
          <div className="space-y-1 text-xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Selected Entity Node</span>
            <h4 className="text-sm font-semibold text-white">{selectedNode.label}</h4>
            <p className="font-mono text-indigo-400">{selectedNode.vpa}</p>
            <p className="text-slate-400">
              Bank: {selectedNode.bank} · Location: {selectedNode.city} · Transaction: ₹
              {selectedNode.amount.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">
              Risk Score: {selectedNode.riskScore}/100
            </span>
            <button
              onClick={() => setSelectedNode(null)}
              className="px-3 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              Deselect
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-xs text-slate-500 py-1 flex items-center justify-center gap-1.5">
          <Info className="w-3.5 h-3.5" />
          Click any node above to inspect its VPA, bank node, and velocity profile.
        </div>
      )}
    </div>
  );
};
