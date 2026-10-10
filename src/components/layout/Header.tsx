import React, { useState } from 'react';
import { useAuth, PRESET_USERS } from '../../context/AuthContext';
import { useFraud } from '../../context/FraudContext';
import {
  ShieldAlert,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Zap,
  Sparkles,
  Key,
  UserCheck,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  onOpenCopilot: () => void;
  onOpenApiKey: () => void;
  onOpenSimulator: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCopilot,
  onOpenApiKey,
  onOpenSimulator,
}) => {
  const { currentUser, switchRole } = useAuth();
  const { isStreaming, setIsStreaming, speed, setSpeed, isMuted, setIsMuted } = useFraud();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Brand Logo & Status */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-rose-600 shadow-lg shadow-indigo-500/20">
            <ShieldAlert className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                AegisUPI <span className="text-indigo-400 font-mono text-xs font-semibold px-1.5 py-0.5 rounded bg-indigo-950/80 border border-indigo-500/30">SENTINEL AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                NPCI L2 NODE ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Real-Time AI Fraud Monitoring & UPI Threat Defense Engine
            </p>
          </div>
        </div>

        {/* Live Controls & Action Buttons */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Stream Play/Pause & Speed */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 shadow-inner">
            <button
              onClick={() => setIsStreaming(!isStreaming)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition ${
                isStreaming
                  ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20'
              }`}
              title={isStreaming ? 'Pause live stream' : 'Resume live stream'}
            >
              {isStreaming ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden md:inline">Live</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden md:inline">Paused</span>
                </>
              )}
            </button>

            {/* Speed selector */}
            <div className="hidden md:flex items-center pl-1 border-l border-slate-800 ml-1 gap-1">
              {[1, 2, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-1.5 py-0.5 text-[11px] font-mono rounded ${
                    speed === s
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            {/* Sound Mute/Unmute */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 text-slate-400 hover:text-slate-200 transition ml-1"
              title={isMuted ? 'Unmute cyber alert sounds' : 'Mute alert sounds'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-indigo-400" />}
            </button>
          </div>

          {/* Inject Attack Simulator Button */}
          <button
            onClick={onOpenSimulator}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-500/40 shadow-sm transition group"
          >
            <Zap className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition" />
            <span className="hidden sm:inline">Simulate Attack</span>
          </button>

          {/* AI Copilot Toggle */}
          <button
            onClick={onOpenCopilot}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-500/40 shadow-sm transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden md:inline">AI Copilot</span>
          </button>

          {/* API Key Modal Button */}
          <button
            onClick={onOpenApiKey}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800 transition"
            title="Configure Gemini API Settings"
          >
            <Key className="w-4 h-4" />
          </button>

          {/* User Profile & RBAC Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
            >
              <div className="w-6 h-6 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-500/30">
                {currentUser.name.charAt(0)}
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-xs font-medium text-slate-200 leading-none">{currentUser.name}</p>
                <p className="text-[10px] text-slate-400 leading-none mt-0.5">{currentUser.badge.split('(')[0]}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3.5 py-2 border-b border-slate-800">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Role-Based Access Control</p>
                  <p className="text-xs text-slate-300 mt-0.5">Switch active persona to test RBAC:</p>
                </div>
                <div className="p-1 space-y-1">
                  {PRESET_USERS.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => {
                        switchRole(user.role);
                        setUserDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition ${
                        currentUser.id === user.id
                          ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30'
                          : 'text-slate-300 hover:bg-slate-800/80'
                      }`}
                    >
                      <div>
                        <p>{user.name}</p>
                        <p className="text-[10px] text-slate-400 font-normal">{user.badge}</p>
                      </div>
                      {currentUser.id === user.id && <UserCheck className="w-4 h-4 text-indigo-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
