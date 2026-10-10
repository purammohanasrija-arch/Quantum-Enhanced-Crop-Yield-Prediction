import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  AlertTriangle,
  Sliders,
  Lightbulb,
  ArrowRight,
  Atom,
  Cpu,
  Layers,
  Sparkles,
  Plane,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export default function Hero() {
  const { navigateToDashboard } = useFarm();

  const featurePills = [
    {
      title: 'Accurate Yield Prediction',
      desc: '4-Qubit VQR + Random Forest',
      icon: TrendingUp,
      tab: 'crop-prediction',
      color: 'from-emerald-500/20 to-green-600/20 text-emerald-300 border-emerald-500/40'
    },
    {
      title: 'Risk Analysis & Early Warning',
      desc: 'Heat stress, drought, disease radar',
      icon: AlertTriangle,
      tab: 'risk-analysis',
      color: 'from-amber-500/20 to-orange-600/20 text-amber-300 border-amber-500/40'
    },
    {
      title: 'What-If Simulation',
      desc: 'Interactive microclimate digital twin',
      icon: Sliders,
      tab: 'what-if',
      color: 'from-cyan-500/20 to-blue-600/20 text-cyan-300 border-cyan-500/40'
    },
    {
      title: 'Actionable Recommendations',
      desc: 'Precision irrigation & nutrient advice',
      icon: Lightbulb,
      tab: 'recommendations',
      color: 'from-lime-500/20 to-emerald-600/20 text-lime-300 border-lime-500/40'
    },
  ];

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-emerald-950 text-white">
      {/* Background Hero Image with Rich Overlay Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/farm-hero.jpg"
          alt="Smart Agricultural Field with Digital Overlays and Drone"
          className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.08] scale-105 transform motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
          onError={(e) => {
            // Fallback if image fails to render
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Cinematic Gradient Overlays to preserve legibility and agricultural vibe */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-emerald-950/40 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-900/30 via-transparent to-emerald-950/90" />
      </div>

      {/* Futuristic Holographic Grid Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#059669_1px,transparent_1px),linear-gradient(to_bottom,#059669_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Animated Quantum Glow Particles */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 flex-1 flex flex-col items-center text-center justify-center">
        
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-400/40 backdrop-blur-md text-emerald-200 text-xs sm:text-sm font-medium shadow-xl mb-6"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="font-semibold text-emerald-300">Data-Driven Insights</span>
          <span className="text-emerald-500">•</span>
          <span className="text-emerald-200">Smarter Farms</span>
          <span className="text-emerald-500">•</span>
          <span className="text-cyan-300">Sustainable Tomorrow</span>
        </motion.div>

        {/* Big Brand Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center justify-center gap-3 sm:gap-4 mb-4"
        >
          <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-400 shadow-xl shadow-emerald-500/20 text-emerald-950">
            <Atom className="w-8 h-8 sm:w-11 sm:h-11 text-white animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-md">
            Q-FARM <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-cyan-300 bg-clip-text text-transparent">TWIN</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-semibold max-w-4xl text-emerald-100/95 leading-relaxed tracking-tight mb-4"
        >
          Digital Farm Twin powered by AI and Quantum
          <span className="block font-light text-emerald-200/90 text-lg sm:text-2xl mt-1">
            Quantum-Enhanced Crop Yield Prediction & Intelligent Farm Decision Support
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-lg text-emerald-100/80 max-w-2xl font-normal leading-relaxed mb-8"
        >
          Transform agricultural data into intelligent decisions using AI, Quantum Machine Learning,
          Digital Twin technology and real-time What-If simulation.
        </motion.p>

        {/* Main Glowing CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative group mb-12 sm:mb-16"
        >
          {/* Pulsing ambient glow */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-green-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse" />
          
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigateToDashboard('dashboard')}
            className="relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 text-white font-bold text-lg sm:text-xl shadow-2xl border-2 border-emerald-300/50 hover:border-cyan-300 transition-all duration-300"
          >
            <span>Explore Your Farm Dashboard</span>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </motion.button>
        </motion.div>

        {/* 4 Feature Badges / Floating Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl"
        >
          {featurePills.map((pill, idx) => {
            const Icon = pill.icon;
            return (
              <motion.div
                key={pill.title}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => navigateToDashboard(pill.tab)}
                className="cursor-pointer text-left p-4 sm:p-5 rounded-2xl bg-emerald-950/75 hover:bg-emerald-900/80 border border-emerald-700/50 hover:border-emerald-400/80 backdrop-blur-md shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${pill.color} border shadow-inner`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">
                    {pill.title}
                  </h3>
                </div>
                <p className="text-xs text-emerald-200/75 leading-relaxed">
                  {pill.desc}
                </p>
                <div className="mt-3 flex items-center text-xs font-semibold text-emerald-400 group-hover:text-cyan-300">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>

      {/* Decorative Bottom Wave Transition */}
      <div className="w-full h-8 bg-gradient-to-b from-transparent to-[#f8faf7]" />
    </section>
  );
}
