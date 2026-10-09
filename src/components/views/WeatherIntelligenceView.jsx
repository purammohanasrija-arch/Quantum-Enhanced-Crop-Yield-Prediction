import React from 'react';
import { motion } from 'framer-motion';
import {
  CloudSun,
  Droplets,
  Wind,
  Compass,
  Sun,
  CloudRain,
  AlertTriangle,
  Info,
  Calendar,
  Zap,
  Gauge
} from 'lucide-react';
import { WEATHER_HOURLY, WEATHER_DAILY } from '../../data/mockData';

export default function WeatherIntelligenceView() {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Weather & Microclimate Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time agro-meteorological station telemetry, evapotranspiration indices, and hazard forecasts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1.5">
            <CloudSun className="w-4 h-4 text-amber-600" />
            <span>Station: Guntur Agritech Node 04</span>
          </span>
        </div>
      </div>

      {/* Weather Risk Alerts Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-950">
              Weather Risk Alert: Diurnal Heat Wave Advisory
            </h4>
            <p className="text-xs text-amber-800 mt-0.5">
              Temperatures forecast to climb above 34°C on Wednesday and Thursday. High risk of spikelet sterility. Night-time irrigation recommended.
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-full bg-amber-200 text-amber-900 shrink-0">
          Valid: Next 48 Hours
        </span>
      </div>

      {/* Current Conditions Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Temp */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Temperature</span>
            <Sun className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">29°C</div>
          <span className="text-xs text-slate-500 mt-1 block">Feels like 31°C</span>
        </div>

        {/* Humidity */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Humidity</span>
            <Droplets className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">62%</div>
          <span className="text-xs text-emerald-600 mt-1 block font-medium">Optimal range</span>
        </div>

        {/* Rainfall */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Annual Avg Rain</span>
            <CloudRain className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">1150 mm</div>
          <span className="text-xs text-slate-500 mt-1 block">Season: Normal</span>
        </div>

        {/* Wind */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Wind Velocity</span>
            <Wind className="w-4 h-4 text-teal-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">14 km/h</div>
          <span className="text-xs text-slate-500 mt-1 block">Direction: ESE</span>
        </div>

        {/* Condition */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Condition</span>
            <CloudSun className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 leading-tight">Partly Cloudy</div>
          <span className="text-xs text-slate-500 mt-1 block">UV Index: 7 (High)</span>
        </div>
      </div>

      {/* Hourly Timeline */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
        <h3 className="font-bold text-slate-900 text-base mb-4">
          Today's Hourly Microclimate Trajectory
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          {WEATHER_HOURLY.map((hour) => (
            <div
              key={hour.time}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 text-center transition-all"
            >
              <span className="text-xs font-mono font-bold text-slate-500">{hour.time}</span>
              <div className="text-2xl my-2">{hour.icon}</div>
              <div className="text-base font-extrabold text-slate-900 font-mono">{hour.temp}°C</div>
              <div className="mt-1 flex items-center justify-center gap-1 text-[11px] text-cyan-700">
                <Droplets className="w-3 h-3" />
                <span>{hour.humidity}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Agricultural Forecast Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900 text-base">
            7-Day Agronomic Outlook & Evapotranspiration
          </h3>
          <span className="text-xs text-slate-400">
            OpenWeather / IMD API bridge ready
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-7 gap-3">
          {WEATHER_DAILY.map((day) => (
            <div
              key={day.day}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between text-center"
            >
              <div>
                <span className="text-xs font-bold text-slate-800">{day.day}</span>
                <div className="text-3xl my-2.5">{day.icon}</div>
                <div className="text-sm font-extrabold text-slate-900 font-mono">
                  {day.high}° / <span className="text-slate-400">{day.low}°</span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60">
                <span className="text-[10px] text-slate-500 block leading-tight">{day.condition}</span>
                <span className="text-[10px] font-mono text-cyan-600 font-bold block mt-1">
                  {day.rainMm > 0 ? `${day.rainMm} mm rain` : 'Dry'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
