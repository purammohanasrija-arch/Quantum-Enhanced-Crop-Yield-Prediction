import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { YIELD_FORECAST_GROWTH_STAGES } from '../../../data/mockData';
import { useFarm } from '../../../context/FarmContext';

export default function YieldForecastChart() {
  const { setActiveTab } = useFarm();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/90 text-white p-2.5 rounded-xl text-xs shadow-xl border border-slate-700 backdrop-blur-md">
          <p className="font-bold text-emerald-300 mb-1">{label} Stage</p>
          {payload.map((entry) => (
            <div key={entry.name} className="flex items-center justify-between gap-4 py-0.5 text-[11px]">
              <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}:
              </span>
              <span className="font-mono font-bold">{entry.value} t/ha</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center text-green-700">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Yield Forecast (Growth Stages)</h3>
              <p className="text-[10px] text-slate-500">Biomass progression timeline</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Cumulative tons/ha
          </span>
        </div>

        {/* Chart View */}
        <div className="h-48 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={YIELD_FORECAST_GROWTH_STAGES}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="stage"
                stroke="#94a3b8"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                domain={[1.5, 5.0]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                name="Predicted Yield"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#ffffff' }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="historical"
                name="Historical Yield"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{ r: 3, fill: '#94a3b8' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 font-medium">
          Grain filling stage expected at 4.5 t/ha
        </span>
        <button
          onClick={() => setActiveTab('analytics')}
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
        >
          <span>Deep Analytics</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
