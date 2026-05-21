import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Smartphone, 
  BookOpen, 
  Terminal, 
  Folder, 
  File, 
  FileText, 
  Copy, 
  Check, 
  ArrowUpRight, 
  ExternalLink, 
  Play, 
  Info, 
  Cpu 
} from 'lucide-react';
import { WorkTemplate } from '../types';

export const INITIAL_TEMPLATES: WorkTemplate[] = [
  {
    id: 'nextjs-enterprise',
    type: 'web',
    title: 'NextJS Enterprise Starter Bundle',
    description: 'A robust production-ready Next.js architecture containing tailwind, shadcn configurations, multi-state caching contexts, API endpoint proxy routes, and docker configurations.',
    technologies: ['Next.js 14', 'TypeScript', 'TailwindCSS', 'Zustand', 'ESLint'],
    installation: ['npx create-next-app@latest', 'npm install lucide-react class-variance-authority', 'npm run dev'],
    features: ['Pre-configured API routing proxies', 'Row security middleware bindings', 'Custom layout frames structure', 'Optimized SEO metadata setups'],
    fileStructure: [
      {
        name: 'app',
        type: 'directory',
        children: [
          { name: 'layout.tsx', type: 'file', content: `export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">{children}</body>
    </html>
  );
}` },
          { name: 'page.tsx', type: 'file', content: `import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-black">OMX Enterprise Stack</h1>
        <Button>Explore Canvas</Button>
      </div>
    </main>
  );
}` },
          { name: 'api', type: 'directory', children: [
            { name: 'health', type: 'directory', children: [
              { name: 'route.ts', type: 'file', content: `import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "healthy", timestamp: Date.now() });
}` }
            ]}
          ]}
        ]
      },
      {
        name: 'components',
        type: 'directory',
        children: [
          { name: 'ui', type: 'directory', children: [
            { name: 'button.tsx', type: 'file', content: `import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
  return (
    <button
      className={cn("px-4 py-2 bg-emerald-500 text-black hover:bg-emerald-400 font-bold rounded-lg transition-all", className)}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";
export { Button };` }
          ]}
        ]
      },
      { name: 'package.json', type: 'file', content: `{
  "name": "omx-enterprise-starter",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}` }
    ]
  },
  {
    id: 'react-native-fluid',
    type: 'app',
    title: 'React Native 60FPS Performance Kit',
    description: 'An offline-capable mobile template leveraging high performance SQLite indices, selective websocket transaction brokers, custom native layouts, and fluid gesture animations.',
    technologies: ['React Native', 'Expo SDK', 'Zustand', 'FlashList', 'SQLite'],
    installation: ['npx create-expo-app@latest -t expo-template-blank-typescript', 'npm install sqlite-storage canvas-nest', 'npx expo start'],
    features: ['Pre-tuned FlatList Recycler lists', 'Automatic local cache database queuing', 'Offline transactions synchronization loops', 'Optimized native modules interfaces'],
    fileStructure: [
      {
        name: 'src',
        type: 'directory',
        children: [
          { name: 'App.tsx', type: 'file', content: `import { registerRootComponent } from 'expo';
import MainDashboard from './screens/MainDashboard';

export default function App() {
  return <MainDashboard />;
}
registerRootComponent(App);` },
          { name: 'screens', type: 'directory', children: [
            { name: 'MainDashboard.tsx', type: 'file', content: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MainDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>OMX Performance Mobile Engine</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, color: '#4edea3', fontWeight: 'bold' }
});` }
          ]},
          { name: 'database', type: 'directory', children: [
            { name: 'localDb.ts', type: 'file', content: `import { openDatabase } from 'expo-sqlite';

const db = openDatabase('omx_app_transactions.db');

export const initializeLocalSchema = () => {
  db.transaction(tx => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS sync_queue (id TEXT PRIMARY KEY, payload TEXT, timestamp INTEGER)"
    );
  });
};` }
          ]}
        ]
      },
      { name: 'app.json', type: 'file', content: `{
  "expo": {
    "name": "omx-performance-mobile",
    "slug": "omx-performance-mobile",
    "version": "1.0.0"
  }
}` }
    ]
  },
  {
    id: 'scientific-academic-paper',
    type: 'research',
    title: 'Double-Column Academic LaTeX Template',
    description: 'A beautifully structured, publication-grade academic computer science research paper template configured with IEEE bibliography rules, math notation nodes, and modular sections.',
    technologies: ['LaTeX', 'TexLive', 'BibTeX', 'IEEE Science', 'Vector Math'],
    installation: ['git clone omx-research-templates', 'pdflatex main.tex', 'bibtex main', 'pdflatex main.tex'],
    features: ['Standard Double-Column formatting layouts', 'Clean bibliography pre-seed index files', 'Symmetrical vector chart injection coordinates', 'Advanced equation formats templates'],
    fileStructure: [
      {
        name: 'document',
        type: 'directory',
        children: [
          { name: 'main.tex', type: 'file', content: `\\documentclass[journal,10pt,compsoc,twocolumn]{IEEEtran}
\\usepackage{amsmath}
\\usepackage{graphicx}

\\begin{document}
\\title{Architectural Optimization of Local Distributed Synchronization Channels for Bilingual Triage Matrices}
\\author{Obsa Mustefa, OMX Systems Coordinator}

\\maketitle

\\begin{abstract}
As localized enterprise AI and RAG architectures expand...
\\end{abstract}

\\section{Introduction}
Modern information systems often struggle to maintain latency bounds in emerging rugged ecosystems...

\\section{Methodology}
We describe a unified reciprocal score fusion matrix...

\\end{document}` },
          { name: 'references.bib', type: 'file', content: `@article{mustefa2026bilingual,
  author={Mustefa, Obsa},
  journal={IEEE Transactions on Software Engineering},
  title={Bilingual Triage Routing Pipelines and Row Isolation Security Constraints},
  year={2026},
  volume={14},
  number={3},
  pages={112-124}
}` }
        ]
      },
      { name: 'Makefile', type: 'file', content: `all:
	pdflatex main.tex
	bibtex main
	pdflatex main.tex` }
    ]
  }
];

// Enrich with a private Air-Gap template item that remains masked unless authenticated
export const SECURE_TEMPLATES_SEED: WorkTemplate[] = [
  ...INITIAL_TEMPLATES,
  {
    id: 'sensitive-defense-triage',
    type: 'research' as const,
    title: '[🔒 CLASSIFIED CODE] Air-Gap Telemetry Cipher System',
    description: 'A modular dual-encryption stack implementing AES-256-GCM cipher routines and memory isolates for rugged mobile/server environments.',
    technologies: ['C++ 20', 'OpenSSL 3.0', 'Crypto++ Library', 'Memory Pools'],
    installation: ['make compile_secure_gateway', './run_isolated_tunnel --isolated-flag=true'],
    features: ['Zero-allocation memory blocks for low-latency nodes', 'Pre-configured hardware token checks', 'Double-handshake isolated tunnel loops'],
    isPrivate: true,
    fileStructure: [
      {
        name: 'secure_vault',
        type: 'directory',
        children: [
          { name: 'gatekeeper.cpp', type: 'file', content: `// Secure cipher authorization pipeline\n#include <iostream>\n#include <vector>\n\nbool verify_local_vector_signature(const std::vector<uint8_t>& token) {\n    std::cout << "[SYSTEM] Testing authentication credentials vectors\\n";\n    return token.size() > 16 && token[0] == 0x7F;\n}` },
          { name: 'airgap_channel.h', type: 'file', content: `#pragma once\n// Classified communication loop\nclass AirGapTunnel {\npublic:\n    void pipe_symmetric_keys() {\n        // Reciprocal encryption block\n    }\n};` }
        ]
      }
    ]
  }
];

interface HubTemplatesProps {
  isAdmin: boolean;
}

export default function HubTemplates({ isAdmin }: HubTemplatesProps) {
  const [activeTab, setActiveTab] = useState<'web' | 'app' | 'research'>('web');
  
  // Use the SECURE_TEMPLATES_SEED so classified assets are available
  const [selectedTemplate, setSelectedTemplate] = useState<WorkTemplate>(SECURE_TEMPLATES_SEED[0]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  // File Structure Exploration State
  const [expandedDirs, setExpandedDirs] = useState<Record<string, boolean>>({ 'app': true, 'src': true, 'document': true, 'secure_vault': true });
  const [selectedFileContent, setSelectedFileContent] = useState<string>(
    `Select a file in the directory layout on the left to inspect code...`
  );
  const [activeFileName, setActiveFileName] = useState<string>('Select File');

  const visibleAssets = SECURE_TEMPLATES_SEED.filter(t => isAdmin ? true : !t.isPrivate);
  const filtered = visibleAssets.filter(t => t.type === activeTab);

  const handleSelectTemplate = (tpl: WorkTemplate) => {
    setSelectedTemplate(tpl);
    // Auto populate first file content if available
    if (tpl.fileStructure.length > 0) {
      const first = tpl.fileStructure[0];
      if (first.type === 'file') {
        setSelectedFileContent(first.content || '');
        setActiveFileName(first.name);
      } else if (first.children && first.children.length > 0) {
        const child = first.children[0];
        setSelectedFileContent(child.content || '');
        setActiveFileName(child.name);
      }
    }
  };

  const toggleDirectory = (dirName: string) => {
    setExpandedDirs(prev => ({ ...prev, [dirName]: !prev[dirName] }));
  };

  const selectFile = (fileName: string, content?: string) => {
    if (content) {
      setSelectedFileContent(content);
      setActiveFileName(fileName);
    }
  };

  const handleCopyCmds = (cmds: string[], idx: number) => {
    const combined = cmds.join(' && ');
    navigator.clipboard.writeText(combined);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  // Directory visualizer recursion node maker
  const renderFileStructure = (nodes: any[], prefix = '') => {
    return nodes.map((node) => {
      const uniquePath = `${prefix}/${node.name}`;
      if (node.type === 'directory') {
        const isExpanded = !!expandedDirs[node.name];
        return (
          <div key={uniquePath} className="flex flex-col ml-3 text-[#fbfbfa]">
            <button
              onClick={() => toggleDirectory(node.name)}
              className="flex items-center gap-1.5 py-1 text-xs text-[#e9c349] hover:text-white transition-colors cursor-pointer"
            >
              <Folder size={12} className={isExpanded ? 'opacity-90 fill-[#e9c349]/10' : 'opacity-60'} />
              <span className="font-mono tracking-tight font-bold">{node.name}/</span>
            </button>
            {isExpanded && node.children && (
              <div className="border-l border-white/5 ml-1.5 pl-1">
                {renderFileStructure(node.children, uniquePath)}
              </div>
            )}
          </div>
        );
      } else {
        const isActive = activeFileName === node.name;
        return (
          <button
            key={uniquePath}
            onClick={() => selectFile(node.name, node.content)}
            className={`flex items-center gap-1.5 py-1 text-xs ml-3 text-left transition-colors cursor-pointer ${
              isActive ? 'text-[#4edea3] font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            <File size={11} className={isActive ? 'opacity-100' : 'opacity-40'} />
            <span className="font-mono tracking-tight text-[11px]">{node.name}</span>
          </button>
        );
      }
    });
  };

  return (
    <div className="flex flex-col gap-8 text-left">
      {/* Templates introductory */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#4edea3] font-black bg-[#4edea3]/10 border border-[#4edea3]/20 px-3 py-1 rounded-full">
            Engineering Starter Kits
          </span>
          <h3 className="font-sans text-3xl md:text-5xl font-black text-white tracking-tight mt-3 mb-2">
            Starter Templates
          </h3>
          <p className="font-sans text-sm md:text-base text-gray-400 font-light max-w-2xl leading-relaxed">
            Acquire pre-configured setups to kickstart multi-tenant web systems, performance mobile shells, or academic LaTeX manuscripts.
          </p>
        </div>

        {/* Dynamic switcher tabs */}
        <div className="flex bg-[#121212] border border-white/5 p-1 rounded-xl select-none shrink-0 text-xs font-mono">
          <button
            onClick={() => { 
              setActiveTab('web'); 
              const firstWeb = SECURE_TEMPLATES_SEED.find(t => t.type === 'web' && (isAdmin ? true : !t.isPrivate));
              if (firstWeb) handleSelectTemplate(firstWeb); 
            }}
            className={`px-4 py-2 rounded-lg flex items-center gap-1.5 font-bold transition-all cursor-pointer ${
              activeTab === 'web' ? 'bg-[#4edea3] text-black font-extrabold shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Globe size={12} />
            Web Work
          </button>
          <button
            onClick={() => { 
              setActiveTab('app'); 
              const firstApp = SECURE_TEMPLATES_SEED.find(t => t.type === 'app' && (isAdmin ? true : !t.isPrivate));
              if (firstApp) handleSelectTemplate(firstApp); 
            }}
            className={`px-4 py-2 rounded-lg flex items-center gap-1.5 font-bold transition-all cursor-pointer ${
              activeTab === 'app' ? 'bg-[#4edea3] text-black font-extrabold shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Smartphone size={12} />
            App Shells
          </button>
          <button
            onClick={() => { 
              setActiveTab('research'); 
              const firstRes = SECURE_TEMPLATES_SEED.find(t => t.type === 'research' && (isAdmin ? true : !t.isPrivate));
              if (firstRes) handleSelectTemplate(firstRes); 
            }}
            className={`px-4 py-2 rounded-lg flex items-center gap-1.5 font-bold transition-all cursor-pointer ${
              activeTab === 'research' ? 'bg-[#4edea3] text-black font-extrabold shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <BookOpen size={12} />
            Research LaTeX
          </button>
        </div>
      </div>

      {/* Primary Layout Split: Left selection & features / Right dynamic folder structures explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Area: Templates list description */}
        <div className="lg:col-span-5 flex flex-col gap-6 text-left">
          {filtered.map(tpl => (
            <div
              key={tpl.id}
              onClick={() => handleSelectTemplate(tpl)}
              className={`border p-6 rounded-2xl flex flex-col gap-4 relative transition-all cursor-pointer ${
                selectedTemplate.id === tpl.id 
                  ? 'bg-[#121212] border-[#4edea3]/40 shadow-md shadow-emerald-500/5' 
                  : 'bg-[#121212]/50 border-white/5 hover:border-white/10'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-[#e9c349] font-black uppercase bg-[#e9c349]/5 border border-[#e9c349]/10 px-2.5 py-0.5 rounded">
                    {tpl.type} architecture blueprint
                  </span>
                  {tpl.isPrivate && (
                    <span className="font-mono text-[8.5px] text-red-500 font-extrabold uppercase bg-red-500/10 border border-red-500/25 px-2 py-0.5 rounded flex items-center gap-0.5">
                      Classified
                    </span>
                  )}
                </div>
                <h4 className="font-sans text-xl font-extrabold text-white mt-2">
                  {tpl.title}
                </h4>
              </div>

              <p className="font-sans text-xs text-gray-400 leading-relaxed font-light">
                {tpl.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {tpl.technologies.map(tech => (
                  <span key={tech} className="font-mono text-[9px] text-gray-500 bg-black/40 border border-white/5 py-0.5 px-2 rounded-md">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Core capabilities list section */}
              <div className="flex flex-col gap-1.5 mt-2">
                <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-black flex items-center gap-1">
                  <Cpu size={11} className="text-[#4edea3]" />
                  Blueprint Advantages
                </div>
                <ul className="text-xs font-sans text-gray-400 leading-relaxed font-light space-y-1 pl-4 list-disc text-left">
                  {tpl.features.map(f => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>

              {/* Bash Installation Bootstrap */}
              <div className="mt-4 bg-black/50 border border-white/5 p-4 rounded-xl flex flex-col gap-2 relative group overflow-hidden">
                <div className="flex justify-between items-center bg-transparent z-10">
                  <div className="flex items-center gap-1 font-mono text-[9px] text-gray-500 uppercase font-black">
                    <Terminal size={11} className="text-[#4edea3]" />
                    CLI Command chain
                  </div>
                  <button
                    onClick={() => handleCopyCmds(tpl.installation, 99)}
                    className="p-1 px-2.5 text-gray-500 hover:text-[#4edea3] hover:bg-emerald-500/5 border border-white/5 rounded-md font-mono text-[9px] transition-all flex items-center gap-1 cursor-pointer"
                  >
                    {copiedIndex === 99 ? (
                      <>
                        <Check size={9} className="text-[#4edea3]" />
                        <span>Copied CLI!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={9} />
                        <span>Copy bash</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="font-mono text-[10px] text-emerald-400/90 leading-relaxed bg-transparent z-10 break-all select-all font-light whitespace-pre-line text-left">
                  {tpl.installation.join(' && \n')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Area: Interactive Code Folder Structure Explorer */}
        <div className="lg:col-span-7 bg-[#121212]/30 border border-white/10 rounded-2xl p-6 shadow-lg min-h-[450px] flex flex-col gap-4 text-left h-[520px] overflow-hidden">
          <div className="flex items-center gap-2 border-b border-white/5 pb-4 select-none justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] shadow-[0_0_8px_rgba(78,222,163,0.3)]" />
              <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest leading-none">Template Directory Explorer</div>
            </div>
            <span className="font-mono text-[11px] text-[#4edea3] font-bold">Active: {selectedTemplate.title}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-grow h-full overflow-hidden">
            
            {/* Visual Dir Column */}
            <div className="md:col-span-5 border-r border-white/5 pr-4 flex flex-col gap-2 overflow-y-auto h-full scrollbar-none">
              <div className="font-mono text-[9px] text-gray-500 uppercase tracking-wider mb-2 font-bold select-none">Files Catalog</div>
              <div className="flex flex-col gap-1.5 select-none text-left">
                {renderFileStructure(selectedTemplate.fileStructure)}
              </div>
            </div>

            {/* Code Contents Viewing Viewport Canvas */}
            <div className="md:col-span-7 flex flex-col h-full overflow-hidden bg-black/60 rounded-xl border border-white/5">
              <div className="h-10 bg-black/80 border-b border-white/5 flex items-center justify-between px-4 shrink-0 font-mono text-[9px] text-gray-500 uppercase select-none">
                <span>FILE BUFFER: {activeFileName}</span>
                <span className="text-[#e9c349]">source codes</span>
              </div>
              <div className="flex-1 p-4 overflow-y-auto font-mono text-[10.5px] text-gray-300 leading-relaxed select-text text-left select-all whitespace-pre-wrap">
                {selectedFileContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
