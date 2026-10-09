import React from 'react';
import { motion } from 'framer-motion';
import LandingNavbar from './LandingNavbar';
import Hero from './Hero';
import WhySection from './WhySection';
import HowItWorks from './HowItWorks';
import SustainableBanner from './SustainableBanner';
import LandingFooter from './LandingFooter';

export default function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#f8faf7] text-slate-800 flex flex-col"
    >
      <LandingNavbar />
      <main className="flex-1">
        <Hero />
        <WhySection />
        <HowItWorks />
        <SustainableBanner />
      </main>
      <LandingFooter />
    </motion.div>
  );
}
