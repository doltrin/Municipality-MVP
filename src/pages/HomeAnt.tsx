import React from 'react';
import { 
  Bell, Search, Wallet, Bus, Recycle, Zap, AlertTriangle, FileText, 
  Sun, Calendar, CreditCard, Sparkles, Clock,
  CloudSun, Wind, Droplets, ThermometerSun
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Ant Design Dark Tokens
const Ant = {
  colorBgContainer: '#141414',
  colorBgElevated: '#1f1f1f',
  colorBgSpotlight: '#2a2a2a',
  colorPrimary: '#1890ff',
  colorPrimaryBg: '#111d2c',
  colorText: 'rgba(255,255,255,0.85)',
  colorTextSecondary: 'rgba(255,255,255,0.45)',
  colorTextTertiary: 'rgba(255,255,255,0.25)',
  colorBorder: '#303030',
  colorSuccess: '#52c41a',
  colorWarning: '#faad14',
  colorError: '#ff4d4f',
  colorInfo: '#1890ff',
  borderRadius: '8px',
};

const HomeAnt: React.FC = () => {
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
    <div className="flex flex-col min-h-full font-sans pb-32" style={{ backgroundColor: Ant.colorBgContainer, color: Ant.colorText }}>
      {/* Ant Header */}
      <header className="px-5 pt-12 pb-3 sticky top-0 z-30" style={{ backgroundColor: Ant.colorBgContainer, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg text-white" style={{ backgroundColor: Ant.colorPrimary }}>
              Δ
            </div>
            <div>
              <span className="text-lg font-medium" style={{ color: Ant.colorText }}>Athens.gov</span>
              <p className="text-[10px] uppercase tracking-wider" style={{ color: Ant.colorTextSecondary }}>Municipality Super App</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button style={{ color: Ant.colorTextSecondary }}><Sun size={20} /></button>
            <button style={{ color: Ant.colorTextSecondary }}><Search size={20} /></button>
            <button className="relative" style={{ color: Ant.colorTextSecondary }}>
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ backgroundColor: Ant.colorError }} />
            </button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Hero Card */}
        <div className="rounded-lg p-5" style={{ backgroundColor: Ant.colorPrimary }}>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs opacity-80">{formattedDate}</span>
              <h1 className="text-2xl font-normal mt-1">{getGreeting()},<br/><span className="font-semibold">Alexandros</span></h1>
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
            <button key={idx} onClick={() => navigate('/wallet')} className="min-w-[130px] p-4 rounded-lg text-left" style={{ backgroundColor: Ant.colorBgElevated, border: `1px solid ${Ant.colorBorder}` }}>
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 rounded-lg" style={{ backgroundColor: Ant.colorPrimaryBg, color: Ant.colorPrimary }}>
                  {<stat.icon />}
                </div>
                {stat.badge && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: Ant.colorPrimary, color: 'white' }}>{stat.badge}</span>}
              </div>
              <div className="text-xl font-medium" style={{ color: Ant.colorText }}>{stat.value}</div>
              <div className="text-[10px]" style={{ color: Ant.colorTextSecondary }}>{stat.label}</div>
            </button>
          ))}
        </div>

        {/* Active Tasks */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-medium" style={{ color: Ant.colorText }}>Active Tasks</h2>
            <button className="text-sm" style={{ color: Ant.colorPrimary }}>View All</button>
          </div>
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: Ant.colorBgElevated, border: `1px solid ${Ant.colorBorder}` }}>
            {activeItems.map((task, idx) => (
              <button key={task.id} onClick={() => navigate(`/requests/details/${task.id}`)} className="w-full p-4 flex items-center gap-3 text-left" style={{ borderBottom: idx < activeItems.length - 1 ? `1px solid ${Ant.colorBorder}` : 'none' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: Ant.colorPrimaryBg, color: Ant.colorPrimary }}>
                  <task.icon size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium" style={{ color: Ant.colorText }}>{task.title}</h3>
                  <p className="text-[10px]" style={{ color: Ant.colorTextSecondary }}>{task.date}</p>
                </div>
                <span className="px-2 py-1 rounded text-[10px] font-medium" style={{ backgroundColor: task.status === 'in_progress' ? Ant.colorWarning : Ant.colorInfo, color: task.status === 'in_progress' ? '#000' : '#fff' }}>
                  {task.status === 'in_progress' ? 'In Progress' : 'Scheduled'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Services */}
        <div>
          <h2 className="text-sm font-medium mb-3" style={{ color: Ant.colorText }}>Quick Access</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickServices.map((service, i) => (
              <button key={i} onClick={() => navigate(service.path)} className="p-3 rounded-lg flex flex-col items-center gap-2" style={{ backgroundColor: Ant.colorBgElevated, border: `1px solid ${Ant.colorBorder}` }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: Ant.colorPrimaryBg, color: Ant.colorPrimary }}>
                  <service.icon size={20} />
                </div>
                <span className="text-[10px]" style={{ color: Ant.colorTextSecondary }}>{service.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAnt;
