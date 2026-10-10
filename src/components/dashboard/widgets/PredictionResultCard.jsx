import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, ShieldCheck, Scale, Info, ArrowUpRight } from 'lucide-react';
import { useFarm } from '../../../context/FarmContext';
import AnimatedCounter from '../../common/AnimatedCounter';

export default function PredictionResultCard() {
  const { predictionData, farmArea, selectedCrop, setActiveTab } = useFarm();

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between overflow-hidden relative">
      {/* Background soft gradient motif */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/40 rounded-full blur-2xl pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center text-green-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Prediction Result</h3>
          </div>
          <div className="flex items-center gap-1.5">
            {predictionData.isQuantumSynced && (
              <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 flex items-center gap-1">
                <span>⚛️</span>
                <span>Quantum Synced</span>
              </span>
            )}
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {selectedCrop}
            </span>
          </div>
        </div>

        {/* Visual Crop Header Banner */}
        <div className="relative rounded-2xl p-4 bg-gradient-to-r from-emerald-800 to-green-700 text-white overflow-hidden shadow-sm mb-4">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-emerald-200 uppercase tracking-wider block">
                Predicted Crop Yield
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-950/60 text-emerald-200 border border-emerald-400/30">
                {predictionData.yieldTier || 'Tier 1 • Optimal'}
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                <AnimatedCounter value={predictionData.predictedYield} decimals={2} />
              </span>
              <span className="text-sm font-semibold text-emerald-100">
                tons / hectare
              </span>
            </div>

            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/50 border border-emerald-400/30 text-emerald-200 text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
                <span>{predictionData.previousSeasonDiff || '+8.2%'}</span>
                <span className="text-[10px] text-emerald-300/80 font-normal">(vs prev season)</span>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-xs border border-white/30">
                {predictionData.yieldCategory || 'Optimal / High Yield'}
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown Metric Tiles */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold mb-1">
              <Scale className="w-3.5 h-3.5 text-emerald-600" />
              <span>Total Production</span>
            </div>
            <div className="text-lg font-extrabold text-slate-900 flex items-baseline gap-1">
              <AnimatedCounter value={predictionData.totalProduction} decimals={2} />
              <span className="text-xs text-slate-500 font-semibold">tons</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              (for {farmArea} hectares)
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Model Confidence</span>
            </div>
            <div className="text-lg font-extrabold text-slate-900 flex items-baseline gap-1">
              <AnimatedCounter value={predictionData.confidence} decimals={0} suffix="%" />
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
              High Reliability
            </span>
          </div>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-snug">
            Values generated from hybrid simulation model. Connect IBM Qiskit backend for hardware execution.
          </p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => setActiveTab('explainable-ai')}
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
        >
          <span>Why this prediction?</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setActiveTab('what-if')}
          className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-100/80 hover:bg-emerald-200 text-emerald-800 transition-colors"
        >
          Simulate Changes →
        </button>
      </div>
    </div>
  );
}
