import { Target, Eye, Maximize2, ShieldCheck, Zap } from 'lucide-react';
import { PHILOSOPHY } from '../data';
import { motion } from 'motion/react';

export default function Philosophy() {
  const getIcon = (title: string, cls: string) => {
    switch (title) {
      case 'Solve Real Problems':
        return <Target className={cls} />;
      case 'Design for Usability':
        return <Eye className={cls} />;
      case 'Build for Scale':
        return <Maximize2 className={cls} />;
      case 'Maintainability Matters':
        return <ShieldCheck className={cls} />;
      case 'Balance Speed & Quality':
      default:
        return <Zap className={cls} />;
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as any,
      },
    },
  };

  return (
    <section className="py-24 px-5 md:px-12 bg-[#080808] relative border-t border-white/5" id="philosophy">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center max-w-3xl mx-auto space-y-4"
        >
          <h2 className="font-sans text-4xl md:text-6xl font-black text-white tracking-tighter">
            Engineering Philosophy
          </h2>
          <p className="font-sans text-base md:text-lg text-gray-400 font-light max-w-xl mx-auto">
            Core principles that guide my technical decisions and code craftsmanship.
          </p>
          <div className="w-12 h-1 bg-[#4edea3] mx-auto rounded" />
        </motion.div>

        {/* Philosophy Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
        >
          {PHILOSOPHY.map((item, index) => {
            const isEmerald = item.borderAccent === 'emerald';
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.02, x: 2 }}
                className={`border-l-3 pl-6 py-3 hover:bg-white/[0.02] transition-all duration-300 rounded-r-xl ${
                  isEmerald ? 'border-[#4edea3]' : 'border-[#e9c349]'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={isEmerald ? 'text-[#4edea3]' : 'text-[#e9c349]'}
                  >
                    {getIcon(item.title, 'w-4.5 h-4.5')}
                  </span>
                  <h3 className="font-sans text-lg font-black text-white leading-snug">
                    {item.title}
                  </h3>
                </div>
                <p className="font-sans text-sm text-gray-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
