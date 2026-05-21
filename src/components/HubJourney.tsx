import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  MapPin, 
  Calendar, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  Eye, 
  Lock, 
  Unlock, 
  Layers, 
  Sparkles, 
  Tv, 
  Image as ImageIcon, 
  Paperclip, 
  ArrowUpRight 
} from 'lucide-react';
import { ProjectJourney, ProjectJourneyUpdate } from '../types';

const INITIAL_JOURNEYS: ProjectJourney[] = [
  {
    id: 'bilingual-triage-rag',
    projectName: 'OMX Bilingual Clinic Triage System',
    startDate: 'April 02, 2026',
    status: 'Shipped',
    description: 'A 30-day architectural journey crafting a localized, offline-first medical dispatcher matching linguistic health matrices with Postgres Row Isolation safeguards.',
    accentColor: '#4edea3',
    isPrivate: false,
    updates: [
      {
        id: 'day-1',
        title: 'Core Architecture & System Blueprint Conception',
        date: 'April 05, 2026',
        text: 'Initiated System Requirements Phase. Mapped logical constraints for health dispatch queries. Decided on a hybrid BM25 and Vector Search architecture to correctly index localized slang and clinical acronyms. Sketched database row policies to isolate health claim databases securely.',
        mediaType: 'none',
        phase: 'Concept'
      },
      {
        id: 'day-8',
        title: 'High-Fidelity Interface Prototype Mockups',
        date: 'April 12, 2026',
        text: 'Completed UI/UX Wireframing for Clinician login and rapid emergency triage logs. Designed asymmetrical grids featuring quick biometric touch indices and cached telemetry metrics to streamline the screen on legacy handsets.',
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
        phase: 'Prototype'
      },
      {
        id: 'day-15',
        title: 'Calibrating Local SQlite Storage & Embedding Engines',
        date: 'April 19, 2026',
        text: 'Completed Alpha Release. Configured automated SQL queue managers to retry transaction pipelines when clinician hardware fluctuates offline. Connected local embedding models to pre-compute vector metrics inside the sandbox storage context.',
        mediaType: 'link',
        mediaUrl: 'https://github.com/figo-ui',
        phase: 'Alpha'
      },
      {
        id: 'day-22',
        title: 'Interactive System Showcase & Beta Demo Test',
        date: 'April 26, 2026',
        text: 'Initiated multi-user beta trials. Watch the interactive simulation showcasing our automatic search triage pipeline fallback securely routing medical inquiries.',
        mediaType: 'video',
        mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        phase: 'Beta'
      },
      {
        id: 'day-30',
        title: 'Production Launch & Postgres Row security Activation',
        date: 'May 02, 2026',
        text: 'Successfully launched production build. Deployed primary REST routes proxy controllers safely. Initialized high-performance row security policy scopes preventing enterprise records lookup leakage.',
        mediaType: 'none',
        phase: 'Production'
      }
    ]
  },
  {
    id: 'private-ai-classifier',
    projectName: 'Enterprise Patient Billing NLP Classifier',
    startDate: 'May 10, 2026',
    status: 'In Progress',
    description: 'A sensitive, privately vaulted billing engine applying LLM structural checks directly within secure local environment variables.',
    accentColor: '#e9c349',
    isPrivate: true,
    updates: [
      {
        id: 'priv-day-1',
        title: 'Secret Environment Initialization',
        date: 'May 14, 2026',
        text: 'Secured workspace env definitions in local environment cache files. Prevented any client-side API script parameters from being exposed inside browser debug views.',
        mediaType: 'none',
        phase: 'Concept'
      }
    ]
  }
];

interface HubJourneyProps {
  isAdmin: boolean;
}

export default function HubJourney({ isAdmin }: HubJourneyProps) {
  const [journeys, setJourneys] = useState<ProjectJourney[]>([]);
  const [selectedJourney, setSelectedJourney] = useState<ProjectJourney | null>(null);
  const [activeUpdateIdx, setActiveUpdateIdx] = useState(0);

  // New Journey Creation Modal
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newProjName, setNewProjName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newColor, setNewColor] = useState('#4edea3');
  const [newIsPrivate, setNewIsPrivate] = useState(false);
  const [startDate, setStartDate] = useState('');
  
  // New Journey Update Modal
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [updTitle, setUpdTitle] = useState('');
  const [updDate, setUpdDate] = useState('');
  const [updText, setUpdText] = useState('');
  const [updPhase, setUpdPhase] = useState('Concept');
  const [updMediaType, setUpdMediaType] = useState<'none' | 'image' | 'video' | 'link'>('none');
  const [updMediaUrl, setUpdMediaUrl] = useState('');

  // Form Success Feedback
  const [formError, setFormError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Custom Video Player Playback State
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('omx_project_journeys');
      if (stored) {
        setJourneys(JSON.parse(stored));
      } else {
        localStorage.setItem('omx_project_journeys', JSON.stringify(INITIAL_JOURNEYS));
        setJourneys(INITIAL_JOURNEYS);
      }
    } catch (e) {
      setJourneys(INITIAL_JOURNEYS);
    }
  }, []);

  // Filter journeys list based on Admin credentials status
  const visibleJourneys = journeys.filter(j => isAdmin ? true : !j.isPrivate);

  useEffect(() => {
    if (visibleJourneys.length > 0 && !selectedJourney) {
      setSelectedJourney(visibleJourneys[0]);
      setActiveUpdateIdx(0);
    } else if (selectedJourney) {
      const currentExists = visibleJourneys.find(j => j.id === selectedJourney.id);
      if (!currentExists && visibleJourneys.length > 0) {
        setSelectedJourney(visibleJourneys[0]);
        setActiveUpdateIdx(0);
      }
    }
  }, [isAdmin, journeys]);

  const handleCreateJourney = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!newProjName.trim() || !newDesc.trim()) {
      setFormError('Please provide both a project name and a brief overview description.');
      return;
    }

    const newJ: ProjectJourney = {
      id: `journey-${Date.now()}`,
      projectName: newProjName.trim(),
      startDate: startDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'In Progress',
      description: newDesc.trim(),
      accentColor: newColor,
      isPrivate: newIsPrivate,
      updates: [
        {
          id: `upd-${Date.now()}`,
          title: 'Project Initiated & Tracked Active',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          text: `Initialized tracking history logs for "${newProjName.trim()}". Secure workspace sandbox nodes established cleanly.`,
          mediaType: 'none',
          phase: 'Concept'
        }
      ]
    };

    const updated = [newJ, ...journeys];
    setJourneys(updated);
    localStorage.setItem('omx_project_journeys', JSON.stringify(updated));
    setSelectedJourney(newJ);
    setActiveUpdateIdx(0);

    setNewProjName('');
    setNewDesc('');
    setNewIsPrivate(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsCreateOpen(false);
    }, 1200);
  };

  const handleAddUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!updTitle.trim() || !updText.trim()) {
      setFormError('Please supply both a log title and body update description.');
      return;
    }

    if (!selectedJourney) return;

    const newUpdate: ProjectJourneyUpdate = {
      id: `upd-${Date.now()}`,
      title: updTitle.trim(),
      date: updDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      text: updText.trim(),
      mediaType: updMediaType,
      mediaUrl: updMediaType !== 'none' ? updMediaUrl.trim() : undefined,
      phase: updPhase
    };

    const updatedJourneys = journeys.map(j => {
      if (j.id === selectedJourney.id) {
        return {
          ...j,
          updates: [...j.updates, newUpdate]
        };
      }
      return j;
    });

    setJourneys(updatedJourneys);
    localStorage.setItem('omx_project_journeys', JSON.stringify(updatedJourneys));
    
    const refreshedJourney = updatedJourneys.find(j => j.id === selectedJourney.id) || null;
    setSelectedJourney(refreshedJourney);
    if (refreshedJourney) {
      setActiveUpdateIdx(refreshedJourney.updates.length - 1);
    }

    // Reset Form fields
    setUpdTitle('');
    setUpdText('');
    setUpdMediaType('none');
    setUpdMediaUrl('');
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsUpdateOpen(false);
    }, 1200);
  };

  const handleDeleteJourney = (journeyId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you absolutely certain you wish to delete this targeted project journey tracking record?')) return;

    const remaining = journeys.filter(j => j.id !== journeyId);
    setJourneys(remaining);
    localStorage.setItem('omx_project_journeys', JSON.stringify(remaining));
    if (selectedJourney?.id === journeyId) {
      setSelectedJourney(remaining[0] || null);
      setActiveUpdateIdx(0);
    }
  };

  const handleDeleteUpdate = (updateId: string) => {
    if (!selectedJourney) return;
    if (!window.confirm('Delete this chronicle update card from the timeline?')) return;

    const updatedJourneys = journeys.map(j => {
      if (j.id === selectedJourney.id) {
        return {
          ...j,
          updates: j.updates.filter(u => u.id !== updateId)
        };
      }
      return j;
    });

    setJourneys(updatedJourneys);
    localStorage.setItem('omx_project_journeys', JSON.stringify(updatedJourneys));
    
    const refreshed = updatedJourneys.find(j => j.id === selectedJourney.id) || null;
    setSelectedJourney(refreshed);
    setActiveUpdateIdx(0);
  };

  const currentUpdate = selectedJourney?.updates[activeUpdateIdx] || null;

  return (
    <div className="flex flex-col gap-10 text-left relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#4edea3] font-black bg-[#4edea3]/10 border border-[#4edea3]/20 px-3 py-1 rounded-full">
            Dev Chronicles
          </span>
          <h3 className="font-sans text-3xl md:text-5xl font-black text-white tracking-tight mt-3 mb-2">
            Project Journeys
          </h3>
          <p className="font-sans text-sm md:text-base text-gray-400 font-light max-w-2xl leading-relaxed">
            Witness the complete lifecycle of production systems from the very first conceptual design logic sketches down to system scaling optimization parameters.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 bg-[#4edea3] hover:bg-[#6ffbbe] text-black px-5 py-3 rounded-xl font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(78,222,163,0.15)] cursor-pointer shrink-0"
          >
            <Plus size={14} />
            Start New Track
          </button>
        )}
      </div>

      {visibleJourneys.length === 0 ? (
        <div className="bg-[#121212]/30 border border-white/5 rounded-3xl p-16 text-center text-gray-500 font-mono text-sm leading-relaxed col-span-full">
          <span>No project journey chronicles active.</span>
          {isAdmin && (
            <button
              onClick={() => setIsCreateOpen(true)}
              className="mt-3 block mx-auto text-[#4edea3] hover:underline"
            >
              Start tracking a new software project journey
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Tracked Projects Picker Wheel */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-black mb-1 select-none">
              Tracked Projects
            </div>
            {visibleJourneys.map(j => (
              <button
                key={j.id}
                onClick={() => { setSelectedJourney(j); setActiveUpdateIdx(0); setIsVideoPlaying(false); }}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between group transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  selectedJourney?.id === j.id
                    ? 'bg-[#121212] border-emerald-400/30 shadow-md'
                    : 'bg-[#121212]/20 border-white/5 hover:border-white/10'
                }`}
              >
                {/* Visual Accent bar */}
                <div 
                  style={{ backgroundColor: j.accentColor }} 
                  className={`absolute top-0 inset-y-0 left-0 w-1 transition-transform ${
                    selectedJourney?.id === j.id ? 'scale-100' : 'scale-y-0 group-hover:scale-y-50'
                  }`}
                />

                <div className="pl-2 w-full">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="font-mono text-[9px] text-[#e9c349] uppercase bg-[#e9c349]/5 border border-[#e9c349]/10 px-2 py-0.5 rounded font-bold">
                      {j.status}
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-[9px] text-gray-500">
                      {j.isPrivate && (
                        <span className="text-red-400 flex items-center gap-0.5 font-bold uppercase">
                          <Lock size={10} /> Private
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 className="font-sans text-base font-extrabold text-white group-hover:text-[#4edea3] transition-colors leading-snug">
                    {j.projectName}
                  </h4>
                  <p className="font-sans text-[11px] text-gray-400 font-light mt-1.5 line-clamp-2 leading-relaxed">
                    {j.description}
                  </p>
                  
                  {/* Delete Track */}
                  {isAdmin && (
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/5 bg-transparent">
                      <span className="font-mono text-[9px] text-gray-500">Initiated: {j.startDate}</span>
                      <button
                        onClick={(e) => handleDeleteJourney(j.id, e)}
                        className="p-1 px-2.5 text-gray-600 hover:text-red-400 hover:bg-red-500/5 rounded transition-colors text-[10px] font-mono font-bold flex items-center gap-1"
                      >
                        <Trash2 size={11} /> Remove
                      </button>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Project Timeline & Core Updates Viewer */}
          {selectedJourney && (
            <div className="lg:col-span-8 flex flex-col gap-8 bg-[#121212]/30 border border-white/5 p-8 rounded-3xl relative">
              
              {/* Timeline Header status block */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/5">
                <div>
                  <h4 className="font-sans text-xl font-black text-white leading-tight">
                    {selectedJourney.projectName} Timeline
                  </h4>
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-1 block">
                    Tracing logs since {selectedJourney.startDate} • {selectedJourney.updates.length} milestone steps
                  </span>
                </div>

                {isAdmin && (
                  <button
                    onClick={() => setIsUpdateOpen(true)}
                    className="flex items-center gap-1.5 bg-emerald-400/10 text-[#4edea3] hover:bg-emerald-400/20 border border-emerald-400/20 px-3.5 py-2 rounded-lg font-mono text-[10px] font-bold uppercase transition-all whitespace-nowrap cursor-pointer"
                  >
                    <Plus size={11} /> Append Day Log
                  </button>
                )}
              </div>

              {/* Steps Chronological Rail Selector */}
              <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none select-none">
                {selectedJourney.updates.map((upd, index) => {
                  const isActive = activeUpdateIdx === index;
                  return (
                    <button
                      key={upd.id}
                      onClick={() => { setActiveUpdateIdx(index); setIsVideoPlaying(false); }}
                      className={`px-4 py-2.5 rounded-xl border flex flex-col shrink-0 text-left transition-all max-w-[130px] cursor-pointer ${
                        isActive
                          ? 'bg-white text-black border-white shadow-md'
                          : 'bg-[#121212] text-gray-400 border-white/5 hover:border-white/10'
                      }`}
                    >
                      <span className="font-mono text-[9px] uppercase tracking-wider font-extrabold opacity-70">
                        {upd.phase}
                      </span>
                      <span className="font-sans text-xs font-black truncate max-w-[110px] mt-0.5">
                        {upd.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Update Screen Visual Container */}
              <AnimatePresence mode="wait">
                {currentUpdate && (
                  <motion.div
                    key={currentUpdate.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col gap-6 text-left"
                  >
                    {/* Header specifications */}
                    <div className="flex justify-between items-center bg-black/40 border border-white/5 p-4 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#4edea3]/10 border border-[#4edea3]/30 flex items-center justify-center text-[#4edea3]">
                          <Layers size={16} />
                        </div>
                        <div>
                          <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest leading-none">Milestone Phase</div>
                          <div className="font-sans text-sm font-bold text-white mt-1 uppercase tracking-wide">{currentUpdate.phase}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest leading-none">Timestamp</div>
                        <div className="font-mono text-xs text-[#e9c349] font-black mt-1">{currentUpdate.date}</div>
                      </div>
                    </div>

                    {/* Update logs narrative content */}
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-sans text-lg font-black text-white leading-snug">
                          {currentUpdate.title}
                        </h5>
                        
                        {isAdmin && selectedJourney.updates.length > 1 && (
                          <button
                            onClick={() => handleDeleteUpdate(currentUpdate.id)}
                            className="p-1 px-2 text-red-400/50 hover:text-red-400 hover:bg-red-400/10 rounded font-mono text-[9px] font-bold"
                          >
                            Delete Step
                          </button>
                        )}
                      </div>
                      <p className="font-sans text-sm text-gray-300 font-light leading-relaxed pl-1 whitespace-pre-wrap">
                        {currentUpdate.text}
                      </p>
                    </div>

                    {/* Media attachments sandbox mockup slots */}
                    {currentUpdate.mediaType && currentUpdate.mediaType !== 'none' && (
                      <div className="border border-white/5 rounded-2xl overflow-hidden bg-black max-h-[380px] flex items-center justify-center relative shadow-inner">
                        <span className="font-mono text-[9px] text-gray-600 bg-black/80 border border-white/5 px-3 py-1 rounded absolute top-3 left-3 z-10 select-none uppercase tracking-widest leading-none">
                          Attachment: {currentUpdate.mediaType}
                        </span>

                        {currentUpdate.mediaType === 'image' && currentUpdate.mediaUrl && (
                          <img
                            src={currentUpdate.mediaUrl}
                            referrerPolicy="no-referrer"
                            alt={currentUpdate.title}
                            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                          />
                        )}

                        {currentUpdate.mediaType === 'video' && currentUpdate.mediaUrl && (
                          <div className="w-full h-[280px] flex flex-col justify-center items-center bg-gradient-to-tr from-black to-[#0a0a0a] relative py-12">
                            {isVideoPlaying ? (
                              <video 
                                src={currentUpdate.mediaUrl} 
                                className="w-full h-full absolute inset-0 bg-black"
                                controls 
                                autoPlay
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center gap-4 text-center p-8 z-10 selection:bg-transparent">
                                <button
                                  onClick={() => setIsVideoPlaying(true)}
                                  className="w-14 h-14 rounded-full bg-[#4edea3] hover:bg-[#6ffbbe] text-black flex items-center justify-center shadow-lg hover:scale-105 transition-all text-center pl-1 shrink-0 cursor-pointer"
                                  title="Play Demo Video Simulation"
                                >
                                  <Play size={20} className="fill-black" />
                                </button>
                                <div>
                                  <div className="font-sans text-xs font-extrabold text-white">Simulation Showcase Video Demo</div>
                                  <div className="font-mono text-[9px] text-gray-600 mt-1 uppercase tracking-wider">Click to watch development prototype logs</div>
                                </div>
                              </div>
                            )}

                            {/* Retro tech CRT scanner details */}
                            <div className="absolute top-3 right-3 text-right font-mono text-[8px] text-gray-700 select-none leading-none">
                              <div>OMX MOBILE EMU</div>
                              <div className="mt-1">FPS: 60</div>
                            </div>
                          </div>
                        )}

                        {currentUpdate.mediaType === 'link' && currentUpdate.mediaUrl && (
                          <div className="p-12 w-full text-center flex flex-col items-center justify-center gap-4 bg-gradient-to-tr from-black to-[#090909]">
                            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-emerald-400">
                              <Paperclip size={24} />
                            </div>
                            <div>
                              <div className="font-sans text-sm font-bold text-white">Repository Submodule Attachment</div>
                              <p className="font-mono text-[10px] text-gray-500 mt-1 max-w-sm mx-auto leading-normal">
                                Click below to inspect core components source code linked to this timeline step.
                              </p>
                            </div>
                            <a
                              href={currentUpdate.mediaUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-emerald-400 hover:bg-[#6ffbbe] text-black font-mono text-[10px] font-bold py-2.5 px-5 rounded-lg flex items-center gap-1.5 shadow"
                            >
                              <span>Explore Source Repositories</span>
                              <ArrowUpRight size={12} />
                            </a>
                          </div>
                        )}
                      </div>
                    )}

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          )}
        </div>
      )}

      {/* CREATE JOURNEY modal (Admin passcode confirmed required) */}
      <AnimatePresence>
        {isCreateOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0f0f0f] border border-white/10 rounded-2xl w-full max-w-lg shadow-[0_30px_70px_rgba(0,0,0,0.9)] flex flex-col relative overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0f0f0f] sticky top-0 z-10 w-full">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div>
                    <h3 className="font-sans text-base font-black text-white leading-none">Assemble Project Journey</h3>
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Chronicle system milestones step by step</span>
                  </div>
                </div>
                <button onClick={() => setIsCreateOpen(false)} className="p-2 text-gray-400 hover:text-white rounded transition-colors cursor-pointer">
                  <X size={18} />
                </button>
              </div>

              {showSuccess ? (
                <div className="p-12 text-center flex flex-col items-center justify-center gap-3 h-[40vh]">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Check size={20} />
                  </div>
                  <h4 className="font-sans text-lg font-black text-white">Chronicle Added!</h4>
                  <p className="font-mono text-xs text-gray-400">Successfully started tracking sequence nodes.</p>
                </div>
              ) : (
                <form onSubmit={handleCreateJourney} className="p-6 flex flex-col gap-4 text-left w-full">
                  {formError && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg font-mono text-xs leading-normal">
                      Error: {formError}
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">Project Name *</label>
                    <input
                      type="text"
                      value={newProjName}
                      onChange={(e) => setNewProjName(e.target.value)}
                      placeholder="e.g. Bilingual Medic Dispatch Messenger"
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:border-[#4edea3] focus:outline-none text-left"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">Accent Color</label>
                      <select
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                      >
                        <option value="#4edea3">Clinic Emerald Green</option>
                        <option value="#e9c349">Amber Core Gold</option>
                        <option value="#3b82f6">Biometric Cosmo Blue</option>
                        <option value="#ff6b6b">Secure Crimson Red</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">Tracking Start Date</label>
                      <input
                        type="text"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="e.g. April 02, 2026"
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-[#4edea3] focus:outline-none text-left"
                      />
                    </div>
                  </div>

                  {/* Public Private toggle */}
                  <div className="bg-black/40 border border-white/5 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-mono text-[10px] text-white uppercase tracking-wider font-extrabold flex items-center gap-1">
                        <Lock size={12} className="text-[#e9c349]" />
                        Visibility Settings
                      </div>
                      <p className="font-sans text-[11px] text-gray-500 leading-normal mt-0.5">
                        Private projects are hidden unless signed into the platform's passcode gate.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNewIsPrivate(!newIsPrivate)}
                      className={`px-4 py-2 rounded-lg font-mono text-[10px] uppercase font-black tracking-wider transition-all cursor-pointer ${
                        newIsPrivate 
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                          : 'bg-emerald-500/20 text-[#4edea3] border border-emerald-500/20'
                      }`}
                    >
                      {newIsPrivate ? 'Private' : 'Public'}
                    </button>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">Overview Description *</label>
                    <textarea
                      rows={3}
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      placeholder="Brief summary explaining what software boundaries, security metrics, and objectives this tracks..."
                      className="bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:border-[#4edea3] focus:outline-none resize-none text-left"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => setIsCreateOpen(false)}
                      className="px-4 py-2 text-gray-400 hover:text-white rounded-xl font-mono text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#4edea3] text-black px-5 py-2 rounded-xl font-mono text-xs font-black hover:bg-[#6ffbbe]"
                    >
                      Initialize Journey
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* APPEND DAY LOG UPDATE modal */}
      <AnimatePresence>
        {isUpdateOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0f0f0f] border border-white/10 rounded-2xl w-full max-w-lg shadow-[0_30px_70px_rgba(0,0,0,0.9)] flex flex-col relative overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0f0f0f] sticky top-0 z-10 w-full">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[#ebd88d]" />
                  <div>
                    <h3 className="font-sans text-base font-black text-white leading-none">Append Day Log Chronicle</h3>
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Add dynamic milestone, telemetry or attachment logs</span>
                  </div>
                </div>
                <button onClick={() => setIsUpdateOpen(false)} className="p-2 text-gray-400 hover:text-white rounded transition-colors cursor-pointer">
                  <X size={18} />
                </button>
              </div>

              {showSuccess ? (
                <div className="p-12 text-center flex flex-col items-center justify-center gap-3 h-[40vh]">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Check size={20} />
                  </div>
                  <h4 className="font-sans text-lg font-black text-white">Log Chronicle Appended!</h4>
                  <p className="font-mono text-xs text-gray-400">Milestone attached cleanly to the tracking tree.</p>
                </div>
              ) : (
                <form onSubmit={handleAddUpdate} className="p-6 flex flex-col gap-4 text-left w-full overflow-y-auto max-h-[70vh]">
                  {formError && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg font-mono text-xs leading-normal">
                      Error: {formError}
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">Log Event Title *</label>
                    <input
                      type="text"
                      value={updTitle}
                      onChange={(e) => setUpdTitle(e.target.value)}
                      placeholder="e.g. Day 15: Calibrating Embedded Vectors indices"
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:border-[#4edea3] focus:outline-none text-left"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">Milestone Phase</label>
                      <select
                        value={updPhase}
                        onChange={(e) => setUpdPhase(e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                      >
                        <option value="Concept">Concept Blueprint</option>
                        <option value="Prototype">UI/UX Prototype</option>
                        <option value="Alpha">Alpha System Node</option>
                        <option value="Beta">Beta Simulation Test</option>
                        <option value="Production">Production Shipped Release</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">Publish Date</label>
                      <input
                        type="text"
                        value={updDate}
                        onChange={(e) => setUpdDate(e.target.value)}
                        placeholder="e.g. April 19, 2026"
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-[#4edea3] focus:outline-none text-left"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">Media Type</label>
                      <select
                        value={updMediaType}
                        onChange={(e) => setUpdMediaType(e.target.value as any)}
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                      >
                        <option value="none">No Media Attachment</option>
                        <option value="image">Image Attachment URL</option>
                        <option value="video">Simulated Video Player MP4</option>
                        <option value="link">Submodule External GitHub Link</option>
                      </select>
                    </div>

                    {updMediaType !== 'none' && (
                      <div className="flex flex-col gap-1">
                        <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">Attachment File Resource / Link URL</label>
                        <input
                          type="text"
                          value={updMediaUrl}
                          onChange={(e) => setUpdMediaUrl(e.target.value)}
                          placeholder="Resource URL payload..."
                          className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:border-[#4edea3] focus:outline-none text-left"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">Daily Chronicle Narrative *</label>
                    <textarea
                      rows={5}
                      value={updText}
                      onChange={(e) => setUpdText(e.target.value)}
                      placeholder="Narrate details, bugs solved, system integrations or architectural updates..."
                      className="bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:border-[#4edea3] focus:outline-none h-32 text-left resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => setIsUpdateOpen(false)}
                      className="px-4 py-2 text-gray-400 hover:text-white rounded-xl font-mono text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#4edea3] text-black px-5 py-2 rounded-xl font-mono text-xs font-black hover:bg-[#6ffbbe]"
                    >
                      Append Log Card
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
