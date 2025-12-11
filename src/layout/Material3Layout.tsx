import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Grid, Calendar, User, MessageSquare } from 'lucide-react';

// Material 3 Color Tokens
const M3 = {
  surface: '#141218',
  surfaceContainer: '#211F26',
  surfaceContainerHigh: '#2B2930',
  primary: '#D0BCFF',
  primaryContainer: '#4F378B',
  onPrimary: '#381E72',
  onPrimaryContainer: '#EADDFF',
  secondaryContainer: '#4A4458',
  onSecondaryContainer: '#E8DEF8',
  onSurface: '#E6E0E9',
  onSurfaceVariant: '#CAC4D0',
};

const Material3Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const navItems = [
    { path: '/material3', icon: Home, label: 'Home' },
    { path: '/material3/services', icon: Grid, label: 'Services' },
    { path: '/material3/news', icon: Calendar, label: 'News' },
    { path: '/material3/profile', icon: User, label: 'Profile' },
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
      className="flex flex-col max-w-md mx-auto shadow-2xl font-sans"
      style={{ 
        height: '100%', 
        backgroundColor: M3.surface,
        borderLeft: `1px solid ${M3.surfaceContainerHigh}`,
        borderRight: `1px solid ${M3.surfaceContainerHigh}`,
      }}
    >
      {/* Main Content */}
      <main 
        className="flex-1 overflow-y-auto hide-scrollbar"
        style={{ minHeight: 0, backgroundColor: M3.surface }}
      >
        <Outlet />
      </main>

      {/* M3 Navigation Bar */}
      <nav 
        className="pt-2 pb-6 px-4"
        style={{ 
          backgroundColor: M3.surfaceContainerHigh,
          flexShrink: 0,
        }}
      >
        <div className="flex justify-around items-end">
          {navGrid.map((entry) => {
            if (entry.type === 'chat') {
              return (
                <button
                  key={entry.key}
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg -translate-y-4"
                  style={{ backgroundColor: M3.primary, color: M3.onPrimary }}
                >
                  <MessageSquare size={24} />
                </button>
              );
            }

            const item = entry.item!;
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            const Icon = item.icon;

            return (
              <div key={entry.key} className="-translate-y-2">
                <button
                  onClick={() => navigate(item.path)}
                  className="flex flex-col items-center gap-1 w-16"
                >
                  <div 
                    className="w-16 h-8 rounded-full flex items-center justify-center transition-colors"
                    style={{ backgroundColor: isActive ? M3.secondaryContainer : 'transparent' }}
                  >
                    <Icon 
                      size={22} 
                      strokeWidth={isActive ? 2.5 : 1.8}
                      style={{ color: isActive ? M3.onSecondaryContainer : M3.onSurfaceVariant }}
                    />
                  </div>
                  <span 
                    className="text-[11px] font-medium"
                    style={{ color: isActive ? M3.onSecondaryContainer : M3.onSurfaceVariant }}
                  >
                    {item.label}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Material3Layout;
