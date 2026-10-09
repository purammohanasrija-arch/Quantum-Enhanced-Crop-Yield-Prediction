import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Atom, Radio } from 'lucide-react';
import KPICards from './KPICards';
import DatasetUploadCard from './widgets/DatasetUploadCard';
import QuickPredictCard from './widgets/QuickPredictCard';
import PredictionResultCard from './widgets/PredictionResultCard';
import DatasetPreviewTable from './widgets/DatasetPreviewTable';
import FarmHealthWidget from './widgets/FarmHealthWidget';
import WhatIfSimulatorWidget from './widgets/WhatIfSimulatorWidget';
import RiskAnalysisWidget from './widgets/RiskAnalysisWidget';
import YieldForecastChart from './widgets/YieldForecastChart';
import ModelComparisonWidget from './widgets/ModelComparisonWidget';
import SmartRecommendationsWidget from './widgets/SmartRecommendationsWidget';
import { useFarm } from '../../context/FarmContext';

export default function DashboardOverview() {
  const { setActiveTab } = useFarm();

  return (
    <div className="space-y-6">
      {/* Overview Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Dashboard
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
              Real-Time Twin
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Your Farm at a Glance — Integrated Quantum-AI Decision Command Center
          </p>
        </div>

        {/* Quick Action Badges */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('digital-twin')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-all"
          >
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Digital Farm Twin</span>
          </button>

          <button
            onClick={() => setActiveTab('quantum-lab')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-xs font-semibold shadow-xs transition-all"
          >
            <Atom className="w-3.5 h-3.5" />
            <span>Quantum Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5 Top KPI Cards */}
      <KPICards />

      {/* Grid Row 1: Upload + Crop Prediction + Result Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <DatasetUploadCard />
        <QuickPredictCard />
        <PredictionResultCard />
      </div>

      {/* Grid Row 2: Dataset Preview + Farm Health Score + What-If Simulator */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <DatasetPreviewTable />
        <FarmHealthWidget />
        <WhatIfSimulatorWidget />
      </div>

      {/* Grid Row 3: Risk Analysis + Growth Stages Yield Forecast + Quantum vs Classical */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <RiskAnalysisWidget />
        <YieldForecastChart />
        <ModelComparisonWidget />
      </div>

      {/* Grid Row 4: Smart Recommendations & Quick Quantum Callout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <SmartRecommendationsWidget />
        </div>

        {/* Quick Callout to Digital Twin & Quantum */}
        <div className="rounded-3xl p-6 bg-gradient-to-br from-emerald-900 to-[#082a17] text-white flex flex-col justify-between border border-emerald-700/50 relative overflow-hidden shadow-sm">
          <div className="absolute right-0 top-0 opacity-15 pointer-events-none translate-x-4 -translate-y-4">
            <Atom className="w-40 h-40 text-cyan-400" />
          </div>

          <div className="relative z-10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-bold px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800">
              Qiskit VQR Acceleration
            </span>
            <h3 className="text-xl font-extrabold text-white mt-3 mb-2">
              Ready for Hardware Execution
            </h3>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              Explore how agricultural multi-variate features map into parameterized Bloch-sphere
              state rotations on IBM Quantum hardware.
            </p>
          </div>

          <div className="mt-6 relative z-10 space-y-2">
            <button
              onClick={() => setActiveTab('quantum-lab')}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Atom className="w-4 h-4" />
              <span>Launch Quantum Lab & Circuit</span>
            </button>
            <button
              onClick={() => setActiveTab('digital-twin')}
              className="w-full py-2 px-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Radio className="w-3.5 h-3.5 text-cyan-300" />
              <span>Inspect 2.5D Digital Farm Twin</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
