import React from 'react';
import { 
  Bell, Search, Wallet, Bus, Recycle, Zap, AlertTriangle, FileText, 
  Sun, Calendar, CreditCard, 
  Sparkles, Clock,
  CloudSun, Wind, Droplets, ThermometerSun
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../stores';

// Material 3 Color Tokens
const M3 = {
  // Surface colors
  surface: '#141218',
  surfaceContainer: '#211F26',
  surfaceContainerHigh: '#2B2930',
  surfaceContainerHighest: '#36343B',
  
  // Primary colors
  primary: '#D0BCFF',
  primaryContainer: '#4F378B',
  onPrimary: '#381E72',
  onPrimaryContainer: '#EADDFF',
  
  // Secondary colors
  secondary: '#CCC2DC',
  secondaryContainer: '#4A4458',
  onSecondaryContainer: '#E8DEF8',
  
  // Tertiary colors
  tertiary: '#EFB8C8',
  tertiaryContainer: '#633B48',
  
  // Text colors
  onSurface: '#E6E0E9',
  onSurfaceVariant: '#CAC4D0',
  outline: '#938F99',
  outlineVariant: '#49454F',
  
  // Status colors
  error: '#F2B8B5',
  errorContainer: '#8C1D18',
};

const HomeMaterial3: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppStore((s) => s.user);

  // Quick access services
  const quickServices = [
    { label: 'Certificates', icon: FileText, path: '/services/civil/birth-certificate' },
    { label: 'Report Issue', icon: AlertTriangle, path: '/requests' },
    { label: 'Payments', icon: CreditCard, path: '/payments' },
    { label: 'Transport', icon: Bus, path: '/transport' },
    { label: 'Waste', icon: Recycle, path: '/waste/schedule' },
    { label: 'All Services', icon: Sparkles, path: '/services' },
  ];

  // Active tasks
  const activeItems = [
    { id: 1, title: 'Street Light Repair', status: 'in_progress', date: '2 days ago', icon: Zap },
    { id: 2, title: 'Certificate Pickup', status: 'scheduled', date: 'Tomorrow, 10:00', icon: Calendar },
  ];

  // Weather & date
  const weather = { temp: 24, condition: 'Sunny', humidity: 45, wind: 12 };
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' });
  const getGreeting = () => {
    const hour = today.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="flex flex-col min-h-full font-sans pb-32" style={{ backgroundColor: M3.surface, color: M3.onSurface }}>
      {/* M3 Top App Bar */}
      <header 
        className="px-4 pt-12 pb-3 sticky top-0 z-30"
        style={{ backgroundColor: M3.surface }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg"
              style={{ backgroundColor: M3.primaryContainer, color: M3.onPrimaryContainer }}
            >
              Δ
            </div>
            <div>
              <span className="text-[17px] font-normal" style={{ color: M3.onSurface }}>
                Athens<span style={{ color: M3.primary }}>.gov</span>
              </span>
              <p className="text-[10px] font-medium -mt-0.5" style={{ color: M3.onSurfaceVariant }}>Municipality Super App</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-10 h-10 rounded-full flex items-center justify-center" style={{ color: M3.onSurfaceVariant }}>
              <Sun size={22} />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center" style={{ color: M3.onSurfaceVariant }}>
              <Search size={22} />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center relative" style={{ color: M3.onSurfaceVariant }}>
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: M3.error }} />
            </button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-5">
        {/* Hero Card */}
        <div 
          className="rounded-[28px] p-5 text-white relative overflow-hidden"
          style={{ backgroundColor: M3.primaryContainer }}
        >
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <span 
                  className="inline-block px-3 py-1 rounded-lg text-xs font-medium mb-3"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: M3.onPrimaryContainer }}
                >
                  {formattedDate}
                </span>
                <h1 className="text-2xl font-normal leading-tight" style={{ color: M3.onPrimaryContainer }}>
                  {getGreeting()},<br/><span className="font-semibold">{user?.name || 'Guest'}</span>
                </h1>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <CloudSun size={28} style={{ color: M3.onPrimaryContainer }} />
                  <span className="text-3xl font-light" style={{ color: M3.onPrimaryContainer }}>{weather.temp}°</span>
                </div>
                <p className="text-xs mt-1" style={{ color: M3.onPrimaryContainer, opacity: 0.8 }}>{weather.condition}</p>
              </div>
            </div>

            <div className="flex gap-6 mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center gap-1.5 text-xs" style={{ color: M3.onPrimaryContainer, opacity: 0.9 }}>
                <Droplets size={14} />
                <span>{weather.humidity}%</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs" style={{ color: M3.onPrimaryContainer, opacity: 0.9 }}>
                <Wind size={14} />
                <span>{weather.wind} km/h</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs" style={{ color: M3.onPrimaryContainer, opacity: 0.9 }}>
                <ThermometerSun size={14} />
                <span>Feels 26°</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4">
          <button 
            onClick={() => navigate('/wallet')}
            className="min-w-[130px] p-4 rounded-2xl text-left"
            style={{ backgroundColor: M3.surfaceContainerHigh }}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 rounded-xl" style={{ backgroundColor: M3.primaryContainer, color: M3.onPrimaryContainer }}>
                <Wallet size={18} />
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: M3.secondaryContainer, color: M3.onSecondaryContainer }}>+€12</span>
            </div>
            <div className="text-xl font-normal" style={{ color: M3.onSurface }}>€45.50</div>
            <div className="text-[10px] font-medium" style={{ color: M3.onSurfaceVariant }}>Wallet Balance</div>
          </button>

          <button 
            onClick={() => navigate('/wallet')}
            className="min-w-[130px] p-4 rounded-2xl text-left"
            style={{ backgroundColor: M3.surfaceContainerHigh }}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 rounded-xl" style={{ backgroundColor: M3.secondaryContainer, color: M3.onSecondaryContainer }}>
                <span className="text-sm font-bold">★</span>
              </div>
            </div>
            <div className="text-xl font-normal" style={{ color: M3.onSurface }}>1,250</div>
            <div className="text-[10px] font-medium" style={{ color: M3.onSurfaceVariant }}>Citizen Points</div>
          </button>

          <button 
            onClick={() => navigate('/requests/history')}
            className="min-w-[130px] p-4 rounded-2xl text-left"
            style={{ backgroundColor: M3.surfaceContainerHigh }}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 rounded-xl" style={{ backgroundColor: M3.secondaryContainer, color: M3.onSecondaryContainer }}>
                <Clock size={18} />
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: M3.primaryContainer, color: M3.onPrimaryContainer }}>2</span>
            </div>
            <div className="text-xl font-normal" style={{ color: M3.onSurface }}>Active</div>
            <div className="text-[10px] font-medium" style={{ color: M3.onSurfaceVariant }}>Requests</div>
          </button>
        </div>

        {/* Active Tasks */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-medium" style={{ color: M3.onSurface }}>Active Tasks</h2>
            <button className="text-sm font-medium" style={{ color: M3.primary }}>View All</button>
          </div>
          <div className="rounded-[20px] overflow-hidden" style={{ backgroundColor: M3.surfaceContainerHigh }}>
            {activeItems.map((task, idx) => (
              <button
                key={task.id}
                onClick={() => navigate(`/requests/details/${task.id}`)}
                className="w-full p-4 flex items-center gap-3 text-left"
                style={{ borderBottom: idx < activeItems.length - 1 ? `1px solid ${M3.outlineVariant}` : 'none' }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: M3.onSecondaryContainer, color: M3.secondaryContainer }}
                >
                  <task.icon size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm" style={{ color: M3.onSurface }}>{task.title}</h3>
                  <p className="text-[10px]" style={{ color: M3.onSurfaceVariant }}>{task.date}</p>
                </div>
                <div 
                  className="px-3 py-1.5 rounded-lg text-[10px] font-medium"
                  style={{ 
                    backgroundColor: task.status === 'in_progress' ? '#FFD8E4' : M3.onSecondaryContainer,
                    color: task.status === 'in_progress' ? '#31111D' : M3.secondaryContainer
                  }}
                >
                  {task.status === 'in_progress' ? 'In Progress' : 'Scheduled'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Services */}
        <div>
          <h2 className="text-sm font-medium mb-3" style={{ color: M3.onSurface }}>Quick Access</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickServices.map((service, i) => (
              <button 
                key={i}
                onClick={() => navigate(service.path)}
                className="p-3 rounded-2xl flex flex-col items-center gap-2"
                style={{ backgroundColor: M3.surfaceContainerHigh }}
              >
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: M3.secondaryContainer, color: M3.onSecondaryContainer }}
                >
                  <service.icon size={22} />
                </div>
                <span className="text-[10px] font-medium text-center" style={{ color: M3.onSurfaceVariant }}>{service.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMaterial3;
