import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Palette, 
  Layers, 
  Share2, 
  Activity, 
  Sparkles, 
  Shield, 
  Cpu, 
  ArrowLeft 
} from 'lucide-react';
import { useApp } from '../AppContext';
import { TRANSLATIONS } from '../translations';
import HubBlogs from './HubBlogs';
import HubJourney from './HubJourney';
import HubDesigns from './HubDesigns';
import HubTemplates from './HubTemplates';
import HubSocials from './HubSocials';

interface HubDashboardProps {
  onBackToPortfolio: () => void;
  isAdmin: boolean;
  onToggleAdmin: (status: boolean) => void;
}

export default function HubDashboard({ 
  onBackToPortfolio,
  isAdmin,
  onToggleAdmin
}: HubDashboardProps) {
  const { lang } = useApp();
  const t = TRANSLATIONS[lang];

  const [activeTab, setActiveTab] = useState<'blogs' | 'journey' | 'designs' | 'templates' | 'socials'>('blogs');
  const [blogCount, setBlogCount] = useState(3);
  const [journeyCount, setJourneyCount] = useState(2);
  const [designCount, setDesignCount] = useState(4);
  
  // Local password form state
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Poll localStorage values briefly on view to refresh dynamic index counts
  useEffect(() => {
    try {
      const storedBlogs = localStorage.getItem('omx_platform_blogs');
      if (storedBlogs) {
        setBlogCount(JSON.parse(storedBlogs).length);
      }
      const storedJourneys = localStorage.getItem('omx_project_journeys');
      if (storedJourneys) {
        setJourneyCount(JSON.parse(storedJourneys).length);
      } else {
        setJourneyCount(2);
      }
      const storedDesigns = localStorage.getItem('omx_vault_designs');
      if (storedDesigns) {
        setDesignCount(JSON.parse(storedDesigns).length);
      }
    } catch (e) {
      console.warn('Sync counts fetch failure:', e);
    }
  }, [activeTab]); // Triggers count re-check when shuffling tabs

  const tabsInfo = [
    { id: 'blogs', label: t.devLog, count: blogCount, icon: FileText, desc: t.devLogDesc },
    { id: 'journey', label: t.dailyJourney, count: journeyCount, icon: Activity, desc: t.dailyJourneyDesc },
    { id: 'designs', label: t.designVault, count: designCount, icon: Palette, desc: t.designVaultDesc },
    { id: 'templates', label: t.templates, count: 3, icon: Layers, desc: t.templatesDesc },
    { id: 'socials', label: t.socialSync, count: 6, icon: Share2, desc: t.socialSyncDesc },
  ];

  return (
    <section className="relative pt-24 pb-24 px-5 md:px-12 overflow-hidden bg-[#080808]" id="personal-hub">
      {/* Background Graphic Patterns */}
      <div className="absolute inset-0 tilet-pattern opacity-15 pointer-events-none -z-10" />
      <div className="absolute inset-x-0 bottom-0 h-[1.5px] tilet-divider -z-10 animate-pulse duration-5000" />
      
      {/* Dynamic ambient background backing bubbles */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-yellow-500/3 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-10">
        
        {/* Navigation Core Header for Returning */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
          <button
            onClick={onBackToPortfolio}
            className="flex items-center gap-2 font-mono text-xs font-semibold text-gray-400 hover:text-[#4edea3] transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>{t.backToPortfolio}</span>
          </button>


        </div>

        {/* Master Bento-style Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main welcome message */}
          <div className="lg:col-span-8 bg-[#121212]/30 border border-white/5 p-8 rounded-3xl backdrop-blur-md flex flex-col justify-between h-56 text-left">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-[#e9c349] animate-spin duration-5000" />
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-black">{t.consoleLabel}</span>
              </div>
              <h2 className="font-sans text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
                {t.hubTitle}
              </h2>
            </div>
            
            <p className="font-sans text-xs md:text-sm text-gray-400 leading-relaxed font-light max-w-2xl mt-4">
              {t.hubDesc}
            </p>
          </div>

          {/* Micro stats block bento */}
          <div className="lg:col-span-4 bg-[#121212]/90 border border-white/10 p-6 rounded-3xl backdrop-blur-md flex flex-col justify-between h-56 text-left">
            <div className="flex justify-between items-center select-none">
              <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-bold">{t.nodesStatus}</span>
              <Shield size={14} className="text-[#4edea3]" />
            </div>

            <div className="flex flex-col gap-2 my-auto">
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-4xl font-black text-white">{blogCount + designCount + 9}</span>
                <span className="font-mono text-xs text-gray-400">{t.totalAssets}</span>
              </div>
              <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#4edea3] to-[#e9c349] w-[78%]" />
              </div>
            </div>

            <div className="flex justify-between font-mono text-[9px] text-[#4edea3] uppercase border-t border-white/5 pt-3">
              <span>{t.dbMatrix}</span>
              <Activity size={10} className="animate-pulse" />
            </div>
          </div>
        </div>

        {/* Dynamic sub tab controller headers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 select-none">
          {tabsInfo.map((tab) => {
            const TabIcon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`p-5 rounded-2xl flex flex-col justify-between border text-left group transition-all duration-300 h-28 cursor-pointer ${
                  isSelected
                    ? 'bg-[#121212] border-[#4edea3]/40 shadow-[0_10px_25px_rgba(78,222,163,0.03)]'
                    : 'bg-[#121212]/30 border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex justify-between items-start w-full">
                  <div className={`p-2 rounded-lg transition-transform ${
                    isSelected ? 'bg-[#4edea3]/10 text-[#4edea3]' : 'bg-white/2 text-gray-400'
                  }`}>
                    <TabIcon size={16} />
                  </div>
                  <span className={`font-mono text-xs font-black px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-[#4edea3] text-black' : 'bg-[#121212] border border-white/11 text-gray-400'
                  }`}>
                    {tab.count}
                  </span>
                </div>

                <div className="mt-2">
                  <div className={`font-sans text-sm font-bold leading-none ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                    {tab.label}
                  </div>
                  <div className="font-mono text-[8px] text-gray-500 mt-1 uppercase tracking-wider">{tab.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Sub-module Container Space */}
        <div className="bg-[#121212]/10 border border-white/5 rounded-3xl p-8 md:p-10 min-h-[500px] backdrop-blur-sm shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {activeTab === 'blogs' && <HubBlogs isAdmin={isAdmin} />}
              {activeTab === 'journey' && <HubJourney isAdmin={isAdmin} />}
              {activeTab === 'designs' && <HubDesigns isAdmin={isAdmin} />}
              {activeTab === 'templates' && <HubTemplates isAdmin={isAdmin} />}
              {activeTab === 'socials' && <HubSocials />}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
