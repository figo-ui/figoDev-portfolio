import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LocalInbox from '../components/LocalInbox';
import { ContactMessage } from '../types';

export default function PublicLayout() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('obsa_recruiter_submissions');
      if (saved) setMessages(JSON.parse(saved));
      const savedAdmin = localStorage.getItem('omx_is_admin');
      if (savedAdmin === 'true') setIsAdmin(true);
    } catch (err) {}
  }, []);

  const handleToggleAdmin = (status: boolean) => {
    setIsAdmin(status);
    localStorage.setItem('omx_is_admin', String(status));
  };

  const handleClearAllMessages = () => {
    localStorage.removeItem('obsa_recruiter_submissions');
    setMessages([]);
    setIsInboxOpen(false);
  };

  return (
    <div className="bg-[#080808] text-[#fbfbfa] min-h-screen relative font-sans antialiased overflow-x-hidden">
      {/* Visual Pattern Frame Canvas */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#080808] to-[#0a0a0a]" />
        <div className="absolute inset-0 tilet-pattern opacity-15" />
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between">
        <Header
          onOpenLocalInbox={() => setIsInboxOpen(true)}
          messageCount={messages.length}
          activeView={'portfolio'}
          onToggleView={(v) => console.log(v)}
          isAdmin={isAdmin}
          onClearAdmin={() => handleToggleAdmin(false)}
        />

        <main className="flex-1 w-full flex flex-col min-h-[calc(100vh-80px)] mt-20">
          <Outlet context={{ isAdmin, setMessages }} />
        </main>

        <Footer />
      </div>

      <LocalInbox
        isOpen={isInboxOpen}
        onClose={() => setIsInboxOpen(false)}
        messages={messages}
        onClearAll={handleClearAllMessages}
      />
    </div>
  );
}
