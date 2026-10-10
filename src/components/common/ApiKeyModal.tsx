import React, { useState } from 'react';
import { aiService } from '../../services/aiService';
import { X, Sparkles, Key, CheckCircle, Info } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [key, setKey] = useState<string>(aiService.getApiKey());
  const [saved, setSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = () => {
    aiService.setApiKey(key);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-100">AI Intelligence Settings</h3>
              <p className="text-xs text-slate-400">Configure Gemini API or use built-in neural heuristics</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-indigo-950/40 border border-indigo-500/20 rounded-xl p-3.5 flex items-start gap-3 text-xs text-indigo-200 leading-relaxed">
            <Info className="w-4 h-4 shrink-0 text-indigo-400 mt-0.5" />
            <div>
              <span className="font-medium text-indigo-300">Default Mode: </span>
              A complete, forensic heuristic engine is active out of the box with zero setup. You can optionally paste your own Google Gemini API key below to enable real-time Gemini LLM calls.
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Google Gemini API Key (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Key className="w-4 h-4" />
              </div>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={key}
                onChange={e => setKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Your key is saved locally in browser storage and never transmitted to external servers.
            </p>
          </div>

          {saved && (
            <div className="flex items-center gap-2 text-emerald-400 text-xs bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-xl">
              <CheckCircle className="w-4 h-4" />
              <span>API Key saved successfully! Live Gemini analysis active.</span>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-950/50 border-t border-slate-800/80 flex items-center justify-between">
          <button
            onClick={() => {
              setKey('');
              aiService.setApiKey('');
            }}
            className="text-xs text-slate-400 hover:text-rose-400 transition"
          >
            Clear Key
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
