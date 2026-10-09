import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { History, TrendingUp, Calendar, ArrowUpRight, Scale } from 'lucide-react';
import { HISTORICAL_YEARLY_DATA } from '../../data/mockData';

export default function FarmHistoryView() {
  const years = [
    { year: '2024', crop: 'Rice (Kharif)', yield: '4.30 t/ha', rainfall: '1120 mm', fert: '118 kg/ha', prod: '8.6 tons', growth: '+3.6%' },
    { year: '2025', crop: 'Rice (Kharif)', yield: '4.45 t/ha', rainfall: '1140 mm', fert: '120 kg/ha', prod: '8.9 tons', growth: '+3.5%' },
    { year: '2026 (Est.)', crop: 'Rice (Kharif)', yield: '4.52 t/ha', rainfall: '1150 mm', fert: '120 kg/ha', prod: '9.04 tons', growth: '+1.6%' },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Multi-Year Farm History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Year-over-year harvest yields, precipitation benchmarks, and input application audits
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-600" />
            <span>Audit Period: 2024 - 2026</span>
          </span>
        </div>
      </div>

      {/* Cards for 2024, 2025, 2026 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {years.map((y) => (
          <div key={y.year} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-extrabold text-slate-900">{y.year}</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {y.growth}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 mb-4">{y.crop}</p>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <span className="text-slate-500">Harvest Yield:</span>
                  <span className="font-bold text-emerald-800 font-mono">{y.yield}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <span className="text-slate-500">Cumulative Rainfall:</span>
                  <span className="font-bold text-cyan-800 font-mono">{y.rainfall}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <span className="text-slate-500">Fertilizer Applied:</span>
                  <span className="font-bold text-slate-800 font-mono">{y.fert}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <span className="text-slate-500">Total Production:</span>
                  <span className="font-bold text-slate-900 font-mono">{y.prod}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Yearly Comparison Chart */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
        <h3 className="font-bold text-slate-900 text-base mb-1">
          Longitudinal Yield & Production Progression
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Comparing tons/ha yield and gross tonnage production from 2022 to 2026
        </p>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={HISTORICAL_YEARLY_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} domain={[0, 10]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="yield" name="Yield (tons/ha)" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="production" name="Total Production (tons)" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
