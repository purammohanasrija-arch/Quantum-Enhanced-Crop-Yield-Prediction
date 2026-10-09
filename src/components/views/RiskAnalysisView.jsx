import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Flame,
  CloudRain,
  DropletOff,
  Sprout,
  Bug,
  Waves,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export default function RiskAnalysisView() {
  const { setActiveTab } = useFarm();

  const riskCards = [
    {
      id: 'heat-stress',
      name: 'Heat Stress Risk',
      status: 'HIGH',
      color: 'border-rose-300 bg-rose-50/50',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      icon: Flame,
      iconColor: 'bg-rose-500 text-white',
      probability: '78%',
      details: 'Maximum ambient temperature forecast to breach 34°C during vegetative to flowering transition. High risk of spikelet sterility.',
      action: 'Maintain standing water level of 3-5 cm. Shift irrigation timing to dusk and dawn.',
      metric: '34.2°C Max Temp (Threshold: 32°C)'
    },
    {
      id: 'low-rainfall',
      name: 'Low Rainfall Risk',
      status: 'MODERATE',
      color: 'border-amber-300 bg-amber-50/50',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      icon: CloudRain,
      iconColor: 'bg-amber-500 text-white',
      probability: '45%',
      details: 'Dry spell predicted between days 12-19 of the current cycle. Cumulative deficit estimated at -20% against normal seasonal index.',
      action: 'Prime secondary drip irrigation lines and check water storage retention basins.',
      metric: '-20% Monthly Rainfall Delta'
    },
    {
      id: 'low-moisture',
      name: 'Low Soil Moisture',
      status: 'LOW',
      color: 'border-emerald-300 bg-emerald-50/50',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: DropletOff,
      iconColor: 'bg-emerald-600 text-white',
      probability: '18%',
      details: 'Soil dielectric moisture reading stands at 65% in root zone, well within the optimum field capacity (55% - 75%).',
      action: 'Continue baseline irrigation schedule without modifications.',
      metric: '65% Dielectric Moisture (Optimum: >55%)'
    },
    {
      id: 'nutrient-deficiency',
      name: 'Nutrient Deficiency',
      status: 'LOW',
      color: 'border-emerald-300 bg-emerald-50/50',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: Sprout,
      iconColor: 'bg-emerald-600 text-white',
      probability: '12%',
      details: 'Available Nitrogen (82 kg/ha) and Potassium (120 kg/ha) meet recommended agronomic baseline requirements.',
      action: 'Prepare minor top-dressing of nitrogen at panicle initiation.',
      metric: 'N: 82 kg/ha | P: 40 kg/ha | K: 120 kg/ha'
    },
    {
      id: 'flood-risk',
      name: 'Flood & Waterlogging Risk',
      status: 'LOW',
      color: 'border-emerald-300 bg-emerald-50/50',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: Waves,
      iconColor: 'bg-emerald-600 text-white',
      probability: '8%',
      details: 'Field drainage slope and catchment buffer are optimal. No severe monsoon depressions detected in radar sweep.',
      action: 'Ensure field bunds and culvert outlets remain free of weed debris.',
      metric: '4 mm Precipitation Next 48h'
    },
    {
      id: 'pest-disease',
      name: 'Pest & Disease Risk',
      status: 'MODERATE',
      color: 'border-amber-300 bg-amber-50/50',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      icon: Bug,
      iconColor: 'bg-amber-500 text-white',
      probability: '52%',
      details: 'Warm night temperatures combined with 62% humidity create moderately favorable conditions for brown planthopper and leaf blast.',
      action: 'Conduct visual drone reconnaissance on Plot 4 perimeter. Deploy bio-pheromone lures.',
      metric: 'Vulnerability Index: 52 / 100'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Risk Analysis & Early Warning
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Automated sensor surveillance, anomaly detection, and climate vulnerability scoring
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Overall Farm Risk: MODERATE</span>
          </span>
        </div>
      </div>

      {/* Grid of Risk Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {riskCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={`bg-white rounded-3xl p-6 border ${card.color} shadow-xs hover:shadow-md transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl ${card.iconColor} flex items-center justify-center shadow-md`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{card.name}</h3>
                      <span className="text-[10px] text-slate-400 font-mono">Prob: {card.probability}</span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase border ${card.badgeColor}`}>
                    {card.status}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/80 border border-slate-200/60 mb-3 text-xs text-slate-600 leading-relaxed">
                  {card.details}
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 mb-4">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Telemetry Metric</span>
                  <span className="text-xs font-mono font-bold text-slate-800">{card.metric}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-800 block mb-1">
                  Mitigation Action:
                </span>
                <p className="text-xs text-emerald-800 font-medium">
                  {card.action}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
