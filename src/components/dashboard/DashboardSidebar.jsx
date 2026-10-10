import React from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Database,
  Sprout,
  Sliders,
  AlertTriangle,
  Heart,
  BarChart3,
  CloudSun,
  Atom,
  HelpCircle,
  Lightbulb,
  History,
  FileText,
  Radio,
  LogOut,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export default function DashboardSidebar({ mobileOpen, onCloseMobile }) {
  const { activeTab, setActiveTab, navigateToLanding } = useFarm();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'dataset-manager', label: 'Dataset Manager', icon: Database },
    { id: 'crop-prediction', label: 'Crop Prediction', icon: Sprout },
    { id: 'what-if', label: 'What-If Simulator', icon: Sliders },
    { id: 'risk-analysis', label: 'Risk Analysis', icon: AlertTriangle },
    { id: 'farm-health', label: 'Farm Health', icon: Heart },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'weather', label: 'Weather Intelligence', icon: CloudSun },
    { id: 'quantum-lab', label: 'Quantum Lab', icon: Atom, highlight: true },
    { id: 'explainable-ai', label: 'Explainable AI', icon: HelpCircle },
    { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
    { id: 'farm-history', label: 'Farm History', icon: History },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'digital-twin', label: 'Digital Farm Twin', icon: Radio, badge: 'LIVE' },
  ];

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Main Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-68 bg-[#092b19] border-r border-[#0d3d23] text-emerald-100 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Brand Section */}
        <div className="p-5 border-b border-[#0d3d23]/80">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={navigateToLanding}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-emerald-950 shadow-md group-hover:scale-105 transition-transform">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                <span>Q-FARM</span>
                <span className="text-emerald-400">TWIN</span>
              </div>
              <span className="text-[10px] text-emerald-300/80 font-mono tracking-wider uppercase block">
                Digital Farm Twin powered by AI & Quantum
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-emerald-700/80 text-white font-semibold shadow-md shadow-emerald-950/40 border border-emerald-500/40'
                    : 'text-emerald-100/75 hover:bg-[#0d3d23]/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? 'text-emerald-300'
                        : item.highlight
                        ? 'text-cyan-400 animate-pulse'
                        : 'text-emerald-400/80 group-hover:text-emerald-300'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-cyan-500/30 text-cyan-300 font-bold border border-cyan-400/30">
                    {item.badge}
                  </span>
                )}
                {item.highlight && !item.badge && (
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 opacity-80" />
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Banner Card: "Smarter Farming, Brighter Tomorrows" */}
        <div className="p-3 border-t border-[#0d3d23]/80 space-y-2">
          <div className="relative rounded-2xl p-4 overflow-hidden bg-gradient-to-br from-emerald-900/90 to-[#062013] border border-emerald-700/40">
            {/* Ambient Leaf Motif Overlay */}
            <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none translate-x-2 translate-y-2">
              <Sprout className="w-24 h-24 text-emerald-400" />
            </div>

            <div className="relative z-10">
              <div className="text-xs font-bold text-white mb-0.5">
                Smarter Farming
              </div>
              <div className="text-[11px] font-semibold text-emerald-300 mb-2">
                Brighter Tomorrows
              </div>
              <p className="text-[10px] text-emerald-200/70 leading-tight mb-3">
                Hybrid quantum algorithms optimize resource allocation and harvest yields.
              </p>
              <button
                onClick={() => handleSelectTab('quantum-lab')}
                className="w-full py-1.5 px-2.5 rounded-lg bg-emerald-600/60 hover:bg-emerald-600 text-white text-[10px] font-semibold transition-colors flex items-center justify-center gap-1.5 border border-emerald-400/30"
              >
                <span>Open Quantum Lab</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Logout / Exit to Landing */}
          <button
            onClick={navigateToLanding}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-emerald-200/80 hover:text-white hover:bg-emerald-900/60 text-xs font-medium transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit to Home</span>
          </button>
        </div>
      </aside>
    </>
  );
}
