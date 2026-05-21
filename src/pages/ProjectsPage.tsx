import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { PROJECTS } from '../data';
import { Link, useOutletContext } from 'react-router-dom';
import { ArrowRight, LayoutGrid, Search, Layers, AppWindow, BrainCircuit } from 'lucide-react';

export default function ProjectsPage() {
  const { isAdmin } = useOutletContext<{ isAdmin: boolean }>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('omx_project_custom_list');
    if (stored) {
      setProjects(JSON.parse(stored));
    } else {
      setProjects(PROJECTS);
    }
  }, []);

  const visibleProjects = projects.filter(p => {
    if (!isAdmin && p.isPrivate) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true; // We can add better category matching logic here later
  });

  return (
    <div className="w-full px-5 md:px-12 max-w-7xl mx-auto py-24 flex-1">
      <div className="mb-16">
        <h1 className="font-sans text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
          Professional Index
        </h1>
        <p className="font-mono text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
          Explore public software systems, production mobile architectures, and secure AI pipeline boundaries crafted with mathematical precision.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="flex-1 relative">
           <Search size={16} className="absolute left-4 top-1/2 -mt-2 text-gray-500" />
           <input 
             value={search}
             onChange={e => setSearch(e.target.value)}
             placeholder="Search projects..." 
             className="w-full bg-[#121212] border border-white/10 focus:border-[#4edea3] focus:outline-none rounded-2xl px-12 py-4 font-mono text-sm text-white"
           />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {['All', 'Web', 'App', 'AI', 'System'].map(c => (
            <button 
               key={c}
               onClick={() => setCategory(c)}
               className={`flex items-center gap-2 whitespace-nowrap px-6 py-4 rounded-2xl font-mono text-xs font-bold transition-all ${
                 category === c ? 'bg-[#4edea3] text-black' : 'bg-[#121212] border border-white/10 text-gray-400 hover:text-white hover:border-white/30'
               }`}
            >
               {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProjects.map(project => (
           <Link to={`/projects/${project.id}`} key={project.id}>
             <motion.div 
               whileHover={{ y: -5 }}
               className="bg-[#121212] border border-white/10 hover:border-[#4edea3]/50 rounded-3xl p-6 h-full flex flex-col justify-between transition-all group"
             >
               <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-mono text-[10px] uppercase font-bold text-[#4edea3] px-3 py-1 bg-[#4edea3]/10 rounded-full border border-[#4edea3]/20">
                      {project.year}
                    </span>
                    {project.isPrivate && (
                      <span className="font-mono text-[10px] uppercase font-bold text-red-400 px-3 py-1 bg-red-400/10 rounded-full border border-red-400/20">
                        Private
                      </span>
                    )}
                  </div>
                  <h3 className="font-sans text-2xl font-bold text-white mb-2 leading-tight group-hover:text-[#4edea3] transition-colors">{project.title}</h3>
                  <p className="font-mono text-xs text-gray-400 mb-6 line-clamp-3 leading-relaxed">{project.description}</p>
               </div>
               
               <div className="flex flex-wrap gap-2">
                 {project.technologies?.slice(0,3).map(tech => (
                   <span key={tech} className="font-mono text-[9px] text-gray-400 uppercase bg-[#080808] px-2 py-1 rounded border border-white/5">
                     {tech}
                   </span>
                 ))}
               </div>
             </motion.div>
           </Link>
        ))}
        {visibleProjects.length === 0 && (
          <div className="col-span-full py-20 text-center border border-white/5 border-dashed rounded-3xl">
            <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">No matching projects located</p>
          </div>
        )}
      </div>
    </div>
  );
}
