import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Radio,
  Layers,
  Droplets,
  SunMedium,
  Activity,
  Plane,
  Gauge,
  Sliders,
  Sparkles,
  Info,
  Maximize2
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export default function DigitalFarmTwinView() {
  const {
    selectedCrop,
    farmArea,
    farmInputs,
    whatIfParams,
    whatIfResult,
    predictionData,
    setActiveTab,
  } = useFarm();

  const [selectedSensor, setSelectedSensor] = useState('S-01');

  const sensors = [
    { id: 'S-01', name: 'Soil Moisture Node 1', type: 'Moisture', val: `${farmInputs.soilMoisture}%`, status: 'Active', x: '28%', y: '42%' },
    { id: 'T-04', name: 'Thermal Canopy Sensor', type: 'Temperature', val: `${farmInputs.temp + whatIfParams.tempDelta}°C`, status: 'Active', x: '58%', y: '35%' },
    { id: 'V-12', name: 'Smart Drip Valve V-12', type: 'Irrigation', val: whatIfParams.irrigation ? 'Flow: 4.2 L/m' : 'Closed', status: whatIfParams.irrigation ? 'Open' : 'Closed', x: '45%', y: '68%' },
    { id: 'N-08', name: 'Nitrate Optical Probe', type: 'Nutrients', val: `${farmInputs.nitrogen} kg/ha`, status: 'Active', x: '72%', y: '55%' },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Digital Farm Twin
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-[11px] font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
              Live Virtual Mesh
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time 2.5D interactive spatial canvas mirroring physical field telemetry, drone passes, and simulation responses
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('what-if')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-all"
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tune in What-If Simulator</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Spatial 2.5D Farm Visualizer (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950 rounded-3xl p-6 border border-slate-800 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[500px]">
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)] bg-[size:3rem_3rem]" />

          {/* Top HUD Telemetry Overlay */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300 font-bold">SECTOR 4: {selectedCrop.toUpperCase()}</span>
              <span className="text-slate-500">({farmArea} HA)</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md text-[11px]">
              <span className="text-cyan-400">YIELD: {whatIfResult.simulatedYield} t/ha</span>
              <span className="text-slate-600">|</span>
              <span className={whatIfResult.impactPercentage < 0 ? 'text-rose-400' : 'text-emerald-400'}>
                {whatIfResult.impactPercentage > 0 ? `+${whatIfResult.impactPercentage}%` : `${whatIfResult.impactPercentage}%`}
              </span>
            </div>
          </div>

          {/* Farm Field Boundaries & Zones Canvas Area */}
          <div className="relative z-10 my-auto py-10 flex items-center justify-center">
            {/* The 2.5D Isometric Field Graphic */}
            <div className="relative w-full max-w-lg aspect-4/3 rounded-3xl overflow-hidden border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-950/80 via-green-950/60 to-slate-900/90 p-4 shadow-2xl">
              {/* Field Plots Matrix */}
              <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-3 relative">
                {/* Plot A: Active Rice */}
                <div className="rounded-2xl border border-emerald-500/50 bg-emerald-900/30 p-3 relative overflow-hidden group">
                  <div className="absolute top-2 left-2 text-[10px] font-mono font-bold text-emerald-300">
                    PLOT A1: {selectedCrop}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 text-emerald-400 text-3xl">
                    🌾
                  </div>
                  <div className="absolute bottom-2 right-2 text-[9px] font-mono text-emerald-400">
                    HEALTH: 92%
                  </div>
                </div>

                {/* Plot B: Secondary / Wheat */}
                <div className="rounded-2xl border border-teal-500/40 bg-teal-950/30 p-3 relative overflow-hidden">
                  <div className="absolute top-2 left-2 text-[10px] font-mono font-bold text-teal-300">
                    PLOT A2: Nursery
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-25 text-teal-400 text-3xl">
                    🌱
                  </div>
                  <div className="absolute bottom-2 right-2 text-[9px] font-mono text-teal-400">
                    CANOPY: 88%
                  </div>
                </div>

                {/* Plot C: Irrigation Buffer Zone */}
                <div className="rounded-2xl border border-cyan-500/40 bg-cyan-950/30 p-3 relative overflow-hidden">
                  <div className="absolute top-2 left-2 text-[10px] font-mono font-bold text-cyan-300">
                    PLOT B1: Drip Line
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-25 text-cyan-400 text-3xl">
                    💧
                  </div>
                  <div className="absolute bottom-2 right-2 text-[9px] font-mono text-cyan-400">
                    {whatIfParams.irrigation ? 'VALVE: ON' : 'VALVE: OFF'}
                  </div>
                </div>

                {/* Plot D: Fallow / Organic Mulch */}
                <div className="rounded-2xl border border-slate-700/60 bg-slate-900/40 p-3 relative overflow-hidden">
                  <div className="absolute top-2 left-2 text-[10px] font-mono font-bold text-slate-400">
                    PLOT B2: Buffer
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 text-slate-400 text-3xl">
                    🍂
                  </div>
                  <div className="absolute bottom-2 right-2 text-[9px] font-mono text-slate-500">
                    MOIST: {farmInputs.soilMoisture}%
                  </div>
                </div>

                {/* Drone Scanning Beam Motion */}
                <motion.div
                  animate={{
                    x: ['0%', '70%', '20%', '0%'],
                    y: ['0%', '60%', '20%', '0%'],
                  }}
                  transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute z-20 pointer-events-none"
                >
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/30 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/50">
                      <Radio className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
                    </div>
                    {/* Downward Scanning Beam Light */}
                    <div className="w-16 h-20 bg-gradient-to-b from-cyan-400/30 to-transparent -ml-4 -mt-1 transform -rotate-12 rounded-b-full pointer-events-none" />
                  </div>
                </motion.div>

                {/* Interactive Sensor Nodes Placed Over Canvas */}
                {sensors.map((sensor) => (
                  <button
                    key={sensor.id}
                    onClick={() => setSelectedSensor(sensor.id)}
                    style={{ left: sensor.x, top: sensor.y }}
                    className={`absolute z-30 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer p-1.5 rounded-xl border flex items-center gap-1.5 backdrop-blur-md transition-all ${
                      selectedSensor === sensor.id
                        ? 'bg-cyan-500 text-slate-950 font-bold border-white scale-110 shadow-lg shadow-cyan-400/50'
                        : 'bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border-cyan-500/50'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[10px] font-mono">{sensor.id}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Virtual Controls Bar */}
          <div className="relative z-10 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-[11px]">
              Active Sensors: 4 Online • Autonomous Drone Patrol Path: Active
            </span>
            <span className="font-mono text-cyan-400">
              Response Latency: 12ms (Digital Twin Synced)
            </span>
          </div>
        </div>

        {/* Right: Sensor Telemetry & Twin Status Card (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Selected Node Details */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Active Sensor Node
            </span>
            <div className="flex items-center justify-between my-2">
              <h3 className="text-xl font-extrabold text-slate-900">
                {sensors.find((s) => s.id === selectedSensor)?.name}
              </h3>
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-800">
                {selectedSensor}
              </span>
            </div>

            <div className="my-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-xs text-slate-500 block mb-1">Live Reading Value</span>
              <div className="text-3xl font-black text-slate-900 font-mono">
                {sensors.find((s) => s.id === selectedSensor)?.val}
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                Telemetry Status: Operational
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Connected via LoRaWAN IoT mesh at 868 MHz. Battery reserve at 94%. Last heartbeat received 4s ago.
            </p>
          </div>

          {/* How Farm Data Updates The Twin */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">
              Live Digital Twin Synchronization
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              When sliders in the <strong>What-If Simulator</strong> are manipulated, the Digital Farm Twin immediately re-renders soil moisture gradients, temperature alerts, and predicted crop biomass.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('what-if')}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Adjust Parameters in What-If</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
