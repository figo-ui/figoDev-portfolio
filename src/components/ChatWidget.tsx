import { useState, useEffect, useRef, FormEvent } from 'react';
import { Send, Cpu, Wifi, MessageSquare, AlertCircle, RefreshCw, User, Check, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactMessage } from '../types';

interface ChatMessage {
  id: string;
  sender: 'visitor' | 'obsa';
  text: string;
  timestamp: string;
}

interface ChatWidgetProps {
  onSaveChatTranscript: (msg: Omit<ContactMessage, 'id' | 'timestamp'>) => void;
}

const PRESET_SUGGESTIONS = [
  { text: 'Are you open to freelance/remote contracts?', category: 'hire' },
  { text: 'What is your primary software stack?', category: 'tech' },
  { text: 'Where can I find your GitHub repositories?', category: 'code' },
  { text: 'Tell me about your most complex project.', category: 'project' },
];

export default function ChatWidget({ onSaveChatTranscript }: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [connStatus, setConnStatus] = useState<'connecting' | 'connected'>('connecting');
  const [ping, setPing] = useState(0);
  
  // Ref for auto scrolling chat body
  const chatEndRef = useRef<HTMLDivElement>(null);

  // States to gather visitor contact details inside the chat logically
  const [showContactPrompt, setShowContactPrompt] = useState(false);
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [contactSaved, setContactSaved] = useState(false);
  const [contactError, setContactError] = useState('');

  // 1. Initial Connection Simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setConnStatus('connected');
      setPing(Math.floor(Math.random() * 20) + 12);
    }, 1200);

    // Initial greeting from Obsa after connecting
    const greetingTimer = setTimeout(() => {
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages([
        {
          id: 'welcome-msg',
          sender: 'obsa',
          text: "Hi there! I'm Obsa's virtual assistant. I can answer inquiries about his engineering projects, technical stack, or availability in real-time. What are you building today?",
          timestamp: timeStr,
        },
      ]);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(greetingTimer);
    };
  }, []);

  // 2. Keep Ping Updated slightly for authentic live latency ticker
  useEffect(() => {
    if (connStatus !== 'connected') return;
    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * 18) + 10);
    }, 8000);
    return () => clearInterval(interval);
  }, [connStatus]);

  // 3. Keep Chat view scrolled to bottom automatically on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // 4. Persistence of chat messages
  useEffect(() => {
    try {
      const savedChat = localStorage.getItem('obsa_live_chat_history');
      if (savedChat) {
        setMessages(JSON.parse(savedChat));
      }
    } catch (err) {
      console.warn('Failed to recover chat local history:', err);
    }
  }, []);

  const saveHistoryLocally = (newMsgs: ChatMessage[]) => {
    try {
      setMessages(newMsgs);
      localStorage.setItem('obsa_live_chat_history', JSON.stringify(newMsgs));
    } catch (err) {
      console.warn('Failed to save chat to local storage:', err);
    }
  };

  // 5. Intelligent local Keyword Match responder
  const queryResponseMatcher = (input: string): string => {
    const query = input.toLowerCase().trim();
    
    if (query.includes('hire') || query.includes('job') || query.includes('opportunity') || query.includes('recruit') || query.includes('contract') || query.includes('freelance') || query.includes('remote') || query.includes('work') || query.includes('offer')) {
      return "I'm currently open for selected full-time positions, freelance milestones, or remote contract roles. My background is in full-stack architecture, building high-throughput systems, and deploying mobile products. You can reach out directly via obsafigo@gmail.com to schedule a discovery sync!";
    }
    
    if (query.includes('stack') || query.includes('tech') || query.includes('language') || query.includes('use') || query.includes('framework') || query.includes('skill')) {
      return "My core stack centers on high-integrity technologies: React Native (TypeScript) and Flutter (Dart) for polished hand-held products; Next.js, Node.js (Express), Python (Django), and PostgreSQL/Firebase for resilient backends. I also specialize in AI systems with Vector DBs and LLM RAG pipelines.";
    }

    if (query.includes('project') || query.includes('weplay') || query.includes('healthcare') || query.includes('cbhi') || query.includes('najjashi') || query.includes('portfolio') || query.includes('system')) {
      return "I have architected and deployed several landmark systems: 'WePlay' (a social learning super app powered by WebSockets/Redis sync layers), 'Healthcare AI' (a fast bilingual LLM medical triage with Vector DB indexing), and 'CBHI' (a Flutter-based, offline-first health insurance deployment). Check out the case studies in my Selected Works section above!";
    }

    if (query.includes('github') || query.includes('code') || query.includes('source') || query.includes('repository') || query.includes('repo')) {
      return "Absolutely! You can find my repositories, code styles, prototypes, and open-source contributions directly on GitHub at: https://github.com/figo-ui. I prioritize modular architectures, clean linting, and solid typing designs.";
    }

    if (query.includes('location') || query.includes('live') || query.includes('addis') || query.includes('ethiopia') || query.includes('where')) {
      return "I am based in Addis Ababa, Ethiopia, operating on East Africa Time (EAT, UTC+3). I run a setup geared for high bandwidth remote work and routinely sync and deliver on European and American times.";
    }

    if (query.includes('hello') || query.includes('hi') || query.includes('hey') || query.includes('hola') || query.includes('greetings')) {
      return "Hey there! Always great to meet fellow creators and operators. What kind of engineering problems are you tackling this quarter?";
    }

    if (query.includes('experience') || query.includes('how long') || query.includes('years')) {
      return "I have over 5 years of professional engineering experience designing product flows and backend systems. I've scaled mobile chat apps to thousands of daily users and designed resilient offline synchronization layers.";
    }

    return "That's a great question! While I am currently offline coding a system, our conversation is fully persisted in your local outbox. To get back to you with exact specifications, could you please click 'Save Transcript to Inbox' or leave your Email credentials here so we're fully synced?";
  };

  // 6. Handle sending a message
  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      sender: 'visitor',
      text: textToSend,
      timestamp: timeStr,
    };

    const updated = [...messages, userMsg];
    saveHistoryLocally(updated);
    setInputText('');

    // Trigger AI Agent Response with Simulated Chat Typing Loop
    setIsTyping(true);
    setTimeout(() => {
      const responseText = queryResponseMatcher(textToSend);
      const obsaTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const obsaMsg: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        sender: 'obsa',
        text: responseText,
        timestamp: obsaTimeStr,
      };

      const finalMessages = [...updated, obsaMsg];
      saveHistoryLocally(finalMessages);
      setIsTyping(false);

      // Prompt for contact credentials if we gave a generic/complex answer and they haven't saved contact info yet
      if (!contactSaved && (updated.length >= 3 || responseText.includes('offline coding'))) {
        setShowContactPrompt(true);
      }
    }, 1200 + Math.random() * 800); // Dynamic organic response interval
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  // 7. Save Chat session as an Inbox Log for Obsa to read
  const handleSaveContactInfo = (e: FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim() || !visitorEmail.trim()) {
      setContactError('Please enter your name and email to establish sync.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(visitorEmail)) {
      setContactError('Please enter a valid email signature.');
      return;
    }

    setContactSaved(true);
    setContactError('');
    setShowContactPrompt(false);

    // Collate the chat conversation as a clean single transcript string
    const transcript = messages
      .map((m) => `[${m.timestamp}] ${m.sender === 'obsa' ? 'Obsa' : 'Visitor'}: ${m.text}`)
      .join('\n\n');

    onSaveChatTranscript({
      name: `Chat: ${visitorName}`,
      email: visitorEmail,
      message: `[OMX Real-Time Chat Session Saved]\n\n${transcript}`,
    });

    // Send a system message confirms sync inside chat
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const systemConfirm: ChatMessage = {
      id: 'system-confirm',
      sender: 'obsa',
      text: `Excellent. Connection synced! Your live session transcript has been compiled and saved to the local workspace tray as a chat record under '${visitorName}' (${visitorEmail}). I will check it in my admin view.`,
      timestamp: timeStr,
    };
    saveHistoryLocally([...messages, systemConfirm]);
  };

  const handleManualTranscriptExport = () => {
    if (!contactSaved) {
      setShowContactPrompt(true);
    } else {
      // Already has contact saved, just export latest state
      const transcript = messages
        .map((m) => `[${m.timestamp}] ${m.sender === 'obsa' ? 'Obsa' : 'Visitor'}: ${m.text}`)
        .join('\n\n');

      onSaveChatTranscript({
        name: `Chat Update: ${visitorName}`,
        email: visitorEmail,
        message: `[Updated Chat Transcript]\n\n${transcript}`,
      });

      // Quick visual feedback or message
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const systemConfirm: ChatMessage = {
        id: 'system-confirm-update-' + Date.now(),
        sender: 'obsa',
        text: 'Live transcript updated and saved successfully! Your updated messages are safely logged in the local Workspace Tray.',
        timestamp: timeStr,
      };
      saveHistoryLocally([...messages, systemConfirm]);
    }
  };

  const handleResetChat = () => {
    localStorage.removeItem('obsa_live_chat_history');
    setMessages([]);
    setContactSaved(false);
    setVisitorName('');
    setVisitorEmail('');
    setShowContactPrompt(false);
    
    // Add first message back
    setTimeout(() => {
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages([
        {
          id: 'welcome-msg-reset',
          sender: 'obsa',
          text: "Chat database flushed. OMX Signaling channel initialized. Please type a message or select a shortcut pill below.",
          timestamp: timeStr,
        },
      ]);
    }, 200);
  };

  return (
    <div className="flex flex-col h-[520px] bg-[#0c0c0c] border border-white/5 rounded-xl overflow-hidden shadow-2xl relative">
      {/* 1. Header Grid Area */}
      <div className="bg-[#121212] px-4 py-3 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-[#121212] via-[#101010] to-[#121212]">
        <div className="flex items-center gap-3">
          {/* Avatar / Active State */}
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#4edea3]">
              <Cpu size={16} className="text-[#4edea3]" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#121212] animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-sans text-xs font-bold text-white">Obsa's Chat Gateway</span>
              <span className="bg-[#4edea3]/10 text-[#4edea3] font-mono text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-widest leading-none select-none">
                AI Agent
              </span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[9px] text-gray-500 mt-0.5 animate-pulse">
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              <span>Active Now</span>
            </div>
          </div>
        </div>

        {/* WebSocket Signal Latency Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-lg">
            <Wifi size={10} className={connStatus === 'connected' ? 'text-emerald-400' : 'text-yellow-500'} />
            <span className="font-mono text-[8px] text-gray-500 uppercase font-black tracking-widest select-none">
              {connStatus === 'connected' ? `${ping}ms` : 'CONNECTING'}
            </span>
          </div>

          <button
            onClick={handleResetChat}
            title="Reset Terminal Database"
            className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-white/5 rounded-md transition-colors cursor-pointer"
          >
            <RefreshCw size={11} />
          </button>
        </div>
      </div>

      {/* 2. Messages Canvas/Chat stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth min-h-0 bg-[#080808]/40 relative">
        <div className="absolute inset-0 pointer-events-none custom-grid-overlay opacity-5" />

        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const isObsa = msg.sender === 'obsa';
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-2.5 max-w-[85%] ${isObsa ? 'mr-auto text-left' : 'ml-auto flex-row-reverse text-right'}`}
              >
                {/* Micro avatar */}
                <div className={`w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center text-[10px] font-bold select-none ${
                    isObsa
                      ? 'bg-emerald-500/10 text-[#4edea3] border border-emerald-500/25'
                      : 'bg-white/5 text-gray-300 border border-white/10'
                  }`}
                >
                  {isObsa ? 'O' : <User size={10} />}
                </div>

                <div className="space-y-1">
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      isObsa
                        ? 'bg-[#121212] border border-white/5 text-gray-200 rounded-tl-none font-sans font-light'
                        : 'bg-[#4edea3] text-black font-semibold rounded-tr-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="block font-mono text-[8px] text-gray-500 select-none px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-2 mr-auto items-end max-w-[80%]"
            >
              <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-[#4edea3] text-[10px] font-bold select-none">
                O
              </div>
              <div className="bg-[#121212] border border-white/5 px-4 py-2.5 rounded-2xl rounded-tl-none flex items-center gap-1 text-[10px] text-gray-400">
                <span className="font-mono uppercase tracking-widest text-[8px] mr-1.5 font-bold">Obsa typing</span>
                <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" />
              </div>
            </motion.div>
          )}

          {/* Contact capture Form inside chat stream */}
          {showContactPrompt && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#161616] border border-yellow-500/15 p-4 rounded-xl space-y-3 max-w-[95%] mx-auto text-left"
            >
              <div className="flex gap-2 items-start text-yellow-500">
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans text-xs font-bold text-gray-200">Establish Contact Sync</h4>
                  <p className="font-sans text-[10px] text-gray-400 leading-normal mt-0.5">
                    Save this live conversation transcript to my Workspace Inbox tray so we can connect later.
                  </p>
                </div>
              </div>

              {contactError && (
                <p className="font-mono text-[9px] text-red-400 bg-red-400/5 px-2 py-1 rounded border border-red-500/10">
                  {contactError}
                </p>
              )}

              <form onSubmit={handleSaveContactInfo} className="space-y-2 font-mono text-[10px]">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  className="w-full bg-[#080808] border border-white/10 text-white rounded px-2.5 py-1.5 focus:outline-none focus:border-yellow-500/40 text-[11px]"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={visitorEmail}
                  onChange={(e) => setVisitorEmail(e.target.value)}
                  className="w-full bg-[#080808] border border-white/10 text-white rounded px-2.5 py-1.5 focus:outline-none focus:border-yellow-500/40 text-[11px]"
                />
                <div className="flex gap-2 pt-1 font-mono text-[9px]">
                  <button
                    type="submit"
                    className="flex-1 bg-yellow-500/15 text-[#e9c349] hover:bg-yellow-500/25 border border-yellow-500/30 px-3 py-1.5 rounded font-black uppercase tracking-wider cursor-pointer"
                  >
                    Save Transcript
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowContactPrompt(false)}
                    className="bg-white/5 text-gray-400 hover:text-white px-3 py-1.5 rounded uppercase tracking-wider cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div ref={chatEndRef} />
      </div>

      {/* 3. Preset Quick Actions Grid */}
      {messages.length > 0 && !isTyping && !showContactPrompt && (
        <div className="bg-[#0b0b0b] px-3.5 py-2.5 border-t border-white/5">
          <div className="flex items-center gap-1 mb-1.5">
            <Flame size={10} className="text-yellow-400" />
            <span className="font-mono text-[8px] text-gray-500 uppercase font-black tracking-widest select-none">
              Quick Suggestions
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto">
            {PRESET_SUGGESTIONS.map((pill) => (
              <button
                key={pill.text}
                onClick={() => handleSendMessage(pill.text)}
                className="px-2.5 py-1 rounded bg-[#121212] border border-white/5 text-[9px] text-gray-400 font-sans hover:text-[#4edea3] hover:border-[#4edea3]/30 hover:bg-white/[0.01] transition-all text-left cursor-pointer truncate max-w-[280px]"
              >
                {pill.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 4. Contact Sync Status Ribbon */}
      {contactSaved && (
        <div className="bg-emerald-500/5 px-4 py-1.5 border-t border-emerald-500/10 flex justify-between items-center text-[10px]">
          <span className="font-sans text-gray-400 font-light flex items-center gap-1.5">
            <Check size={11} className="text-emerald-400" />
            Connected as <strong className="text-white">{visitorName}</strong>
          </span>
          <button
            onClick={handleManualTranscriptExport}
            className="font-mono text-[8px] uppercase tracking-wider text-[#4edea3] font-bold hover:underline cursor-pointer"
          >
            Update Outbox Code log
          </button>
        </div>
      )}

      {/* 5. Custom text prompt inputs */}
      <form onSubmit={handleFormSubmit} className="p-3 bg-[#111] border-t border-white/10 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isTyping}
          placeholder={isTyping ? 'Obsa is responding...' : 'Compile custom query...'}
          className="flex-1 bg-[#080808] border border-white/10 focus:border-[#4edea3] text-white text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4edea3] transition-colors disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="bg-[#4edea3] hover:bg-[#6ffbbe] text-black p-2.5 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 cursor-pointer"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
