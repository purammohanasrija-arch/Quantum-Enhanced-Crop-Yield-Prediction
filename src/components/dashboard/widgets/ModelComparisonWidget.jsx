import React from 'react';
import { Atom, Cpu, ArrowRight, Info } from 'lucide-react';
import { useFarm } from '../../../context/FarmContext';

export default function ModelComparisonWidget() {
  const { setActiveTab } = useFarm();

  const metrics = [
    { name: 'MAE', classical: '0.42', quantum: '0.38', highlight: true },
    { name: 'RMSE', classical: '0.61', quantum: '0.55', highlight: true },
    { name: 'R² Score', classical: '0.84', quantum: '0.87', highlight: true },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-800">
              <Atom className="w-4 h-4 text-cyan-600 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Quantum vs Classical Performance</h3>
              <p className="text-[10px] text-slate-500">Benchmark validation matrix</p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200">
            Qiskit VQR
          </span>
        </div>

        {/* Comparison Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 mt-2">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200/80">
              <tr>
                <th className="px-3.5 py-2">Metric</th>
                <th className="px-3 py-2 text-slate-700">
                  <span className="flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-slate-400" />
                    Classical ML (RF)
                  </span>
                </th>
                <th className="px-3.5 py-2 text-cyan-700 font-bold bg-cyan-50/50">
                  <span className="flex items-center gap-1">
                    <Atom className="w-3 h-3 text-cyan-600" />
                    Quantum ML (VQR)
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {metrics.map((row) => (
                <tr key={row.name} className="hover:bg-slate-50/60">
                  <td className="px-3.5 py-2 font-bold text-slate-800 font-sans">
                    {row.name}
                  </td>
                  <td className="px-3 py-2 text-slate-600">
                    {row.classical}
                  </td>
                  <td className="px-3.5 py-2 font-bold text-emerald-600 bg-cyan-50/30">
                    {row.quantum}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] text-slate-400 italic mt-2.5 leading-snug flex items-center gap-1">
          <Info className="w-3 h-3 shrink-0" />
          Prototype comparison — replace demo values with experimental results.
        </p>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => setActiveTab('quantum-lab')}
          className="w-full text-xs font-semibold text-cyan-700 hover:text-cyan-800 flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-cyan-50/60 hover:bg-cyan-100/70 transition-colors"
        >
          <span>Open Quantum ML Circuit Lab</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
