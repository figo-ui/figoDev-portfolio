import { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface HeaderProps {
  onOpenLocalInbox: () => void;
  messageCount: number;
}

export default function Header({ onOpenLocalInbox, messageCount }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Deep Dives', href: '#deep-dives' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full h-20 transition-colors duration-300 z-40 flex items-center ${
          isScrolled
            ? 'bg-[#080808]/95 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-5 md:px-12 max-w-7xl mx-auto flex justify-between items-center">
          {/* Brand Logo with OMX and Name */}
          <a href="#" className="flex items-center gap-3 relative group select-none">
            {/* OMX Logo Icon */}
            <div className="relative flex items-center justify-center bg-gradient-to-br from-[#4edea3] to-emerald-600 shadow-[0_0_15px_rgba(78,222,163,0.3)] w-9 h-9 rounded-xl text-black font-sans font-black text-xs tracking-tight">
              OMX
              <div className="absolute inset-0 rounded-xl border border-white/25 pointer-events-none" />
            </div>
            {/* Name */}
            <span className="font-sans text-xl md:text-2xl font-bold tracking-tighter text-white">
              Obsa Mustefa
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-emerald-400 transition-all duration-300 group-hover:w-full" />
          </a>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-6 font-sans text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-4">
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

            {/* Resume Button */}
            <a
              href="#contact"
              className="flex items-center gap-2 text-emerald-400 hover:bg-emerald-500/10 px-5 py-2 border border-emerald-500/30 rounded-full transition-all duration-300 font-mono text-xs font-semibold hover:border-emerald-400 hover:text-emerald-300"
            >
              <FileText size={14} />
              Resume
            </a>
          </div>

          {/* Mobile Navigation Panel Trigger */}
          <div className="flex items-center gap-3 md:hidden">
            {messageCount > 0 && (
              <button
                onClick={onOpenLocalInbox}
                className="relative flex items-center justify-center p-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full font-mono text-xs hover:bg-emerald-500/20 transition-all"
              >
                Inbox ({messageCount})
              </button>
            )}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded hover:bg-white/5 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 w-full bg-[#080808]/95 backdrop-blur-lg border-b border-white/5 z-30 py-8 px-6 flex flex-col gap-6 md:hidden max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-lg font-medium text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
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
