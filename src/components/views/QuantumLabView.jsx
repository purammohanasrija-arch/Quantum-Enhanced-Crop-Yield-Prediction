import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CloudRain,
  Thermometer,
  Sprout,
  Wheat,
  Droplets,
  Pencil,
  Info,
  CheckCircle2,
  Sliders,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronRight,
  TrendingDown,
  BarChart3,
  Cpu,
  Maximize2,
  Minimize2
} from 'lucide-react';

export default function QuantumLabView() {
  // 1. Input Features State (Default matching the image exactly)
  const defaultFeatures = {
    rainfall: 850,
    temp: 28,
    soilPh: 6.5,
    nitrogen: 80,
    soilMoisture: 35
  };

  const [features, setFeatures] = useState(defaultFeatures);
  const [isEditing, setIsEditing] = useState(false);
  const [circuitView, setCircuitView] = useState('diagram'); // 'diagram' | 'blocks'
  const [isCircuitExpanded, setIsCircuitExpanded] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [hoveredIteration, setHoveredIteration] = useState(null);

  // Check if modified from example defaults
  const isModified = useMemo(() => {
    return (
      features.rainfall !== defaultFeatures.rainfall ||
      features.temp !== defaultFeatures.temp ||
      features.soilPh !== defaultFeatures.soilPh ||
      features.nitrogen !== defaultFeatures.nitrogen ||
      features.soilMoisture !== defaultFeatures.soilMoisture
    );
  }, [features]);

  // Reset to exact example values
  const handleReset = () => {
    setFeatures(defaultFeatures);
  };

  // 2. Dynamic Quantum Yield & Scaled Output calculation
  // Calibrated so that default features yield exact image values:
  // Model Output (scaled): 0.63
  // Predicted Yield: 4.12 tonnes/ha
  const { scaledOutput, predictedYield } = useMemo(() => {
    const rainNorm = (features.rainfall - 850) / 1000;
    const tempNorm = (features.temp - 28) / 25;
    const phNorm = 1 - Math.abs(features.soilPh - 6.5) / 3;
    const nNorm = (features.nitrogen - 80) / 120;
    const moistNorm = (features.soilMoisture - 35) / 60;

    // Quantum phase expectation approximation
    let rawScore = 0.63 + rainNorm * 0.12 - tempNorm * 0.08 + (phNorm - 1) * 0.05 + nNorm * 0.09 + moistNorm * 0.07;
    rawScore = Math.max(0.15, Math.min(0.95, rawScore));

    const scaled = Number(rawScore.toFixed(2));
    // Yield in tonnes/ha: 0.63 -> 4.12
    const yieldTonnes = Number((scaled * (4.12 / 0.63)).toFixed(2));

    return {
      scaledOutput: scaled.toFixed(2),
      predictedYield: yieldTonnes.toFixed(2)
    };
  }, [features]);

  // 3. Training Progress Logarithmic Dataset (Converging to 0.0031 at 100 iterations)
  const trainingData = [
    { iter: 0, loss: 6.8 },
    { iter: 5, loss: 3.1 },
    { iter: 10, loss: 1.35 },
    { iter: 15, loss: 0.62 },
    { iter: 20, loss: 0.31 },
    { iter: 25, loss: 0.18 },
    { iter: 30, loss: 0.095 },
    { iter: 35, loss: 0.058 },
    { iter: 40, loss: 0.034 },
    { iter: 45, loss: 0.022 },
    { iter: 50, loss: 0.015 },
    { iter: 55, loss: 0.011 },
    { iter: 60, loss: 0.0084 },
    { iter: 65, loss: 0.0065 },
    { iter: 70, loss: 0.0052 },
    { iter: 75, loss: 0.0044 },
    { iter: 80, loss: 0.0038 },
    { iter: 85, loss: 0.0034 },
    { iter: 90, loss: 0.0032 },
    { iter: 95, loss: 0.00315 },
    { iter: 100, loss: 0.0031 }
  ];

  // SVG dimensions for Training Progress semi-log chart
  const chartW = 340;
  const chartH = 175;
  const paddingL = 48;
  const paddingB = 30;
  const plotW = chartW - paddingL - 10;
  const plotH = chartH - 20 - paddingB;

  const getYCoord = (loss) => {
    const logVal = Math.log10(loss);
    const normalized = (1.0 - logVal) / 4.0;
    return 15 + normalized * plotH;
  };

  const getXCoord = (iter) => {
    return paddingL + (iter / 100) * plotW;
  };

  const points = trainingData.map((d) => ({
    x: getXCoord(d.iter),
    y: getYCoord(d.loss),
    ...d
  }));

  const pathD = points.reduce((acc, curr, idx) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    const prev = points[idx - 1];
    const cpX = (prev.x + curr.x) / 2;
    return `${acc} C ${cpX} ${prev.y}, ${cpX} ${curr.y}, ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${15 + plotH} L ${points[0].x} ${15 + plotH} Z`;

  return (
    <div className="w-full text-slate-100 min-h-screen py-2 px-1 sm:px-2 space-y-5">
      {/* Scoped CSS for glowing range sliders */}
      <style>{`
        .quantum-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 9999px;
          outline: none;
          background: #1e293b;
          cursor: pointer;
        }
        .quantum-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .quantum-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .quantum-slider-teal::-webkit-slider-thumb {
          background: #2dd4bf;
          box-shadow: 0 0 10px #2dd4bf, 0 0 4px #14b8a6;
        }
        .quantum-slider-orange::-webkit-slider-thumb {
          background: #fb923c;
          box-shadow: 0 0 10px #fb923c, 0 0 4px #ea580c;
        }
        .quantum-slider-blue::-webkit-slider-thumb {
          background: #38bdf8;
          box-shadow: 0 0 10px #38bdf8, 0 0 4px #0284c7;
        }
        .quantum-slider-purple::-webkit-slider-thumb {
          background: #c084fc;
          box-shadow: 0 0 10px #c084fc, 0 0 4px #9333ea;
        }
        .quantum-slider-cyan::-webkit-slider-thumb {
          background: #22d3ee;
          box-shadow: 0 0 10px #22d3ee, 0 0 4px #0891b2;
        }
      `}</style>

      {/* TOP ROW: Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* CARD 1: Input Features (Example) */}
        <div
          className={`${
            isCircuitExpanded ? 'lg:col-span-6 xl:col-span-6' : 'lg:col-span-3 xl:col-span-3'
          } bg-[#0d1629] border border-slate-700/60 rounded-2xl p-4.5 sm:p-5 flex flex-col justify-between shadow-xl shadow-slate-950/40 transition-all`}
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5">
              <div className="flex items-baseline gap-1.5 sm:gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">Input Features</h2>
                <span className="text-[11px] sm:text-xs text-slate-400 font-normal">(Example)</span>
              </div>
              <button
                onClick={() => (isModified ? handleReset() : setIsEditing(!isEditing))}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  isModified
                    ? 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/50 shadow-xs shadow-cyan-500/20'
                    : 'border-slate-700/80 bg-slate-800/40 text-slate-300 hover:bg-slate-700/50'
                }`}
                title={isModified ? 'Click to reset to example values' : 'Toggle edit mode'}
              >
                {isModified ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Reset</span>
                  </>
                ) : (
                  <>
                    <Pencil className="w-3.5 h-3.5 text-slate-300" />
                    <span>Edit</span>
                  </>
                )}
              </button>
            </div>

            {/* Sliders List */}
            <div className="space-y-3.5 pt-0.5">
              {/* Feature 1: Rainfall */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-800/70 border border-slate-700/60 flex items-center justify-center text-cyan-400 shrink-0">
                      <CloudRain className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-slate-300 font-medium text-xs sm:text-sm">Rainfall (mm)</span>
                  </div>
                  <div className="bg-[#080e1b] border border-slate-800 rounded-lg px-2 py-0.5 text-slate-100 font-mono text-xs font-semibold min-w-[46px] text-center">
                    {features.rainfall}
                  </div>
                </div>
                <div className="pl-9 pr-1">
                  <input
                    type="range"
                    min="300"
                    max="1500"
                    step="10"
                    value={features.rainfall}
                    onChange={(e) => setFeatures({ ...features, rainfall: Number(e.target.value) })}
                    className="quantum-slider quantum-slider-teal w-full"
                    style={{
                      background: `linear-gradient(to right, #10b981 0%, #2dd4bf ${
                        ((features.rainfall - 300) / (1500 - 300)) * 100
                      }%, #1e293b ${((features.rainfall - 300) / (1500 - 300)) * 100}%, #1e293b 100%)`
                    }}
                  />
                </div>
              </div>

              {/* Feature 2: Temperature */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-800/70 border border-slate-700/60 flex items-center justify-center text-orange-400 shrink-0">
                      <Thermometer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-slate-300 font-medium text-xs sm:text-sm">Temperature (°C)</span>
                  </div>
                  <div className="bg-[#080e1b] border border-slate-800 rounded-lg px-2 py-0.5 text-slate-100 font-mono text-xs font-semibold min-w-[46px] text-center">
                    {features.temp}
                  </div>
                </div>
                <div className="pl-9 pr-1">
                  <input
                    type="range"
                    min="10"
                    max="45"
                    step="1"
                    value={features.temp}
                    onChange={(e) => setFeatures({ ...features, temp: Number(e.target.value) })}
                    className="quantum-slider quantum-slider-orange w-full"
                    style={{
                      background: `linear-gradient(to right, #ea580c 0%, #fb923c ${
                        ((features.temp - 10) / (45 - 10)) * 100
                      }%, #1e293b ${((features.temp - 10) / (45 - 10)) * 100}%, #1e293b 100%)`
                    }}
                  />
                </div>
              </div>

              {/* Feature 3: Soil pH */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-800/70 border border-slate-700/60 flex items-center justify-center text-emerald-400 shrink-0">
                      <Sprout className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-slate-300 font-medium text-xs sm:text-sm">Soil pH</span>
                  </div>
                  <div className="bg-[#080e1b] border border-slate-800 rounded-lg px-2 py-0.5 text-slate-100 font-mono text-xs font-semibold min-w-[46px] text-center">
                    {features.soilPh}
                  </div>
                </div>
                <div className="pl-9 pr-1">
                  <input
                    type="range"
                    min="4.0"
                    max="9.0"
                    step="0.1"
                    value={features.soilPh}
                    onChange={(e) => setFeatures({ ...features, soilPh: Number(e.target.value) })}
                    className="quantum-slider quantum-slider-blue w-full"
                    style={{
                      background: `linear-gradient(to right, #0284c7 0%, #38bdf8 ${
                        ((features.soilPh - 4.0) / (9.0 - 4.0)) * 100
                      }%, #1e293b ${((features.soilPh - 4.0) / (9.0 - 4.0)) * 100}%, #1e293b 100%)`
                    }}
                  />
                </div>
              </div>

              {/* Feature 4: Nitrogen */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-800/70 border border-slate-700/60 flex items-center justify-center text-amber-400 shrink-0">
                      <Wheat className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-slate-300 font-medium text-xs sm:text-sm">Nitrogen (kg/ha)</span>
                  </div>
                  <div className="bg-[#080e1b] border border-slate-800 rounded-lg px-2 py-0.5 text-slate-100 font-mono text-xs font-semibold min-w-[46px] text-center">
                    {features.nitrogen}
                  </div>
                </div>
                <div className="pl-9 pr-1">
                  <input
                    type="range"
                    min="20"
                    max="160"
                    step="1"
                    value={features.nitrogen}
                    onChange={(e) => setFeatures({ ...features, nitrogen: Number(e.target.value) })}
                    className="quantum-slider quantum-slider-purple w-full"
                    style={{
                      background: `linear-gradient(to right, #9333ea 0%, #c084fc ${
                        ((features.nitrogen - 20) / (160 - 20)) * 100
                      }%, #1e293b ${((features.nitrogen - 20) / (160 - 20)) * 100}%, #1e293b 100%)`
                    }}
                  />
                </div>
              </div>

              {/* Feature 5: Soil Moisture */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-800/70 border border-slate-700/60 flex items-center justify-center text-cyan-400 shrink-0">
                      <Droplets className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-slate-300 font-medium text-xs sm:text-sm">Soil Moisture (%)</span>
                  </div>
                  <div className="bg-[#080e1b] border border-slate-800 rounded-lg px-2 py-0.5 text-slate-100 font-mono text-xs font-semibold min-w-[46px] text-center">
                    {features.soilMoisture}
                  </div>
                </div>
                <div className="pl-9 pr-1">
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="1"
                    value={features.soilMoisture}
                    onChange={(e) => setFeatures({ ...features, soilMoisture: Number(e.target.value) })}
                    className="quantum-slider quantum-slider-cyan w-full"
                    style={{
                      background: `linear-gradient(to right, #0891b2 0%, #22d3ee ${
                        ((features.soilMoisture - 10) / (90 - 10)) * 100
                      }%, #1e293b ${((features.soilMoisture - 10) / (90 - 10)) * 100}%, #1e293b 100%)`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: Quantum Circuit (Simplified View) - NOW SIGNIFICANTLY BIGGER */}
        <div
          className={`${
            isCircuitExpanded ? 'col-span-12' : 'lg:col-span-6 xl:col-span-6'
          } bg-[#0d1629] border border-slate-700/60 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xl shadow-slate-950/50 transition-all`}
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Quantum Circuit</h2>
                <span className="text-xs sm:text-sm text-slate-400 font-normal">(Simplified View)</span>
                <button
                  onClick={() => setShowInfoModal(!showInfoModal)}
                  className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer p-0.5"
                  title="Quantum Circuit Information"
                >
                  <Info className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </button>
              </div>

              {/* Controls: Diagram/Blocks Toggle & Expand/Enlarge Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCircuitExpanded(!isCircuitExpanded)}
                  className="hidden sm:flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
                  title={isCircuitExpanded ? 'Shrink to standard size' : 'Enlarge quantum circuit'}
                >
                  {isCircuitExpanded ? (
                    <>
                      <Minimize2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Standard</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Enlarge</span>
                    </>
                  )}
                </button>

                {/* Diagram / Blocks Segmented Pill */}
                <div className="bg-[#080e1c] border border-slate-800 p-1 rounded-full flex items-center">
                  <button
                    onClick={() => setCircuitView('diagram')}
                    className={`text-xs px-3.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
                      circuitView === 'diagram'
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-purple-600/30 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Diagram
                  </button>
                  <button
                    onClick={() => setCircuitView('blocks')}
                    className={`text-xs px-3.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
                      circuitView === 'blocks'
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-purple-600/30 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Blocks
                  </button>
                </div>
              </div>
            </div>

            {/* Circuit Content: DIAGRAM or BLOCKS */}
            {circuitView === 'diagram' ? (
              <div className="relative pt-3 pb-2 w-full flex items-center justify-center">
                {/* BIG EXPANSIVE SVG CIRCUIT CANVAS */}
                <svg
                  viewBox="0 0 660 250"
                  className="w-full h-auto select-none min-h-[260px] sm:min-h-[290px]"
                >
                  {/* Top Sub-headers */}
                  <text x="320" y="18" fill="#ffffff" fontSize="13" fontWeight="700" textAnchor="middle">
                    Trainable Quantum Circuit
                  </text>
                  <text x="320" y="32" fill="#94a3b8" fontSize="10.5" fontWeight="500" textAnchor="middle">
                    (Learns patterns)
                  </text>

                  <text x="566" y="18" fill="#ffffff" fontSize="13" fontWeight="700" textAnchor="middle">
                    Measure
                  </text>
                  <text x="566" y="32" fill="#94a3b8" fontSize="10.5" fontWeight="500" textAnchor="middle">
                    (Get values)
                  </text>

                  {/* Horizontal Wire Lines for q0, q1, q2 */}
                  {/* q0 wire */}
                  <line x1="46" y1="70" x2="614" y2="70" stroke="#475569" strokeWidth="2" />
                  {/* q1 wire */}
                  <line x1="46" y1="130" x2="614" y2="130" stroke="#475569" strokeWidth="2" />
                  {/* q2 wire */}
                  <line x1="46" y1="190" x2="614" y2="190" stroke="#475569" strokeWidth="2" />

                  {/* Qubit Labels */}
                  <text x="18" y="75" fill="#f8fafc" fontSize="15" fontWeight="bold" fontFamily="sans-serif">
                    q0
                  </text>
                  <text x="18" y="135" fill="#f8fafc" fontSize="15" fontWeight="bold" fontFamily="sans-serif">
                    q1
                  </text>
                  <text x="18" y="195" fill="#f8fafc" fontSize="15" fontWeight="bold" fontFamily="sans-serif">
                    q2
                  </text>

                  {/* Feature Encoding Gates (Mint/Green rounded rectangles) */}
                  {/* q0 Encode x0 */}
                  <g>
                    <rect x="52" y="50" width="60" height="40" rx="8" fill="#2dd4bf" />
                    <text x="82" y="65" fill="#042f2e" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                      Encode
                    </text>
                    <text x="82" y="80" fill="#042f2e" fontSize="11.5" fontWeight="bold" textAnchor="middle">
                      x0
                    </text>
                  </g>

                  {/* q1 Encode x1 */}
                  <g>
                    <rect x="52" y="110" width="60" height="40" rx="8" fill="#2dd4bf" />
                    <text x="82" y="125" fill="#042f2e" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                      Encode
                    </text>
                    <text x="82" y="140" fill="#042f2e" fontSize="11.5" fontWeight="bold" textAnchor="middle">
                      x1
                    </text>
                  </g>

                  {/* q2 Encode x2 */}
                  <g>
                    <rect x="52" y="170" width="60" height="40" rx="8" fill="#2dd4bf" />
                    <text x="82" y="185" fill="#042f2e" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                      Encode
                    </text>
                    <text x="82" y="200" fill="#042f2e" fontSize="11.5" fontWeight="bold" textAnchor="middle">
                      x2
                    </text>
                  </g>

                  {/* Trainable Quantum Circuit Dotted Border */}
                  <rect
                    x="136"
                    y="36"
                    width="368"
                    height="188"
                    rx="16"
                    fill="rgba(126, 34, 206, 0.08)"
                    stroke="#a855f7"
                    strokeWidth="1.8"
                    strokeDasharray="5 5"
                  />

                  {/* TRAINABLE GATES INSIDE PURPLE CONTAINER */}
                  {/* Column 1: Ry Gates */}
                  {/* q0 Ry(θ1) */}
                  <g>
                    <rect x="154" y="50" width="64" height="40" rx="8" fill="#8b5cf6" />
                    <text x="186" y="75" fill="#ffffff" fontSize="12.5" fontWeight="bold" textAnchor="middle">
                      Ry(θ1)
                    </text>
                  </g>
                  {/* q1 Ry(θ2) */}
                  <g>
                    <rect x="154" y="110" width="64" height="40" rx="8" fill="#8b5cf6" />
                    <text x="186" y="135" fill="#ffffff" fontSize="12.5" fontWeight="bold" textAnchor="middle">
                      Ry(θ2)
                    </text>
                  </g>
                  {/* q2 Ry(θ3) */}
                  <g>
                    <rect x="154" y="170" width="64" height="40" rx="8" fill="#8b5cf6" />
                    <text x="186" y="195" fill="#ffffff" fontSize="12.5" fontWeight="bold" textAnchor="middle">
                      Ry(θ3)
                    </text>
                  </g>

                  {/* CNOT 1: q0 control -> q1 target */}
                  <g>
                    {/* Control point on q0 */}
                    <circle cx="246" cy="70" r="5.5" fill="#38bdf8" />
                    {/* Connecting vertical line down to q1 */}
                    <line x1="246" y1="70" x2="246" y2="130" stroke="#38bdf8" strokeWidth="2.2" />
                    {/* Target ⊕ on q1 */}
                    <circle cx="246" cy="130" r="11" fill="#0d1629" stroke="#38bdf8" strokeWidth="2.2" />
                    <line x1="239" y1="130" x2="253" y2="130" stroke="#38bdf8" strokeWidth="2.2" />
                    <line x1="246" y1="123" x2="246" y2="137" stroke="#38bdf8" strokeWidth="2.2" />
                  </g>

                  {/* Column 2: Rz Gates */}
                  {/* q0 Rz(θ4) */}
                  <g>
                    <rect x="278" y="50" width="64" height="40" rx="8" fill="#ec4899" />
                    <text x="310" y="75" fill="#ffffff" fontSize="12.5" fontWeight="bold" textAnchor="middle">
                      Rz(θ4)
                    </text>
                  </g>
                  {/* q1 Rz(θ5) */}
                  <g>
                    <rect x="278" y="110" width="64" height="40" rx="8" fill="#ec4899" />
                    <text x="310" y="135" fill="#ffffff" fontSize="12.5" fontWeight="bold" textAnchor="middle">
                      Rz(θ5)
                    </text>
                  </g>
                  {/* q2 Rz(θ6) */}
                  <g>
                    <rect x="278" y="170" width="64" height="40" rx="8" fill="#ec4899" />
                    <text x="310" y="195" fill="#ffffff" fontSize="12.5" fontWeight="bold" textAnchor="middle">
                      Rz(θ6)
                    </text>
                  </g>

                  {/* CNOT 2: q0 control -> q2 target */}
                  <g>
                    {/* Control point on q0 */}
                    <circle cx="370" cy="70" r="5.5" fill="#38bdf8" />
                    {/* Connecting vertical line down to q2 */}
                    <line x1="370" y1="70" x2="370" y2="190" stroke="#38bdf8" strokeWidth="2.2" />
                    {/* Target ⊕ on q2 */}
                    <circle cx="370" cy="190" r="11" fill="#0d1629" stroke="#38bdf8" strokeWidth="2.2" />
                    <line x1="363" y1="190" x2="377" y2="190" stroke="#38bdf8" strokeWidth="2.2" />
                    <line x1="370" y1="183" x2="370" y2="197" stroke="#38bdf8" strokeWidth="2.2" />
                  </g>

                  {/* MEASUREMENT GATES (Yellow rounded rectangles with gauge arc & needle) */}
                  {/* q0 Measure */}
                  <g>
                    <rect x="544" y="48" width="46" height="44" rx="8" fill="#facc15" />
                    {/* Gauge Arc */}
                    <path
                      d="M 553 76 A 14 14 0 0 1 581 76"
                      fill="none"
                      stroke="#0f172a"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    {/* Gauge Needle */}
                    <line x1="567" y1="76" x2="576" y2="59" stroke="#0f172a" strokeWidth="2.4" strokeLinecap="round" />
                  </g>

                  {/* q1 Measure */}
                  <g>
                    <rect x="544" y="108" width="46" height="44" rx="8" fill="#facc15" />
                    <path
                      d="M 553 136 A 14 14 0 0 1 581 136"
                      fill="none"
                      stroke="#0f172a"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <line x1="567" y1="136" x2="576" y2="119" stroke="#0f172a" strokeWidth="2.4" strokeLinecap="round" />
                  </g>

                  {/* q2 Measure */}
                  <g>
                    <rect x="544" y="168" width="46" height="44" rx="8" fill="#facc15" />
                    <path
                      d="M 553 196 A 14 14 0 0 1 581 196"
                      fill="none"
                      stroke="#0f172a"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <line x1="567" y1="196" x2="576" y2="179" stroke="#0f172a" strokeWidth="2.4" strokeLinecap="round" />
                  </g>
                </svg>
              </div>
            ) : (
              /* Block Flow Architecture Mode */
              <div className="py-6 px-1 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">Step 1</div>
                    <div className="font-bold text-white mt-1 text-sm">Feature Encoding</div>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      Maps agronomic inputs x₀, x₁, x₂ to qubit rotation angles into Hilbert space.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/40">
                    <div className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Step 2</div>
                    <div className="font-bold text-white mt-1 text-sm">Variational Ansatz</div>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      Parameterized Ry(θ) & Rz(θ) rotations with cross-qubit CNOT entanglement.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40">
                    <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Step 3</div>
                    <div className="font-bold text-white mt-1 text-sm">Pauli-Z Readout</div>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      Extracts expectation values ⟨ψ(θ)|Z|ψ(θ)⟩ and decodes to tonnes/ha.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Circuit Legend */}
            <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 pt-3.5 border-t border-slate-800/80 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#2dd4bf] inline-block shadow-xs shadow-teal-400/50" />
                <span>Feature encoding (from input data)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#8b5cf6] inline-block shadow-xs shadow-purple-500/50" />
                <span>Trainable gate (parameters θ)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#38bdf8] inline-block shadow-xs shadow-cyan-400/50" />
                <span>Entanglement (CNOT)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#facc15] inline-block shadow-xs shadow-amber-400/50" />
                <span>Measurement (to get output)</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: Predicted Yield */}
        <div
          className={`${
            isCircuitExpanded ? 'lg:col-span-6 xl:col-span-6' : 'lg:col-span-3 xl:col-span-3'
          } bg-[#0d1629] border border-slate-700/60 rounded-2xl p-5 flex flex-col justify-between shadow-xl shadow-slate-950/40 transition-all`}
        >
          <div>
            {/* Header */}
            <h2 className="text-lg font-bold text-white tracking-tight pb-3">Predicted Yield</h2>

            {/* Glowing Mint/Green Yield Badge */}
            <div className="bg-[#d2f9df] border border-[#a7f3d0] rounded-2xl p-4.5 flex items-center justify-center gap-3.5 shadow-lg shadow-emerald-500/10">
              <Sprout className="w-10 h-10 text-emerald-600 shrink-0" strokeWidth={2.5} />
              <div className="flex flex-col">
                <div className="text-4xl sm:text-5xl font-black text-emerald-950 tracking-tight leading-none">
                  {predictedYield}
                </div>
                <div className="text-sm sm:text-base font-bold text-emerald-800 tracking-tight mt-0.5">
                  tonnes/ha
                </div>
              </div>
            </div>

            {/* Scaled Output Box */}
            <div className="mt-4 space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Model Output (scaled)</label>
              <div className="w-full bg-[#080e1b] border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 font-mono text-base font-semibold">
                {scaledOutput}
              </div>
            </div>
          </div>

          {/* Bottom Status Alert */}
          <div className="mt-5 bg-[#052622] border border-emerald-500/40 rounded-xl p-3 flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-[#10b981] flex items-center justify-center text-white shrink-0 shadow-xs shadow-emerald-500/50">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-xs text-emerald-200 font-medium leading-snug">
              Prediction completed using VQR model (simulator)
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: 2 Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* CARD 4: Training Progress */}
        <div className="lg:col-span-7 xl:col-span-7 bg-[#0d1629] border border-slate-700/60 rounded-2xl p-5 shadow-xl shadow-slate-950/40">
          <h2 className="text-lg font-bold text-white tracking-tight pb-2">Training Progress</h2>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
            {/* Left: Semi-Logarithmic Line Chart */}
            <div className="flex-1 overflow-x-auto">
              <svg
                viewBox={`0 0 ${chartW} ${chartH}`}
                className="w-full h-auto select-none min-w-[280px]"
                style={{ maxHeight: '185px' }}
              >
                <defs>
                  {/* Purple line glow */}
                  <filter id="purpleGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#c084fc" floodOpacity="0.8" />
                  </filter>
                  {/* Purple gradient fill below curve */}
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c084fc" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#c084fc" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Y-Axis Title (Rotated) */}
                <text
                  x="-75"
                  y="13"
                  transform="rotate(-90)"
                  fill="#94a3b8"
                  fontSize="10"
                  fontWeight="500"
                  textAnchor="middle"
                >
                  Loss (MSE)
                </text>

                {/* Horizontal Gridlines & Y-Axis Ticks (10^1 to 10^-3) */}
                {[
                  { label: '10¹', loss: 10 },
                  { label: '10⁰', loss: 1 },
                  { label: '10⁻¹', loss: 0.1 },
                  { label: '10⁻²', loss: 0.01 },
                  { label: '10⁻³', loss: 0.001 }
                ].map((tick, i) => {
                  const y = getYCoord(tick.loss);
                  return (
                    <g key={i}>
                      <text x="42" y={y + 3.5} fill="#94a3b8" fontSize="9.5" textAnchor="end" fontFamily="sans-serif">
                        {tick.label}
                      </text>
                      <line
                        x1={paddingL}
                        y1={y}
                        x2={paddingL + plotW}
                        y2={y}
                        stroke="#1e293b"
                        strokeWidth="1"
                      />
                    </g>
                  );
                })}

                {/* X-Axis Ticks & Grid */}
                {[0, 20, 40, 60, 80, 100].map((iter, i) => {
                  const x = getXCoord(iter);
                  const yBot = 15 + plotH;
                  return (
                    <g key={i}>
                      <line x1={x} y1="15" x2={x} y2={yBot} stroke="#1e293b" strokeWidth="1" />
                      <text x={x} y={yBot + 14} fill="#94a3b8" fontSize="9.5" textAnchor="middle">
                        {iter}
                      </text>
                    </g>
                  );
                })}

                {/* X-Axis Title */}
                <text
                  x={paddingL + plotW / 2}
                  y={15 + plotH + 26}
                  fill="#94a3b8"
                  fontSize="10"
                  fontWeight="500"
                  textAnchor="middle"
                >
                  Iterations
                </text>

                {/* Area Gradient Fill */}
                <path d={areaD} fill="url(#purpleGradient)" />

                {/* Glowing Purple Curve */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#c084fc"
                  strokeWidth="2.5"
                  filter="url(#purpleGlow)"
                  strokeLinecap="round"
                />

                {/* Dots along the curve */}
                {points.map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredIteration === pt.iter ? 4.5 : 2.5}
                    fill="#e879f9"
                    stroke="#581c87"
                    strokeWidth="1"
                    className="transition-all cursor-pointer"
                    onMouseEnter={() => setHoveredIteration(pt.iter)}
                    onMouseLeave={() => setHoveredIteration(null)}
                  />
                ))}
              </svg>
            </div>

            {/* Right: Key Metric Summary */}
            <div className="sm:border-l sm:border-slate-800/80 sm:pl-6 space-y-3.5 shrink-0 min-w-[125px]">
              <div>
                <div className="text-xs text-slate-400 font-medium">Final Loss</div>
                <div className="text-2xl font-black text-[#d946ef] tracking-tight mt-0.5">0.0031</div>
              </div>

              <div>
                <div className="text-xs text-slate-400 font-medium">Iterations</div>
                <div className="text-2xl font-black text-white tracking-tight mt-0.5">100</div>
              </div>

              <div>
                <div className="text-xs text-slate-400 font-medium">Status</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] inline-block shadow-xs shadow-emerald-500/50" />
                  <span className="text-sm font-semibold text-white">Converged</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 5: Model Comparison (Optional) */}
        <div className="lg:col-span-5 xl:col-span-5 bg-[#0d1629] border border-slate-700/60 rounded-2xl p-5 shadow-xl shadow-slate-950/40">
          <div className="flex items-baseline gap-2 pb-2">
            <h2 className="text-lg font-bold text-white tracking-tight">Model Comparison</h2>
            <span className="text-xs text-slate-400 font-normal">(Optional)</span>
          </div>

          <div className="pt-1">
            <svg
              viewBox="0 0 320 175"
              className="w-full h-auto select-none"
              style={{ maxHeight: '185px' }}
            >
              {/* Y-Axis Title (Rotated) */}
              <text
                x="-75"
                y="14"
                transform="rotate(-90)"
                fill="#94a3b8"
                fontSize="10"
                fontWeight="500"
                textAnchor="middle"
              >
                MAE
              </text>

              {/* Horizontal gridlines for MAE: 0, 0.5, 1.0, 1.5 */}
              {[
                { val: '1.5', y: 18 },
                { val: '1.0', y: 58 },
                { val: '0.5', y: 98 },
                { val: '0', y: 138 }
              ].map((tick, i) => (
                <g key={i}>
                  <text x="38" y={tick.y + 3.5} fill="#94a3b8" fontSize="9.5" textAnchor="end">
                    {tick.val}
                  </text>
                  <line x1="44" y1={tick.y} x2="310" y2={tick.y} stroke="#1e293b" strokeWidth="1" />
                </g>
              ))}

              {/* 3 BARS */}
              {/* BAR 1: Linear Regression (1.21) */}
              <g>
                <text x="96" y="34" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1.21
                </text>
                <rect x="76" y="41.2" width="40" height="96.8" rx="3" fill="#2563eb" />
                <text x="96" y="152" fill="#cbd5e1" fontSize="9.5" textAnchor="middle">
                  Linear
                </text>
                <text x="96" y="164" fill="#cbd5e1" fontSize="9.5" textAnchor="middle">
                  Regression
                </text>
              </g>

              {/* BAR 2: Random Forest (0.68) */}
              <g>
                <text x="180" y="76" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  0.68
                </text>
                <rect x="160" y="83.6" width="40" height="54.4" rx="3" fill="#f97316" />
                <text x="180" y="152" fill="#cbd5e1" fontSize="9.5" textAnchor="middle">
                  Random
                </text>
                <text x="180" y="164" fill="#cbd5e1" fontSize="9.5" textAnchor="middle">
                  Forest
                </text>
              </g>

              {/* BAR 3: VQR (Quantum) (0.52) */}
              <g>
                <text x="264" y="89" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  0.52
                </text>
                <rect x="244" y="96.4" width="40" height="41.6" rx="3" fill="#a855f7" />
                <text x="264" y="152" fill="#e9d5ff" fontSize="9.5" fontWeight="600" textAnchor="middle">
                  VQR
                </text>
                <text x="264" y="164" fill="#e9d5ff" fontSize="9.5" fontWeight="600" textAnchor="middle">
                  (Quantum)
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Info Modal / Explanation Card */}
      <AnimatePresence>
        {showInfoModal && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="p-5 rounded-2xl bg-[#0d1629] border border-cyan-500/40 shadow-2xl space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Cpu className="w-4 h-4" />
                <span>Variational Quantum Regressor (VQR) Architecture Overview</span>
              </div>
              <button
                onClick={() => setShowInfoModal(false)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
              >
                Close
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              This simplified view displays the real VNQFF-03 Variational Quantum Regressor. Agricultural inputs
              (Rainfall, Temperature, Soil pH, Nitrogen, Moisture) are encoded into qubit rotation angles via{' '}
              <strong className="text-teal-400">Feature Encoding Gates</strong>. The circuit then undergoes{' '}
              <strong className="text-purple-400">Trainable Ry/Rz Unitary Rotations</strong> coupled with{' '}
              <strong className="text-cyan-400">CNOT Entanglement</strong> to discover non-linear agronomic dependencies.
              Finally, <strong className="text-amber-400">Pauli-Z Measurements</strong> project the quantum state to
              produce scaled yield expectations.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
