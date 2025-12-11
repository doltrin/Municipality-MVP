import React from 'react';
import { 
  Bell, Search, Wallet, Bus, Recycle, Zap, AlertTriangle, FileText, 
  Sun, Calendar, CreditCard, Sparkles, Clock,
  CloudSun, Wind, Droplets, ThermometerSun
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// PatternFly Dark Tokens
const PF = {
  backgroundDark: '#151515',
  backgroundDark100: '#1b1d21',
  backgroundDark200: '#212427',
  backgroundDark300: '#2b2b2b',
  textPrimary: '#e0e0e0',
  textSecondary: '#8a8d90',
  borderDark: '#3c3f42',
  linkColor: '#2b9af3',
  primaryBlue: '#0066cc',
  primaryBlueHover: '#004080',
  dangerRed: '#c9190b',
  warningYellow: '#f0ab00',
  successGreen: '#3e8635',
  infoBlue: '#2b9af3',
};

const HomePatternFly: React.FC = () => {
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
    <div className="flex flex-col min-h-full font-sans pb-32" style={{ backgroundColor: PF.backgroundDark, color: PF.textPrimary }}>
      {/* PatternFly Masthead */}
      <header className="px-4 pt-12 pb-3 sticky top-0 z-30" style={{ backgroundColor: PF.backgroundDark, borderBottom: `1px solid ${PF.borderDark}` }}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded flex items-center justify-center font-bold text-white" style={{ backgroundColor: PF.primaryBlue }}>
              Δ
            </div>
            <div>
              <span className="text-lg font-medium text-white">Athens.gov</span>
              <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: PF.textSecondary }}>Municipality</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button style={{ color: PF.textSecondary }}><Sun size={20} /></button>
            <button style={{ color: PF.textSecondary }}><Search size={20} /></button>
            <button className="relative" style={{ color: PF.textSecondary }}>
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ backgroundColor: PF.dangerRed }} />
            </button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Hero Card */}
        <div className="rounded p-5 text-white" style={{ backgroundColor: PF.primaryBlue }}>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-medium uppercase tracking-wide opacity-80">{formattedDate}</span>
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
            { icon: Clock, value: '1,250', label: 'Citizen Points' },
            { icon: Clock, value: 'Active', label: 'Requests', badge: '2' },
          ].map((stat, idx) => (
            <button key={idx} onClick={() => navigate('/wallet')} className="min-w-[130px] p-4 rounded text-left" style={{ backgroundColor: PF.backgroundDark200, border: `1px solid ${PF.borderDark}` }}>
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 rounded" style={{ backgroundColor: PF.primaryBlue + '30', color: PF.linkColor }}>
                  <stat.icon size={18} />
                </div>
                {stat.badge && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: PF.primaryBlue, color: 'white' }}>{stat.badge}</span>}
              </div>
              <div className="text-xl font-medium" style={{ color: PF.textPrimary }}>{stat.value}</div>
              <div className="text-[10px]" style={{ color: PF.textSecondary }}>{stat.label}</div>
            </button>
          ))}
        </div>

        {/* Active Tasks */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold" style={{ color: PF.textPrimary }}>Active Tasks</h2>
            <button className="text-sm" style={{ color: PF.linkColor }}>View All</button>
          </div>
          <div className="rounded overflow-hidden" style={{ backgroundColor: PF.backgroundDark200, border: `1px solid ${PF.borderDark}` }}>
            {activeItems.map((task, idx) => (
              <button key={task.id} onClick={() => navigate(`/requests/details/${task.id}`)} className="w-full p-4 flex items-center gap-3 text-left" style={{ borderBottom: idx < activeItems.length - 1 ? `1px solid ${PF.borderDark}` : 'none' }}>
                <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: PF.primaryBlue + '30', color: PF.linkColor }}>
                  <task.icon size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium" style={{ color: PF.textPrimary }}>{task.title}</h3>
                  <p className="text-[10px]" style={{ color: PF.textSecondary }}>{task.date}</p>
                </div>
                <span className="px-2 py-1 rounded text-[10px] font-medium text-white" style={{ backgroundColor: task.status === 'in_progress' ? PF.warningYellow : PF.infoBlue, color: task.status === 'in_progress' ? '#000' : '#fff' }}>
                  {task.status === 'in_progress' ? 'In Progress' : 'Scheduled'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Services */}
        <div>
          <h2 className="text-sm font-semibold mb-3" style={{ color: PF.textPrimary }}>Quick Access</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickServices.map((service, i) => (
              <button key={i} onClick={() => navigate(service.path)} className="p-3 rounded flex flex-col items-center gap-2" style={{ backgroundColor: PF.backgroundDark200, border: `1px solid ${PF.borderDark}` }}>
                <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: PF.primaryBlue + '30', color: PF.linkColor }}>
                  <service.icon size={20} />
                </div>
                <span className="text-[10px]" style={{ color: PF.textSecondary }}>{service.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePatternFly;
