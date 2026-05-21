import { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle, Twitter, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactMessage } from '../types';
import ChatWidget from './ChatWidget';

interface ContactProps {
  onSendMessage: (msg: Omit<ContactMessage, 'id' | 'timestamp'>) => void;
}

export default function Contact({ onSendMessage }: ContactProps) {
  const [contactMode, setContactMode] = useState<'chat' | 'form'>('chat');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Comprehensive, robust RFC-compliant validation logic with helpful feedback messages
  const validateEmail = (emailStr: string): { isValid: boolean; reason?: string } => {
    const trimmed = emailStr.trim();
    if (!trimmed) {
      return { isValid: false, reason: 'Email is required.' };
    }

    const atCount = (trimmed.match(/@/g) || []).length;
    if (atCount === 0) {
      return { isValid: false, reason: "Missing '@' separator in email address." };
    }
    if (atCount > 1) {
      return { isValid: false, reason: "Invalid format: multiple '@' separators." };
    }

    const [localPart, domainPart] = trimmed.split('@');

    if (!localPart) {
      return { isValid: false, reason: "Missing username segment before '@'." };
    }
    if (!domainPart) {
      return { isValid: false, reason: "Missing domain server segment after '@'." };
    }

    if (localPart.length > 64) {
      return { isValid: false, reason: 'Username segment exceeds maximum size (64 characters).' };
    }
    if (domainPart.length > 255) {
      return { isValid: false, reason: 'Domain segment exceeds maximum allowed size.' };
    }

    // Checking username rules
    if (localPart.startsWith('.') || localPart.endsWith('.')) {
      return { isValid: false, reason: 'Username segment cannot start or end with a dot.' };
    }
    if (localPart.includes('..')) {
      return { isValid: false, reason: 'Username segment cannot contain consecutive dots.' };
    }

    const localCharRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
    if (!localCharRegex.test(localPart)) {
      return { isValid: false, reason: 'Username segment contains invalid special characters.' };
    }

    // Checking domain rules
    if (domainPart.startsWith('.') || domainPart.endsWith('.')) {
      return { isValid: false, reason: 'Domain segment cannot start or end with a dot.' };
    }
    if (domainPart.includes('..')) {
      return { isValid: false, reason: 'Domain segment cannot contain consecutive dots.' };
    }

    const domainParts = domainPart.split('.');
    if (domainParts.length < 2) {
      return { isValid: false, reason: "Suffix extension (e.g. '.com') is required." };
    }

    const tld = domainParts[domainParts.length - 1];
    if (tld.length < 2) {
      return { isValid: false, reason: 'Domain suffix (TLD) must be at least 2 letters.' };
    }
    if (!/^[a-zA-Z]{2,}$/.test(tld)) {
      return { isValid: false, reason: 'Domain suffix (TLD) must contain purely alphabetical letters.' };
    }

    // RFC-compliant general email pattern
    const fullPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!fullPattern.test(trimmed)) {
      return { isValid: false, reason: 'Overall structure does not match a standard secure email expression.' };
    }

    return { isValid: true };
  };

  const emailValidationResult = formData.email ? validateEmail(formData.email) : { isValid: false };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setErrorMsg('All terminal contact coordinates are required before sync.');
      return;
    }

    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      setErrorMsg(`Email validation failed: ${emailCheck.reason}`);
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    // Simulate network server delay smoothly
    setTimeout(() => {
      onSendMessage({ name, email, message });
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Auto hollow success bubble after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1200);
  };

  return (
    <section className="py-24 px-5 md:px-12 bg-[#080808] relative border-t border-white/5" id="contact">
      <div className="absolute inset-0 tilet-pattern-lines opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
        
        {/* Left Side: Editorial & Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-left space-y-8"
        >
          <div>
            <h2 className="font-sans text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
              Get In Touch
            </h2>
            <p className="font-sans text-base md:text-lg text-gray-400 font-light max-w-lg leading-relaxed">
              Currently open for new opportunities and interesting projects. Whether you have an architectural question, want to talk code, or just say hi, I'll try my best to get back to you!
            </p>
          </div>

          {/* Social Icons Stack */}
          <div className="flex flex-col gap-4 font-mono text-xs">
            <motion.a
              whileHover={{ x: 4, color: '#4edea3' }}
              href="mailto:obsafigo@gmail.com"
              className="flex items-center gap-3 text-gray-400 transition-colors w-fit group"
            >
              <Mail size={16} className="text-gray-500 group-hover:text-[#4edea3] transition-colors" />
              <span>Email: obsafigo@gmail.com</span>
            </motion.a>
            <motion.a
              whileHover={{ x: 4, color: '#4edea3' }}
              href="https://github.com/figo-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-400 transition-colors w-fit group"
            >
              <Github size={16} className="text-gray-500 group-hover:text-[#4edea3] transition-colors" />
              <span>GitHub Profile</span>
            </motion.a>
            <motion.a
              whileHover={{ x: 4, color: '#4edea3' }}
              href="https://linkedin.com/in/obsafigo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-400 transition-colors w-fit group"
            >
              <Linkedin size={16} className="text-gray-500 group-hover:text-[#4edea3] transition-colors" />
              <span>LinkedIn Network</span>
            </motion.a>
            <motion.a
              whileHover={{ x: 4, color: '#4edea3' }}
              href="https://x.com/obsafigo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-400 transition-colors w-fit group"
            >
              <Twitter size={16} className="text-gray-500 group-hover:text-[#4edea3] transition-colors" />
              <span>Twitter / X</span>
            </motion.a>
            <motion.a
              whileHover={{ x: 4, color: '#4edea3' }}
              href="https://instagram.com/obsafigo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-400 transition-colors w-fit group"
            >
              <Instagram size={16} className="text-gray-500 group-hover:text-[#4edea3] transition-colors" />
              <span>Instagram Profile</span>
            </motion.a>
            <motion.a
              whileHover={{ x: 4, color: '#4edea3' }}
              href="#"
              className="flex items-center gap-3 text-gray-400 transition-colors w-fit group"
            >
              <Send size={16} className="text-gray-500 group-hover:text-[#4edea3] transition-colors" />
              <span>Telegram Channel</span>
            </motion.a>
          </div>

          {/* Golden Heritage Quotation */}
          <div className="pt-10 border-t border-white/5">
            <blockquote className="font-sans text-xl md:text-2xl text-[#e9c349] leading-relaxed italic font-light max-w-sm">
              "Let’s build software that people actually depend on."
            </blockquote>
          </div>
        </motion.div>

        {/* Right Side: Interactive Communication Unit */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="space-y-6 w-full max-w-xl lg:max-w-none"
        >
          {/* Futuristic Tab Switcher */}
          <div className="flex bg-[#121212] p-1 rounded-xl border border-white/10 font-mono text-[10px] uppercase font-bold tracking-widest">
            <button
              onClick={() => setContactMode('chat')}
              className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                contactMode === 'chat'
                  ? 'bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/20 shadow-[0_0_15px_rgba(16,185,129,0.06)] font-extrabold'
                  : 'text-gray-500 hover:text-white border border-transparent font-medium'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full bg-[#4edea3] ${contactMode === 'chat' ? 'animate-pulse' : 'opacity-40'}`} />
              <span>Real-Time Live Chat</span>
            </button>
            <button
              onClick={() => setContactMode('form')}
              className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                contactMode === 'form'
                  ? 'bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/20 shadow-[0_0_15px_rgba(16,185,129,0.06)] font-extrabold'
                  : 'text-gray-500 hover:text-white border border-transparent font-medium'
              }`}
            >
              <Mail size={12} />
              <span>Email Dispatcher</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            {contactMode === 'chat' ? (
              <motion.div
                key="chat-mode"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <ChatWidget onSaveChatTranscript={onSendMessage} />
              </motion.div>
            ) : (
              <motion.div
                key="form-mode"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="bg-[#121212] p-6 md:p-8 rounded-2xl border border-white/10 relative overflow-hidden text-left shadow-2xl"
              >
                {!isSuccess ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Error Banner */}
                    {errorMsg && (
                      <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-lg text-xs font-mono">
                        <AlertCircle size={14} className="flex-shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    {/* Name Inputs */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="font-mono text-[10px] uppercase font-bold tracking-widest text-gray-400">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        disabled={isSubmitting}
                        className="w-full bg-[#080808]/80 border border-white/10 focus:border-[#4edea3] text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4edea3] transition-colors"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <label htmlFor="email" className="font-mono text-[10px] uppercase font-bold tracking-widest text-gray-400">
                          Email Address
                        </label>
                        {formData.email && (
                          <span className={`font-mono text-[9px] uppercase tracking-wider font-extrabold ${
                            emailValidationResult.isValid ? 'text-[#4edea3]' : 'text-yellow-500/80'
                          }`}>
                            {emailValidationResult.isValid ? '✓ Schema Matched' : '⚠️ Schema Pending'}
                          </span>
                        )}
                      </div>
                      
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          disabled={isSubmitting}
                          className={`w-full bg-[#080808]/80 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-1 transition-all ${
                            !formData.email
                              ? 'border border-white/10 focus:border-[#4edea3] focus:ring-[#4edea3]'
                              : emailValidationResult.isValid
                                ? 'border border-[#4edea3]/40 focus:border-[#4edea3] focus:ring-[#4edea3] bg-emerald-950/5'
                                : 'border border-yellow-500/30 focus:border-yellow-500 focus:ring-yellow-500 bg-yellow-950/5'
                          }`}
                        />
                      </div>

                      {/* Micro inline helper under the input if the text is invalid */}
                      {formData.email && !emailValidationResult.isValid && emailValidationResult.reason && (
                        <p className="font-mono text-[9px] text-yellow-500/80 flex items-center gap-1 mt-0.5 select-none">
                          <span className="w-1 h-1 rounded-full bg-yellow-500 scale-90" />
                          <span>Syntax: {emailValidationResult.reason}</span>
                        </p>
                      )}
                    </div>

                    {/* Message Box */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="font-mono text-[10px] uppercase font-bold tracking-widest text-gray-400">
                        Your Message Detail
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="How can I help you construct scalable apps?"
                        disabled={isSubmitting}
                        className="w-full bg-[#080808]/80 border border-white/10 focus:border-[#4edea3] text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4edea3] transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex justify-center items-center gap-2 bg-[#4edea3] hover:bg-[#6ffbbe] text-black font-semibold text-xs py-4 rounded-xl font-mono transition-all shadow-[0_0_20px_rgba(16,185,129,0.1)] cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Syncing payload...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send size={12} />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  // Beautiful animated success card inside the form area
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12 space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[#4edea3] shadow-[0_0_20px_rgba(16,185,129,0.1)] mb-2">
                      <CheckCircle size={28} />
                    </div>
                    <h3 className="font-sans text-xl font-black text-white">
                      Transmission Synced!
                    </h3>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed font-light max-w-xs">
                      Your message was successfully persisted locally and added to the Inbox tray. Obsa will evaluate coordinates and sync back shortly.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-full font-mono text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
