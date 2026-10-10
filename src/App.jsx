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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#08111e] text-slate-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Something went wrong</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              An unexpected render issue occurred while loading this view.
            </p>
            {this.state.error && (
              <div className="bg-[#040810] border border-slate-800 rounded-lg p-2.5 text-left font-mono text-[11px] text-rose-300 max-h-28 overflow-y-auto">
                {this.state.error.toString()}
              </div>
            )}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  window.location.hash = '';
                  window.location.reload();
                }}
                className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
              >
                Reload App
              </button>
              <button
                type="button"
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.hash = '#dashboard';
                }}
                className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <FarmProvider>
        <MainRouter />
      </FarmProvider>
    </ErrorBoundary>
  );
}
