import React, { useState } from 'react';
import { Lightbulb, CheckCircle2, Circle, ArrowRight, Check } from 'lucide-react';
import { useFarm } from '../../../context/FarmContext';

export default function SmartRecommendationsWidget() {
  const { recommendations, setActiveTab } = useFarm();
  const [completed, setCompleted] = useState({});

  const toggleTask = (id) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-lime-100 flex items-center justify-center text-lime-800">
              <Lightbulb className="w-4 h-4 text-lime-700" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Smart Recommendations</h3>
              <p className="text-[10px] text-slate-500">Agronomic decision support</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
            5 Action Items
          </span>
        </div>

        {/* Action List */}
        <div className="space-y-2 mt-2">
          {recommendations.slice(0, 5).map((rec) => {
            const isDone = completed[rec.id];
            return (
              <div
                key={rec.id}
                onClick={() => toggleTask(rec.id)}
                className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                  isDone
                    ? 'bg-slate-50 border-slate-200 opacity-60'
                    : 'bg-emerald-50/40 hover:bg-emerald-50 border-emerald-200/60'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 shrink-0 text-emerald-600 hover:text-emerald-700"
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Circle className="w-4 h-4 text-emerald-400" />
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-xs font-semibold ${isDone ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {rec.icon} {rec.title}
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    Impact: {rec.impact}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[10px] text-slate-400">
          Model-driven advisory
        </span>
        <button
          onClick={() => setActiveTab('recommendations')}
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
        >
          <span>All Recommendations</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
