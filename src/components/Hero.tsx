import { MapPin, Sparkles, ArrowRight, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_DATA } from '../data';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pb-24 px-5 md:px-12 overflow-hidden bg-[#080808]" id="hero">
      {/* Dynamic Background Graphics */}
      <div className="absolute inset-0 tilet-pattern opacity-40 z-0 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] tilet-divider z-10" />

      {/* Futuristic auras */}
      <div className="absolute top-1/4 right-[20%] w-72 md:w-[450px] h-72 md:h-[450px] bg-emerald-500/10 rounded-full blur-[120px] -z-10 pointer-events-none animate-pulse duration-5000" />
      <div className="absolute bottom-1/4 left-[15%] w-72 md:w-[450px] h-72 md:h-[450px] bg-yellow-500/5 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-start gap-8">
        {/* Location & Brand Badges */}
        <div className="flex flex-wrap gap-3 items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 bg-[#121212] border border-white/10 px-4 py-2 rounded-full font-mono text-xs text-[#e9c349]"
          >
            <MapPin size={14} className="text-[#e9c349]" />
            <span>{HERO_DATA.location}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2 bg-[#4edea3]/10 border border-[#4edea3]/25 px-3.5 py-2 rounded-full font-mono text-[10px] text-[#4edea3] uppercase tracking-widest font-black select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] scale-90" />
            <span>OMX Systems</span>
          </motion.div>
        </div>

        {/* Display Heading Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-4xl"
        >
          <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-none">
            {HERO_DATA.name}
          </h1>
        </motion.div>

        {/* Job Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans text-xl md:text-3xl text-gray-300 max-w-3xl font-light tracking-tight leading-relaxed"
        >
          Senior Full-Stack &amp; Mobile Engineer | <span className="text-[#4edea3] font-normal">Architecting robust digital systems.</span>
        </motion.p>

        {/* Summary Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="font-sans text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed font-light"
        >
          {HERO_DATA.description}
        </motion.p>

        {/* Action Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap gap-4 mt-4"
        >
          <a
            href="#projects"
            className="flex items-center gap-2 bg-[#4edea3] text-black px-7 py-4 rounded-full font-mono text-xs font-bold hover:bg-[#6ffbbe] hover:scale-102 transition-all shadow-[0_0_25px_rgba(16,185,129,0.2)]"
          >
            Explore My Work
            <ArrowRight size={14} />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 bg-transparent border border-white/10 text-white hover:text-[#e9c349] hover:border-[#e9c349]/50 px-7 py-4 rounded-full font-mono text-xs font-semibold backdrop-blur-md transition-all duration-300"
          >
            Let's Build Together
          </a>
        </motion.div>

        {/* Dynamic Trust Scores / Impacts in Numbers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full mt-16 md:mt-24 pt-10 border-t border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          {HERO_DATA.stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center gap-1.5 py-4 px-2 hover:bg-white/1 rounded-xl transition-all duration-300 ${
                idx > 0 ? 'lg:border-l lg:border-white/5' : ''
              }`}
            >
              <dd
                className={`font-sans text-4xl md:text-5xl font-black tracking-tight ${
                  stat.accent === 'emerald' ? 'text-[#4edea3]' : 'text-[#e9c349]'
                }`}
              >
                {stat.value}
              </dd>
              <dt className="font-mono text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-medium">
                {stat.label}
              </dt>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
