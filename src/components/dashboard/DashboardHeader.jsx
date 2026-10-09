import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  CloudSun,
  Bell,
  User,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  Sprout,
  Check,
  AlertCircle,
  Atom,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export default function DashboardHeader({ onToggleMobileSidebar }) {
  const {
    navigateToLanding,
    notifications,
    setNotifications,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
  } = useFarm();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showVNQFFModal, setShowVNQFFModal] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header className="sticky top-0 z-30 h-18 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between shadow-xs">
      {/* Left: Mobile hamburger & Search bar */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-xl">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crops, datasets, simulations, locations..."
            className="w-full pl-10 pr-4 py-2 rounded-full text-xs sm:text-sm bg-slate-100/80 border border-slate-200/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right: VNQFF-03 Badge, Weather Pill, Notifications, Farmer Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* VNQFF-03 Hackathon Track Button */}
        <button
          onClick={() => setShowVNQFFModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 border border-purple-200/90 text-purple-900 text-xs font-bold transition-all shadow-xs cursor-pointer"
          title="Click to view VNQFF-03 Hackathon Track Verification"
        >
          <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
          <Atom className="w-3.5 h-3.5 text-purple-600" />
          <span className="font-mono">VNQFF-03</span>
        </button>

        {/* Weather Intelligence Pill */}
        <div
          onClick={() => setActiveTab('weather')}
          className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-amber-50/80 border border-amber-200/70 text-amber-900 cursor-pointer hover:bg-amber-100/70 transition-all shadow-xs"
          title="Click to view full Weather Intelligence"
        >
          <div className="w-6 h-6 rounded-full bg-amber-200/80 flex items-center justify-center text-amber-700">
            <CloudSun className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-left text-xs leading-tight">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <span>Guntur, AP</span>
              <span className="text-emerald-600 font-bold">29°C</span>
            </div>
            <span className="text-[10px] text-slate-500">Partly Cloudy</span>
          </div>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-80 sm:w-88 rounded-2xl bg-white border border-slate-200 shadow-xl p-3 z-50 text-left"
              >
                <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Farm Alerts ({notifications.length})
                  </span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-800"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-1">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-2.5 rounded-xl hover:bg-slate-50 transition-colors ${item.unread ? 'bg-emerald-50/40' : ''}`}
                    >
                      <div className="flex items-start gap-2.5">
                        <AlertCircle className={`w-4 h-4 mt-0.5 shrink-0 ${item.id === 1 ? 'text-amber-500' : 'text-emerald-600'}`} />
                        <div>
                          <p className="text-xs font-semibold text-slate-800">{item.title}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{item.text}</p>
                          <span className="text-[10px] text-slate-400 font-mono mt-1 block">{item.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Farmer Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 transition-colors"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-xs">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden sm:block text-left text-xs leading-none">
              <div className="font-bold text-slate-800">Farmer</div>
              <span className="text-[10px] text-slate-400">Ravi Patel</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-52 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 text-xs"
              >
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <p className="font-bold text-slate-800">Farm Admin</p>
                  <p className="text-[10px] text-slate-500">Guntur Precision Sector 4</p>
                </div>
                <button
                  onClick={() => { setActiveTab('reports'); setShowProfileMenu(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors"
                >
                  Generate Audit Report
                </button>
                <button
                  onClick={() => { navigateToLanding(); setShowProfileMenu(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 text-emerald-700 font-semibold transition-colors flex items-center justify-between"
                >
                  <span>Landing Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* VNQFF-03 Problem Statement Interactive Modal */}
      <AnimatePresence>
        {showVNQFFModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl bg-[#0f172a] text-white rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowVNQFFModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header Badge & Title */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#581c87]/60 text-purple-300 font-mono text-xs font-bold border border-purple-500/40">
                  <Atom className="w-3.5 h-3.5 text-purple-400" />
                  <span>VNQFF-03</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Quantum-Enhanced Crop Yield Prediction
                </h2>
              </div>

              {/* 4 Pillars from Official Problem Statement */}
              <div className="space-y-4 text-xs sm:text-sm">
                {/* 1. Problem */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-purple-400 font-bold block text-xs uppercase tracking-wider">
                    Problem:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    Yield depends on complex interactions between soil, weather, crop characteristics, irrigation, and historical agricultural conditions.
                  </p>
                </div>

                {/* 2. Quantum Approach & How It Helps */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-purple-400 font-bold block text-xs uppercase tracking-wider">
                    Quantum Approach & How It Helps:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    <strong>Hybrid Quantum-Classical Yield Prediction</strong> — Classical layers process satellite, soil, and weather features, while a <strong>PQC / QML layer</strong> learns nonlinear relationships for yield forecasting and field-level recommendations.
                  </p>
                </div>

                {/* 3. Expected Impact */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-purple-400 font-bold block text-xs uppercase tracking-wider">
                    Expected Impact:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    Improved yield forecasting and more efficient use of irrigation and agricultural inputs.
                  </p>
                </div>

                {/* 4. Applicability */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-purple-400 font-bold block text-xs uppercase tracking-wider">
                    Applicability:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    Agriculture departments, Rythu Bharosa Kendras (RBKs), cooperatives, and agri-tech platforms.
                  </p>
                </div>
              </div>

              {/* Quick Navigation to Corresponding Live Modules */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Verify Live Implementation in Q-FARM TWIN:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => { setActiveTab('quantum-lab'); setShowVNQFFModal(false); }}
                    className="p-3 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-800/80 text-purple-200 text-xs font-semibold text-left flex items-center justify-between transition-colors"
                  >
                    <span>1. PQC / QML Layer (Quantum Lab)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => { setActiveTab('what-if'); setShowVNQFFModal(false); }}
                    className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold text-left flex items-center justify-between transition-colors"
                  >
                    <span>2. Irrigation & Input Efficiency (What-If)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => { setActiveTab('recommendations'); setShowVNQFFModal(false); }}
                    className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold text-left flex items-center justify-between transition-colors"
                  >
                    <span>3. Field-Level Recommendations</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => { setActiveTab('reports'); setShowVNQFFModal(false); }}
                    className="p-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800/80 text-emerald-200 text-xs font-semibold text-left flex items-center justify-between transition-colors"
                  >
                    <span>4. RBK & Agri Dept Audit (Reports)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
