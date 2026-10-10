import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, MapPin, TrendingUp, Heart, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useFarm } from '../../context/FarmContext';
import AnimatedCounter from '../common/AnimatedCounter';

export default function KPICards() {
  const {
    selectedCrop,
    farmArea,
    predictionData,
    farmHealthScore,
    riskLevels,
    setActiveTab
  } = useFarm();

  const cards = [
    {
      id: 'crop',
      label: 'Selected Crop',
      value: selectedCrop,
      isText: true,
      badge: 'Season: Kharif',
      icon: Sprout,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      iconBg: 'bg-emerald-100 text-emerald-800',
      onClick: () => setActiveTab('crop-prediction'),
    },
    {
      id: 'area',
      label: 'Farm Area',
      numericValue: farmArea,
      unit: ' Hectares',
      badge: 'Plot: Sector 4',
      icon: MapPin,
      color: 'bg-blue-50 text-blue-700 border-blue-200/80',
      iconBg: 'bg-blue-100 text-blue-800',
      onClick: () => setActiveTab('digital-twin'),
    },
    {
      id: 'yield',
      label: 'Predicted Yield',
      numericValue: predictionData.predictedYield,
      unit: ' tons/ha',
      badge: predictionData.yieldCategory || predictionData.previousSeasonDiff || 'Optimal Yield',
      badgePositive: (predictionData.predictedYield || 0) >= 3.2,
      badgeWarning: (predictionData.predictedYield || 0) < 3.2,
      icon: TrendingUp,
      color: 'bg-green-50 text-green-700 border-green-200/80',
      iconBg: 'bg-green-100 text-green-800',
      onClick: () => setActiveTab('quantum-lab'),
    },
    {
      id: 'health',
      label: 'Farm Health Score',
      numericValue: farmHealthScore,
      unit: ' / 100',
      badge: 'Status: Good',
      badgePositive: true,
      icon: Heart,
      color: 'bg-teal-50 text-teal-700 border-teal-200/80',
      iconBg: 'bg-teal-100 text-teal-800',
      onClick: () => setActiveTab('farm-health'),
    },
    {
      id: 'risk',
      label: 'Risk Level',
      value: 'Moderate',
      isText: true,
      badge: '2 Factors Active',
      badgeWarning: true,
      icon: AlertTriangle,
      color: 'bg-amber-50 text-amber-700 border-amber-200/80',
      iconBg: 'bg-amber-100 text-amber-800',
      onClick: () => setActiveTab('risk-analysis'),
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            whileHover={{ y: -3, scale: 1.01 }}
            onClick={card.onClick}
            className="cursor-pointer bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">
                {card.label}
              </span>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-1 my-1">
              {card.isText ? (
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {card.value}
                </span>
              ) : (
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-baseline">
                  <AnimatedCounter value={card.numericValue} decimals={card.id === 'yield' ? 2 : 0} />
                  <span className="text-xs font-semibold text-slate-500 ml-1">{card.unit}</span>
                </div>
              )}
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md inline-flex items-center gap-1 ${
                  card.badgePositive
                    ? 'bg-emerald-100 text-emerald-800'
                    : card.badgeWarning
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {card.badge}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
