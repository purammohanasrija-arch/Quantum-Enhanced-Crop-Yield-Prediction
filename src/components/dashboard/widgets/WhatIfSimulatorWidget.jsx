import React from 'react';
import { motion } from 'framer-motion';
import { Sliders, ArrowDownRight, ArrowUpRight, Play, ArrowRight, RotateCcw } from 'lucide-react';
import { useFarm } from '../../../context/FarmContext';
import AnimatedCounter from '../../common/AnimatedCounter';

export default function WhatIfSimulatorWidget() {
  const { whatIfParams, setWhatIfParams, whatIfResult, setActiveTab, predictionData } = useFarm();

  const resetDeltas = () => {
    setWhatIfParams({
      rainfallDelta: -20,
      tempDelta: 2,
      fertDelta: 10,
      soilMoistureDelta: 0,
      irrigation: true,
    });
  };

  const isNegative = whatIfResult.impactPercentage < 0;

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-800">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">What-If Simulator</h3>
              <p className="text-[10px] text-slate-500">Real-time microclimate adjustment</p>
            </div>
          </div>
          <button
            onClick={resetDeltas}
            title="Reset to default scenario"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dynamic Sliders */}
        <div className="space-y-3 mb-4">
          {/* Rainfall Delta */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-600">Rainfall Variance</span>
              <span className={`font-mono ${whatIfParams.rainfallDelta < 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
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
              className="w-full accent-cyan-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Temperature Delta */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-600">Temperature Shift</span>
              <span className={`font-mono ${whatIfParams.tempDelta > 0 ? 'text-rose-600' : 'text-blue-600'}`}>
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
              className="w-full accent-amber-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Fertilizer Delta */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-600">Fertilizer Application</span>
              <span className="font-mono text-emerald-600">
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
              className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Irrigation Toggle */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-semibold text-slate-700">Irrigation Supply</span>
            <button
              type="button"
              onClick={() => setWhatIfParams({ ...whatIfParams, irrigation: !whatIfParams.irrigation })}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                whatIfParams.irrigation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-rose-100 text-rose-700'
              }`}
            >
              {whatIfParams.irrigation ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Live Simulation Result Display matching Reference Image */}
        <div className="rounded-2xl p-3.5 bg-slate-50 border border-slate-200/90 text-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Simulation Result
          </span>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-baseline justify-center gap-1">
            <AnimatedCounter value={whatIfResult.simulatedYield} decimals={2} />
            <span className="text-xs font-semibold text-slate-500">tons/ha</span>
          </div>

          <div className="mt-2 flex items-center justify-center gap-2">
            <div
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold ${
                isNegative ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {isNegative ? (
                <ArrowDownRight className="w-3.5 h-3.5" />
              ) : (
                <ArrowUpRight className="w-3.5 h-3.5" />
              )}
              <span>Change {whatIfResult.impactPercentage > 0 ? `+${whatIfResult.impactPercentage}%` : `${whatIfResult.impactPercentage}%`}</span>
            </div>

            <span className="text-[10px] text-slate-400 font-medium">
              Base: {predictionData.predictedYield} t/ha
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => setActiveTab('what-if')}
          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Launch Full Simulator Studio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
