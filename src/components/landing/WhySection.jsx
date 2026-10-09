import React from 'react';
import { motion } from 'framer-motion';
import { Atom, ShieldAlert, Sliders, Lightbulb, ArrowUpRight } from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export default function WhySection() {
  const { navigateToDashboard } = useFarm();

  const cards = [
    {
      title: 'AI + Quantum Power',
      desc: 'Advanced AI and quantum computing algorithms for ultra-high-accuracy agricultural yield predictions.',
      icon: Atom,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200/80',
      badge: 'Quantum VQR',
      tab: 'quantum-lab'
    },
    {
      title: 'Early Risk Detection',
      desc: 'Identify critical vulnerabilities like heat stress, drought periods, flood surges, and nutrient deficiencies.',
      icon: ShieldAlert,
      color: 'bg-rose-50 text-rose-600 border-rose-200/80',
      badge: 'Predictive Alert',
      tab: 'risk-analysis'
    },
    {
      title: 'What-If Simulation',
      desc: 'Test virtual scenarios before applying resources. See instant yield impact of rainfall, temp, and fertilization.',
      icon: Sliders,
      color: 'bg-sky-50 text-sky-600 border-sky-200/80',
      badge: 'Real-Time Twin',
      tab: 'what-if'
    },
    {
      title: 'Actionable Insights',
      desc: 'Clear, practical, and data-backed recommendations to optimize irrigation cycles and enhance harvest output.',
      icon: Lightbulb,
      color: 'bg-lime-50 text-lime-600 border-lime-200/80',
      badge: 'Agronomy AI',
      tab: 'recommendations'
    },
  ];

  return (
    <section id="why" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3"
        >
          Core Innovations
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
        >
          Why Q-FARM TWIN?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed"
        >
          Traditional agriculture relies on delayed historical averages. Q-FARM TWIN unites quantum machine
          learning and digital twin simulation to give farmers predictive precision.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 }}
              whileHover={{ y: -6 }}
              onClick={() => navigateToDashboard(card.tab)}
              className="cursor-pointer bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${card.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-bold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {card.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600 group-hover:text-emerald-700">
                <span>Explore Feature</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
