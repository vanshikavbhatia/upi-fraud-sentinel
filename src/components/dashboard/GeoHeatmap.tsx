import React from 'react';
import { HOTSPOT_REGIONS } from '../../data/mockTransactions';
import { MapPin, AlertOctagon } from 'lucide-react';

export const GeoHeatmap: React.FC = () => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100">National Cybercrime Geo-Hotspots</h3>
            <p className="text-xs text-slate-400">Live regional telemetry tracking organized cyber syndicate hubs</p>
          </div>
        </div>
        <span className="text-xs font-mono text-amber-400 bg-amber-950/60 border border-amber-800 px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <AlertOctagon className="w-3 h-3" />
          High Alert Hubs
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {HOTSPOT_REGIONS.map((region) => {
          const isCritical = region.riskLevel === 'CRITICAL';
          const isHigh = region.riskLevel === 'HIGH';

          return (
            <div
              key={region.id}
              className={`p-3.5 rounded-xl border transition ${
                isCritical
                  ? 'bg-rose-950/20 border-rose-500/30 hover:border-rose-500/60'
                  : isHigh
                  ? 'bg-amber-950/20 border-amber-500/30 hover:border-amber-500/60'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isCritical ? 'bg-rose-500 animate-ping' : isHigh ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}
                  />
                  <h4 className="text-sm font-semibold text-slate-200">
                    {region.city}
                  </h4>
                </div>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                    isCritical
                      ? 'bg-rose-950 text-rose-300 border-rose-800'
                      : isHigh
                      ? 'bg-amber-950 text-amber-300 border-amber-800'
                      : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  }`}
                >
                  {region.riskLevel}
                </span>
              </div>

              <p className="text-xs text-slate-400 mb-2">{region.state}</p>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 truncate max-w-[170px]" title={region.topVector}>
                  {region.topVector}
                </span>
                <span className="font-mono font-semibold text-slate-200 shrink-0">
                  {region.flaggedToday} flags
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
