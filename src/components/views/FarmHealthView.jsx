import React from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Droplets,
  SunMedium,
  FlaskConical,
  Gauge,
  Activity,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';
import AnimatedCounter from '../common/AnimatedCounter';

export default function FarmHealthView() {
  const { farmHealthScore, healthSubScores, setActiveTab } = useFarm();

  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (farmHealthScore / 100) * circumference;

  const indicators = [
    { name: 'Soil Health', score: healthSubScores.soilHealth, icon: Gauge, desc: 'Optimal microbial activity & loam texture', color: 'from-emerald-500 to-green-600' },
    { name: 'Water Availability', score: healthSubScores.waterAvailability, icon: Droplets, desc: 'Reservoir buffer & subsoil aquifers stable', color: 'from-cyan-500 to-blue-600' },
    { name: 'Weather Conditions', score: healthSubScores.weather, icon: SunMedium, desc: 'Elevated daytime temp waves slightly depressing score', color: 'from-amber-500 to-orange-600' },
    { name: 'Nutrients Balance', score: healthSubScores.nutrients, icon: FlaskConical, desc: 'Nitrogen-Phosphorus-Potassium equilibrium', color: 'from-lime-500 to-emerald-600' },
    { name: 'Irrigation Management', score: healthSubScores.irrigation, icon: Droplets, desc: 'Precision drip cycle delivery at 98% uniformity', color: 'from-teal-500 to-green-600' },
  ];

  const chemicalParameters = [
    { name: 'Soil pH', val: '6.8', status: 'Optimal Neutral', target: '6.5 - 7.2' },
    { name: 'Organic Carbon', val: '0.78%', status: 'High Fertility', target: '> 0.75%' },
    { name: 'Electrical Cond. (EC)', val: '0.42 dS/m', status: 'Non-saline', target: '< 0.8 dS/m' },
    { name: 'Canopy NDVI Index', val: '0.82', status: 'Vigorous Green', target: '0.70 - 0.90' },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Farm Health & Bio-Integrity
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Holistic composite index tracking soil microbiome, water balance, and canopy vitality
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-emerald-700" />
            <span>Composite Score: 87 / 100 (Good)</span>
          </span>
        </div>
      </div>

      {/* Main Score & Core Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Overall Health Score Ring (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            Farm Health Index
          </span>

          <div className="relative w-44 h-44 flex items-center justify-center my-2">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 140 140">
              <circle
                cx="70"
                cy="70"
                r={radius}
                className="stroke-slate-100"
                strokeWidth="12"
                fill="transparent"
              />
              <motion.circle
                cx="70"
                cy="70"
                r={radius}
                className="stroke-emerald-500"
                strokeWidth="12"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-slate-900">
                <AnimatedCounter value={farmHealthScore} decimals={0} />
              </span>
              <span className="text-xs font-semibold text-slate-400">out of 100</span>
              <span className="mt-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                Good State
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 mt-4 leading-relaxed max-w-xs">
            The farm is performing 12% above the regional benchmark. Soil nutrient levels and irrigation scheduling provide a resilient buffer against heatwaves.
          </p>
        </div>

        {/* Right: The 5 Progress Indicators (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-5">
          <h3 className="font-bold text-slate-900 text-base">
            System Factor Breakdowns
          </h3>

          <div className="space-y-4">
            {indicators.map((ind) => {
              const Icon = ind.icon;
              return (
                <div key={ind.name} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center text-slate-700">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900">{ind.name}</span>
                        <span className="text-[10px] text-slate-400 block">{ind.desc}</span>
                      </div>
                    </div>
                    <span className="text-sm font-extrabold text-slate-900 font-mono">
                      {ind.score}%
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${ind.score}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={`h-full rounded-full bg-gradient-to-r ${ind.color}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Soil Physico-Chemical Telemetry Cards */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
        <h3 className="font-bold text-slate-900 text-base mb-4">
          Precision Soil & Canopy Chemical Telemetry
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {chemicalParameters.map((chem) => (
            <div key={chem.name} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {chem.name}
              </span>
              <div className="text-2xl font-black text-slate-900 font-mono my-1">
                {chem.val}
              </div>
              <div className="flex items-center justify-between text-xs mt-2">
                <span className="font-semibold text-emerald-700">{chem.status}</span>
                <span className="text-[10px] text-slate-400">Target: {chem.target}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
