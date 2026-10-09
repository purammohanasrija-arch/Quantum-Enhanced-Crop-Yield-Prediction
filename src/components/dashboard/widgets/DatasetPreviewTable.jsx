import React from 'react';
import { Database, ArrowRight, Table } from 'lucide-react';
import { useFarm } from '../../../context/FarmContext';

export default function DatasetPreviewTable() {
  const { datasetRows, setActiveTab, setSelectedCrop } = useFarm();

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Table className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Dataset Preview</h3>
              <p className="text-[10px] text-slate-500">Live multi-crop training sample</p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            Top 5 Rows
          </span>
        </div>

        {/* Scrollable Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200/80">
              <tr>
                <th className="px-3.5 py-2.5">Crop</th>
                <th className="px-3 py-2.5">Temp (°C)</th>
                <th className="px-3 py-2.5">Rainfall (mm)</th>
                <th className="px-3 py-2.5">Humidity (%)</th>
                <th className="px-3 py-2.5">Soil Moist (%)</th>
                <th className="px-3.5 py-2.5 text-right text-emerald-800 font-bold">Yield (t/ha)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {datasetRows.slice(0, 5).map((row) => (
                <tr
                  key={row.id}
                  onClick={() => setSelectedCrop(row.crop)}
                  className="hover:bg-emerald-50/50 cursor-pointer transition-colors"
                >
                  <td className="px-3.5 py-2 font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    {row.crop}
                  </td>
                  <td className="px-3 py-2 text-slate-600 font-mono">{row.temp}°</td>
                  <td className="px-3 py-2 text-slate-600 font-mono">{row.rainfall}</td>
                  <td className="px-3 py-2 text-slate-600 font-mono">{row.humidity}%</td>
                  <td className="px-3 py-2 text-slate-600 font-mono">{row.soilMoisture}%</td>
                  <td className="px-3.5 py-2 text-right font-mono font-bold text-emerald-700">
                    {row.yield.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-500">
          Click any row to test prediction profile
        </span>
        <button
          onClick={() => setActiveTab('dataset-manager')}
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
        >
          <span>Dataset Manager</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
