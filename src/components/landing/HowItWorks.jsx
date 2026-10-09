import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Atom, TrendingUp, Sparkles, Sprout, ArrowRight } from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export default function HowItWorks() {
  const { navigateToDashboard } = useFarm();

  const steps = [
    {
      num: '01',
      title: 'Upload or Input Farm Data',
      desc: 'Import CSV/Excel files or input field sensor readings: rainfall, moisture, soil NPK, and temperatures.',
      icon: Upload,
      tab: 'dataset-manager',
      color: 'bg-emerald-500'
    },
    {
      num: '02',
      title: 'AI + Quantum Analysis',
      desc: 'Data encoded into high-dimensional Hilbert quantum states with ZZFeatureMap & trained variational ansatz.',
      icon: Atom,
      tab: 'quantum-lab',
      color: 'bg-cyan-500'
    },
    {
      num: '03',
      title: 'Predict & Simulate',
      desc: 'Calculate baseline yield and execute real-time What-If climate scenarios to test interventions.',
      icon: TrendingUp,
      tab: 'what-if',
      color: 'bg-green-600'
    },
    {
      num: '04',
      title: 'Get Insights',
      desc: 'Review Explainable AI feature importance, multi-factor risk radar, and comprehensive farm health scores.',
      icon: Sparkles,
      tab: 'explainable-ai',
      color: 'bg-amber-500'
    },
    {
      num: '05',
      title: 'Make Better Decisions',
      desc: 'Execute prescriptive irrigation schedules, soil nutrition balancing, and climate hazard safeguards.',
      icon: Sprout,
      tab: 'recommendations',
      color: 'bg-emerald-700'
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Quantum Grid Ambient */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-32 left-1/3 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3"
          >
            Operational Pipeline
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          >
            How It Works?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 text-base sm:text-lg"
          >
            A continuous loop from raw farm telemetry to quantum evaluation and actionable field decisions.
          </motion.p>
        </div>

        {/* Steps Flow Container */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                onClick={() => navigateToDashboard(step.tab)}
                className="cursor-pointer relative bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-400/80 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                      STEP {step.num}
                    </span>
                    <div className={`w-10 h-10 rounded-xl ${step.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-emerald-400">
                  <span className="font-medium">Try now</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA in How It Works */}
        <div className="mt-14 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigateToDashboard('dashboard')}
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-base shadow-xl shadow-emerald-600/20 hover:shadow-emerald-500/40 border border-emerald-300/40 transition-all"
          >
            <span>Launch Interactive Flow</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
