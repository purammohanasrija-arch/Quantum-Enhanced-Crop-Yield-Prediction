import React from 'react';
import { motion } from 'framer-motion';
import { Atom, Cpu, ArrowRight, Layers, Sliders, CheckCircle2, Sparkles, Binary } from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export default function QuantumTechSection() {
  const { navigateToDashboard } = useFarm();

  const techSpecs = [
    { label: 'Register', value: '4 Qubits (q₀–q₃)', desc: 'Rain, Temp, Moisture, Nitrogen' },
    { label: 'Feature Map', value: 'ZZFeatureMap', desc: 'Linear CX non-linear phase coupling' },
    { label: 'Ansatz', value: 'TwoLocal (16 θ)', desc: 'Circular CNOT ring entanglement' },
    { label: 'Readout', value: 'StatevectorEstimator', desc: 'Pauli-Z ⟨∑ Z_j⟩ expectation in [-4, 4]' }
  ];

  const qubitMappings = [
    { qubit: 'q₀', feature: 'Rainfall', unit: '300 – 1500 mm', phase: 'x₀ ∈ [0, π]', color: 'text-teal-400 bg-teal-950/60 border-teal-500/40' },
    { qubit: 'q₁', feature: 'Temperature', unit: '10 – 45 °C', phase: 'x₁ ∈ [0, π]', color: 'text-orange-400 bg-orange-950/60 border-orange-500/40' },
    { qubit: 'q₂', feature: 'Soil Moisture', unit: '10 – 90 %', phase: 'x₂ ∈ [0, π]', color: 'text-cyan-400 bg-cyan-950/60 border-cyan-500/40' },
    { qubit: 'q₃', feature: 'Available Nitrogen', unit: '20 – 160 kg/ha', phase: 'x₃ ∈ [0, π]', color: 'text-purple-400 bg-purple-950/60 border-purple-500/40' }
  ];

  return (
    <section id="technology" className="py-20 bg-[#08111e] text-white relative overflow-hidden border-t border-slate-800">
      {/* Ambient Quantum Glow */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3 font-mono"
          >
            <Atom className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>IBM Qiskit 1.0 Architecture</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Quantum Machine Learning{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
              Engine
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed"
          >
            Operating on a 4-qubit Hilbert space ($2^4 = 16$ basis states), Q-FARM TWIN utilizes a Variational Quantum Regressor (VQR) to capture complex climate-crop interdependencies classical models miss.
          </motion.p>
        </div>

        {/* 4-Qubit Register Mapping Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {qubitMappings.map((q, idx) => (
            <motion.div
              key={q.qubit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded-lg border ${q.color}`}>
                    {q.qubit}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{q.phase}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{q.feature}</h3>
                <p className="text-xs text-slate-400">{q.unit}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
                MinMax Radian Normalization
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Specification Strip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0a1829] to-slate-900 border border-cyan-500/30 shadow-2xl mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            {techSpecs.map((spec) => (
              <div key={spec.label} className="space-y-1">
                <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                  {spec.label}
                </span>
                <div className="text-base sm:text-lg font-bold text-white">
                  {spec.value}
                </div>
                <p className="text-xs text-slate-400 leading-tight">
                  {spec.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA to Quantum Lab */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigateToDashboard('quantum-lab')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-violet-500 to-cyan-500 text-white font-bold text-base shadow-xl shadow-purple-600/25 hover:shadow-cyan-500/30 border border-purple-400/30 transition-all cursor-pointer"
          >
            <Atom className="w-5 h-5 text-cyan-200" />
            <span>Launch Quantum Lab & Circuit Editor</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
