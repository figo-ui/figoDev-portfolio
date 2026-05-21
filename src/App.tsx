import { useState, useEffect } from 'react';
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
import { Project, ContactMessage } from './types';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  // Initialize messages payload from local storage safely on initial paint
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

  return (
    <div className="bg-[#080808] text-[#fbfbfa] min-h-screen relative font-sans antialiased overflow-x-hidden">
      {/* Visual Pattern Frame Canvas */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#080808] to-[#0a0a0a]" />
        <div className="absolute inset-0 tilet-pattern opacity-15" />
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between">
        {/* Navigation Core */}
        <Header
          onOpenLocalInbox={() => setIsInboxOpen(true)}
          messageCount={messages.length}
        />

        {/* Major Portfolio Sections */}
        <main className="flex-1 w-full">
          <Hero />
          <About />
          <ProjectList onSelectProject={(project) => setSelectedProject(project)} />
          <DeepDives />
          <Philosophy />
          <Skills />
          <Contact onSendMessage={handleSendMessage} />
        </main>

        {/* Footer Copyright block */}
        <Footer />
      </div>

      {/* Floating State Case Study Portal Sheet */}
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
