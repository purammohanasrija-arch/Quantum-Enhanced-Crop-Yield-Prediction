import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FarmProvider, useFarm } from './context/FarmContext';
import LandingPage from './components/landing/LandingPage';
import DashboardLayout from './components/dashboard/DashboardLayout';

function MainRouter() {
  const { currentPage, setCurrentPage, setActiveTab } = useFarm();

  // Listen to hash changes (e.g., #dashboard, #quantum-lab)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('/dashboard') || hash === 'dashboard') {
        setCurrentPage('dashboard');
      } else if (hash) {
        // Can be a tab id like #quantum-lab or #what-if
        const tabs = [
          'dataset-manager', 'crop-prediction', 'what-if', 'risk-analysis',
          'farm-health', 'analytics', 'weather', 'quantum-lab', 'explainable-ai',
          'recommendations', 'farm-history', 'reports', 'digital-twin'
        ];
        if (tabs.includes(hash)) {
          setCurrentPage('dashboard');
          setActiveTab(hash);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setCurrentPage, setActiveTab]);

  return (
    <AnimatePresence mode="wait">
      {currentPage === 'landing' ? (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4 }}
        >
          <LandingPage />
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <DashboardLayout />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <FarmProvider>
      <MainRouter />
    </FarmProvider>
  );
}
