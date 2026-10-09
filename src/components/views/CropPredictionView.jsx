import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sprout,
  Sparkles,
  Scale,
  ShieldCheck,
  TrendingUp,
  SlidersHorizontal,
  Info,
  Calendar,
  Layers,
  ArrowRight,
  RefreshCw,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';
import { DEFAULT_CROPS } from '../../data/mockData';
import AnimatedCounter from '../common/AnimatedCounter';

export default function CropPredictionView() {
  const {
    farmInputs,
    setFarmInputs,
    selectedCrop,
    setSelectedCrop,
    farmArea,
    setFarmArea,
    growthStage,
    setGrowthStage,
    predictionData,
    triggerPrediction,
    setActiveTab,
  } = useFarm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCropSelect = (crop) => {
    setSelectedCrop(crop.name);
    setFarmInputs((prev) => ({
      ...prev,
      crop: crop.name,
      temp: crop.optimalTemp,
      rainfall: crop.optimalRain,
      soilMoisture: crop.optimalMoisture,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await triggerPrediction({
      ...farmInputs,
      farmArea,
      growthStage,
    });
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Crop Yield Prediction
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Predict field output using precision agronomic variables and Quantum Variational Regression
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('what-if')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-all"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Open What-If Simulator</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Form on Left, Output & Diagnostics on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: 7 cols */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-600" />
              <span>Input Agronomic & Soil Parameters</span>
            </h3>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
              Full Feature Vector
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Crop Selector Badges */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2 uppercase tracking-wider">
                Select Crop Variety
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {DEFAULT_CROPS.map((crop) => (
                  <button
                    key={crop.id}
                    type="button"
                    onClick={() => handleCropSelect(crop)}
                    className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      selectedCrop === crop.name
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold shadow-xs ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-700'
                    }`}
                  >
                    <span className="text-xl">{crop.icon}</span>
                    <span className="text-xs">{crop.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Farm Area & Growth Stage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Farm Area (Hectares)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="500"
                    value={farmArea}
                    onChange={(e) => setFarmArea(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                  <span className="text-xs text-slate-500 font-semibold shrink-0">Hectares</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Crop Growth Stage
                </label>
                <select
                  value={growthStage}
                  onChange={(e) => {
                    setGrowthStage(e.target.value);
                    setFarmInputs({ ...farmInputs, growthStage: e.target.value });
                  }}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="Sowing">Sowing</option>
                  <option value="Vegetative">Vegetative</option>
                  <option value="Flowering">Flowering</option>
                  <option value="Grain Filling">Grain Filling</option>
                  <option value="Harvest">Harvest</option>
                </select>
              </div>
            </div>

            {/* Weather & Soil Sliders */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Environmental & Soil Dynamics
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Temperature */}
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-600">Temperature</span>
                    <span className="font-bold text-slate-900 font-mono">{farmInputs.temp}°C</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="45"
                    value={farmInputs.temp}
                    onChange={(e) => setFarmInputs({ ...farmInputs, temp: Number(e.target.value) })}
                    className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Rainfall */}
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-600">Rainfall</span>
                    <span className="font-bold text-slate-900 font-mono">{farmInputs.rainfall} mm</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="2500"
                    step="25"
                    value={farmInputs.rainfall}
                    onChange={(e) => setFarmInputs({ ...farmInputs, rainfall: Number(e.target.value) })}
                    className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Humidity */}
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-600">Humidity</span>
                    <span className="font-bold text-slate-900 font-mono">{farmInputs.humidity}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="95"
                    value={farmInputs.humidity}
                    onChange={(e) => setFarmInputs({ ...farmInputs, humidity: Number(e.target.value) })}
                    className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Soil Moisture */}
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-600">Soil Moisture</span>
                    <span className="font-bold text-slate-900 font-mono">{farmInputs.soilMoisture}%</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="90"
                    value={farmInputs.soilMoisture}
                    onChange={(e) => setFarmInputs({ ...farmInputs, soilMoisture: Number(e.target.value) })}
                    className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Nutrients & Fertilizer */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Nutrients & Fertility (NPK)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-600">Nitrogen (N)</span>
                    <span className="font-bold text-slate-900 font-mono">{farmInputs.nitrogen} kg/ha</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="160"
                    value={farmInputs.nitrogen}
                    onChange={(e) => setFarmInputs({ ...farmInputs, nitrogen: Number(e.target.value) })}
                    className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-600">Phosphorus (P)</span>
                    <span className="font-bold text-slate-900 font-mono">{farmInputs.phosphorus} kg/ha</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={farmInputs.phosphorus}
                    onChange={(e) => setFarmInputs({ ...farmInputs, phosphorus: Number(e.target.value) })}
                    className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-600">Potassium (K)</span>
                    <span className="font-bold text-slate-900 font-mono">{farmInputs.potassium} kg/ha</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="180"
                    value={farmInputs.potassium}
                    onChange={(e) => setFarmInputs({ ...farmInputs, potassium: Number(e.target.value) })}
                    className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Fertilizer & Irrigation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-600">Fertilizer Usage</span>
                    <span className="font-bold text-slate-900 font-mono">{farmInputs.fertilizer} kg/ha</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="220"
                    value={farmInputs.fertilizer}
                    onChange={(e) => setFarmInputs({ ...farmInputs, fertilizer: Number(e.target.value) })}
                    className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-xs font-bold text-slate-700">Irrigation Supply</span>
                  <button
                    type="button"
                    onClick={() => setFarmInputs({ ...farmInputs, irrigation: !farmInputs.irrigation })}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      farmInputs.irrigation
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {farmInputs.irrigation ? 'Active (ON)' : 'Disabled (OFF)'}
                  </button>
                </div>
              </div>
            </div>

            {/* Predict Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-sm shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Calculating Hilbert State Projection...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-emerald-200" />
                  <span>Predict Yield</span>
                </>
              )}
            </motion.button>
          </form>
        </div>

        {/* Right Output Card: 5 cols */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Result Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Predicted Yield
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full">
                {selectedCrop} Variety
              </span>
            </div>

            {/* Big Yield Display */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 text-white text-center shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-xs text-emerald-200 font-semibold uppercase tracking-wider block">
                  Expected Harvest Density
                </span>
                <div className="text-5xl font-black tracking-tight my-2">
                  <AnimatedCounter value={predictionData.predictedYield} decimals={2} />
                  <span className="text-lg font-medium text-emerald-200 ml-2">tons / hectare</span>
                </div>

                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-400/30 text-xs font-bold text-emerald-200">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{predictionData.previousSeasonDiff || '+8.2%'}</span>
                  <span className="text-emerald-300/80 font-normal">(from previous season)</span>
                </div>
              </div>
            </div>

            {/* Secondary KPIs */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-1">
                  <Scale className="w-4 h-4 text-emerald-600" />
                  <span>Total Production</span>
                </div>
                <div className="text-2xl font-black text-slate-900">
                  <AnimatedCounter value={predictionData.totalProduction} decimals={2} />
                  <span className="text-xs text-slate-500 font-semibold ml-1">tons</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Area: {farmArea} hectares
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-1">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Model Confidence</span>
                </div>
                <div className="text-2xl font-black text-slate-900">
                  <AnimatedCounter value={predictionData.confidence} decimals={0} suffix="%" />
                </div>
                <span className="text-[10px] text-emerald-600 font-bold block mt-1">
                  Optimized Convergence
                </span>
              </div>
            </div>

            {/* IBM Qiskit Engine Status & Quantum Refinement */}
            <div className="mt-4 p-3.5 rounded-2xl bg-cyan-50/80 border border-cyan-200/80 text-cyan-950 text-xs flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>IBM Qiskit 2.5 Live:</strong> Executed via Hybrid Quantum-Classical Pipeline (Random Forest + Qiskit StatevectorEstimator VQR). Non-linear phase rotations φ ∈ [0, π] evaluated across 4 qubits.
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setActiveTab('explainable-ai')}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                <span>Explain this prediction</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTab('what-if')}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors"
              >
                What-If Simulator →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
