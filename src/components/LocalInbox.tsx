import { X, Trash2, MailOpen, Calendar, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactMessage } from '../types';

interface LocalInboxProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ContactMessage[];
  onClearAll: () => void;
}

export default function LocalInbox({ isOpen, onClose, messages, onClearAll }: LocalInboxProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          {/* Backdrop screen lock */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer sheet box */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="relative w-full max-w-md h-full bg-[#121212] border-l border-white/10 shadow-2xl p-6 md:p-8 flex flex-col justify-between z-10 text-left"
          >
            {/* Header section with state */}
            <div>
              <div className="flex justify-between items-center pb-5 border-b border-white/5 mb-6">
                <div>
                  <h3 className="font-sans text-lg font-black text-white flex items-center gap-2">
                    <MailOpen size={18} className="text-[#4edea3]" />
                    Local Workspace Tray
                  </h3>
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider mt-0.5">
                    RECRUITER FEEDBACK INGRESS REGISTRAR
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Message scroll log list */}
              <div className="space-y-4 max-h-[68vh] overflow-y-auto pr-1">
                {messages.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-white/2 border border-white/5 flex items-center justify-center mx-auto text-gray-600 mb-2">
                      <MailOpen size={20} />
                    </div>
                    <p className="font-sans text-xs text-gray-400 font-medium">Your outbox is currently empty</p>
                    <p className="font-sans text-[11px] text-gray-500 leading-relaxed font-light max-w-xs mx-auto">
                      Fill out the form in the contact section below to test interactive data synching and watch the state process here in real-time.
                    </p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="bg-white/1 border border-white/5 p-4 rounded-xl space-y-3 relative group"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-sans text-xs text-white font-bold">{msg.name}</p>
                          <p className="font-mono text-[10px] text-gray-500 mt-0.5">{msg.email}</p>
                        </div>
                        <div className="flex items-center gap-1.5 font-mono text-[9px] text-gray-400">
                          <Clock size={10} />
                          <span>{msg.timestamp}</span>
                        </div>
                      </div>

                      <p className="font-sans text-xs text-gray-300 leading-relaxed font-light border-t border-white/3 pt-2.5">
                        {msg.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bottom Actions Row */}
            {messages.length > 0 && (
              <div className="pt-6 border-t border-white/5 flex gap-3">
                <button
                  onClick={onClearAll}
                  className="w-full flex justify-center items-center gap-2 border border-red-500/20 text-red-400 hover:bg-red-500/10 py-3 rounded-xl font-mono text-xs font-semibold cursor-pointer transition-all"
                >
                  <Trash2 size={13} />
                  <span>Flush Local Logs</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-sans text-xs font-semibold cursor-pointer transition-all"
                >
                  Close Tray
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
