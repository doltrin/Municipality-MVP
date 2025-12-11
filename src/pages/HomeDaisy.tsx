import React from 'react';
import { 
  Bell, Search, Wallet, Bus, Recycle, Zap, AlertTriangle, FileText, 
  Sun, Calendar, CreditCard, Sparkles, Clock,
  CloudSun, Wind, Droplets, ThermometerSun
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// DaisyUI Dark Theme (uses Tailwind classes but we'll use inline for consistency)
const Daisy = {
  base100: '#1d232a',
  base200: '#191e24',
  base300: '#15191e',
  baseContent: '#A6ADBB',
  neutral: '#2a323c',
  neutralContent: '#A6ADBB',
  primary: '#7480ff',
  primaryContent: '#050617',
  secondary: '#ff71cf',
  secondaryContent: '#190211',
  accent: '#00cdb7',
  accentContent: '#001411',
  info: '#00b5ff',
  success: '#00a96e',
  warning: '#ffbe00',
  error: '#ff5861',
};

const HomeDaisy: React.FC = () => {
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
    <div className="flex flex-col min-h-full font-sans pb-32" style={{ backgroundColor: Daisy.base200, color: Daisy.baseContent }}>
      {/* DaisyUI Navbar */}
      <header className="px-4 pt-12 pb-3 sticky top-0 z-30 shadow-xl" style={{ backgroundColor: Daisy.base100 }}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-lg" style={{ backgroundColor: Daisy.primary, color: Daisy.primaryContent }}>
              Δ
            </div>
            <div>
              <span className="text-xl font-bold" style={{ color: Daisy.baseContent }}>Athens.gov</span>
              <p className="text-[10px] uppercase tracking-wider opacity-70">Municipality Super App</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: Daisy.neutral, color: Daisy.neutralContent }}><Sun size={18} /></button>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: Daisy.neutral, color: Daisy.neutralContent }}><Search size={18} /></button>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center relative" style={{ backgroundColor: Daisy.neutral, color: Daisy.neutralContent }}>
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: Daisy.error }} />
            </button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Hero Card */}
        <div className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${Daisy.primary}, ${Daisy.secondary})` }}>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-medium opacity-80">{formattedDate}</span>
              <h1 className="text-2xl font-bold mt-1">{getGreeting()},<br/>Alexandros</h1>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <CloudSun size={24} />
                <span className="text-3xl font-bold">{weather.temp}°</span>
              </div>
              <p className="text-xs opacity-80">{weather.condition}</p>
            </div>
          </div>
          <div className="flex gap-6 mt-4 pt-4 border-t border-white/20 text-xs font-medium">
            <span className="flex items-center gap-1"><Droplets size={14} /> {weather.humidity}%</span>
            <span className="flex items-center gap-1"><Wind size={14} /> {weather.wind} km/h</span>
            <span className="flex items-center gap-1"><ThermometerSun size={14} /> Feels 26°</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4">
          {[
            { icon: Wallet, value: '€45.50', label: 'Wallet Balance', badge: '+€12' },
            { icon: Clock, value: '1,250', label: 'Citizen Points' },
            { icon: Clock, value: 'Active', label: 'Requests', badge: '2' },
          ].map((stat, idx) => (
            <button key={idx} onClick={() => navigate('/wallet')} className="min-w-[130px] p-4 rounded-2xl text-left" style={{ backgroundColor: Daisy.base100 }}>
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 rounded-xl" style={{ backgroundColor: Daisy.primary + '30', color: Daisy.primary }}>
                  <stat.icon size={18} />
                </div>
                {stat.badge && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: Daisy.primary, color: Daisy.primaryContent }}>{stat.badge}</span>}
              </div>
              <div className="text-xl font-bold" style={{ color: Daisy.baseContent }}>{stat.value}</div>
              <div className="text-[10px] opacity-70">{stat.label}</div>
            </button>
          ))}
        </div>

        {/* Active Tasks */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-bold" style={{ color: Daisy.baseContent }}>Active Tasks</h2>
            <button className="text-sm font-semibold" style={{ color: Daisy.primary }}>View All</button>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: Daisy.base100 }}>
            {activeItems.map((task, idx) => (
              <button key={task.id} onClick={() => navigate(`/requests/details/${task.id}`)} className="w-full p-4 flex items-center gap-3 text-left" style={{ borderBottom: idx < activeItems.length - 1 ? `1px solid ${Daisy.neutral}` : 'none' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: Daisy.primary + '30', color: Daisy.primary }}>
                  <task.icon size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold" style={{ color: Daisy.baseContent }}>{task.title}</h3>
                  <p className="text-[10px] opacity-70">{task.date}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold" style={{ backgroundColor: task.status === 'in_progress' ? Daisy.warning : Daisy.info, color: '#000' }}>
                  {task.status === 'in_progress' ? 'In Progress' : 'Scheduled'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Services */}
        <div>
          <h2 className="text-sm font-bold mb-3" style={{ color: Daisy.baseContent }}>Quick Access</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickServices.map((service, i) => (
              <button key={i} onClick={() => navigate(service.path)} className="p-3 rounded-2xl flex flex-col items-center gap-2" style={{ backgroundColor: Daisy.base100 }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: Daisy.primary + '30', color: Daisy.primary }}>
                  <service.icon size={22} />
                </div>
                <span className="text-[10px] font-medium opacity-70">{service.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDaisy;
