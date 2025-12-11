import React from 'react';
import { 
  Bell, Search, Wallet, Bus, Recycle, Zap, AlertTriangle, FileText, 
  Sun, Calendar, CreditCard, Sparkles, Clock,
  CloudSun, Wind, Droplets, ThermometerSun
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// MUI Dark Theme Tokens
const MUI = {
  background: '#121212',
  paper: '#1e1e1e',
  paperElevated: '#2d2d2d',
  primary: '#90caf9',
  primaryDark: '#1565c0',
  secondary: '#ce93d8',
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255,255,255,0.7)',
  textDisabled: 'rgba(255,255,255,0.5)',
  divider: 'rgba(255,255,255,0.12)',
  error: '#f44336',
  warning: '#ffa726',
  info: '#29b6f6',
  success: '#66bb6a',
};

const HomeMui: React.FC = () => {
  const navigate = useNavigate();

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
    <div className="flex flex-col min-h-full font-sans pb-32" style={{ backgroundColor: MUI.background, color: MUI.textPrimary }}>
      {/* MUI AppBar */}
      <header className="px-4 pt-12 pb-3 sticky top-0 z-30" style={{ backgroundColor: MUI.paper, boxShadow: '0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.2)' }}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg text-white shadow-md" style={{ backgroundColor: MUI.primaryDark }}>
              Δ
            </div>
            <div>
              <span className="text-xl font-medium tracking-wide" style={{ color: MUI.textPrimary }}>Athens.gov</span>
              <p className="text-[10px] font-medium tracking-widest uppercase" style={{ color: MUI.textSecondary }}>Municipality Super App</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10" style={{ color: MUI.textSecondary }}><Sun size={20} /></button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10" style={{ color: MUI.textSecondary }}><Search size={20} /></button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 relative" style={{ color: MUI.textSecondary }}>
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: MUI.error }} />
            </button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Hero Card */}
        <div className="rounded-lg p-5 text-white" style={{ backgroundColor: MUI.primaryDark, boxShadow: '0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12)' }}>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-medium uppercase tracking-wide opacity-80">{formattedDate}</span>
              <h1 className="text-2xl font-medium mt-1">{getGreeting()},<br/><span className="font-bold">Alexandros</span></h1>
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
            <button key={idx} onClick={() => navigate('/wallet')} className="min-w-[130px] p-4 rounded-lg text-left" style={{ backgroundColor: MUI.paper, boxShadow: '0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.12)' }}>
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 rounded-full" style={{ backgroundColor: MUI.primaryDark + '40', color: MUI.primary }}>
                  {typeof stat.icon === 'function' ? <stat.icon /> : <stat.icon size={18} />}
                </div>
                {stat.badge && <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: MUI.primaryDark, color: 'white' }}>{stat.badge}</span>}
              </div>
              <div className="text-xl font-medium" style={{ color: MUI.textPrimary }}>{stat.value}</div>
              <div className="text-[10px]" style={{ color: MUI.textSecondary }}>{stat.label}</div>
            </button>
          ))}
        </div>

        {/* Active Tasks */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-medium uppercase tracking-wide" style={{ color: MUI.textSecondary }}>Active Tasks</h2>
            <button className="text-sm font-medium" style={{ color: MUI.primary }}>View All</button>
          </div>
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: MUI.paper, boxShadow: '0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.12)' }}>
            {activeItems.map((task, idx) => (
              <button key={task.id} onClick={() => navigate(`/requests/details/${task.id}`)} className="w-full p-4 flex items-center gap-3 text-left" style={{ borderBottom: idx < activeItems.length - 1 ? `1px solid ${MUI.divider}` : 'none' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: MUI.primaryDark + '40', color: MUI.primary }}>
                  <task.icon size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium" style={{ color: MUI.textPrimary }}>{task.title}</h3>
                  <p className="text-[10px]" style={{ color: MUI.textSecondary }}>{task.date}</p>
                </div>
                <span className="px-2 py-1 rounded-full text-[10px] font-medium" style={{ backgroundColor: task.status === 'in_progress' ? MUI.warning : MUI.info, color: MUI.background }}>
                  {task.status === 'in_progress' ? 'In Progress' : 'Scheduled'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Services */}
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wide mb-3" style={{ color: MUI.textSecondary }}>Quick Access</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickServices.map((service, i) => (
              <button key={i} onClick={() => navigate(service.path)} className="p-3 rounded-lg flex flex-col items-center gap-2" style={{ backgroundColor: MUI.paper, boxShadow: '0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.12)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: MUI.primaryDark + '40', color: MUI.primary }}>
                  <service.icon size={20} />
                </div>
                <span className="text-[10px]" style={{ color: MUI.textSecondary }}>{service.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMui;
