import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Rss, 
  Youtube, 
  Send, 
  Mail, 
  ArrowUpRight, 
  Copy, 
  Check, 
  Globe, 
  Sparkles 
} from 'lucide-react';

interface SocialChannel {
  name: string;
  handle: string;
  url: string;
  category: string;
  metrics: string;
  icon: any;
  color: string;
  borderColor: string;
  backgroundColor: string;
  description: string;
}

export default function HubSocials() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const socialChannels: SocialChannel[] = [
    {
      name: 'GitHub',
      handle: 'figo-ui',
      url: 'https://github.com/figo-ui',
      category: 'Codebase',
      metrics: '2.5k Commits YTD',
      icon: Github,
      color: '#ffffff',
      borderColor: 'rgba(255, 255, 255, 0.15)',
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      description: 'Host for all mobile architectures, template systems, and design patterns.'
    },
    {
      name: 'LinkedIn',
      handle: 'obsa-mustefa',
      url: 'https://linkedin.com',
      category: 'Professional Network',
      metrics: '1,200+ Connections',
      icon: Linkedin,
      color: '#0077b5',
      borderColor: 'rgba(0, 119, 181, 0.25)',
      backgroundColor: 'rgba(0, 119, 181, 0.03)',
      description: 'Senior enterprise career updates, tech article shares, and hiring discussions.'
    },
    {
      name: 'Twitter / X',
      handle: '@obsa_dev',
      url: 'https://twitter.com',
      category: 'Micro-logs',
      metrics: '850 Subscribers',
      icon: Twitter,
      color: '#4edea3',
      borderColor: 'rgba(78, 222, 163, 0.25)',
      backgroundColor: 'rgba(78, 222, 163, 0.03)',
      description: 'Dev rants, tech stacks benchmarks, and live UI builds.'
    },
    {
      name: 'Medium',
      handle: '@obsafigo',
      url: 'https://medium.com',
      category: 'Technical Blog',
      metrics: '3k+ Monthly Reads',
      icon: Rss,
      color: '#e9c349',
      borderColor: 'rgba(233, 195, 73, 0.25)',
      backgroundColor: 'rgba(233, 195, 73, 0.03)',
      description: 'In-depth write-ups on React Native Native Bridges, Flutter, and PostgreSQL Row-Level Security.'
    },
    {
      name: 'YouTube',
      handle: 'OMX Systems Dev',
      url: 'https://youtube.com',
      category: 'Video Tutorials',
      metrics: '15k+ Views',
      icon: Youtube,
      color: '#ff0000',
      borderColor: 'rgba(255, 0, 0, 0.18)',
      backgroundColor: 'rgba(255, 0, 0, 0.02)',
      description: 'Speedcoding, custom system architectures explainers, and live app reviews.'
    },
    {
      name: 'Telegram Channel',
      handle: 'omx_systems',
      url: 'https://telegram.org',
      category: 'Tech Syndicate',
      metrics: '420 Subscriptions',
      icon: Send,
      color: '#229ed9',
      borderColor: 'rgba(34, 158, 217, 0.25)',
      backgroundColor: 'rgba(34, 158, 217, 0.03)',
      description: 'Direct downloads of templates, mobile boilerplate patches, and early designs.'
    }
  ];

  const handleCopyHandle = (handle: string, index: number) => {
    navigator.clipboard.writeText(handle);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="flex flex-col gap-10 text-left">
      {/* Intro section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#4edea3] font-black bg-[#4edea3]/10 border border-[#4edea3]/20 px-3 py-1 rounded-full">
            Channel Sync
          </span>
          <h3 className="font-sans text-3xl md:text-5xl font-black text-white tracking-tight mt-3 mb-2">
            Social Integrations
          </h3>
          <p className="font-sans text-sm md:text-base text-gray-400 font-light max-w-2xl leading-relaxed">
            Connect across platforms. I publish educational codes, mobile boilerplates, daily engineering updates, and architectural walkthroughs.
          </p>
        </div>

        {/* Quick Email sync badge */}
        <a
          href="mailto:obsafigo@gmail.com"
          className="flex items-center gap-3 bg-[#121212] hover:bg-white/5 border border-white/10 px-5 py-3.5 rounded-2xl select-none group transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-[#e9c349]/10 border border-[#e9c349]/30 flex items-center justify-center text-[#e9c349]">
            <Mail size={16} />
          </div>
          <div>
            <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest leading-none mb-1">Direct Outreach</div>
            <div className="font-mono text-xs font-semibold text-white flex items-center gap-1">
              obsafigo@gmail.com
              <ArrowUpRight size={12} className="text-gray-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </a>
      </div>

      {/* Grid of Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socialChannels.map((channel, idx) => {
          const IconComponent = channel.icon;
          return (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={channel.name}
              style={{ backgroundColor: channel.backgroundColor, borderColor: channel.borderColor }}
              className="border p-6 rounded-2xl flex flex-col justify-between h-72 shadow-lg group hover:border-emerald-400/30 transition-all duration-300"
            >
              <div>
                {/* Header of social card */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      style={{ color: channel.color, borderColor: channel.borderColor }} 
                      className="w-11 h-11 rounded-xl bg-black/40 border flex items-center justify-center"
                    >
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <h4 className="font-sans text-lg font-black text-white">{channel.name}</h4>
                      <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">{channel.category}</div>
                    </div>
                  </div>

                  <span className="font-mono text-[9px] text-[#4edea3] bg-[#4edea3]/5 border border-[#4edea3]/10 px-2 py-0.5 rounded font-black select-none">
                    {channel.metrics}
                  </span>
                </div>

                <p className="font-sans text-xs text-gray-400 leading-relaxed font-light mb-6">
                  {channel.description}
                </p>
              </div>

              {/* Action operations rows */}
              <div className="flex gap-3 justify-between items-center bg-black/30 border border-white/5 p-3 rounded-xl mt-auto">
                <button
                  onClick={() => handleCopyHandle(channel.handle, idx)}
                  className="flex items-center gap-1.5 font-mono text-[11px] text-gray-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy Handle"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check size={12} className="text-[#4edea3]" />
                      <span className="text-[#4edea3] font-semibold">Copied Handles</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span className="font-medium">{channel.handle}</span>
                    </>
                  )}
                </button>

                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-mono text-[11px] font-bold text-[#4edea3] hover:text-[#6ffbbe] transition-colors"
                >
                  <span>Visit Profile</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Network Status banner widget */}
      <div className="bg-[#121212]/50 border border-white/5 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <div className="font-sans text-sm text-gray-300">
            Current activity status: <span className="text-[#e9c349] font-semibold">Broadcasting Live Engineering Snippets daily</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
          <Sparkles size={14} className="text-[#e9c349]" />
          <span>OMX Sync Nodes Active</span>
        </div>
      </div>
    </div>
  );
}
