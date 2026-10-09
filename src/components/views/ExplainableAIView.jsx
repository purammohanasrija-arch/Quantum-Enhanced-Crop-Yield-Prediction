import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Sparkles, TrendingUp, TrendingDown, Info, ArrowRight } from 'lucide-react';
import { FEATURE_IMPORTANCE_DATA } from '../../data/mockData';
import { useFarm } from '../../context/FarmContext';

export default function ExplainableAIView() {
  const { predictionData, selectedCrop, setActiveTab } = useFarm();

  const shapWaterfall = [
    { feature: 'Base Regional Average', value: '+3.80 t/ha', type: 'base' },
    { feature: 'Adequate Rainfall (1150 mm)', value: '+0.45 t/ha', type: 'positive' },
    { feature: 'High Soil Dielectric Moisture (65%)', value: '+0.32 t/ha', type: 'positive' },
    { feature: 'Elevated Daytime Temp (29°C -> 32°C peak)', value: '-0.18 t/ha', type: 'negative' },
    { feature: 'Optimal Nitrogen Top-dressing (82 kg/ha)', value: '+0.21 t/ha', type: 'positive' },
    { feature: 'Irrigation Uniformity', value: '+0.08 t/ha', type: 'positive' },
    { feature: 'Final Predicted Yield', value: '4.52 t/ha', type: 'final' },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explainable AI (XAI)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Decipher model decision boundaries, Shapley feature weights, and agronomic factor attributions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-purple-100 text-purple-900 border border-purple-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-700" />
            <span>SHAP & Permutation Importance</span>
          </span>
        </div>
      </div>

      {/* Hero "Why this prediction?" Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Why this prediction? ({selectedCrop}: {predictionData.predictedYield} t/ha)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Relative global feature importance derived from Quantum Kernel Ridge and Random Forest models
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            100% Attribution Sum
          </span>
        </div>

        {/* Feature Importance Animated Horizontal Bars */}
        <div className="space-y-4">
          {FEATURE_IMPORTANCE_DATA.map((item, idx) => (
            <div key={item.feature} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-base">{item.icon}</span>
                  <div>
                    <span className="font-bold text-slate-900">{item.feature}</span>
                    <span className="text-[11px] text-slate-400 block">{item.description}</span>
                  </div>
                </div>
                <span className="text-sm font-mono font-extrabold text-slate-900">
                  {item.importance}%
                </span>
              </div>

              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.importance}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
                  className={`h-full rounded-full ${
                    idx === 0
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600'
                      : idx === 1
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600'
                      : idx === 2
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600'
                      : idx === 3
                      ? 'bg-gradient-to-r from-lime-500 to-emerald-600'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-600'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SHAP Waterfall / Local Explanation Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
        <h3 className="font-bold text-slate-900 text-base mb-2">
          Local Waterfall Decomposition for Current Season
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          How individual environmental and soil readings push the baseline expectation towards {predictionData.predictedYield} t/ha
        </p>

        <div className="space-y-2.5">
          {shapWaterfall.map((row, idx) => (
            <div
              key={row.feature}
              className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${
                row.type === 'final'
                  ? 'bg-emerald-900 text-white font-bold border-emerald-800'
                  : row.type === 'base'
                  ? 'bg-slate-100 text-slate-800 font-semibold border-slate-200'
                  : row.type === 'positive'
                  ? 'bg-green-50 text-green-900 border-green-200'
                  : 'bg-rose-50 text-rose-900 border-rose-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {row.type === 'positive' && <TrendingUp className="w-4 h-4 text-green-600" />}
                {row.type === 'negative' && <TrendingDown className="w-4 h-4 text-rose-600" />}
                <span>{row.feature}</span>
              </div>

              <span className="font-mono font-bold text-sm">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
