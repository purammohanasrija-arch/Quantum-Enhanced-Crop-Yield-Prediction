import React from 'react';
import { AlertTriangle, Flame, CloudRain, DropletOff, Sprout, Bug, Waves, ArrowRight } from 'lucide-react';
import { useFarm } from '../../../context/FarmContext';

export default function RiskAnalysisWidget() {
  const { setActiveTab } = useFarm();

  const risks = [
    { name: 'Heat Stress Risk', level: 'High', color: 'bg-rose-100 text-rose-800 border-rose-200', dot: 'bg-rose-500', icon: Flame },
    { name: 'Low Rainfall Risk', level: 'Moderate', color: 'bg-amber-100 text-amber-800 border-amber-200', dot: 'bg-amber-500', icon: CloudRain },
    { name: 'Nutrient Deficiency', level: 'Low', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', dot: 'bg-emerald-500', icon: Sprout },
    { name: 'Pest/Disease Risk', level: 'Moderate', color: 'bg-amber-100 text-amber-800 border-amber-200', dot: 'bg-amber-500', icon: Bug },
    { name: 'Flood Risk', level: 'Low', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', dot: 'bg-emerald-500', icon: Waves },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Risk Analysis</h3>
              <p className="text-[10px] text-slate-500">Early warning telemetry</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full">
            2 Warnings
          </span>
        </div>

        {/* Risk Items List */}
        <div className="space-y-2 mt-2">
          {risks.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-100"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center text-slate-600 border border-slate-200/60">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800">
                    {item.name}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${item.dot} animate-pulse`} />
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${item.color}`}>
                    {item.level}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => setActiveTab('risk-analysis')}
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
        >
          <span>View Mitigation Protocols</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
