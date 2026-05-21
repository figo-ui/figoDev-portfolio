import { Sparkles, Terminal, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_DATA } from '../data';

export default function About() {
  return (
    <section className="py-24 px-5 md:px-12 relative overflow-hidden bg-[#0e0e0e]" id="about">
      <div className="absolute inset-0 tilet-pattern-lines opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Portrait Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-5 relative group"
          >
            {/* Emerald glow backlight triggered on container hover */}
            <div className="absolute inset-x-0 -inset-y-2 bg-[#10B981]/20 rounded-2xl blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#121212] aspect-[4/5] shadow-2xl">
              <img
                alt="Professional portrait of Obsa Mustefa"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-103 cursor-pointer"
                src={HERO_DATA.portraitUrl}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

              {/* Holographic grid scanner line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-emerald-400/30 shadow-[0_0_10px_#10B981] animate-[bounce_6s_infinite] pointer-events-none" />
            </div>

            {/* Quick Micro-Telemetry Card Overlay */}
            <div className="absolute -bottom-6 -right-4 bg-black/90 border border-white/10 px-5 py-4.5 rounded-xl backdrop-blur-md hidden md:flex items-center gap-3 shadow-xl">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className="font-mono text-left">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Current Focus</p>
                <p className="text-xs text-white font-medium">Enterprise &amp; AI Integration</p>
              </div>
            </div>
          </motion.div>

          {/* Narrative Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="lg:col-span-7 flex flex-col gap-6 lg:pl-10 text-left"
          >
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#e9c349] uppercase font-semibold">
              <Terminal size={14} />
              <span>Developer Manifesto</span>
            </div>

            <h2 className="font-sans text-3xl md:text-5xl font-black text-white tracking-tight leading-none mb-2">
              Engineering with Purpose
            </h2>

            <div className="h-[1px] w-12 bg-[#4edea3]" />

            <p className="font-sans text-base md:text-lg text-gray-400 leading-relaxed font-light">
              As a Senior Full-Stack and Mobile Developer, my mission is to craft digital solutions that drive measurable real-world impact. With a steadfast focus on scalable system architecture and seamless user experiences, I bridge the divide between highly complex technical requirements and elegant product design.
            </p>

            <p className="font-sans text-base md:text-lg text-gray-400 leading-relaxed font-light">
              Whether orchestrating a microservices backend or building a fluid 60fps cross-platform mobile app, my approach remains the same: code is merely a tool to solve human problems efficiently and beautifully.
            </p>

            {/* Animated badges grid */}
            <div className="grid grid-cols-2 gap-4 mt-4 font-mono text-xs text-gray-400">
              <motion.div
                whileHover={{ scale: 1.02, x: 2, borderColor: 'rgba(16, 185, 129, 0.3)' }}
                className="flex items-center gap-2 bg-white/1 border border-white/5 p-3 rounded-lg transition-colors cursor-default"
              >
                <span className="text-[#4edea3]">✦</span>
                <span>Type-Safe Coding Principles</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02, x: 2, borderColor: 'rgba(233, 195, 73, 0.3)' }}
                className="flex items-center gap-2 bg-white/1 border border-white/5 p-3 rounded-lg transition-colors cursor-default"
              >
                <span className="text-[#e9c349]">✦</span>
                <span>Clean Architecture Layouts</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02, x: 2, borderColor: 'rgba(233, 195, 73, 0.3)' }}
                className="flex items-center gap-2 bg-white/1 border border-white/5 p-3 rounded-lg transition-colors cursor-default"
              >
                <span className="text-[#e9c349]">✦</span>
                <span>Mobile Performance Focus</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02, x: 2, borderColor: 'rgba(16, 185, 129, 0.3)' }}
                className="flex items-center gap-2 bg-white/1 border border-white/5 p-3 rounded-lg transition-colors cursor-default"
              >
                <span className="text-[#4edea3]">✦</span>
                <span>Secure API Boundaries</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
