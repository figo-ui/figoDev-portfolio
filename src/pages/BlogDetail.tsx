import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();

  // Use a mockup system for the blog post since database lacks contents
  return (
    <div className="w-full px-5 md:px-12 max-w-3xl mx-auto py-24 flex-1">
      <Link to="/blog" className="inline-flex items-center gap-2 font-mono text-xs text-gray-500 hover:text-[#e9c349] transition-colors mb-12 uppercase tracking-widest font-bold">
        <ArrowLeft size={14} /> Back to Logs
      </Link>
      
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6 font-mono text-[10px] text-gray-500 uppercase font-bold tracking-widest">
           <span className="flex items-center gap-1.5"><Calendar size={12} /> Oct 28, 2026</span>
           <span className="flex items-center gap-1.5"><Clock size={12} /> 6 MIN READ</span>
        </div>
        
        <h1 className="font-sans text-4xl md:text-5xl font-black text-white tracking-tighter mb-6 leading-tight">
          Architecting Modern AI Services ({slug?.replace(/-/g, ' ')})
        </h1>
      </div>

      <div className="prose prose-invert max-w-none font-sans text-gray-300 leading-relaxed space-y-6">
        <p className="text-lg text-gray-400">
           Integrating native AI models directly into cloud workflows presents challenges in caching, cold starts, and token overhead. In this log, we dissect the infrastructure.
        </p>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Edge Infrastructure Constraints</h3>
        <p>
          When executing at the edge, memory limits heavily constrain transformer context windows...
        </p>
        
        <div className="bg-[#121212] border border-white/10 p-6 rounded-2xl my-8">
           <pre className="font-mono text-xs text-[#e9c349] overflow-x-auto">
{`export async function generateBlock(data: Buffer) {
  // Edge-bound AI stream computation
  const session = await ai.startStream({
    model: 'gemini-3.1-pro-preview',
    timeout: 3000
  });
  return session.pipeTo(Client);
}`}
           </pre>
        </div>
        
        <p>
          By isolating the execution, we can bypass strict global time restraints.
        </p>
      </div>
    </div>
  );
}
