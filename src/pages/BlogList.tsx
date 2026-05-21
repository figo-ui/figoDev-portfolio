import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Hash, Clock } from 'lucide-react';

const SAMPLE_BLOGS = [
  { slug: 'architecture-modern-ai-services', title: 'Architecting Modern AI Services', date: 'Oct 28 2026', tags: ['Backend', 'AI'], description: 'Deep dive into setting up edge-native infrastructure.' },
  { slug: 'building-secure-react-apps', title: 'Building Secure React Apps', date: 'Sep 15 2026', tags: ['Frontend', 'Security'], description: 'Why server-side code separation is crucial in modern React apps.' }
];

export default function BlogList() {
  const [search, setSearch] = useState('');

  const filtered = SAMPLE_BLOGS.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="w-full px-5 md:px-12 max-w-5xl mx-auto py-24 flex-1">
       <div className="mb-16">
        <h1 className="font-sans text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
          Transmission Logs
        </h1>
        <p className="font-mono text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
          Technical journal entries mapping system designs, performance optimizations, and applied research logs.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="flex-1 relative">
           <Search size={16} className="absolute left-4 top-1/2 -mt-2 text-gray-500" />
           <input 
             value={search}
             onChange={e => setSearch(e.target.value)}
             placeholder="Search logs..." 
             className="w-full bg-[#121212] border border-white/10 focus:border-[#e9c349] focus:outline-none rounded-2xl px-12 py-4 font-mono text-sm text-white transition-all"
           />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filtered.map(blog => (
          <Link to={`/blog/${blog.slug}`} key={blog.slug}>
            <motion.div 
              whileHover={{ x: 5 }}
              className="group bg-[#121212] border border-white/5 hover:border-white/20 p-8 rounded-3xl flex flex-col md:flex-row gap-6 md:items-center justify-between transition-all cursor-pointer"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-gray-500 flex items-center gap-1.5 uppercase font-bold tracking-widest"><Clock size={10} /> {blog.date}</span>
                </div>
                <h2 className="font-sans text-2xl font-bold text-white group-hover:text-[#e9c349] transition-colors">{blog.title}</h2>
                <p className="font-mono text-sm text-gray-400">{blog.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end shrink-0">
                {blog.tags.map(tag => (
                   <span key={tag} className="font-mono text-[10px] uppercase font-bold text-gray-400 px-3 py-1 bg-white/5 rounded border border-white/10 flex items-center gap-1">
                     <Hash size={10} className="text-[#e9c349]" /> {tag}
                   </span>
                ))}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
