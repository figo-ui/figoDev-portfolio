import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ContactMessage, Project } from '../types';
import { PROJECTS } from '../data';
import Hero from '../components/Hero';
import About from '../components/About';
import ProjectList from '../components/ProjectList';
import DeepDives from '../components/DeepDives';
import Philosophy from '../components/Philosophy';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

export default function Home() {
  const { isAdmin, setMessages } = useOutletContext<{ isAdmin: boolean, setMessages: any }>();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('omx_project_custom_list');
    if (stored) {
      setProjects(JSON.parse(stored));
    } else {
      setProjects(PROJECTS);
    }
  }, []);

  const handleToggleProjectPrivacy = (id: string) => {
    setProjects((prev) => {
      const next = prev.map(p => p.id === id ? { ...p, isPrivate: !p.isPrivate } : p);
      localStorage.setItem('omx_project_custom_list', JSON.stringify(next));
      return next;
    });
  };

  const handleSendMessage = (msg: Omit<ContactMessage, 'id' | 'timestamp'>) => {
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: ContactMessage = {
      id: Math.random().toString(36).substring(2, 9),
      name: msg.name,
      email: msg.email,
      message: msg.message,
      timestamp: timeString,
    };
    setMessages((prev: ContactMessage[]) => {
      const updated = [newMsg, ...prev];
      localStorage.setItem('obsa_recruiter_submissions', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <>
      <Hero />
      <About />
      <ProjectList 
        onSelectProject={() => {}} 
        isAdmin={isAdmin}
        projects={projects}
        onToggleProjectPrivacy={handleToggleProjectPrivacy}
      />
      <DeepDives />
      <Philosophy />
      <Skills />
      <Contact onSendMessage={handleSendMessage} />
    </>
  );
}
