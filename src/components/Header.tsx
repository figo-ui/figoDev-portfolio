import { useState, useEffect } from 'react';
import { Menu, X, FileText, Sparkles, Sun, Moon, Globe } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { useApp } from '../AppContext';
import { TRANSLATIONS } from '../translations';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  onOpenLocalInbox: () => void;
  messageCount: number;
  activeView: 'portfolio' | 'hub' | 'admin';
  onToggleView: (view: 'portfolio' | 'hub' | 'admin') => void;
  isAdmin: boolean;
  onClearAdmin?: () => void;
}

export default function Header({ 
  onOpenLocalInbox, 
  messageCount, 
  activeView, 
  onToggleView,
  isAdmin,
  onClearAdmin
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { theme, lang, toggleTheme, toggleLang } = useApp();
  const t = TRANSLATIONS[lang];
  const location = useLocation();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  const navLinks = activeView === 'portfolio' ? [
    { name: isHome ? 'Skills' : 'Home', href: isHome ? '#skills' : '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Templates', href: '/templates' },
  ] : [
    { name: 'Dev Log', href: '#personal-hub' },
    { name: 'Design Vault', href: '#personal-hub' },
    { name: 'Web/App Starter Templates', href: '#personal-hub' },
    { name: 'Social Sync', href: '#personal-hub' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full h-20 transition-colors duration-300 z-40 flex items-center ${
          isScrolled || activeView === 'hub'
            ? 'bg-[#080808]/95 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-5 md:px-12 max-w-7xl mx-auto flex justify-between items-center gap-4">
          
          {/* Brand Logo with OMX and Name */}
          <button 
            onClick={() => { onToggleView('portfolio'); setIsMobileMenuOpen(false); }}
            className="flex items-center gap-3 relative group select-none bg-transparent border-0 p-0 text-left shrink-0 cursor-pointer"
          >
            {/* OMX Logo Icon */}
            <div className="relative flex items-center justify-center bg-gradient-to-br from-[#4edea3] to-emerald-600 shadow-[0_0_15px_rgba(78,222,163,0.3)] w-9 h-9 rounded-xl text-black font-sans font-black text-xs tracking-tight">
              OMX
              <div className="absolute inset-0 rounded-xl border border-white/25 pointer-events-none" />
            </div>
            {/* Name */}
            <div className="flex flex-col items-start leading-none">
              <span className="font-sans text-lg md:text-xl font-bold tracking-tighter text-white">
                OMX figoDevTech
              </span>
              {isAdmin && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onClearAdmin) onClearAdmin();
                  }}
                  className="mt-0.5 font-mono text-[8px] uppercase tracking-widest font-black text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500/30 border border-red-500/25 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                  title="Click to dismiss administrator session"
                >
                  🔒 Admin Active [Log Out]
                </button>
              )}
            </div>
          </button>

          {/* Desktop Dual Mode Switcher Slider */}
          <div className="hidden lg:flex bg-[#121212]/90 border border-white/10 p-1 rounded-full text-xs font-mono relative shrink-0">
            <button
              onClick={() => onToggleView('portfolio')}
              className={`px-4 py-1.5 rounded-full font-bold transition-all relative z-10 cursor-pointer flex items-center gap-1 ${
                activeView === 'portfolio' ? 'text-black font-extrabold bg-[#4edea3]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Portfolio</span>
            </button>
            <button
              onClick={() => onToggleView('hub')}
              className={`px-4 py-1.5 rounded-full font-bold transition-all relative z-10 cursor-pointer flex items-center gap-1.5 ${
                activeView === 'hub' ? 'text-black font-black bg-[#4edea3] shadow-[0_0_15px_rgba(78,222,163,0.35)]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles size={11} className={activeView === 'hub' ? 'text-black fill-black' : 'text-[#e9c349]'} />
              <span>Personal Hub</span>
            </button>
            {isAdmin && (
              <button
                onClick={() => onToggleView('admin')}
                className={`px-4 py-1.5 rounded-full font-bold transition-all relative z-10 cursor-pointer flex items-center gap-1.5 ${
                  activeView === 'admin' ? 'text-black font-black bg-[#e9c349] shadow-[0_0_15px_rgba(233,195,73,0.35)]' : 'text-[#e9c349]/70 hover:text-[#e9c349]'
                }`}
              >
                <span>Admin Core</span>
              </button>
            )}
          </div>

          {/* Desktop Navigation Links (Context Dependent) */}
          <ul className="hidden md:flex items-center gap-5 font-sans text-xs font-semibold tracking-wide uppercase select-none">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.href.startsWith('/') ? (
                  <Link
                    to={link.href}
                    onClick={() => {
                      if (activeView === 'hub') {
                        onToggleView('portfolio');
                      }
                    }}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    onClick={() => {
                      if (activeView === 'hub') {
                        onToggleView('portfolio');
                      }
                    }}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-[#121212] hover:bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-[#10B981]/40 transition-all cursor-pointer flex items-center justify-center h-8 w-8"
              title={theme === 'dark' ? 'Activate Light Mode' : 'Activate Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Language Toggle Button */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-3 py-1.5 h-8 rounded-full bg-[#121212] hover:bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-[#10B981]/40 transition-all cursor-pointer font-mono text-[10px] font-bold"
              title="Switch language between English and Amharic"
              aria-label="Toggle language"
            >
              <Globe size={11} className="text-[#10B981]" />
              <span>{lang === 'en' ? 'EN' : 'አማ'}</span>
            </button>

            {/* Local Tray Indicator */}
            {messageCount > 0 && (
              <button
                onClick={onOpenLocalInbox}
                className="relative flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full font-mono text-xs hover:bg-emerald-500/20 transition-all cursor-pointer"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Inbox ({messageCount})
              </button>
            )}

            {/* Hub Workspace Selector trigger for small screen desks */}
            <button
              onClick={() => onToggleView(activeView === 'portfolio' ? 'hub' : 'portfolio')}
              className="lg:hidden flex items-center gap-1 bg-[#121212] hover:bg-white/5 border border-white/10 text-[#4edea3] hover:text-[#56fcc1] px-4 py-1.5 rounded-full font-mono text-[10px] uppercase font-bold transition-all"
            >
              <span>{activeView === 'portfolio' ? 'Launch Hub ✦' : 'Portfolio'}</span>
            </button>

            {/* Resume Button */}
            <a
              href="#contact"
              className="flex items-center gap-1.5 text-emerald-400 hover:bg-emerald-500/10 px-4 py-1.5 border border-emerald-500/30 rounded-full transition-all duration-300 font-mono text-xs font-semibold hover:border-emerald-400 hover:text-emerald-300"
            >
              <FileText size={12} />
              Resume
            </a>
          </div>

          {/* Mobile Navigation Panel Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-[#121212] border border-white/10 text-gray-400 hover:text-white hover:border-[#10B981]/40 transition-all cursor-pointer flex items-center justify-center h-8 w-8"
              title="Toggle theme mode"
              aria-label="Toggle theme mode"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center justify-center gap-1 h-8 px-2 rounded-full bg-[#121212] border border-white/10 text-gray-400 hover:text-white hover:border-[#10B981]/40 transition-all cursor-pointer font-mono text-[10px] font-bold"
              title="Toggle language code"
              aria-label="Toggle language code"
            >
              <span>{lang === 'en' ? 'EN' : 'አማ'}</span>
            </button>

            {messageCount > 0 && (
              <button
                onClick={onOpenLocalInbox}
                className="relative flex items-center justify-center px-2.5 h-8 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full font-mono text-xs hover:bg-emerald-500/20 transition-all"
              >
                Inbox ({messageCount})
              </button>
            )}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded hover:bg-white/5 cursor-pointer h-8 w-8 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Dampened Scroll Progress Indicator line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#4edea3] via-[#3ebd8b] to-[#e9c349] origin-left z-50 opacity-90"
          style={{ scaleX }}
        />
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 w-full bg-[#080808]/95 backdrop-blur-lg border-b border-white/5 z-30 py-8 px-6 flex flex-col gap-6 md:hidden max-h-[80vh] overflow-y-auto select-none"
          >
            {/* Mobile Switcher Options */}
            <div className="flex bg-[#121212] border border-white/10 p-1 rounded-xl text-xs font-mono w-full">
              <button
                onClick={() => { onToggleView('portfolio'); setIsMobileMenuOpen(false); }}
                className={`flex-1 py-3.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeView === 'portfolio' ? 'bg-[#4edea3] text-black font-extrabold' : 'text-gray-400'
                }`}
              >
                Portfolio
              </button>
              <button
                onClick={() => { onToggleView('hub'); setIsMobileMenuOpen(false); }}
                className={`flex-1 py-3.5 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeView === 'hub' ? 'bg-[#4edea3] text-black font-black' : 'text-gray-400'
                }`}
              >
                <Sparkles size={12} className={activeView === 'hub' ? 'text-black fill-black' : 'text-[#e9c349]'} />
                Personal Hub
              </button>
              {isAdmin && (
                <button
                  onClick={() => { onToggleView('admin'); setIsMobileMenuOpen(false); }}
                  className={`flex-1 py-3.5 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeView === 'admin' ? 'bg-[#e9c349] text-black font-black' : 'text-[#e9c349]/70'
                  }`}
                >
                  Admin
                </button>
              )}
            </div>

            <div className="h-[1px] bg-white/5 w-full" />

            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                link.href.startsWith('/') ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (activeView === 'hub') {
                        onToggleView('portfolio');
                      }
                    }}
                    className="font-sans text-lg font-medium text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (activeView === 'hub') {
                        onToggleView('portfolio');
                      }
                    }}
                    className="font-sans text-lg font-medium text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                )
              ))}
            </div>

            <div className="h-[1px] bg-white/5 w-full" />

            <div className="flex flex-col gap-4">
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 py-3.5 border border-emerald-500/20 rounded-full transition-all text-sm font-semibold"
              >
                <FileText size={16} />
                Get Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

