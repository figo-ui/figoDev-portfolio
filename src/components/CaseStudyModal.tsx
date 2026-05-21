import { useEffect, useState } from 'react';
import { X, Copy, Check, ExternalLink, Cpu, Activity, Award, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Project } from '../types';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [project, onClose]);

  if (!project) return null;

  const handleCopy = () => {
    if (project.caseStudy.codeSnippet) {
      navigator.clipboard.writeText(project.caseStudy.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isEmerald = project.accentColor === 'emerald';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Dim Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#050505]/95 backdrop-blur-md cursor-pointer"
      />

      {/* Main Modal Container Sheet */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative w-full max-w-4xl bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col z-10"
      >
        {/* Top Header Glow Bar */}
        <div
          className={`h-1.5 w-full ${
            isEmerald ? 'bg-[#4edea3]' : 'bg-[#e9c349]'
          }`}
        />

        {/* Modal Header */}
        <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-start gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`font-mono text-[10px] tracking-widest uppercase font-semibold px-2 py-0.5 rounded ${
                  isEmerald
                    ? 'bg-emerald-500/10 text-[#4edea3] border border-emerald-500/20'
                    : 'bg-yellow-500/10 text-[#e9c349] border border-yellow-500/20'
                }`}
              >
                Case Study
              </span>
              <span className="text-gray-600 font-mono text-xs">/</span>
              <span className="text-gray-400 font-mono text-xs">
                {project.technologies.join(', ')}
              </span>
            </div>
            <h2 className="font-sans text-xl md:text-3xl font-black text-white leading-tight">
              {project.title}
            </h2>
            <p className="text-sm text-gray-400 mt-1">{project.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Interactive Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-8 flex-1 space-y-8">
          {/* Key Metric Displays */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.caseStudy.metrics.map((metric, i) => (
              <div
                key={i}
                className="bg-white/1 border border-white/5 p-4 rounded-xl flex items-center gap-3"
              >
                <div
                  className={`p-2 rounded-lg ${
                    isEmerald ? 'bg-emerald-500/10' : 'bg-yellow-500/10'
                  }`}
                >
                  <Activity
                    size={16}
                    className={isEmerald ? 'text-[#4edea3]' : 'text-[#e9c349]'}
                  />
                </div>
                <div className="text-left">
                  <p className="font-sans text-xs text-gray-500 font-medium">Metric outcome {i + 1}</p>
                  <p className="font-mono text-xs text-white font-bold tracking-tight">
                    {metric}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Core Story Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-2 font-sans font-bold text-white text-sm">
                <Cpu
                  size={16}
                  className={isEmerald ? 'text-[#4edea3]' : 'text-[#e9c349]'}
                />
                <h3>The Technical Challenge</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                {project.caseStudy.technicalChallenge}
              </p>
            </div>

            <div className="space-y-4 text-left">
              <div className="flex items-center gap-2 font-sans font-bold text-white text-sm">
                <Award
                  size={16}
                  className={isEmerald ? 'text-[#4edea3]' : 'text-[#e9c349]'}
                />
                <h3>Engineering Solution</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                {project.caseStudy.solutionDetail}
              </p>
            </div>
          </div>

          {/* Architectural highlights list */}
          <div className="border-t border-white/5 pt-6 text-left">
            <h4 className="font-sans font-bold text-white text-sm mb-4">
              Architectural Highlights &amp; Accomplishments
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.caseStudy.architecturalHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-white/1 border border-white/5 p-3 rounded-xl hover:bg-white/2 transition-all"
                >
                  <CheckCircle
                    size={16}
                    className="mt-0.5 text-[#4edea3] flex-shrink-0"
                  />
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Code Snippet Block */}
          {project.caseStudy.codeSnippet && (
            <div className="border-t border-white/5 pt-6 text-left">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-sans text-xs font-bold text-gray-400 tracking-wider">
                  {project.caseStudy.codeSnippetTitle || 'TECHNICAL SNAPSHOT'}
                </h4>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 font-mono text-[10px] text-gray-400 hover:text-white px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* Black Code Box */}
              <div className="bg-[#050505] rounded-xl border border-white/5 overflow-hidden shadow-inner">
                <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/5 bg-white/[0.02]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                  <span className="text-[10px] text-gray-500 font-mono ml-2">
                    {project.id === 'healthcare-ai' ? 'pipeline.py' : 'bus.ts'}
                  </span>
                </div>
                <pre className="p-4 overflow-x-auto text-[11px] md:text-xs font-mono text-emerald-400/90 leading-relaxed font-medium">
                  <code>{project.caseStudy.codeSnippet}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="p-6 bg-white/[0.01] border-t border-white/5 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#4edea3] hover:bg-[#6ffbbe] text-black font-semibold text-xs py-2.5 px-5 rounded-full font-mono transition-all"
              >
                <span>Launch App</span>
                <ExternalLink size={12} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#1c1b1b] hover:bg-[#2a2a2a] border border-white/10 text-white font-semibold text-xs py-2.5 px-5 rounded-full font-mono transition-all"
              >
                <span>Code Repository</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs text-gray-500 hover:text-white font-sans transition-colors cursor-pointer"
          >
            Close Sheet
          </button>
        </div>
      </motion.div>
    </div>
  );
}
