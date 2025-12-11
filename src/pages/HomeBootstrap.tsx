import React from 'react';
import { 
  Bell, Search, Wallet, Bus, Recycle, Zap, AlertTriangle, FileText, 
  Sun, Calendar, CreditCard, Sparkles, Clock,
  CloudSun, Wind, Droplets, ThermometerSun
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Bootstrap 5 Dark Theme Tokens
const BS = {
  dark: '#212529',
  gray900: '#212529',
  gray800: '#343a40',
  gray700: '#495057',
  gray600: '#6c757d',
  gray500: '#adb5bd',
  gray400: '#ced4da',
  gray300: '#dee2e6',
  light: '#f8f9fa',
  white: '#ffffff',
  primary: '#0d6efd',
  secondary: '#6c757d',
  success: '#198754',
  info: '#0dcaf0',
  warning: '#ffc107',
  danger: '#dc3545',
  borderColor: '#495057',
};

const HomeBootstrap: React.FC = () => {
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
    <div className="flex flex-col min-h-full font-sans pb-32" style={{ backgroundColor: BS.dark, color: BS.light }}>
      {/* Bootstrap Navbar */}
      <header className="px-3 pt-12 pb-2 sticky top-0 z-30" style={{ backgroundColor: BS.dark, borderBottom: `1px solid ${BS.borderColor}` }}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded flex items-center justify-center font-bold text-lg text-white" style={{ backgroundColor: BS.primary, border: `1px solid #0a58ca` }}>
              Δ
            </div>
            <div>
              <span className="text-xl font-medium" style={{ color: BS.light }}>Athens.gov</span>
              <p className="text-[10px] uppercase tracking-wide" style={{ color: BS.gray500 }}>Municipality Super App</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded flex items-center justify-center" style={{ backgroundColor: BS.gray800, color: BS.gray500 }}><Sun size={18} /></button>
            <button className="w-9 h-9 rounded flex items-center justify-center" style={{ backgroundColor: BS.gray800, color: BS.gray500 }}><Search size={18} /></button>
            <button className="w-9 h-9 rounded flex items-center justify-center relative" style={{ backgroundColor: BS.gray800, color: BS.gray500 }}>
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full" style={{ backgroundColor: BS.danger }} />
            </button>
          </div>
        </div>
      </header>

      <div className="p-3 space-y-3">
        {/* Hero Card */}
        <div className="rounded p-4 text-white" style={{ backgroundColor: BS.primary }}>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs opacity-75">{formattedDate}</span>
              <h1 className="text-2xl font-medium mt-1">{getGreeting()},<br/><span className="fw-bold">Alexandros</span></h1>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <CloudSun size={24} />
                <span className="text-3xl">{weather.temp}°</span>
              </div>
              <p className="text-xs opacity-75">{weather.condition}</p>
            </div>
          </div>
          <div className="flex gap-4 mt-3 pt-3 border-t border-white/25 text-xs">
            <span className="flex items-center gap-1"><Droplets size={14} /> {weather.humidity}%</span>
            <span className="flex items-center gap-1"><Wind size={14} /> {weather.wind} km/h</span>
            <span className="flex items-center gap-1"><ThermometerSun size={14} /> Feels 26°</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-3 px-3">
          {[
            { icon: Wallet, value: '€45.50', label: 'Wallet Balance', badge: '+€12' },
            { icon: Clock, value: '1,250', label: 'Citizen Points' },
            { icon: Clock, value: 'Active', label: 'Requests', badge: '2' },
          ].map((stat, idx) => (
            <button key={idx} onClick={() => navigate('/wallet')} className="min-w-[120px] p-3 rounded text-left" style={{ backgroundColor: BS.gray800, border: `1px solid ${BS.borderColor}` }}>
              <div className="flex justify-between items-start mb-2">
                <div className="p-1.5 rounded" style={{ backgroundColor: BS.primary + '30', color: BS.primary }}>
                  <stat.icon size={16} />
                </div>
                {stat.badge && <span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ backgroundColor: BS.success, color: 'white' }}>{stat.badge}</span>}
              </div>
              <div className="text-lg font-medium" style={{ color: BS.light }}>{stat.value}</div>
              <div className="text-[10px]" style={{ color: BS.gray500 }}>{stat.label}</div>
            </button>
          ))}
        </div>

        {/* Active Tasks */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium" style={{ color: BS.light }}>Active Tasks</h2>
            <button className="text-sm" style={{ color: BS.primary }}>View All</button>
          </div>
          <div className="rounded overflow-hidden" style={{ backgroundColor: BS.gray800, border: `1px solid ${BS.borderColor}` }}>
            {activeItems.map((task, idx) => (
              <button key={task.id} onClick={() => navigate(`/requests/details/${task.id}`)} className="w-full p-3 flex items-center gap-3 text-left" style={{ borderBottom: idx < activeItems.length - 1 ? `1px solid ${BS.borderColor}` : 'none' }}>
                <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: BS.primary + '30', color: BS.primary }}>
                  <task.icon size={18} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium" style={{ color: BS.light }}>{task.title}</h3>
                  <p className="text-[10px]" style={{ color: BS.gray500 }}>{task.date}</p>
                </div>
                <span className="px-2 py-1 rounded text-[10px] font-medium" style={{ backgroundColor: task.status === 'in_progress' ? BS.warning : BS.info, color: task.status === 'in_progress' ? '#000' : '#000' }}>
                  {task.status === 'in_progress' ? 'In Progress' : 'Scheduled'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Services */}
        <div>
          <h2 className="text-sm font-medium mb-2" style={{ color: BS.light }}>Quick Access</h2>
          <div className="grid grid-cols-3 gap-2">
            {quickServices.map((service, i) => (
              <button key={i} onClick={() => navigate(service.path)} className="p-2 rounded flex flex-col items-center gap-1.5" style={{ backgroundColor: BS.gray800, border: `1px solid ${BS.borderColor}` }}>
                <div className="w-9 h-9 rounded flex items-center justify-center" style={{ backgroundColor: BS.primary + '30', color: BS.primary }}>
                  <service.icon size={18} />
                </div>
                <span className="text-[9px]" style={{ color: BS.gray500 }}>{service.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBootstrap;
