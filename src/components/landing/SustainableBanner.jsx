import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Leaf, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export default function SustainableBanner() {
  const { navigateToDashboard } = useFarm();

  return (
    <section id="impact" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-900 via-green-900 to-teal-950 text-white p-8 sm:p-12 lg:p-16 border border-emerald-600/40 shadow-2xl">
        {/* Ambient Lights */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-800/80 border border-emerald-400/40 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-4">
            <Leaf className="w-3.5 h-3.5 text-emerald-300" />
            Global Climate & Food Security
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Towards a Sustainable <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-300 via-green-200 to-cyan-300 bg-clip-text text-transparent">
              Agricultural Future
            </span>
          </h2>

          <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed mb-8 max-w-2xl">
            Empowering farmers, agricultural researchers, and regional policymakers with
            intelligent, data-driven, and quantum-enhanced agricultural insights. Minimize resource waste,
            shield crops from climate volatility, and secure high-yield harvests.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateToDashboard('dashboard')}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 text-slate-950 font-bold text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/40 transition-all duration-300"
            >
              <span>Explore Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigateToDashboard('quantum-lab')}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-400/40 text-emerald-200 font-semibold text-base transition-colors"
            >
              <span>Inspect Quantum Lab</span>
            </motion.button>
          </div>
        </div>

        {/* Live Metrics Floating Over Banner */}
        <div className="mt-12 pt-8 border-t border-emerald-700/50 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">4.52 t/ha</div>
            <div className="text-xs text-emerald-300/80 mt-1">Simulated Yield Avg</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">-18%</div>
            <div className="text-xs text-emerald-300/80 mt-1">Water Waste Reduction</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">92%</div>
            <div className="text-xs text-emerald-300/80 mt-1">Model Confidence</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">2^N</div>
            <div className="text-xs text-emerald-300/80 mt-1">Hilbert Space Expressivity</div>
          </div>
        </div>
      </div>
    </section>
  );
}
