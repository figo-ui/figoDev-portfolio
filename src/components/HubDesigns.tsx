import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Layers, 
  AppWindow, 
  Smartphone, 
  Grid, 
  X, 
  ExternalLink, 
  Sparkles, 
  Palette, 
  Activity, 
  Eye, 
  Check, 
  Code 
} from 'lucide-react';
import { DesignVaultItem } from '../types';

const INITIAL_DESIGNS: DesignVaultItem[] = [
  {
    id: 'omx-3d-logo',
    title: 'OMX 3D Architectural Emblem',
    category: 'layout',
    description: 'An interactive 3D logo design rendering complex nested geometries in real-time, built with Google Stitch and custom shading node pipelines.',
    accentColor: '#4edea3',
    stitchesProjectUrl: 'https://stitch.withgoogle.com/projects/3119960911741364975?node-id=c5bbb899a8e14d8fb655ba709503818e'
  },
  {
    id: 'bento-grid-dashboard',
    title: 'Bento Grid System Analytics Board',
    category: 'web',
    description: 'An asymmetrical data visualization dashboard with progressive loading frames, custom shadows, and dynamic hover responsiveness.',
    accentColor: '#e9c349',
    demoUrl: '#demo'
  },
  {
    id: 'brutalist-slider',
    title: 'Monochromatic Audio Controller',
    category: 'component',
    description: 'A dark brutalist-style synthesizer console module with interactive knobs, custom mouse-drag tracking, and live vector dials.',
    accentColor: '#f72585',
    demoUrl: '#demo'
  },
  {
    id: 'medical-auth-mobile',
    title: 'Triage Identity Verification Portal',
    category: 'app',
    description: 'A mobile screen layout mockup focused on clinic officer login credentials, biometric authentication triggers, and fast offline profile cached indicators.',
    accentColor: '#3b82f6',
    demoUrl: '#demo'
  }
];

interface HubDesignsProps {
  isAdmin: boolean;
}

export default function HubDesigns({ isAdmin }: HubDesignsProps) {
  const [designs, setDesigns] = useState<DesignVaultItem[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<DesignVaultItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Knob/Slider State for Brutalist interactive component preview
  const [knobVal, setKnobVal] = useState(65);
  const [activeChannel, setActiveChannel] = useState('Ch1-Main');

  // Registration Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'web' | 'app' | 'component' | 'layout'>('web');
  const [description, setDescription] = useState('');
  const [accentColor, setAccentColor] = useState('#4edea3');
  const [stitchesUrl, setStitchesUrl] = useState('');
  const [isDesignPrivate, setIsDesignPrivate] = useState(false);
  const [formError, setFormError] = useState('');
  const [successRegister, setSuccessRegister] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('omx_vault_designs');
      if (stored) {
        setDesigns(JSON.parse(stored));
      } else {
        const enriched_initial_designs = [
          ...INITIAL_DESIGNS,
          {
            id: 'sensitive-ai-prompt-tuning',
            title: '[🔒 CLASSIFIED MOCKUP] Prompt-Injection Guard Sandbox UI',
            category: 'web' as const,
            description: 'An unreleased administration dashboard layout tracking prompt safety thresholds, system boundary constraints, and adversarial filter configurations.',
            accentColor: '#f43f5e',
            demoUrl: '#demo',
            isPrivate: true
          }
        ];
        localStorage.setItem('omx_vault_designs', JSON.stringify(enriched_initial_designs));
        setDesigns(enriched_initial_designs);
      }
    } catch (e) {
      setDesigns(INITIAL_DESIGNS);
    }
  }, []);

  // Filter based on admin session credentials
  const visibilityFilteredDesigns = designs.filter(d => isAdmin ? true : !d.isPrivate);

  const filteredDesigns = activeCategory === 'All'
    ? visibilityFilteredDesigns
    : visibilityFilteredDesigns.filter(d => d.category === activeCategory.toLowerCase());

  const handleRegisterDesign = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!title.trim() || !description.trim()) {
      setFormError('Please input both title and description details.');
      return;
    }

    const newItem: DesignVaultItem = {
      id: `dev-design-${Date.now()}`,
      title: title.trim(),
      category,
      description: description.trim(),
      accentColor,
      stitchesProjectUrl: stitchesUrl.trim() || undefined,
      demoUrl: stitchesUrl.trim() ? undefined : '#demo',
      isPrivate: isDesignPrivate
    };

    const updated = [newItem, ...designs];
    setDesigns(updated);
    localStorage.setItem('omx_vault_designs', JSON.stringify(updated));

    // Reset
    setTitle('');
    setDescription('');
    setStitchesUrl('');
    setIsDesignPrivate(false);
    setSuccessRegister(true);

    setTimeout(() => {
      setSuccessRegister(false);
      setIsRegisterOpen(false);
    }, 1500);
  };

  const handleDeleteDesign = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Delete this design registration from your local workspace?')) return;

    const updated = designs.filter(d => d.id !== id);
    setDesigns(updated);
    localStorage.setItem('omx_vault_designs', JSON.stringify(updated));

    if (selectedDesign?.id === id) {
      setSelectedDesign(null);
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'web': return <AppWindow size={14} />;
      case 'app': return <Smartphone size={14} />;
      case 'component': return <Layers size={14} />;
      case 'layout': return <Grid size={14} />;
      default: return <Palette size={14} />;
    }
  };

  return (
    <div className="flex flex-col gap-8 text-left relative">
      {/* Intro block header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#4edea3] font-black bg-[#4edea3]/10 border border-[#4edea3]/20 px-3 py-1 rounded-full">
            Graphic Archives
          </span>
          <h3 className="font-sans text-3xl md:text-5xl font-black text-white tracking-tight mt-3 mb-2">
            Design Vault
          </h3>
          <p className="font-sans text-sm md:text-base text-gray-400 font-light max-w-2xl leading-relaxed">
            Archive of interactive components, custom multi-tier layout sheets, mockups, and live 3D vector containers built dynamically with Google Stitch.
          </p>
        </div>

        {/* Register Design (Only for logged-in Administrator) */}
        {isAdmin && (
          <button
            onClick={() => setIsRegisterOpen(true)}
            className="flex items-center gap-2 bg-[#e9c349] hover:bg-[#ebd586] text-black px-5 py-3 rounded-xl font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(233,195,73,0.15)] cursor-pointer"
          >
            <Plus size={14} />
            Register Design
          </button>
        )}
      </div>

      {/* Filter Options */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none">
        {['All', 'Web', 'App', 'Component', 'Layout'].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium border flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-white text-black border-white shadow-lg'
                : 'bg-[#121212] text-gray-400 border-white/5 hover:border-white/20'
            }`}
          >
            {cat !== 'All' && getCategoryIcon(cat)}
            {cat}
          </button>
        ))}
      </div>

      {/* Design Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredDesigns.map((item, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              key={item.id}
              onClick={() => setSelectedDesign(item)}
              className="bg-[#121212] border border-white/10 p-6 rounded-2xl flex flex-col justify-between h-80 group hover:border-emerald-400/30 transition-all duration-300 shadow-md cursor-pointer overflow-hidden relative"
            >
              {/* Colored abstract top border representation */}
              <div 
                style={{ backgroundColor: item.accentColor }} 
                className="absolute top-0 inset-x-0 h-1.5 opacity-80" 
              />

              <div className="flex flex-col gap-4 mt-2">
                {/* Header row with badge & metadata icons */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[9px] text-[#4edea3] bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase tracking-wider font-extrabold flex items-center gap-1">
                      {getCategoryIcon(item.category)}
                      {item.category}
                    </span>
                    {item.isPrivate && (
                      <span className="font-mono text-[8.5px] text-red-400 uppercase tracking-widest font-black bg-red-500/15 border border-red-500/20 px-2 py-0.5 rounded flex items-center gap-0.5">
                        <Code size={10} /> Private
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {item.stitchesProjectUrl ? (
                      <span className="font-mono text-[8.5px] text-[#e9c349] bg-[#e9c349]/5 border border-[#e9c349]/10 px-1.5 py-0.5 rounded font-black uppercase">
                        3D Stitch Viewport
                      </span>
                    ) : (
                      <span className="font-mono text-[8.5px] text-gray-500 uppercase tracking-widest bg-white/2 px-1.5 py-0.5 rounded border border-white/5">
                        Interactive Mock
                      </span>
                    )}

                    {/* Trash handle (Only visible to admin session) */}
                    {isAdmin && (
                      <button
                        onClick={(e) => handleDeleteDesign(item.id, e)}
                        className="p-1.5 text-gray-600 hover:text-red-400 rounded transition-colors cursor-pointer"
                        title="Remove from vault"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                </div>

                <h4 className="font-sans text-xl font-extrabold text-white group-hover:text-[#4edea3] transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h4>

                <p className="font-sans text-xs text-gray-400 font-light leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Bottom bar preview prompt */}
              <div className="flex justify-between items-center bg-black/30 border border-white/5 p-3 rounded-xl mt-4 z-10">
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-bold">
                  OMX Asset Index
                </span>
                <span className="font-mono text-[10px] text-[#4edea3] font-black group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  Launch Sandbox View →
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating State: Design Registration Form Modal */}
      <AnimatePresence>
        {isRegisterOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0f0f0f] border border-white/10 rounded-2xl w-full max-w-lg shadow-[0_30px_70px_rgba(0,0,0,0.85)] flex flex-col relative"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5 sticky top-0 bg-[#0f0f0f] z-10 w-full">
                <div className="flex items-center gap-2">
                  <Palette size={16} className="text-[#e9c349]" />
                  <div>
                    <h3 className="font-sans text-base font-black text-white leading-none">Register Layout Vault Asset</h3>
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Saves locally on browser localstorage</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsRegisterOpen(false)}
                  className="p-2 text-gray-400 hover:text-white rounded transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {successRegister ? (
                <div className="p-12 text-center flex flex-col items-center justify-center gap-4 h-[40vh]">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Check size={24} />
                  </div>
                  <h4 className="font-sans text-xl font-black text-white">Registered Successfully!</h4>
                  <p className="font-mono text-xs text-gray-400">Added securely to the Graphics Vault catalogs.</p>
                </div>
              ) : (
                <form onSubmit={handleRegisterDesign} className="p-6 flex flex-col gap-4 text-left w-full">
                  {formError && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg font-mono text-xs">
                      Error: {formError}
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Design / Asset Title *</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Neo-Brutalist Layout Cards Grid"
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/20 text-left"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                      >
                        <option value="web">Web Interface</option>
                        <option value="app">Mobile Screen</option>
                        <option value="component">Interactive Node</option>
                        <option value="layout">Dynamic Layout</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Accent Color</label>
                      <select
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                      >
                        <option value="#4edea3">Emerald Green</option>
                        <option value="#e9c349">Retro Gold</option>
                        <option value="#f72585">Hot Neon Violet</option>
                        <option value="#3b82f6">Cosmo Blue</option>
                        <option value="#ff6b6b">Crimson Red</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Target Stitches OR External Embed URL (Optional)</label>
                    <input
                      type="url"
                      value={stitchesUrl}
                      onChange={(e) => setStitchesUrl(e.target.value)}
                      placeholder="e.g. https://stitch.withgoogle.com/projects/..."
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:border-emerald-400 focus:outline-none text-left"
                    />
                  </div>

                  {/* Public Private toggle */}
                  <div className="bg-black/40 border border-white/5 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-mono text-[9.5px] text-white uppercase tracking-wider font-extrabold flex items-center gap-1 bg-transparent">
                        <Code size={12} className="text-[#e1bc41] shrink-0" />
                        Visibility Lock
                      </div>
                      <p className="font-sans text-[11px] text-gray-500 leading-normal mt-0.5">
                        Private designs are masked from unauthenticated user portals.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsDesignPrivate(!isDesignPrivate)}
                      className={`px-4 py-1.5 rounded-lg font-mono text-[10px] uppercase font-black tracking-wider transition-all cursor-pointer ${
                        isDesignPrivate 
                          ? 'bg-red-500/20 text-red-200 border border-red-500/30' 
                          : 'bg-emerald-500/20 text-[#4edea3] border border-emerald-500/20'
                      }`}
                    >
                      {isDesignPrivate ? 'Private' : 'Public'}
                    </button>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Description *</label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Give details about layout hierarchies, animations, and typography pairing choices..."
                      className="bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:border-emerald-400 focus:outline-none resize-none text-left"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => setIsRegisterOpen(false)}
                      className="px-4 py-2 bg-transparent text-gray-400 hover:text-white rounded-xl font-mono text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#e9c349] text-black px-5 py-2 rounded-xl font-mono text-xs font-black hover:bg-[#ebd586] transition-all cursor-pointer"
                    >
                      Register Asset
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Sandbox Design Viewer Panel Sheet */}
      <AnimatePresence>
        {selectedDesign && (
          <div className="fixed inset-0 bg-black/92 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-[#0c0c0c] border border-white/10 rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col shadow-[0_45px_100px_rgba(0,0,0,0.95)] overflow-hidden"
            >
              {/* Layout view header */}
              <div className="h-14 border-b border-white/5 px-6 flex items-center justify-between bg-black/50 backdrop-blur-sm sticky top-0 z-10 w-full select-none">
                <div className="flex items-center gap-3">
                  <div 
                    style={{ backgroundColor: selectedDesign.accentColor }} 
                    className="w-3 h-3 rounded-full shadow-[0_0_8px_currentColor]" 
                  />
                  <h3 className="font-sans text-base font-black text-white">{selectedDesign.title}</h3>
                  <span className="font-mono text-[9px] text-gray-500 uppercase bg-white/2 px-2 py-0.5 rounded border border-white/5">
                    {selectedDesign.category} view
                  </span>
                </div>

                <button
                  onClick={() => setSelectedDesign(null)}
                  className="p-2 text-gray-400 hover:text-white rounded transition-colors cursor-pointer"
                  title="Close Canvas"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Main Playground Splitting Area */}
              <div className="flex-1 overflow-auto grid grid-cols-1 lg:grid-cols-12 w-full">
                
                {/* Left Area: Live Interactive Sandbox Environment */}
                <div className="lg:col-span-7 bg-[#050505] relative min-h-[300px] border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-between p-4 h-full">
                  
                  {/* Embedded Iframe Option for Stitch Projects */}
                  {selectedDesign.stitchesProjectUrl ? (
                    <div className="relative w-full h-full flex-grow bg-black rounded-lg overflow-hidden border border-white/5 shadow-inner">
                      <iframe
                        src={selectedDesign.stitchesProjectUrl}
                        referrerPolicy="no-referrer"
                        className="w-full h-full border-0 absolute inset-0"
                        title={selectedDesign.title}
                        sandbox="allow-scripts allow-same-origin"
                      />
                    </div>
                  ) : (
                    // Default interactive node playground logic based on categories
                    <div className="flex-grow flex items-center justify-center relative p-8 bg-gradient-to-tr from-black to-[#0c0c0c] rounded-lg border border-white/5 mt-2 shadow-inner select-none overflow-hidden">
                      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-emerald-500/5 rounded-full blur-[40px]" />
                      
                      {selectedDesign.category === 'component' ? (
                        /* Brutalist Knobs Interactive Playground Mode */
                        <div className="flex flex-col items-center gap-6 z-10 bg-[#121212] p-8 rounded-2xl border border-white/10 w-full max-w-sm">
                          <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest bg-white/5 p-1 rounded">Dial Playground</span>
                          <div className="relative w-32 h-32 flex items-center justify-center bg-black rounded-full border-4 border-white/5">
                            <motion.div 
                              style={{ rotate: knobVal * 2.8 }}
                              className="w-24 h-24 rounded-full bg-[#181818] border-2 border-[#4edea3]/40 flex items-center justify-start p-2 shadow-xl"
                            >
                              <div className="w-2.5 h-2.5 rounded-full bg-[#4edea3]" />
                            </motion.div>
                            <span className="absolute bottom-2 font-mono text-[11px] text-white bg-black px-1 rounded">{knobVal}%</span>
                          </div>
                          
                          {/* Sizing Slider */}
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={knobVal} 
                            onChange={(e) => setKnobVal(Number(e.target.value))} 
                            className="w-full accent-[#4edea3] bg-white/5 h-1 rounded-full cursor-pointer"
                          />

                          <div className="flex gap-2 w-full mt-1">
                            {['Ch1-Main', 'Ch2-Aux', 'Reverb'].map(ch => (
                              <button 
                                key={ch}
                                onClick={() => setActiveChannel(ch)}
                                className={`flex-1 font-mono text-[9px] py-1 border rounded cursor-pointer transition-colors ${
                                  activeChannel === ch 
                                    ? 'bg-[#4edea3] text-black border-[#4edea3] font-bold' 
                                    : 'bg-transparent text-gray-500 border-white/5 hover:border-white/20'
                                }`}
                              >
                                {ch}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : selectedDesign.category === 'web' ? (
                        /* Bento Grid Playground demo */
                        <div className="grid grid-cols-2 gap-3 w-full max-w-md z-10 text-left">
                          <motion.div whileHover={{ y: -3 }} className="bg-[#121212] border border-white/10 p-4 rounded-xl flex flex-col justify-between h-28">
                            <div className="flex justify-between font-mono text-[8px] text-gray-500">
                              <span>STATS</span>
                              <Activity size={10} className="text-[#ebd88d]" />
                            </div>
                            <div className="mt-2 text-2xl font-black font-mono text-[#ebd88d]">89.4%</div>
                            <span className="font-mono text-[8px] text-gray-500 leading-none">CPU Core Latency Node</span>
                          </motion.div>

                          <motion.div whileHover={{ y: -3 }} className="bg-[#121212] border border-white/10 p-4 rounded-xl flex flex-col justify-between h-28">
                            <div className="flex justify-between font-mono text-[8px] text-gray-500">
                              <span>INDEX</span>
                              <Grid size={10} className="text-[#4edea3]" />
                            </div>
                            <div className="mt-2 text-2xl font-black font-mono text-[#4edea3]">L4</div>
                            <span className="font-mono text-[8px] text-gray-500 leading-none">Synchronizer active logs</span>
                          </motion.div>

                          <motion.div whileHover={{ y: -3 }} className="col-span-2 bg-[#121212] border border-white/10 p-4 rounded-xl flex items-center justify-between h-16">
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-[#4edea3] rounded-full animate-pulse" />
                              <span className="font-mono text-[9px] text-white">Redis pub-sub Horizonal sync</span>
                            </div>
                            <span className="font-mono text-[9px] text-[#4edea3] bg-[#4edea3]/5 px-2 py-0.5 rounded">ONLINE</span>
                          </motion.div>
                        </div>
                      ) : (
                        /* General App or default mockups screen rendering */
                        <div className="w-56 h-80 bg-black rounded-3xl border-4 border-white/10 overflow-hidden relative shadow-2xl flex flex-col text-left">
                          <div className="h-5 shrink-0 bg-[#0f0f0f] flex items-center justify-center text-[7px] font-mono text-gray-500 select-none">
                            OMX Mobile Sandbox Environment
                          </div>
                          <div className="flex-grow p-4 flex flex-col gap-3 justify-center">
                            <div className="w-8 h-8 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center text-[#3b82f6]">
                              <Smartphone size={16} />
                            </div>
                            <div className="text-sm font-black text-white">Clinician Authentication</div>
                            <div className="w-full bg-[#121212] border border-white/5 py-2 px-3 rounded font-mono text-[7px] text-gray-500">
                              ****************
                            </div>
                            <motion.button 
                              whileTap={{ scale: 0.97 }}
                              className="bg-[#3b82f6] text-white text-[9px] font-mono py-2 rounded-lg font-bold shadow-lg"
                            >
                              Verify Profile Access
                            </motion.button>
                          </div>
                          <div className="h-2 w-20 bg-white/20 rounded-full mx-auto mb-1 shrink-0" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Sandbox status indicator helper */}
                  <div className="bg-black/40 border border-white/5 py-1 px-4 text-center font-mono text-[8.5px] text-gray-500 uppercase tracking-widest select-none rounded-lg mt-2">
                    {selectedDesign.stitchesProjectUrl ? 'Interactive Stitches Sandbox • Mouse hover to rotate viewport' : 'Active Visual Canvas Emulator sandbox'}
                  </div>
                </div>

                {/* Right Area: Spec Details Column info */}
                <div className="lg:col-span-5 p-8 flex flex-col justify-between text-left h-full overflow-y-auto">
                  <div className="flex flex-col gap-6">
                    <div>
                      <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest leading-none">Design Metadata specs</span>
                      <h4 className="font-sans text-2xl font-black text-white tracking-tight mt-2 mb-3">Specification Sheet</h4>
                      <div className="h-[2px] w-12 bg-white/10" />
                    </div>

                    <p className="font-sans text-sm text-gray-400 font-light leading-relaxed">
                      {selectedDesign.description}
                    </p>

                    <div className="flex flex-col gap-3 border-t border-b border-white/5 py-5 text-xs font-mono text-gray-400">
                      <div className="flex justify-between">
                        <span>ASSET ID:</span>
                        <span className="text-white font-semibold font-mono text-[11px]">{selectedDesign.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ACCENT RATIO:</span>
                        <span style={{ color: selectedDesign.accentColor }} className="font-semibold">{selectedDesign.accentColor} font</span>
                      </div>
                      <div className="flex justify-between">
                        <span>TAXONOMY:</span>
                        <span className="text-white font-semibold uppercase">{selectedDesign.category} platform</span>
                      </div>
                      <div className="flex justify-between">
                        <span>STATUS:</span>
                        <span className="text-[#4edea3] font-bold">STABLE ASSET</span>
                      </div>
                    </div>

                    {/* Developer notes mock panel */}
                    <div className="bg-[#121212] border border-white/5 p-4 rounded-xl flex items-start gap-3">
                      <Code size={16} className="text-[#e9c349] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-mono text-[10px] text-white uppercase tracking-wider font-extrabold mb-1">Architectural Memo</div>
                        <p className="font-sans text-[11px] text-gray-400 leading-normal">
                          This graphic profile incorporates high-fidelity structural layouts optimizing CPU memory threads on modern browser canvas configurations.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedDesign(null)}
                    className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl py-3 font-mono text-xs font-bold transition-all text-center selection:bg-transparent mt-8 cursor-pointer"
                  >
                    Return to Vault Catalog
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
