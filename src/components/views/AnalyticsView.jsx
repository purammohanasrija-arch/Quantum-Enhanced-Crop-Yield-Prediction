import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from 'recharts';
import { BarChart3, TrendingUp, Droplets, SunMedium, Gauge, Sparkles } from 'lucide-react';
import {
  HISTORICAL_YEARLY_DATA,
  YIELD_FORECAST_GROWTH_STAGES
} from '../../data/mockData';

export default function AnalyticsView() {
  const [activeTab, setActiveTab] = useState('all');

  // Rainfall vs Yield data points
  const rainVsYieldData = [
    { rainfall: 600, yield: 2.8, crop: 'Wheat' },
    { rainfall: 750, yield: 3.2, crop: 'Cotton' },
    { rainfall: 900, yield: 3.9, crop: 'Maize' },
    { rainfall: 1050, yield: 4.2, crop: 'Rice' },
    { rainfall: 1150, yield: 4.52, crop: 'Rice' },
    { rainfall: 1300, yield: 4.65, crop: 'Rice' },
    { rainfall: 1500, yield: 4.3, crop: 'Rice' }, // waterlogging dip
  ];

  // Temperature vs Yield
  const tempVsYieldData = [
    { temp: 20, yield: 3.4 },
    { temp: 23, yield: 3.9 },
    { temp: 26, yield: 4.3 },
    { temp: 29, yield: 4.52 },
    { temp: 32, yield: 4.2 },
    { temp: 35, yield: 3.6 },
    { temp: 38, yield: 2.9 },
  ];

  // Soil Moisture vs Yield
  const moistureVsYieldData = [
    { moisture: 30, yield: 2.2 },
    { moisture: 45, yield: 3.4 },
    { moisture: 55, yield: 4.1 },
    { moisture: 65, yield: 4.52 },
    { moisture: 75, yield: 4.4 },
    { moisture: 85, yield: 3.8 },
  ];

  // Nutrient Impact (N, P, K correlation coefficients)
  const nutrientImpactData = [
    { nutrient: 'Nitrogen (N)', correlation: 0.76, impact: '+0.42 t/ha' },
    { nutrient: 'Potassium (K)', correlation: 0.64, impact: '+0.31 t/ha' },
    { nutrient: 'Phosphorus (P)', correlation: 0.58, impact: '+0.25 t/ha' },
    { nutrient: 'Micronutrients (Zn/Fe)', correlation: 0.41, impact: '+0.15 t/ha' },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Agricultural Intelligence Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Multi-dimensional correlations, longitudinal crop yields, and climate response curves
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300">
            Statistical Confidence: p &lt; 0.001
          </span>
        </div>
      </div>

      {/* Grid Row 1: Historical Yield (5 years) & Yield Forecast by Growth Stages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Historical Yield */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">5-Year Historical Yield Trend</h3>
              <p className="text-xs text-slate-500">Year-over-year productivity curve</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              +14.4% Since 2022
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HISTORICAL_YEARLY_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[3.5, 5.0]} tickLine={false} axisLine={false} />
                <Tooltip
                  formatter={(val) => [`${val} t/ha`, 'Yield']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                />
                <Area type="monotone" dataKey="yield" name="Yield (t/ha)" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#yieldGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Growth Stages Forecast */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Yield Forecast (Growth Stages)</h3>
              <p className="text-xs text-slate-500">Vegetative vs Flowering vs Grain Filling</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Peak: 4.7 t/ha
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={YIELD_FORECAST_GROWTH_STAGES} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="stage" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[1.5, 5.0]} tickLine={false} axisLine={false} />
                <Tooltip
                  formatter={(val) => [`${val} t/ha`, 'Yield']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="predicted" name="Predicted Biomass" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="historical" name="Historical Baseline" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grid Row 2: Rainfall vs Yield & Temperature vs Yield */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 3. Rainfall vs Yield */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Rainfall vs Yield Response Curve</h3>
              <p className="text-xs text-slate-500">Parabolic threshold at 1200 mm precipitation</p>
            </div>
            <Droplets className="w-5 h-5 text-cyan-600" />
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rainVsYieldData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="rainfall" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} unit=" mm" />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[2.0, 5.0]} tickLine={false} axisLine={false} />
                <Tooltip
                  formatter={(val) => [`${val} t/ha`, 'Yield']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                />
                <Line type="monotone" dataKey="yield" name="Yield (tons/ha)" stroke="#06b6d4" strokeWidth={3} dot={{ r: 5, fill: '#06b6d4' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Temperature vs Yield */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Temperature vs Yield Thermal Decay</h3>
              <p className="text-xs text-slate-500">Optimal thermal window: 27°C - 30°C</p>
            </div>
            <SunMedium className="w-5 h-5 text-amber-600" />
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tempVsYieldData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="temp" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} unit="°C" />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[2.0, 5.0]} tickLine={false} axisLine={false} />
                <Tooltip
                  formatter={(val) => [`${val} t/ha`, 'Yield']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                />
                <Line type="monotone" dataKey="yield" name="Yield (tons/ha)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5, fill: '#f59e0b' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grid Row 3: Soil Moisture vs Yield & Nutrient Impact Correlation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 5. Soil Moisture vs Yield */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Soil Moisture vs Yield Curve</h3>
              <p className="text-xs text-slate-500">Root zone dielectric saturation spectrum</p>
            </div>
            <Gauge className="w-5 h-5 text-teal-600" />
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={moistureVsYieldData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="moisture" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} unit="%" />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[1.5, 5.0]} tickLine={false} axisLine={false} />
                <Tooltip
                  formatter={(val) => [`${val} t/ha`, 'Yield']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                />
                <Area type="monotone" dataKey="yield" name="Yield (t/ha)" stroke="#0d9488" strokeWidth={3} fill="#ccfbf1" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 6. Nutrient Impact (NPK Correlation) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Nutrient Impact & Correlation</h3>
              <p className="text-xs text-slate-500">Pearson coefficient with final grain mass</p>
            </div>
            <Sparkles className="w-5 h-5 text-emerald-600" />
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nutrientImpactData} layout="vertical" margin={{ top: 10, right: 20, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" domain={[0, 1]} stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="nutrient" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  formatter={(val) => [val, 'Correlation (r)']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                />
                <Bar dataKey="correlation" name="Correlation (r)" fill="#10b981" radius={[0, 8, 8, 0]}>
                  {nutrientImpactData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : index === 1 ? '#06b6d4' : '#84cc16'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
