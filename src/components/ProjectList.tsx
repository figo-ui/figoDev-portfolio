import { useState } from 'react';
import { ExternalLink, Code2, Sparkles, Filter, ShieldCheck, CalendarRange, MonitorSmartphone, Lock, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { useApp } from '../AppContext';
import { TRANSLATIONS } from '../translations';

interface ProjectListProps {
  onSelectProject: (project: Project) => void;
  isAdmin: boolean;
  projects: Project[];
  onToggleProjectPrivacy?: (id: string) => void;
}

export default function ProjectList({ 
  onSelectProject, 
  isAdmin, 
  projects, 
  onToggleProjectPrivacy 
}: ProjectListProps) {
  const { lang } = useApp();
  const t = TRANSLATIONS[lang];

  const [activeCategory, setActiveCategory] = useState<'ALL' | 'WEB' | 'APP' | 'AI' | 'UI_UX' | 'RESEARCH'>('ALL');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamically compile available technologies from visible/applicable projects
  const availableTechs = Array.from(new Set(projects.flatMap((p) => p.technologies))).sort();

  // 1. Filter based on Session/Admin Privacy settings
  const visibleProjects = projects.filter((project) => {
    return isAdmin ? true : !project.isPrivate;
  });

  // 2. Filter by Category, Technology Tag cloud, and raw Search Query text match
  const filteredProjects = visibleProjects.filter((project) => {
    if (selectedTech && !project.technologies.includes(selectedTech)) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = project.title.toLowerCase().includes(q);
      const matchSubtitle = project.subtitle.toLowerCase().includes(q);
      const matchDesc = project.description.toLowerCase().includes(q);
      const matchTech = project.technologies.some((tech) => tech.toLowerCase().includes(q));
      
      if (!matchTitle && !matchSubtitle && !matchDesc && !matchTech) {
        return false;
      }
    }

    if (activeCategory === 'ALL') return true;

    // Normalize and match exactly
    const projCat = project.category || 'APP';
    return projCat === activeCategory;
  });

  const getPlaceholderIcon = (id: string, color: string) => {
    const cls = `w-16 h-16 opacity-40 transition-all duration-300 ${
      color === 'emerald' ? 'text-[#4edea3] hover:text-[#6ffbbe]' : 'text-[#e9c349] hover:text-[#ffe088]'
    }`;

    switch (id) {
      case 'cbhi':
        return <ShieldCheck className={cls} />;
      case 'leave-management':
        return <CalendarRange className={cls} />;
      default:
        return <MonitorSmartphone className={cls} />;
    }
  };

  return (
    <section className="py-24 px-5 md:px-12 bg-[#080808] relative border-t border-white/5" id="projects">
      <div className="absolute inset-0 tilet-pattern opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12 md:flex justify-between items-end gap-16 text-left"
        >
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#4edea3] font-black bg-[#4edea3]/10 border border-[#4edea3]/20 px-3.5 py-1 rounded-full">
              {t.projects}
            </span>
            <h2 className="font-sans text-4xl md:text-6xl font-black text-white tracking-tighter mt-4 mb-4">
              {t.publishedWorks}
            </h2>
            <p className="font-sans text-base md:text-lg text-gray-400 font-light leading-relaxed">
              {t.publishedWorksDesc}
            </p>
          </div>
        </motion.div>

        {/* Dynamic Secured Assets Locked Ribbon Indicator */}
        {!isAdmin && projects.some(p => p.isPrivate) && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-[#e9c349]/5 border border-[#e9c349]/15 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-gray-400 text-left"
          >
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2 select-none">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e9c349] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e9c349]"></span>
              </span>
              <span>
                🔒 <strong>SECURITY SHIELD ACTIVE:</strong> {projects.filter(p => p.isPrivate).length} Private work nodes are encrypted. Enter administrator pass inside the Personal Hub to authorize clearance.
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold text-[#e9c349] tracking-wider whitespace-nowrap">
              Passcode Locked 🔒
            </span>
          </motion.div>
        )}

        {/* Dynamic Multi-tier Filter Dashboard */}
        <div className="mb-16 bg-[#121212]/90 border border-white/10 p-6 rounded-2xl flex flex-col gap-6 text-left shadow-xl backdrop-blur-md">
          
          {/* SEARCH COMPONENT ROW */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e9c349]" />
              <label htmlFor="project-search-input" className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                {lang === 'en' ? 'Search Works database' : 'ስራዎችን ይፈልጉ'}
              </label>
            </div>
            <div className="relative w-full">
              <input
                id="project-search-input"
                type="text"
                placeholder={lang === 'en' ? 'Filter by system title, tech stack tag, target category...' : 'በስርዓት ስም ፣ በቴክኖሎጂ ወይም በምድብ ይፈልጉ...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#080808]/80 border border-white/5 py-3 pl-11 pr-4 rounded-xl font-sans text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#4edea3] focus:border-[#4edea3] transition-all"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Search size={14} className="text-[#4edea3] animate-pulse" />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] text-gray-500 hover:text-white"
                >
                  [clear]
                </button>
              )}
            </div>
          </div>

          <div className="h-[1px] bg-white/5 w-full font-mono" />

          {/* Category Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div className="flex items-center gap-2 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]" />
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                {t.categoryFilter}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 bg-[#080808]/80 p-1 rounded-2xl sm:rounded-full border border-white/5 select-none font-mono">
              {(['ALL', 'WEB', 'APP', 'AI', 'UI_UX', 'RESEARCH'] as const).map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setActiveCategory(tag);
                  }}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-[10px] uppercase font-bold tracking-widest transition-all cursor-pointer ${
                    activeCategory === tag
                      ? 'bg-[#4edea3] text-black shadow-[0_0_15px_rgba(78,222,163,0.25)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tag === 'UI_UX' ? 'UI/UX Template' : tag}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[1px] bg-white/5 w-full" />

          {/* Technology filter tag cloud */}
          <div className="space-y-3">
            <div className="flex justify-between items-center flex-wrap gap-2 select-none">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e9c349]" />
                <span className="font-sans text-xs font-bold text-gray-300">
                  {t.refineTech} ({availableTechs.length})
                </span>
              </div>
              {selectedTech && (
                <button
                  onClick={() => setSelectedTech(null)}
                  className="font-mono text-[10px] text-[#e9c349] hover:text-[#ffe088] underline cursor-pointer"
                >
                  {t.clearFilters} [x]
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
                <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-[#e9c349] mb-2 select-none">
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
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
                        <div className="flex flex-col items-center justify-center text-center gap-3 select-none">
                          {getPlaceholderIcon(project.id, project.accentColor)}
                          <span className="font-mono text-[10px] text-gray-500 tracking-wider">
                            OFFLINE SECURE GATEWAY WORK
                          </span>
                        </div>
                      )}
                      {/* Shadow overlay to merge color depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/50 to-transparent pointer-events-none" />
                    </div>

                    {/* Right Content Details Section */}
                    <div className="w-full lg:w-7/12 p-6 md:p-10 flex flex-col text-left justify-between">
                      <div>
                        {/* Tags and Admin Visibility controls */}
                        <div className="flex flex-wrap items-center gap-2.5 mb-4 select-none">
                          <span className="font-mono text-[9px] text-[#e9c349] uppercase tracking-wider font-extrabold bg-[#e9c349]/10 px-2.5 py-1 rounded-md border border-[#e9c349]/25">
                            {project.category || 'APP'}
                          </span>
                          
                          {project.isPrivate && (
                            <span className="font-mono text-[9px] text-red-400 uppercase tracking-widest font-black bg-red-500/15 border border-red-500/20 px-2.5 py-1 rounded flex items-center gap-1">
                              <Lock size={10} /> Private Area
                            </span>
                          )}

                          {isAdmin && (
                            <button
                              onClick={() => onToggleProjectPrivacy && onToggleProjectPrivacy(project.id)}
                              className={`font-mono text-[8.5px] uppercase font-black px-2.5 py-1 rounded border transition-all cursor-pointer ${
                                project.isPrivate
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                                  : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                              }`}
                              title="Toggle Visibility Mode"
                            >
                              {project.isPrivate ? '🔓 Set Public' : '🔒 Set Private'}
                            </button>
                          )}
                        </div>

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
                      </div>

                      {/* Lower Tags Row */}
                      <div>
                        <div className="flex flex-wrap gap-2 mb-8 select-none">
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
                            className="bg-transparent border border-white/10 hover:border-white/30 text-white hover:text-emerald-400 px-6 py-2.5 rounded-full font-mono text-xs font-semibold hover:bg-white/1 transition-all flex items-center gap-1.5 cursor-pointer shadow"
                          >
                            <span>Browse Case Study</span>
                          </button>

                          <div className="flex gap-5 items-center select-none">
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
