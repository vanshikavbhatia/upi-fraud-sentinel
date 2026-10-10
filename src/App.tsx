import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { FraudProvider } from './context/FraudContext';
import { Header } from './components/layout/Header';
import { MetricCards } from './components/layout/MetricCards';
import { LiveVelocityChart } from './components/dashboard/LiveVelocityChart';
import { RiskDistributionChart } from './components/dashboard/RiskDistributionChart';
import { PSPComparisonChart } from './components/dashboard/PSPComparisonChart';
import { GeoHeatmap } from './components/dashboard/GeoHeatmap';
import { AlertTable } from './components/alerts/AlertTable';
import { AlertDetailsModal } from './components/alerts/AlertDetailsModal';
import { AttackSimulatorModal } from './components/alerts/AttackSimulatorModal';
import { MuleNetworkGraph } from './components/network/MuleNetworkGraph';
import { AICopilotDrawer } from './components/ai/AICopilotDrawer';
import { SARReportModal } from './components/ai/SARReportModal';
import { ApiKeyModal } from './components/common/ApiKeyModal';
import { AuditLogView } from './components/audit/AuditLogView';
import {
  Activity,
  Network,
  MapPin,
  History,
  ShieldCheck
} from 'lucide-react';

type TabType = 'DASHBOARD' | 'MULE_NETWORK' | 'GEO_ANALYTICS' | 'AUDIT_TRAIL';

const MainDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('DASHBOARD');
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isSAROpen, setIsSAROpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Top Enterprise Header */}
      <Header
        onOpenCopilot={() => setIsCopilotOpen(true)}
        onOpenApiKey={() => setIsApiKeyOpen(true)}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
      />

      {/* Main Navigation Subheader */}
      <div className="border-b border-slate-800/80 bg-slate-950/40 px-4 lg:px-6">
        <div className="flex items-center justify-between overflow-x-auto py-2.5">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab('DASHBOARD')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === 'DASHBOARD'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Live Threat Monitor & Alerts</span>
            </button>

            <button
              onClick={() => setActiveTab('MULE_NETWORK')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === 'MULE_NETWORK'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Network className="w-4 h-4" />
              <span>Mule Syndicate Graph</span>
            </button>

            <button
              onClick={() => setActiveTab('GEO_ANALYTICS')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === 'GEO_ANALYTICS'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Geo Hotspots & PSPs</span>
            </button>

            <button
              onClick={() => setActiveTab('AUDIT_TRAIL')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === 'AUDIT_TRAIL'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Regulatory Audit Trail</span>
            </button>
          </div>

          <div className="hidden xl:flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              PMLA Sec 12 Active
            </span>
            <span>·</span>
            <span>NPCI / UPI 2.0 Standard</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 p-4 lg:p-6 max-w-[1600px] w-full mx-auto space-y-6">
        {/* Top KPIs Metric Cards (Always visible on all tabs) */}
        <MetricCards />

        {/* Tab 1: Live Dashboard & Threat Stream */}
        {activeTab === 'DASHBOARD' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Visual Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <LiveVelocityChart />
              </div>
              <div className="lg:col-span-1">
                <RiskDistributionChart />
              </div>
            </div>

            {/* Live Alerts & Forensic Table */}
            <AlertTable />
          </div>
        )}

        {/* Tab 2: Mule Syndicate Graph Visualizer */}
        {activeTab === 'MULE_NETWORK' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <MuleNetworkGraph />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GeoHeatmap />
              <PSPComparisonChart />
            </div>
          </div>
        )}

        {/* Tab 3: Geo Analytics & PSP Exposure */}
        {activeTab === 'GEO_ANALYTICS' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <GeoHeatmap />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PSPComparisonChart />
              <RiskDistributionChart />
            </div>
          </div>
        )}

        {/* Tab 4: Statutory Audit Trail */}
        {activeTab === 'AUDIT_TRAIL' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <AuditLogView />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 px-4 lg:px-6 py-4 mt-auto">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>AegisUPI Sentinel AI Platform · Institutional Grade Cyber Defense Node</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>Latency SLA: &lt;18ms</span>
            <span>·</span>
            <span>Compliance: RBI/FIU-IND</span>
            <span>·</span>
            <span>Protocol: UPI Real-time v2.4</span>
          </div>
        </div>
      </footer>

      {/* Forensic Modal & Action Drawers */}
      <AlertDetailsModal onOpenSAR={() => setIsSAROpen(true)} />
      <SARReportModal isOpen={isSAROpen} onClose={() => setIsSAROpen(false)} />
      <AICopilotDrawer isOpen={isCopilotOpen} onClose={() => setIsCopilotOpen(false)} />
      <ApiKeyModal isOpen={isApiKeyOpen} onClose={() => setIsApiKeyOpen(false)} />
      <AttackSimulatorModal isOpen={isSimulatorOpen} onClose={() => setIsSimulatorOpen(false)} />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <FraudProvider>
        <MainDashboard />
      </FraudProvider>
    </AuthProvider>
  );
}

export default App;
