import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {toast && (
          <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-6">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] flex items-center gap-4"
            >
              {/* Glass Reflection Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              
              <div className={`shrink-0 p-2 rounded-xl ${toast.type === 'success' ? 'bg-white/10 text-white' : 'bg-red-500/10 text-red-500'}`}>
                {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              </div>

              <div className="flex-1">
                <p className="text-[11px] font-bold tracking-[0.2em] text-white uppercase">
                  {toast.type === 'success' ? 'System Message' : 'Alert'}
                </p>
                <p className="text-xs text-[#888888] font-medium tracking-wide">
                  {toast.message}
                </p>
              </div>

              <button 
                onClick={() => setToast(null)}
                className="shrink-0 p-1 hover:text-white text-[#444444] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Progress Bar Animation */}
              <motion.div 
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 4, ease: 'linear' }}
                className="absolute bottom-0 left-0 h-[2px] bg-white/20"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
};
