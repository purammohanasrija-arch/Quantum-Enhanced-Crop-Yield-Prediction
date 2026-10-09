import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import DashboardOverview from './DashboardOverview';
import DatasetManagerView from '../views/DatasetManagerView';
import CropPredictionView from '../views/CropPredictionView';
import WhatIfSimulatorView from '../views/WhatIfSimulatorView';
import RiskAnalysisView from '../views/RiskAnalysisView';
import FarmHealthView from '../views/FarmHealthView';
import AnalyticsView from '../views/AnalyticsView';
import WeatherIntelligenceView from '../views/WeatherIntelligenceView';
import QuantumLabView from '../views/QuantumLabView';
import ExplainableAIView from '../views/ExplainableAIView';
import RecommendationsView from '../views/RecommendationsView';
import FarmHistoryView from '../views/FarmHistoryView';
import ReportsView from '../views/ReportsView';
import DigitalFarmTwinView from '../views/DigitalFarmTwinView';
import { useFarm } from '../../context/FarmContext';

export default function DashboardLayout() {
  const { activeTab } = useFarm();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Render view by activeTab
  const renderCurrentView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'dataset-manager':
        return <DatasetManagerView />;
      case 'crop-prediction':
        return <CropPredictionView />;
      case 'what-if':
        return <WhatIfSimulatorView />;
      case 'risk-analysis':
        return <RiskAnalysisView />;
      case 'farm-health':
        return <FarmHealthView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'weather':
        return <WeatherIntelligenceView />;
      case 'quantum-lab':
        return <QuantumLabView />;
      case 'explainable-ai':
        return <ExplainableAIView />;
      case 'recommendations':
        return <RecommendationsView />;
      case 'farm-history':
        return <FarmHistoryView />;
      case 'reports':
        return <ReportsView />;
      case 'digital-twin':
        return <DigitalFarmTwinView />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf7] text-slate-800 flex">
      {/* Sidebar Navigation */}
      <DashboardSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area (Offset by sidebar width on desktop) */}
      <div className="flex-1 lg:pl-68 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header */}
        <DashboardHeader
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />

        {/* View Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {renderCurrentView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
