import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sliders,
  TrendingDown,
  TrendingUp,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Droplets,
  SunMedium,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from 'recharts';
import { useFarm } from '../../context/FarmContext';
import AnimatedCounter from '../common/AnimatedCounter';

export default function WhatIfSimulatorView() {
  const {
    predictionData,
    whatIfParams,
    setWhatIfParams,
    whatIfResult,
    selectedCrop,
    setActiveTab,
  } = useFarm();

  const isNegative = whatIfResult.impactPercentage < 0;

  // Preset Scenarios
  const applyPreset = (preset) => {
    if (preset === 'drought') {
      setWhatIfParams({
        rainfallDelta: -35,
        tempDelta: 3,
        fertDelta: -5,
        soilMoistureDelta: -25,
        irrigation: false,
      });
    } else if (preset === 'optimal') {
      setWhatIfParams({
        rainfallDelta: 10,
        tempDelta: -1,
        fertDelta: 15,
        soilMoistureDelta: 10,
        irrigation: true,
      });
    } else if (preset === 'heatwave') {
      setWhatIfParams({
        rainfallDelta: -15,
        tempDelta: 5,
        fertDelta: 0,
        soilMoistureDelta: -15,
        irrigation: true,
      });
    } else if (preset === 'reset') {
      setWhatIfParams({
        rainfallDelta: -20,
        tempDelta: 2,
        fertDelta: 10,
        soilMoistureDelta: 0,
        irrigation: true,
      });
    }
  };

  // Comparison Chart Data
  const chartData = [
    {
      factor: 'Baseline Yield',
      current: Number(predictionData.predictedYield.toFixed(2)),
      simulated: Number(predictionData.predictedYield.toFixed(2)),
    },
    {
      factor: 'Simulated Scenario',
      current: Number(predictionData.predictedYield.toFixed(2)),
      simulated: Number(whatIfResult.simulatedYield.toFixed(2)),
    },
  ];

  const factorContributions = [
    { name: 'Rainfall Shift', impact: `${(whatIfParams.rainfallDelta * 0.32).toFixed(1)}%`, val: whatIfParams.rainfallDelta * 0.32 },
    { name: 'Thermal Stress', impact: `${(-whatIfParams.tempDelta * 4.2).toFixed(1)}%`, val: -whatIfParams.tempDelta * 4.2 },
    { name: 'Fertilizer Boost', impact: `${(whatIfParams.fertDelta * 0.18).toFixed(1)}%`, val: whatIfParams.fertDelta * 0.18 },
    { name: 'Irrigation State', impact: whatIfParams.irrigation ? '+3.5%' : '-18.5%', val: whatIfParams.irrigation ? 3.5 : -18.5 },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            What-If Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Evaluate climate shocks, microclimate fluctuations, and input variations in real-time
          </p>
        </div>

        {/* Preset Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => applyPreset('optimal')}
            className="px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold transition-colors"
          >
            🌱 Optimal Precision
          </button>
          <button
            onClick={() => applyPreset('drought')}
            className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-bold transition-colors"
          >
            ☀️ Drought Stress (-35%)
          </button>
          <button
            onClick={() => applyPreset('heatwave')}
            className="px-3 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold transition-colors"
          >
            🔥 Heatwave Surge (+5°C)
          </button>
          <button
            onClick={() => applyPreset('reset')}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top Banner: Scenario KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* CURRENT YIELD */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            CURRENT YIELD
          </span>
          <div className="text-3xl font-black text-slate-800">
            <AnimatedCounter value={whatIfResult.currentYield} decimals={2} />
            <span className="text-sm font-semibold text-slate-500 ml-1.5">tons/ha</span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Baseline crop: {selectedCrop}
          </span>
        </div>

        {/* SIMULATED YIELD */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            SIMULATED YIELD
          </span>
          <div className="text-3xl font-black text-slate-900">
            <AnimatedCounter value={whatIfResult.simulatedYield} decimals={2} />
            <span className="text-sm font-semibold text-slate-500 ml-1.5">tons/ha</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className={`text-xs font-bold ${isNegative ? 'text-rose-600' : 'text-emerald-600'}`}>
              Delta: {whatIfResult.diffYield > 0 ? `+${whatIfResult.diffYield}` : whatIfResult.diffYield} t/ha
            </span>
          </div>
        </div>

        {/* IMPACT */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              ESTIMATED IMPACT
            </span>
            <div className="flex items-center gap-3">
              <div
                className={`text-3xl font-black ${
                  isNegative ? 'text-rose-600' : 'text-emerald-600'
                }`}
              >
                <AnimatedCounter
                  value={whatIfResult.impactPercentage}
                  decimals={1}
                  prefix={whatIfResult.impactPercentage > 0 ? '+' : ''}
                  suffix="%"
                />
              </div>

              <div
                className={`p-2 rounded-xl flex items-center justify-center ${
                  isNegative ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {isNegative ? (
                  <TrendingDown className="w-5 h-5" />
                ) : (
                  <TrendingUp className="w-5 h-5" />
                )}
              </div>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-500">Risk Assessment:</span>
            <span
              className={`font-bold px-2 py-0.5 rounded-md uppercase text-[10px] ${
                whatIfResult.riskLevel === 'HIGH'
                  ? 'bg-rose-100 text-rose-800'
                  : whatIfResult.riskLevel === 'MODERATE'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {whatIfResult.riskLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Main Control Panel and Comparison Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Sliders (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sliders className="w-5 h-5 text-cyan-600" />
              <span>Scenario Adjustment Controls</span>
            </h3>
            <span className="text-[10px] font-semibold text-slate-400">
              Instant Feedback Loop
            </span>
          </div>

          {/* Slider 1: Rainfall */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex justify-between text-xs font-bold text-slate-800 mb-2">
              <span className="flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-cyan-600" />
                Rainfall Variance
              </span>
              <span className={`font-mono text-sm ${whatIfParams.rainfallDelta < 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {whatIfParams.rainfallDelta > 0 ? `+${whatIfParams.rainfallDelta}%` : `${whatIfParams.rainfallDelta}%`}
              </span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              step="5"
              value={whatIfParams.rainfallDelta}
              onChange={(e) => setWhatIfParams({ ...whatIfParams, rainfallDelta: Number(e.target.value) })}
              className="w-full accent-cyan-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>-50% (Drought)</span>
              <span>0% (Norm)</span>
              <span>+50% (Surplus)</span>
            </div>
          </div>

          {/* Slider 2: Temperature */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex justify-between text-xs font-bold text-slate-800 mb-2">
              <span className="flex items-center gap-1.5">
                <SunMedium className="w-4 h-4 text-amber-600" />
                Temperature Shift
              </span>
              <span className={`font-mono text-sm ${whatIfParams.tempDelta > 0 ? 'text-rose-600' : 'text-blue-600'}`}>
                {whatIfParams.tempDelta > 0 ? `+${whatIfParams.tempDelta}°C` : `${whatIfParams.tempDelta}°C`}
              </span>
            </div>
            <input
              type="range"
              min="-5"
              max="6"
              step="1"
              value={whatIfParams.tempDelta}
              onChange={(e) => setWhatIfParams({ ...whatIfParams, tempDelta: Number(e.target.value) })}
              className="w-full accent-amber-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>-5°C (Cooling)</span>
              <span>0°C (Average)</span>
              <span>+6°C (Extreme Heat)</span>
            </div>
          </div>

          {/* Slider 3: Fertilizer */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex justify-between text-xs font-bold text-slate-800 mb-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Fertilizer Dosage Adjustment
              </span>
              <span className="font-mono text-sm text-emerald-600">
                {whatIfParams.fertDelta > 0 ? `+${whatIfParams.fertDelta}%` : `${whatIfParams.fertDelta}%`}
              </span>
            </div>
            <input
              type="range"
              min="-30"
              max="50"
              step="5"
              value={whatIfParams.fertDelta}
              onChange={(e) => setWhatIfParams({ ...whatIfParams, fertDelta: Number(e.target.value) })}
              className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>-30%</span>
              <span>Standard Baseline</span>
              <span>+50%</span>
            </div>
          </div>

          {/* Irrigation Switch */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800 block">
                Irrigation Pipeline State
              </span>
              <span className="text-[11px] text-slate-500">
                {whatIfParams.irrigation ? 'Automated drip and canal active' : 'Supply shut down (rain-fed only)'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setWhatIfParams({ ...whatIfParams, irrigation: !whatIfParams.irrigation })}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                whatIfParams.irrigation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-rose-100 text-rose-700'
              }`}
            >
              {whatIfParams.irrigation ? 'ON (Active)' : 'OFF (Paused)'}
            </button>
          </div>
        </div>

        {/* Right: Scenario Comparison Chart & Decomposition (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Chart Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Current Scenario vs What-If Scenario
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Direct comparison of expected harvest yield density
            </p>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="factor" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 6]} tickLine={false} axisLine={false} />
                  <Tooltip
                    formatter={(value) => [`${value} t/ha`, 'Yield']}
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                  />
                  <Legend />
                  <Bar dataKey="current" name="Baseline (4.52 t/ha)" fill="#94a3b8" radius={[8, 8, 0, 0]} />
                  <Bar
                    dataKey="simulated"
                    name="Simulated Scenario"
                    fill={isNegative ? '#f43f5e' : '#10b981'}
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Factor Decomposition */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base mb-3">
              Factor Impact Breakdown
            </h3>
            <div className="space-y-2.5">
              {factorContributions.map((fc) => (
                <div
                  key={fc.name}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-slate-700">{fc.name}</span>
                  <span
                    className={`font-mono font-bold ${
                      fc.val < 0 ? 'text-rose-600' : fc.val > 0 ? 'text-emerald-600' : 'text-slate-600'
                    }`}
                  >
                    {fc.impact}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Want to mitigate these risks?
              </span>
              <button
                onClick={() => setActiveTab('recommendations')}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                <span>View Smart Recommendations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
