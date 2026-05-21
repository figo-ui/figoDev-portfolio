import { useState } from 'react';
import { ArrowRight, GitBranch, Database, Zap, BookOpen, AlertCircle, HelpCircle, Workflow, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DEEP_DIVES } from '../data';
import { DeepDive } from '../types';

export default function DeepDives() {
  const [selectedDive, setSelectedDive] = useState<DeepDive | null>(null);

  const getIconComponent = (iconName: string, cls: string) => {
    switch (iconName) {
      case 'account_tree':
        return <GitBranch className={cls} />;
      case 'schema':
        return <Database className={cls} />;
      case 'sync_alt':
        return <Zap className={cls} />;
      case 'school':
      default:
        return <BookOpen className={cls} />;
    }
  };

  return (
    <section className="py-24 px-5 md:px-12 bg-[#0e0e0e] relative border-t border-white/5" id="deep-dives">
      <div className="absolute inset-0 tilet-pattern-lines opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-left max-w-2xl"
        >
          <h2 className="font-sans text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
            Engineering Deep Dives
          </h2>
          <p className="font-sans text-base md:text-lg text-gray-400 font-light">
            A closer look at the technical architecture and decision-making behind complex systems.
          </p>
        </motion.div>

        {/* Deep Dive Grid Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {DEEP_DIVES.map((dive) => {
            const isGold = dive.accentColor === 'gold';
            return (
              <motion.div
                key={dive.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.98, y: 20 },
                  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
                }}
                whileHover={{ y: -6, borderColor: isGold ? 'rgba(233,195,73,0.3)' : 'rgba(16,185,129,0.3)', transition: { duration: 0.2 } }}
                onClick={() => setSelectedDive(dive)}
                className="bg-[#121212] border border-white/10 p-8 rounded-2xl hover:bg-white/[0.03] transition-all duration-300 cursor-pointer group text-left flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div
                      className={`p-3 rounded-xl ${
                        isGold ? 'bg-yellow-500/10 text-[#e9c349]' : 'bg-emerald-500/10 text-[#4edea3]'
                      }`}
                    >
                      {getIconComponent(dive.icon, 'w-6 h-6')}
                    </div>
                    <span className="text-gray-600 group-hover:text-white transition-colors">
                      <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                  <h3 className="font-sans text-xl md:text-2xl font-black text-white mb-3">
                    {dive.title}
                  </h3>
                  <p className="font-sans text-sm text-gray-400 leading-relaxed font-light">
                    {dive.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                    Interactive Breakdown
                  </span>
                  <span className={`font-mono text-[10px] font-bold ${
                    isGold ? 'text-[#e9c349]' : 'text-[#4edea3]'
                  }`}>
                    Analyze Architecture &rarr;
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Detailed Expandable Drawer Overlay */}
        <AnimatePresence>
          {selectedDive && (
            <div className="fixed inset-0 z-50 flex items-center justify-end">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedDive(null)}
                className="absolute inset-0 bg-[#050505]/90 backdrop-blur-sm cursor-pointer"
              />

              {/* Drawer Sheet */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                className="relative w-full max-w-xl h-full bg-[#121212] border-l border-white/10 shadow-2xl p-6 md:p-8 flex flex-col justify-between overflow-y-auto z-10 text-left"
              >
                <div>
                  {/* Close drawer container */}
                  <div className="flex justify-between items-center pb-6 border-b border-white/5 mb-8">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          selectedDive.accentColor === 'gold' ? 'bg-yellow-500/10 text-[#e9c349]' : 'bg-emerald-500/10 text-[#4edea3]'
                        }`}
                      >
                        {getIconComponent(selectedDive.icon, 'w-5 h-5')}
                      </div>
                      <h3 className="font-sans text-lg font-black text-white">
                        {selectedDive.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedDive(null)}
                      className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Part 1: Problem summary */}
                    <div className="space-y-2">
                       <span className="flex items-center gap-1.5 font-mono text-[10px] text-red-400 font-bold tracking-widest uppercase">
                         <AlertCircle size={12} />
                         The Challenge Baseline
                       </span>
                       <p className="text-sm text-gray-400 leading-relaxed font-light">
                         {selectedDive.fullContent.problemStatement}
                       </p>
                    </div>

                    {/* Part 2: Architecture brief */}
                    <div className="space-y-2">
                       <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#4edea3] font-bold tracking-widest uppercase">
                         <Workflow size={12} />
                         Structural Architectural Strategy
                       </span>
                       <p className="text-sm text-gray-400 leading-relaxed font-light">
                         {selectedDive.fullContent.architectureDescription}
                       </p>
                    </div>

                    {/* Part 3: Text Architecture flow pipeline graph */}
                    {selectedDive.fullContent.diagramData && (
                      <div className="bg-[#050505] p-4 rounded-xl border border-white/5 space-y-2">
                        <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-bold">
                          Data &amp; Request Flow Mapping
                        </span>
                        <div className="font-mono text-[11px] text-[#e9c349]/90 py-2 leading-relaxed">
                          {selectedDive.fullContent.diagramData}
                        </div>
                      </div>
                    )}

                    {/* Part 4: Key Decisions checkbox highlights */}
                    <div className="space-y-3">
                       <span className="font-mono text-[10px] text-gray-500 font-bold tracking-widest uppercase block">
                         Key Decisions &amp; Core Trades
                       </span>
                       <div className="space-y-2">
                         {selectedDive.fullContent.keyDecisions.map((decision, i) => (
                           <div key={i} className="flex gap-2 bg-white/2 p-2.5 rounded-lg border border-white/5">
                             <CheckCircle size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                             <p className="text-xs text-gray-400 leading-relaxed font-light">
                               {decision}
                             </p>
                           </div>
                         ))}
                       </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 mt-8 flex justify-end">
                  <button
                    onClick={() => setSelectedDive(null)}
                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-full font-mono text-xs font-semibold hover:text-[#4edea3] transition-all cursor-pointer"
                  >
                    Close Sheet View
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
