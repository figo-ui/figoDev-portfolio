import React from 'react';
import { motion } from 'motion/react';
import { AppWindow, Download, Eye, Layers } from 'lucide-react';
import { SECURE_TEMPLATES_SEED } from '../components/HubTemplates';
import { useOutletContext } from 'react-router-dom';

export default function TemplatesPage() {
  const { isAdmin } = useOutletContext<{ isAdmin: boolean }>();

  const visibleTemplates = SECURE_TEMPLATES_SEED.filter(t => isAdmin ? true : !t.isPrivate);

  return (
    <div className="w-full px-5 md:px-12 max-w-7xl mx-auto py-24 flex-1">
      <div className="mb-16">
        <h1 className="font-sans text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
          Base Architectures
        </h1>
        <p className="font-mono text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
          Public scaffoldings and UI structure templates available for integration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleTemplates.map(template => (
          <motion.div 
            key={template.id}
            whileHover={{ y: -5 }}
            className="bg-[#121212] border border-white/5 rounded-3xl p-6 flex flex-col group overflow-hidden relative"
          >
            {template.isPrivate && (
               <div className="absolute top-4 right-4 bg-red-500/10 text-red-500 font-mono text-[9px] px-2 py-0.5 rounded border border-red-500/20 uppercase">Internal</div>
            )}
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-gray-400 group-hover:text-white group-hover:bg-[#4edea3]/20 transition-all">
               {template.type === 'web' ? <AppWindow size={20} /> : <Layers size={20} />}
            </div>
            
            <h3 className="font-sans text-xl font-bold text-white mb-2">{template.title}</h3>
            <p className="font-mono text-xs text-gray-500 mb-6 flex-1">{template.description}</p>
            
            <div className="flex items-center gap-3 mt-auto">
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#4edea3] text-black py-2.5 rounded-xl font-mono text-xs font-bold hover:bg-[#6ffbbe] transition-all">
                <Download size={14} /> Pull
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
