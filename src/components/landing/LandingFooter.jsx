import React from 'react';
import { Sprout, Atom, Globe, ExternalLink, Heart } from 'lucide-react';
import { useFarm } from '../../context/FarmContext';


export default function LandingFooter() {
  const { navigateToDashboard } = useFarm();

  return (
    <footer className="bg-emerald-950 text-emerald-200/80 border-t border-emerald-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-emerald-950">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Q-FARM TWIN
              </span>
            </div>
            <p className="text-xs leading-relaxed text-emerald-300/70">
              Quantum-Enhanced Crop Yield Prediction & Intelligent Farm Decision Support.
              Empowering farmers with digital twin simulations and hybrid QML intelligence.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-[11px] text-cyan-300 font-mono">
              <Atom className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
              IBM Qiskit & FastAPI Architecture
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Core Modules</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateToDashboard('crop-prediction')} className="hover:text-emerald-300 transition-colors">
                  Crop Yield Prediction
                </button>
              </li>
              <li>
                <button onClick={() => navigateToDashboard('what-if')} className="hover:text-emerald-300 transition-colors">
                  What-If Microclimate Simulator
                </button>
              </li>
              <li>
                <button onClick={() => navigateToDashboard('risk-analysis')} className="hover:text-emerald-300 transition-colors">
                  Multi-Factor Risk Analysis
                </button>
              </li>
              <li>
                <button onClick={() => navigateToDashboard('farm-health')} className="hover:text-emerald-300 transition-colors">
                  Farm Health Score Index
                </button>
              </li>
              <li>
                <button onClick={() => navigateToDashboard('digital-twin')} className="hover:text-emerald-300 transition-colors">
                  Interactive Digital Farm Twin
                </button>
              </li>
            </ul>
          </div>

          {/* Research & Quantum */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quantum Lab</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateToDashboard('quantum-lab')} className="hover:text-emerald-300 transition-colors">
                  Variational Quantum Regressor (VQR)
                </button>
              </li>
              <li>
                <button onClick={() => navigateToDashboard('quantum-lab')} className="hover:text-emerald-300 transition-colors">
                  Interactive Quantum Circuit Visualizer
                </button>
              </li>
              <li>
                <button onClick={() => navigateToDashboard('explainable-ai')} className="hover:text-emerald-300 transition-colors">
                  Explainable AI & Feature Importance
                </button>
              </li>
              <li>
                <button onClick={() => navigateToDashboard('analytics')} className="hover:text-emerald-300 transition-colors">
                  Classical vs Quantum Benchmarks
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Farm Management</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateToDashboard('dataset-manager')} className="hover:text-emerald-300 transition-colors">
                  Agricultural Dataset Manager
                </button>
              </li>
              <li>
                <button onClick={() => navigateToDashboard('weather')} className="hover:text-emerald-300 transition-colors">
                  Weather & Microclimate Intelligence
                </button>
              </li>
              <li>
                <button onClick={() => navigateToDashboard('recommendations')} className="hover:text-emerald-300 transition-colors">
                  Prescriptive Agronomic Actions
                </button>
              </li>
              <li>
                <button onClick={() => navigateToDashboard('reports')} className="hover:text-emerald-300 transition-colors">
                  Farm Audit & Yield Reports
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400/60 gap-4">
          <p>© 2026 Q-FARM TWIN. Built for IBM Qiskit & Sustainable Agriculture Innovation.</p>
          <div className="flex items-center gap-6">
            <span>React • Tailwind • Framer Motion • Recharts</span>
            <span className="text-cyan-400 font-mono">FastAPI + Qiskit Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
