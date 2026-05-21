import { Terminal, Laptop, Server, Smartphone, Brain, HardDrive } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data';
import { motion } from 'motion/react';

export default function Skills() {
  const getIcon = (category: string, cls: string) => {
    switch (category) {
      case 'Frontend':
        return <Laptop className={cls} />;
      case 'Backend':
        return <Server className={cls} />;
      case 'Mobile':
        return <Smartphone className={cls} />;
      case 'AI / Automation':
        return <Brain className={cls} />;
      case 'Data / Infra':
      default:
        return <HardDrive className={cls} />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1] as any, // Custom cubic-bezier for snappy, clean motion
      },
    },
  };

  return (
    <section className="py-24 px-5 md:px-12 bg-[#0e0e0e] relative border-t border-white/5" id="skills">
      <div className="absolute inset-0 tilet-pattern opacity-20 pointer-events-none" />

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
            Technical Arsenal
          </h2>
          <p className="font-sans text-base md:text-lg text-gray-400 font-light">
            A comprehensive breakdown of my engineering capabilities, core languages, and framework proficiencies.
          </p>
        </motion.div>

        {/* Categories card list */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
        >
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isGold = cat.accentColor === 'gold';
            const isSpanTwo = cat.category === 'Data / Infra';

            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`bg-[#121212] border border-white/10 p-8 rounded-2xl relative overflow-hidden transition-all duration-300 group ${
                  isGold ? 'hover:border-[#e9c349]/30 hover:shadow-[0_15px_30px_rgba(233,195,73,0.04)]' : 'hover:border-[#4edea3]/30 hover:shadow-[0_15px_30px_rgba(16,185,129,0.04)]'
                } ${
                  isSpanTwo ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Back glow bar */}
                <div className={`absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isGold ? 'bg-[#e9c349]' : 'bg-[#4edea3]'
                }`} />

                {/* Header Icon & title */}
                <div className="flex items-center gap-3.5 mb-6">
                  <div
                    className={`p-2.5 rounded-xl transition-colors duration-300 ${
                      isGold ? 'bg-yellow-500/10 text-[#e9c349] group-hover:bg-[#e9c349] group-hover:text-black' : 'bg-emerald-500/10 text-[#4edea3] group-hover:bg-[#4edea3] group-hover:text-black'
                    }`}
                  >
                    {getIcon(cat.category, 'w-5 h-5')}
                  </div>
                  <h3 className="font-sans text-lg md:text-xl font-black text-white tracking-tight">
                    {cat.category}
                  </h3>
                </div>

                {/* Sub-skill chips */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <motion.span
                      key={sIdx}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.08)', color: '#fff' }}
                      className="px-3 py-1.5 rounded-lg border border-white/5 text-gray-300 font-mono text-xs bg-white/[0.01] hover:border-white/10 transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
