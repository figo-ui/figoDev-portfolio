import { useState } from 'react';
import { ExternalLink, Code2, Globe, Smartphone, Sparkles, Filter, ShieldCheck, CalendarRange, MonitorSmartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { PROJECTS } from '../data';

const availableTechs = Array.from(new Set(PROJECTS.flatMap((p) => p.technologies))).sort();

interface ProjectListProps {
  onSelectProject: (project: Project) => void;
}

export default function ProjectList({ onSelectProject }: ProjectListProps) {
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'MOBILE' | 'WEB' | 'AI'>('ALL');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const filteredProjects = PROJECTS.filter((project) => {
    if (selectedTech && !project.technologies.includes(selectedTech)) {
      return false;
    }

    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'MOBILE') {
      return (
        project.technologies.includes('React Native') ||
        project.technologies.includes('Flutter') ||
        project.id === 'najjashi'
      );
    }
    if (activeCategory === 'WEB') {
      return (
        project.technologies.includes('React') ||
        project.technologies.includes('Node.js') ||
        project.technologies.includes('PostgreSQL') ||
        project.id === 'leave-management'
      );
    }
    if (activeCategory === 'AI') {
      return (
        project.technologies.includes('LLM & RAG') ||
        project.technologies.includes('Vector DB')
      );
    }
    return true;
  });

  const getPlaceholderIcon = (id: string, color: string) => {
    const cls = `w-20 h-20 opacity-40 transition-all duration-300 ${
      color === 'emerald' ? 'text-[#4edea3] hover:text-[#6ffbbe]' : 'text-[#e9c349] hover:text-[#ffe088]'
    }`;

    switch (id) {
      case 'cbhi':
        return <ShieldCheck className={cls} />;
      case 'leave-management':
        return <CalendarRange className={cls} />;
      case 'najjashi':
        default:
        return <MonitorSmartphone className={cls} />;
    }
  };

  return (
    <section className="py-24 px-5 md:px-12 bg-[#080808] relative border-t border-white/5" id="projects">
      <div className="absolute inset-0 tilet-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:flex justify-between items-end gap-16 text-left">
          <div className="max-w-2xl">
            <h2 className="font-sans text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
              Selected Works
            </h2>
            <p className="font-sans text-base md:text-lg text-gray-400 font-light">
              Deep dives into high-impact systems I've architected across mobile, web, and AI infrastructure.
            </p>
          </div>
        </div>

        {/* Dynamic Multi-tier Filter Dashboard */}
        <div className="mb-16 bg-[#121212]/90 border border-white/10 p-6 rounded-2xl flex flex-col gap-6 text-left shadow-xl backdrop-blur-md">
          {/* Category Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]" />
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                Category Filter
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 bg-[#080808]/80 p-1 rounded-full border border-white/5">
              {(['ALL', 'MOBILE', 'WEB', 'AI'] as const).map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setActiveCategory(tag);
                  }}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-[10px] uppercase font-bold tracking-widest transition-all cursor-pointer ${
                    activeCategory === tag
                      ? 'bg-[#4edea3] text-black shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[1px] bg-white/5 w-full" />

          {/* Technology filter tag cloud */}
          <div className="space-y-3">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e9c349]" />
                <span className="font-sans text-xs font-bold text-gray-300">
                  Refine by Specific Technology ({availableTechs.length})
                </span>
              </div>
              {selectedTech && (
                <button
                  onClick={() => setSelectedTech(null)}
                  className="font-mono text-[10px] text-[#e9c349] hover:text-[#ffe088] underline cursor-pointer"
                >
                  Clear Tech Filter [x]
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto pr-1">
              {availableTechs.map((tech) => {
                const isSelected = selectedTech === tech;
                return (
                  <button
                    key={tech}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedTech(null);
                      } else {
                        setSelectedTech(tech);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg font-mono text-[10px] font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500/10 text-[#4edea3] border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
                        : 'bg-white/[0.01] border-white/5 text-gray-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Works List Cards Container */}
        <div className="flex flex-col gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length === 0 ? (
              <motion.div
                key="empty-projects-state"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-20 bg-[#121212]/50 border border-white/5 rounded-2xl flex flex-col items-center justify-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-[#e9c349] mb-2">
                  <Filter size={24} />
                </div>
                <h4 className="font-sans text-lg font-bold text-white">No Matching Systems</h4>
                <p className="font-sans text-xs md:text-sm text-gray-400 font-light max-w-sm mx-auto">
                  No projects currently match both the <span className="text-[#4edea3] font-semibold">{activeCategory}</span> category and <span className="text-[#e9c349] font-semibold">{selectedTech}</span> technology filter.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('ALL');
                    setSelectedTech(null);
                  }}
                  className="mt-2 px-5 py-2.5 bg-[#4edea3] hover:bg-[#6ffbbe] text-black font-semibold text-xs rounded-full font-mono transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                >
                  Reset All Filters
                </button>
              </motion.div>
            ) : (
              filteredProjects.map((project, index) => {
                const isEven = index % 2 === 0;
                const isEmerald = project.accentColor === 'emerald';

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className={`group bg-[#121212] border border-white/10 rounded-2xl overflow-hidden hover:border-[#10b981]/40 hover:-translate-y-1.5 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(16,185,129,0.06)] flex flex-col ${
                      isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                  {/* Left Portfolio Image Section */}
                  <div className="w-full lg:w-5/12 aspect-video lg:aspect-auto overflow-hidden bg-[#181818] relative flex items-center justify-center p-6 min-h-[300px]">
                    {project.image ? (
                      <img
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 pointer-events-none absolute inset-0"
                        src={project.image}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center gap-3">
                        {getPlaceholderIcon(project.id, project.accentColor)}
                        <span className="font-mono text-[10px] text-gray-500 tracking-wider">
                          OFFLINE PERSISTENT BLUEPRINT
                        </span>
                      </div>
                    )}
                    {/* Shadow overlay to merge color depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/50 to-transparent pointer-events-none" />
                  </div>

                  {/* Right Content Details Section */}
                  <div className="w-full lg:w-7/12 p-6 md:p-10 flex flex-col text-left">
                    <h3 className="font-sans text-2xl md:text-3xl font-black text-white hover:text-[#4edea3] transition-colors leading-tight mb-2">
                      {project.title}
                    </h3>
                    <p className="font-sans text-sm md:text-base text-gray-300 font-medium mb-6">
                      {project.subtitle}
                    </p>

                    {/* Problem Section */}
                    <div className="mb-5 space-y-1">
                      <span
                        className={`font-mono text-[10px] uppercase font-bold tracking-widest block ${
                          isEmerald ? 'text-[#4edea3]' : 'text-[#e9c349]'
                        }`}
                      >
                        The Problem
                      </span>
                      <p className="font-sans text-xs md:text-sm text-gray-400 leading-relaxed font-light">
                        {project.problem}
                      </p>
                    </div>

                    {/* Impact Section */}
                    <div className="mb-6 space-y-1">
                      <span
                        className={`font-mono text-[10px] uppercase font-bold tracking-widest block ${
                          isEmerald ? 'text-[#4edea3]' : 'text-[#e9c349]'
                        }`}
                      >
                        Impact &amp; Outcomes
                      </span>
                      <p className="font-sans text-xs md:text-sm text-gray-400 leading-relaxed font-light">
                        {project.impact}
                      </p>
                    </div>

                    {/* Lower Tags Row */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full border border-white/5 text-gray-400 font-mono text-[10px] tracking-wide bg-white/2"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action controls */}
                    <div className="mt-auto flex flex-wrap gap-4 items-center justify-between">
                      <button
                        onClick={() => onSelectProject(project)}
                        className={`bg-transparent border border-white/10 hover:border-white/30 text-white hover:text-emerald-400 px-6 py-2.5 rounded-full font-mono text-xs font-semibold hover:bg-white/1 transition-all flex items-center gap-1.5 cursor-pointer`}
                      >
                        <span>View Case Study</span>
                      </button>

                      <div className="flex gap-5 items-center">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 font-mono text-xs hover:text-[#4edea3] transition-colors flex items-center gap-1.5"
                          >
                            <Code2 size={14} />
                            <span>GitHub</span>
                          </a>
                        )}
                        {project.liveUrl && project.liveUrl !== '#' && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#e9c349] font-mono text-xs font-bold hover:text-[#4edea3] transition-colors flex items-center gap-1.5"
                          >
                            <ExternalLink size={14} />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
