import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Droplets, SunMedium, FlaskConical, Gauge, ArrowRight } from 'lucide-react';
import { useFarm } from '../../../context/FarmContext';
import AnimatedCounter from '../../common/AnimatedCounter';

export default function FarmHealthWidget() {
  const { farmHealthScore, healthSubScores, setActiveTab } = useFarm();

  const metrics = [
    { label: 'Soil Health', value: healthSubScores.soilHealth, icon: Gauge, color: 'bg-emerald-500' },
    { label: 'Water Availability', value: healthSubScores.waterAvailability, icon: Droplets, color: 'bg-cyan-500' },
    { label: 'Weather Conditions', value: healthSubScores.weather, icon: SunMedium, color: 'bg-amber-500' },
    { label: 'Nutrient Levels', value: healthSubScores.nutrients, icon: FlaskConical, color: 'bg-lime-500' },
    { label: 'Irrigation Management', value: healthSubScores.irrigation, icon: Droplets, color: 'bg-teal-500' },
  ];

  // SVG Gauge constants
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (farmHealthScore / 100) * circumference;

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800">
              <Heart className="w-4 h-4 text-teal-700" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Farm Health Score</h3>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
            Optimal State
          </span>
        </div>

        {/* Circular Gauge + Status */}
        <div className="flex items-center gap-5 p-3 rounded-2xl bg-slate-50 border border-slate-200/60 mb-4">
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-slate-200"
                strokeWidth="8"
                fill="transparent"
              />
              <motion.circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-emerald-500"
                strokeWidth="8"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-extrabold text-slate-900">
                <AnimatedCounter value={farmHealthScore} decimals={0} />
              </span>
              <span className="text-[9px] font-semibold text-slate-400">/ 100</span>
            </div>
          </div>

          <div>
            <div className="inline-block text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 mb-1">
              Status: Good
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Microclimate and soil moisture are harmonized for maximum Kharif biomass production.
            </p>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="space-y-2.5">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="flex items-center gap-1.5 font-medium text-slate-700 text-[11px]">
                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                    {m.label}
                  </span>
                  <span className="font-bold text-slate-900 font-mono text-[11px]">{m.value}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${m.value}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full ${m.color}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => setActiveTab('farm-health')}
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
        >
          <span>Detailed Diagnostics</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
