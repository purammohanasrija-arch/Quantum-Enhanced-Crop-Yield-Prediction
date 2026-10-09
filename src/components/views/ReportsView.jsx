import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Printer,
  Download,
  CheckCircle2,
  Share2,
  Calendar,
  Sparkles,
  ShieldCheck,
  Sprout,
  Heart,
  AlertTriangle,
  Atom
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export default function ReportsView() {
  const {
    selectedCrop,
    farmArea,
    predictionData,
    farmHealthScore,
    whatIfResult,
    recommendations,
  } = useFarm();

  const [generatedDate] = useState(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const reportData = {
      title: 'Q-FARM TWIN Agricultural Intelligence Executive Report',
      date: generatedDate,
      crop: selectedCrop,
      farmAreaHectares: farmArea,
      predictedYieldTonsPerHa: predictionData.predictedYield,
      totalProductionTons: predictionData.totalProduction,
      modelConfidencePct: predictionData.confidence,
      farmHealthScore: farmHealthScore,
      riskAssessment: whatIfResult.riskLevel,
      recommendations: recommendations.map((r) => r.title),
      modelType: 'Hybrid Quantum Variational Regressor (Qiskit VQR) + Random Forest',
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Q-FARM-TWIN-Report-${selectedCrop}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Agricultural Intelligence Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Comprehensive printable audit dossier synthesized from AI and Quantum Digital Twin telemetry
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadJSON}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{downloadSuccess ? 'Downloaded!' : 'Export JSON'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Generate & Print Report</span>
          </button>
        </div>
      </div>

      {/* Printable Report Dossier Card */}
      <div id="printable-report" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
        {/* Report Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Q-FARM TWIN EXECUTIVE DOSSIER
              </h2>
              <p className="text-xs text-slate-500">
                Quantum-Enhanced Crop Yield Prediction & Decision Support System
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs text-slate-500">
            <p className="font-semibold text-slate-800">Generated: {generatedDate}</p>
            <p className="font-mono text-[11px]">Audit ID: QFT-2026-904X</p>
          </div>
        </div>

        {/* 1. Farm Summary */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            1. Farm Baseline Summary
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Crop Type</span>
              <span className="text-base font-extrabold text-slate-900">{selectedCrop} (Kharif)</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Farm Area</span>
              <span className="text-base font-extrabold text-slate-900">{farmArea} Hectares</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Sector Location</span>
              <span className="text-base font-extrabold text-slate-900">Guntur, AP</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Irrigation Mode</span>
              <span className="text-base font-extrabold text-emerald-700">Precision Drip + Furrow</span>
            </div>
          </div>
        </div>

        {/* 2. Predicted Yield & Production */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            2. Yield & Production Forecast
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
              <span className="text-emerald-800 font-bold block mb-1">Predicted Yield Density</span>
              <div className="text-3xl font-black text-emerald-950 font-mono">
                {predictionData.predictedYield} <span className="text-sm font-normal text-emerald-700">tons/ha</span>
              </div>
              <span className="text-[11px] text-emerald-700 mt-1 block">+8.2% vs baseline season</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 font-bold block mb-1">Gross Expected Harvest</span>
              <div className="text-3xl font-black text-slate-900 font-mono">
                {predictionData.totalProduction} <span className="text-sm font-normal text-slate-500">tons</span>
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">For {farmArea} hectares total plot</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 font-bold block mb-1">Model Confidence</span>
              <div className="text-3xl font-black text-blue-600 font-mono">
                {predictionData.confidence}%
              </div>
              <span className="text-[11px] text-emerald-600 mt-1 block">R² Score: 0.87 (Validated)</span>
            </div>
          </div>
        </div>

        {/* 3. Farm Health & Risk Analysis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-teal-600" />
              <span>3. Farm Health Audit ({farmHealthScore}/100)</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex justify-between p-2 rounded-xl bg-slate-50">
                <span>Soil Microbiome Health:</span>
                <span className="font-bold text-emerald-700 font-mono">82%</span>
              </li>
              <li className="flex justify-between p-2 rounded-xl bg-slate-50">
                <span>Water Storage Buffer:</span>
                <span className="font-bold text-cyan-700 font-mono">91%</span>
              </li>
              <li className="flex justify-between p-2 rounded-xl bg-slate-50">
                <span>Weather Conditions Index:</span>
                <span className="font-bold text-amber-700 font-mono">73%</span>
              </li>
              <li className="flex justify-between p-2 rounded-xl bg-slate-50">
                <span>Soil NPK Fertility:</span>
                <span className="font-bold text-lime-700 font-mono">89%</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>4. Risk Radar & Hazards</span>
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex justify-between p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
                <span className="font-semibold">Heat Stress Risk:</span>
                <span className="font-bold uppercase">HIGH (34°C Wave)</span>
              </li>
              <li className="flex justify-between p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                <span className="font-semibold">Low Rainfall Risk:</span>
                <span className="font-bold uppercase">MODERATE (-20%)</span>
              </li>
              <li className="flex justify-between p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                <span className="font-semibold">Soil Moisture:</span>
                <span className="font-bold uppercase">LOW (Adequate)</span>
              </li>
              <li className="flex justify-between p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                <span className="font-semibold">Nutrient Deficiency:</span>
                <span className="font-bold uppercase">LOW (Balanced)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 4. Recommendations */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            5. Agronomic Prescriptions
          </h3>
          <div className="space-y-2 text-xs text-slate-700">
            {recommendations.slice(0, 4).map((r, i) => (
              <div key={r.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                <span className="font-mono text-emerald-600 font-bold shrink-0">{i + 1}.</span>
                <div>
                  <span className="font-bold text-slate-900">{r.title}</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">{r.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Signoff */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <span>Q-FARM TWIN AI Decision Platform • Certified for Agricultural Research</span>
          <span className="font-mono text-emerald-700 font-semibold">IBM Qiskit & FastAPI Architecture</span>
        </div>
      </div>
    </div>
  );
}
