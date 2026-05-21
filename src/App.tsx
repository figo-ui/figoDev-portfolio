import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import ProjectList from './components/ProjectList';
import CaseStudyModal from './components/CaseStudyModal';
import DeepDives from './components/DeepDives';
import Philosophy from './components/Philosophy';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LocalInbox from './components/LocalInbox';
import HubDashboard from './components/HubDashboard';
import AdminSystem from './components/AdminSystem';
import PublicLayout from './pages/PublicLayout';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetail from './pages/ProjectDetail';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import TemplatesPage from './pages/TemplatesPage';
import { Project, ContactMessage } from './types';
import { PROJECTS } from './data';
import { AnimatePresence, motion } from 'motion/react';
import { AppProvider } from './AppContext';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [activeView, setActiveView] = useState<'portfolio' | 'hub' | 'admin'>('portfolio');
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  
  const navigate = useNavigate();

  // Initialize messages playout from localStorage safely
  useEffect(() => {
    try {
      const saved = localStorage.getItem('obsa_recruiter_submissions');
      if (saved) {
        setMessages(JSON.parse(saved));
      }
    } catch (err) {
      console.warn('Failed to retrieve offline recruiter data:', err);
    }
  }, []);

  // Synchronize admin permissions
  useEffect(() => {
    try {
      const savedAdmin = localStorage.getItem('omx_is_admin');
      if (savedAdmin === 'true') {
        setIsAdmin(true);
      }
    } catch (err) {
      console.warn('Failed to retrieve token credentials:', err);
    }
  }, []);

  // Load projects list (data defaults + custom changes)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('omx_project_custom_list');
      if (stored) {
        setProjects(JSON.parse(stored));
      } else {
        setProjects(PROJECTS);
      }
    } catch (err) {
      setProjects(PROJECTS);
    }
  }, []);

  const handleToggleAdmin = (status: boolean) => {
    setIsAdmin(status);
    try {
      localStorage.setItem('omx_is_admin', String(status));
    } catch (err) {
      console.warn('Failed to save status session token:', err);
    }
  };

  const handleToggleProjectPrivacy = (id: string) => {
    setProjects((prev) => {
      const next = prev.map((p) => {
        if (p.id === id) {
          return { ...p, isPrivate: !p.isPrivate };
        }
        return p;
      });
      try {
        localStorage.setItem('omx_project_custom_list', JSON.stringify(next));
      } catch (err) {
        console.warn('Failed to persist project properties:', err);
      }
      return next;
    });
  };

  // Jump scroll back to layout top when switching view workspaces
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [activeView]);

  const handleSendMessage = (msg: Omit<ContactMessage, 'id' | 'timestamp'>) => {
    const timeString = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    
    const newMsg: ContactMessage = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      name: msg.name,
      email: msg.email,
      message: msg.message,
      timestamp: timeString,
    };

    setMessages((prev) => {
      const updated = [newMsg, ...prev];
      localStorage.setItem('obsa_recruiter_submissions', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearAllMessages = () => {
    try {
      localStorage.removeItem('obsa_recruiter_submissions');
      setMessages([]);
      setIsInboxOpen(false);
    } catch (err) {
      console.warn('Failed to clear local outbox entries:', err);
    }
  };
  
  const handleToggleView = (view: 'portfolio' | 'hub' | 'admin') => {
    setActiveView(view);
    if(view === 'portfolio') {
      navigate('/');
    }
  };

  return (
    <div className="bg-[#080808] text-[#fbfbfa] min-h-screen relative font-sans antialiased overflow-x-hidden w-full">
      {/* Visual Pattern Frame Canvas */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#080808] to-[#0a0a0a]" />
        <div className="absolute inset-0 tilet-pattern opacity-15" />
      </div>

      {activeView === 'admin' ? (
        <div className="relative z-10 w-full min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key="admin-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AdminSystem 
                onBack={() => handleToggleView('portfolio')}
                isAdmin={isAdmin}
                onToggleAdmin={handleToggleAdmin}
                projects={projects}
                setProjects={setProjects}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      ) : activeView === 'hub' ? (
        <div className="relative z-10 w-full min-h-screen flex flex-col justify-between">
           <Header
            onOpenLocalInbox={() => setIsInboxOpen(true)}
            messageCount={messages.length}
            activeView={'hub'}
            onToggleView={handleToggleView}
            isAdmin={isAdmin}
            onClearAdmin={() => handleToggleAdmin(false)}
          />
          <main className="flex-1 w-full pt-20">
            <AnimatePresence mode="wait">
              <motion.div
                  key="hub-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <HubDashboard 
                    onBackToPortfolio={() => handleToggleView('portfolio')} 
                    isAdmin={isAdmin}
                    onToggleAdmin={handleToggleAdmin}
                  />
              </motion.div>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      ) : (
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/templates" element={<TemplatesPage />} />
          </Route>
        </Routes>
      )}

      {/* Floating State Case Study Portal Sheet (For Legacy Modal Components) */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Floating State Recruiter Mailbox Portal Sheet */}
      <LocalInbox
        isOpen={isInboxOpen}
        onClose={() => setIsInboxOpen(false)}
        messages={messages}
        onClearAll={handleClearAllMessages}
      />
    </div>
  );
}


