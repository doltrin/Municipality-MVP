import React from 'react';
import { 
  Bell, Search, Wallet, Bus, Recycle, Zap, AlertTriangle, FileText, 
  Sun, Calendar, CreditCard, Sparkles, Clock,
  CloudSun, Wind, Droplets, ThermometerSun
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../stores';

// IBM Carbon Design Tokens
const Carbon = {
  background: '#161616',
  layer01: '#262626',
  layer02: '#393939',
  layerAccent01: '#393939',
  interactive: '#0F62FE',
  textPrimary: '#F4F4F4',
  textSecondary: '#C6C6C6',
  textPlaceholder: '#6F6F6F',
  borderSubtle: '#393939',
  supportError: '#FA4D56',
  supportSuccess: '#42BE65',
  supportWarning: '#F1C21B',
  supportInfo: '#4589FF',
};

const HomeCarbon: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppStore((s) => s.user);

  const quickServices = [
    { label: 'Certificates', icon: FileText, path: '/services/civil/birth-certificate' },
    { label: 'Report Issue', icon: AlertTriangle, path: '/requests' },
    { label: 'Payments', icon: CreditCard, path: '/payments' },
    { label: 'Transport', icon: Bus, path: '/transport' },
    { label: 'Waste', icon: Recycle, path: '/waste/schedule' },
    { label: 'All Services', icon: Sparkles, path: '/services' },
  ];

  const activeItems = [
    { id: 1, title: 'Street Light Repair', status: 'in_progress', date: '2 days ago', icon: Zap },
    { id: 2, title: 'Certificate Pickup', status: 'scheduled', date: 'Tomorrow, 10:00', icon: Calendar },
  ];

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
    <div className="flex flex-col min-h-full font-sans pb-32" style={{ backgroundColor: Carbon.background, color: Carbon.textPrimary }}>
      {/* Carbon Header */}
      <header className="px-4 pt-12 pb-3 sticky top-0 z-30" style={{ backgroundColor: Carbon.background, borderBottom: `1px solid ${Carbon.borderSubtle}` }}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center font-bold text-lg text-white" style={{ backgroundColor: Carbon.interactive }}>
              Δ
            </div>
            <div>
              <span className="text-base font-semibold" style={{ color: Carbon.textPrimary }}>Athens.gov</span>
              <p className="text-[10px] uppercase tracking-wider" style={{ color: Carbon.textSecondary }}>Municipality Super App</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button style={{ color: Carbon.textSecondary }}><Sun size={20} /></button>
            <button style={{ color: Carbon.textSecondary }}><Search size={20} /></button>
            <button className="relative" style={{ color: Carbon.textSecondary }}>
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ backgroundColor: Carbon.supportError }} />
            </button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Hero Tile */}
        <div className="p-4" style={{ backgroundColor: Carbon.interactive }}>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-medium uppercase tracking-wide opacity-80">{formattedDate}</span>
              <h1 className="text-2xl font-light mt-1">{getGreeting()},<br/><span className="font-semibold">{user?.name || 'Guest'}</span></h1>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <CloudSun size={24} />
                <span className="text-3xl font-light">{weather.temp}°</span>
              </div>
              <p className="text-xs opacity-80">{weather.condition}</p>
            </div>
          </div>
          <div className="flex gap-6 mt-4 pt-4 border-t border-white/20 text-xs">
            <span className="flex items-center gap-1"><Droplets size={14} /> {weather.humidity}%</span>
            <span className="flex items-center gap-1"><Wind size={14} /> {weather.wind} km/h</span>
            <span className="flex items-center gap-1"><ThermometerSun size={14} /> Feels 26°</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4">
          {[
            { icon: Wallet, value: '€45.50', label: 'Wallet Balance', badge: '+€12' },
            { icon: () => <span className="font-bold">★</span>, value: '1,250', label: 'Citizen Points' },
            { icon: Clock, value: 'Active', label: 'Requests', badge: '2' },
          ].map((stat, idx) => (
            <button key={idx} onClick={() => navigate('/wallet')} className="min-w-[130px] p-4 text-left" style={{ backgroundColor: Carbon.layer01 }}>
              <div className="flex justify-between items-start mb-2">
                <div className="p-2" style={{ backgroundColor: Carbon.layer02, color: Carbon.textSecondary }}>
                  {<stat.icon />}
                </div>
                {stat.badge && <span className="text-[10px] font-bold px-1.5 py-0.5" style={{ backgroundColor: Carbon.interactive, color: 'white' }}>{stat.badge}</span>}
              </div>
              <div className="text-xl font-light" style={{ color: Carbon.textPrimary }}>{stat.value}</div>
              <div className="text-[10px]" style={{ color: Carbon.textSecondary }}>{stat.label}</div>
            </button>
          ))}
        </div>

        {/* Active Tasks */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: Carbon.textSecondary }}>Active Tasks</h2>
            <button className="text-sm" style={{ color: Carbon.interactive }}>View All</button>
          </div>
          <div style={{ backgroundColor: Carbon.layer01 }}>
            {activeItems.map((task, idx) => (
              <button key={task.id} onClick={() => navigate(`/requests/details/${task.id}`)} className="w-full p-4 flex items-center gap-3 text-left" style={{ borderBottom: idx < activeItems.length - 1 ? `1px solid ${Carbon.borderSubtle}` : 'none' }}>
                <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: Carbon.layer02, color: Carbon.textSecondary }}>
                  <task.icon size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm" style={{ color: Carbon.textPrimary }}>{task.title}</h3>
                  <p className="text-[10px]" style={{ color: Carbon.textSecondary }}>{task.date}</p>
                </div>
                <span className="px-2 py-1 text-[10px] font-medium" style={{ backgroundColor: task.status === 'in_progress' ? Carbon.supportWarning : Carbon.supportInfo, color: Carbon.background }}>
                  {task.status === 'in_progress' ? 'In Progress' : 'Scheduled'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Services */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: Carbon.textSecondary }}>Quick Access</h2>
          <div className="grid grid-cols-3 gap-px" style={{ backgroundColor: Carbon.borderSubtle }}>
            {quickServices.map((service, i) => (
              <button key={i} onClick={() => navigate(service.path)} className="p-4 flex flex-col items-center gap-2" style={{ backgroundColor: Carbon.layer01 }}>
                <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: Carbon.layer02, color: Carbon.textSecondary }}>
                  <service.icon size={20} />
                </div>
                <span className="text-[10px]" style={{ color: Carbon.textSecondary }}>{service.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCarbon;
