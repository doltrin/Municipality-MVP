import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Grid, Calendar, User, MessageSquare } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import Chatbot from '../components/Chatbot';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const MobileLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  // Scroll to top when route changes
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname]);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/services', icon: Grid, label: 'Services' },
    { path: '/news', icon: Calendar, label: 'News' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const navGrid = [
    { key: 'home', type: 'nav' as const, item: navItems[0] },
    { key: 'services', type: 'nav' as const, item: navItems[1] },
    { key: 'chat', type: 'chat' as const },
    { key: 'news', type: 'nav' as const, item: navItems[2] },
    { key: 'profile', type: 'nav' as const, item: navItems[3] },
  ];

  return (
    <div 
      className="flex flex-col bg-zinc-100 dark:bg-background-dark max-w-md mx-auto shadow-2xl font-sans border-x border-zinc-200 dark:border-zinc-800"
      style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
      {/* Main Content Area - Takes remaining space and scrolls */}
      <main 
        ref={mainRef}
        className="flex-1 overflow-y-auto hide-scrollbar bg-zinc-100 dark:bg-background-dark"
        style={{ minHeight: 0 }}
      >
        <Outlet />
      </main>

      {/* Chatbot Overlay - absolute to stay within container */}
      {isChatOpen && (
        <div 
          style={{ position: 'absolute', inset: 0, zIndex: 60 }}
          className="bg-white dark:bg-surface-dark"
        >
          <Chatbot onClose={() => setIsChatOpen(false)} />
        </div>
      )}

      <nav 
        className="bg-transparent pt-0 pb-1 relative"
        style={{ flexShrink: 0, zIndex: 40 }}
      >
        <div className="mx-1 rounded-[26px] border border-white/30 dark:border-white/10 bg-white/75 dark:bg-surface-dark/80 shadow-[0_4px_18px_rgba(15,23,42,0.25)] backdrop-blur-2xl px-5 py-1">
        <div className="flex justify-between items-center">
          {navGrid.map((entry) => {
            if (entry.type === 'chat') {
              return (
                <div key={entry.key} className="flex justify-center">
                  <motion.button
                    onClick={() => setIsChatOpen(true)}
                    className="w-[58px] h-[58px] rounded-[20px] bg-gradient-to-br from-primary to-accent text-white shadow-[0_14px_40px_rgba(14,165,233,0.55)] border border-white/30 flex items-center justify-center"
                    whileTap={{ scale: 0.92 }}
                    animate={{ 
                      y: [0, -3, 0],
                      boxShadow: [
                        '0 16px 45px rgba(14,165,233,0.55)',
                        '0 22px 50px rgba(14,165,233,0.35)',
                        '0 16px 45px rgba(14,165,233,0.55)'
                      ]
                    }}
                    transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                    aria-label="Open AI assistant"
                  >
                    <motion.span
                      className="absolute inset-0 rounded-2xl bg-accent/40 blur-xl -z-10"
                      animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.9, 1.25, 0.9] }}
                      transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                    />
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2.1, ease: 'easeInOut' }}
                    >
                      <MessageSquare size={22} />
                    </motion.div>
                  </motion.button>
                </div>
              );
            }

            const item = entry.item!;
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <div key={entry.key}>
                <button
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 transition-all duration-200 text-[11px] font-semibold py-1",
                    isActive 
                      ? "text-accent" 
                      : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"
                  )}
                >
                  <div className={cn(
                    "p-1.5 rounded-xl transition-all duration-200",
                    isActive && "bg-accent/10"
                  )}>
                    <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                  </div>
                  {item.label}
                </button>
              </div>
            );
          })}
        </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileLayout;
