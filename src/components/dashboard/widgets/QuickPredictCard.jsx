import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Sparkles, SlidersHorizontal, Check, RefreshCw } from 'lucide-react';
import { useFarm } from '../../../context/FarmContext';
import { DEFAULT_CROPS } from '../../../data/mockData';

export default function QuickPredictCard() {
  const {
    farmInputs,
    setFarmInputs,
    selectedCrop,
    setSelectedCrop,
    triggerPrediction,
    predictionData,
  } = useFarm();

  const [loading, setLoading] = useState(false);

  const handleCropChange = (cropName) => {
    setSelectedCrop(cropName);
    const cropObj = DEFAULT_CROPS.find((c) => c.name === cropName);
    if (cropObj) {
      setFarmInputs((prev) => ({
        ...prev,
        crop: cropName,
        temp: cropObj.optimalTemp,
        rainfall: cropObj.optimalRain,
        soilMoisture: cropObj.optimalMoisture,
      }));
    }
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    await triggerPrediction(farmInputs);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
            <Sprout className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Crop Prediction</h3>
        </div>
        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
          Live Input Form
        </span>
      </div>

      <form onSubmit={handlePredict} className="space-y-3">
        {/* Crop Selector */}
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-slate-700">Select Crop</label>
          <select
            value={selectedCrop}
            onChange={(e) => handleCropChange(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            {DEFAULT_CROPS.map((c) => (
              <option key={c.id} value={c.name}>
                {c.icon} {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Inputs List (Compact & Clean) */}
        <div className="space-y-2.5 max-h-68 overflow-y-auto pr-1">
          {/* Temperature */}
          <div>
            <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
              <span>Temperature (°C)</span>
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
            <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
              <span>Rainfall (mm)</span>
              <span className="font-bold text-slate-900 font-mono">{farmInputs.rainfall} mm</span>
            </div>
            <input
              type="range"
              min="200"
              max="2500"
              step="50"
              value={farmInputs.rainfall}
              onChange={(e) => setFarmInputs({ ...farmInputs, rainfall: Number(e.target.value) })}
              className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Humidity */}
          <div>
            <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
              <span>Humidity (%)</span>
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
            <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
              <span>Soil Moisture (%)</span>
              <span className="font-bold text-slate-900 font-mono">{farmInputs.soilMoisture}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="90"
              value={farmInputs.soilMoisture}
              onChange={(e) => setFarmInputs({ ...farmInputs, soilMoisture: Number(e.target.value) })}
              className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Nitrogen */}
          <div>
            <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
              <span>Nitrogen (kg/ha)</span>
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

          {/* Phosphorus */}
          <div>
            <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
              <span>Phosphorus (kg/ha)</span>
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

          {/* Irrigation Toggle & Growth Stage */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="font-semibold text-slate-700 block mb-1">Irrigation</span>
              <button
                type="button"
                onClick={() => setFarmInputs({ ...farmInputs, irrigation: !farmInputs.irrigation })}
                className={`w-full py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  farmInputs.irrigation
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                <span>{farmInputs.irrigation ? 'Active (ON)' : 'Disabled (OFF)'}</span>
              </button>
            </div>

            <div>
              <span className="font-semibold text-slate-700 block mb-1">Growth Stage</span>
              <select
                value={farmInputs.growthStage}
                onChange={(e) => setFarmInputs({ ...farmInputs, growthStage: e.target.value })}
                className="w-full py-1.5 px-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800"
              >
                <option value="Sowing">Sowing</option>
                <option value="Vegetative">Vegetative</option>
                <option value="Flowering">Flowering</option>
                <option value="Grain Filling">Grain Filling</option>
                <option value="Harvest">Harvest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Predict Yield CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full mt-3 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Simulating Quantum Tensor...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Predict Yield</span>
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}
