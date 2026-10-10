import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Atom, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export default function LandingNavbar() {
  const { navigateToDashboard } = useFarm();

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 w-full bg-emerald-950/85 backdrop-blur-md border-b border-emerald-800/40 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 shadow-lg shadow-emerald-500/20 text-emerald-950">
            <Sprout className="w-6 h-6 text-white" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-1 border border-cyan-400/40 rounded-xl pointer-events-none"
            />
          </div>
          <div>
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-emerald-100 to-emerald-300 bg-clip-text text-transparent">
              Q-FARM TWIN
            </span>
            <div className="flex items-center gap-1.5 text-[10px] text-cyan-300 font-mono tracking-wider uppercase">
              <Atom className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
              Digital Farm Twin powered by AI & Quantum
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-emerald-100/90">
          <a href="#hero" className="hover:text-emerald-300 transition-colors">Home</a>
          <a href="#why" className="hover:text-emerald-300 transition-colors">Why Q-Farm</a>
          <a href="#how-it-works" className="hover:text-emerald-300 transition-colors">How It Works</a>
          <a href="#technology" className="hover:text-emerald-300 transition-colors">Quantum Tech</a>
          <a href="#impact" className="hover:text-emerald-300 transition-colors">Impact</a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigateToDashboard('dashboard')}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold text-sm shadow-md hover:shadow-emerald-500/30 transition-all duration-300 border border-emerald-400/30"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
