import React, { useState } from 'react';
import { 
  ArrowLeft, 
  LayoutDashboard, 
  FolderEdit, 
  FileText, 
  Image as ImageIcon, 
  Settings, 
  BarChart, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  LogOut,
  Lock,
  Globe
} from 'lucide-react';
import { useApp } from '../AppContext';
import { TRANSLATIONS } from '../translations';
import { Project } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import AdminProjectEditor, { ProjectFormValues } from './AdminProjectEditor';
import AdminBlogEditor from './AdminBlogEditor';

interface AdminSystemProps {
  onBack: () => void;
  isAdmin: boolean;
  onToggleAdmin: (val: boolean) => void;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export default function AdminSystem({ onBack, isAdmin, onToggleAdmin, projects, setProjects }: AdminSystemProps) {
  const { lang } = useApp();
  const t = TRANSLATIONS[lang];

  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'blogs' | 'media' | 'analytics' | 'settings'>('dashboard');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // CRUD state
  const [editingProject, setEditingProject] = useState<Project | null | 'new'>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin123') {
      onToggleAdmin(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid coordinates / passkey.');
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 tilet-pattern opacity-10 pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#121212]/90 border border-white/10 p-8 rounded-3xl backdrop-blur-md max-w-md w-full relative z-10"
        >
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 font-mono text-xs text-gray-500 hover:text-[#4edea3] transition-colors"
            >
              <ArrowLeft size={14} /> Back
            </button>
            <Lock size={18} className="text-[#4edea3]" />
          </div>
          
          <h2 className="font-sans text-3xl font-black text-white mb-2 tracking-tight">Admin System</h2>
          <p className="font-mono text-[10px] uppercase text-gray-500 tracking-widest mb-8">Secure encrypted portal</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1 block">Passkey</label>
              <input 
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter root password..."
                className="w-full bg-[#080808] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-[#4edea3] focus:outline-none transition-all"
              />
            </div>
            {errorMsg && <p className="text-red-400 font-mono text-[10px]">{errorMsg}</p>}
            <button 
              type="submit"
              className="w-full bg-[#4edea3] text-black font-mono font-bold uppercase text-xs tracking-widest py-3 rounded-xl hover:bg-[#6ffbbe] transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              Authenticate & Enter
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const handleDeleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('omx_project_custom_list', JSON.stringify(updated));
  };

  const handleSaveProject = (values: ProjectFormValues) => {
    const mappedProject: Project = {
      ...values,
      technologies: values.technologies === '' ? [] : values.technologies.split(',').map(s => s.trim()),
      features: values.features === '' ? [] : values.features.split(',').map(s => s.trim()),
      challenges: values.challenges === '' ? [] : values.challenges.split(',').map(s => s.trim()),
      metrics: {
        performance: "+0%",
        architecture: "Simple",
        deployment: "Cloud"
      }
    };
    
    if (editingProject !== 'new' && editingProject !== null) {
      if (projects.find(p => p.id === values.id)) {
        // Update
        const updated = projects.map(p => p.id === values.id ? mappedProject : p);
        setProjects(updated);
        localStorage.setItem('omx_project_custom_list', JSON.stringify(updated));
      }
    } else {
      // Create
      const updated = [mappedProject, ...projects];
      setProjects(updated);
      localStorage.setItem('omx_project_custom_list', JSON.stringify(updated));
    }
    setEditingProject(null);
  };

  const createEmptyProject = () => {
    setEditingProject({
      id: "proj-" + Math.random().toString(36).substring(2, 9),
      title: "New Project",
      subtitle: "Brief description",
      description: "Detailed description",
      isPrivate: false,
      year: "2026",
      technologies: ["React", "TypeScript"],
      features: ["Feature 1", "Feature 2"],
      challenges: ["Challenge 1", "Challenge 2"],
      metrics: {
        performance: "+0%",
        architecture: "Simple",
        deployment: "Cloud"
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col md:flex-row relative">
      <div className="absolute inset-0 tilet-pattern opacity-5 pointer-events-none" />
      
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#121212]/95 border-r border-white/5 p-6 flex flex-col z-10 sticky top-0 h-screen overflow-y-auto">
        <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/5">
          <div className="w-8 h-8 rounded-full bg-[#4edea3]/20 flex items-center justify-center border border-[#4edea3]/40">
            <Globe size={14} className="text-[#4edea3]" />
          </div>
          <div>
            <h1 className="font-sans text-lg font-black tracking-tight text-white leading-none">System</h1>
            <p className="font-mono text-[10px] text-[#4edea3] uppercase tracking-widest mt-1">Admin Module</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
            { id: 'projects', icon: FolderEdit, label: 'Projects CRUD' },
            { id: 'blogs', icon: FileText, label: 'Logs & Content' },
            { id: 'media', icon: ImageIcon, label: 'Media Library' },
            { id: 'analytics', icon: BarChart, label: 'Traffic Analytics' },
            { id: 'settings', icon: Settings, label: 'Core Settings' },
          ].map(item => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-xs transition-all ${
                  active 
                    ? 'bg-white/5 text-white border border-white/10' 
                    : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon size={14} className={active ? "text-[#e9c349]" : ""} />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-3">
          <button
            onClick={() => onToggleAdmin(false)}
            className="flex items-center justify-center gap-2 w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-mono text-[10px] uppercase font-bold rounded-xl transition-colors border border-red-500/20"
          >
            <LogOut size={12} /> Terminate Session
          </button>
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-2 w-full py-2 bg-white/5 hover:bg-white/10 text-white font-mono text-[10px] uppercase font-bold rounded-xl transition-colors border border-white/5"
          >
            <ArrowLeft size={12} /> Exit to Site
          </button>
        </div>
      </div>

      {/* Main Content Pane */}
      <main className="flex-1 p-6 md:p-12 relative z-10 h-screen overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-6"
            >
              <h2 className="font-sans text-4xl font-black text-white">Command Center</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#121212] border border-white/5 p-6 rounded-3xl">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-4">Total Projects</p>
                  <p className="font-sans text-5xl font-black text-white">{projects.length}</p>
                </div>
                <div className="bg-[#121212] border border-white/5 p-6 rounded-3xl">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-4">Messages / Logs</p>
                  <p className="font-sans text-5xl font-black text-white">Active</p>
                </div>
                <div className="bg-[#121212] border border-white/5 p-6 rounded-3xl shadow-[0_0_20px_rgba(16,185,129,0.05)] border-[#4edea3]/20">
                  <p className="font-mono text-[10px] text-[#4edea3] uppercase tracking-widest mb-4">System Status</p>
                  <p className="font-sans text-3xl font-black text-white">Optimal</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center bg-[#121212] p-6 rounded-3xl border border-white/5">
                <h2 className="font-sans text-3xl font-black text-white">Project Matrix</h2>
                <button 
                  onClick={createEmptyProject}
                  className="flex items-center gap-2 bg-[#4edea3] text-black px-4 py-2 rounded-full font-mono text-xs font-bold hover:bg-[#6ffbbe] transition-all"
                >
                  <Plus size={14} /> New Record
                </button>
              </div>

              {editingProject ? (
                <AdminProjectEditor 
                  project={editingProject === 'new' ? null : editingProject} 
                  onSave={handleSaveProject} 
                  onCancel={() => setEditingProject(null)} 
                />
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {projects.map(p => (
                    <div key={p.id} className="bg-[#121212] border border-white/5 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-white/20 transition-all">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-sans font-bold text-white text-lg">{p.title}</h3>
                          {p.isPrivate ? (
                            <span className="font-mono text-[9px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20 uppercase">Private</span>
                          ) : (
                            <span className="font-mono text-[9px] bg-[#4edea3]/10 text-[#4edea3] px-2 py-0.5 rounded border border-[#4edea3]/20 uppercase">Public</span>
                          )}
                        </div>
                        <p className="font-mono text-[10px] text-gray-500 mt-1">{p.subtitle}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setEditingProject(p)}
                          className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'blogs' && (
            <motion.div
              key="blogs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
               <AdminBlogEditor onSave={(content) => { console.log('Saved entry:', content); setActiveTab('dashboard'); }} />
            </motion.div>
          )}

          {activeTab !== 'dashboard' && activeTab !== 'projects' && activeTab !== 'blogs' && (
             <motion.div
              key="construction"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-[60vh] text-center"
            >
              <Settings size={48} className="text-[#e9c349] opacity-20 mb-6 animate-spin duration-3000" />
              <h3 className="font-sans text-2xl font-black text-white mb-2">Module Offline / In Development</h3>
              <p className="font-mono text-xs text-gray-500 uppercase tracking-widest max-w-sm">This administrative block is currently pending build artifacts.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
