import React, { useState, useEffect } from 'react';
import { useParams, Link, useOutletContext, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Project } from '../types';
import { PROJECTS } from '../data';
import { ArrowLeft, ExternalLink, Calendar, Code2, Rocket, Clock } from 'lucide-react';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useOutletContext<{ isAdmin: boolean }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('omx_project_custom_list');
    let db = PROJECTS;
    if (stored) {
      db = JSON.parse(stored);
    }
    const found = db.find(p => p.id === id);
    if (!found || (!isAdmin && found.isPrivate)) {
      navigate('/projects');
    } else {
      setProject(found);
    }
  }, [id, isAdmin, navigate]);

  if (!project) return null;

  return (
    <div className="w-full px-5 md:px-12 max-w-4xl mx-auto py-24 flex-1">
      <Link to="/projects" className="inline-flex items-center gap-2 font-mono text-xs text-gray-500 hover:text-[#4edea3] transition-colors mb-12 uppercase tracking-widest font-bold">
        <ArrowLeft size={14} /> Index Return
      </Link>
      
      <div className="mb-16">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="font-mono text-[10px] uppercase font-bold text-[#4edea3] px-3 py-1 bg-[#4edea3]/10 rounded-full border border-[#4edea3]/20">
            {project.year} Phase
          </span>
          {project.isPrivate && (
            <span className="font-mono text-[10px] uppercase font-bold text-red-400 px-3 py-1 bg-red-400/10 rounded-full border border-red-400/20">
              Private Intel
            </span>
          )}
        </div>
        
        <h1 className="font-sans text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-tight">
          {project.title}
        </h1>
        <p className="font-sans text-xl text-gray-400 leading-relaxed max-w-3xl">
          {project.subtitle || project.description}
        </p>
      </div>

      {project.technologies && project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-16 pb-16 border-b border-white/5">
          {project.technologies.map(tech => (
            <span key={tech} className="font-mono text-xs text-gray-300 bg-white/5 px-4 py-2 border border-white/10 rounded-xl">
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* The Journey Timeline requested by User */}
      <div className="mb-20">
        <h3 className="font-sans text-3xl font-black text-white mb-10 flex items-center gap-3">
          <Rocket className="text-[#4edea3]" /> Project Journey
        </h3>
        
        <div className="relative border-l-2 border-white/10 pl-8 ml-4 space-y-12">
          {project.phases && project.phases.length > 0 ? project.phases.map((phase: any, i: number) => (
            <div key={i} className="relative">
              <span className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-[#080808] flex transform transition-colors ${
                phase.status === 'completed' ? 'bg-[#4edea3]' : phase.status === 'in-progress' ? 'bg-[#e9c349]' : 'bg-gray-600'
              }`} />
              <div className="bg-[#121212] border border-white/5 rounded-3xl p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest bg-[#080808] px-3 py-1 rounded border border-white/5 flex items-center gap-2">
                    <Calendar size={10} /> {phase.date || 'To Be Determined'}
                  </span>
                  <span className={`font-mono text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded ${
                    phase.status === 'completed' ? 'text-[#4edea3] bg-[#4edea3]/10' : phase.status === 'in-progress' ? 'text-[#e9c349] bg-[#e9c349]/10' : 'text-gray-400 bg-white/5'
                  }`}>
                    {phase.status}
                  </span>
                </div>
                <h4 className="font-sans text-xl font-bold text-white mb-4">{phase.title}</h4>
                <p className="font-mono text-sm leading-relaxed text-gray-400">
                  {phase.description}
                </p>
              </div>
            </div>
          )) : (
            <div className="bg-[#121212] border border-white/5 border-dashed rounded-3xl p-8 text-center text-gray-500 font-mono text-xs">
              Timeline artifacts pending insertion.
            </div>
          )}
        </div>
      </div>
      
      {project.codeSnippet && (
        <div className="mb-20">
           <h3 className="font-sans text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Code2 className="text-[#e9c349]" /> Structural Excerpt: {project.codeSnippetTitle || 'Logic Block'}
           </h3>
           <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 overflow-hidden">
             <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
             </div>
             <pre className="font-mono text-xs text-green-400 overflow-x-auto leading-relaxed">
               {project.codeSnippet}
             </pre>
           </div>
        </div>
      )}
    </div>
  );
}
