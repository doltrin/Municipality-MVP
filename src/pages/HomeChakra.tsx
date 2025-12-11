import React from 'react';
import { 
  Bell, Search, Wallet, Bus, Recycle, Zap, AlertTriangle, FileText, 
  Sun, Calendar, CreditCard, Sparkles, Clock,
  CloudSun, Wind, Droplets, ThermometerSun
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Chakra UI Dark Tokens
const Chakra = {
  gray900: '#171923',
  gray800: '#1A202C',
  gray700: '#2D3748',
  gray600: '#4A5568',
  gray400: '#A0AEC0',
  gray300: '#CBD5E0',
  white: '#FFFFFF',
  purple500: '#805AD5',
  purple400: '#9F7AEA',
  purple200: '#E9D8FD',
  teal500: '#319795',
  teal200: '#81E6D9',
  orange500: '#DD6B20',
  orange200: '#FBD38D',
  blue500: '#3182CE',
  red500: '#E53E3E',
};

const HomeChakra: React.FC = () => {
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
    <div className="flex flex-col min-h-full font-sans pb-32" style={{ backgroundColor: Chakra.gray800, color: Chakra.white }}>
      {/* Chakra Header */}
      <header className="px-4 pt-12 pb-3 sticky top-0 z-30" style={{ backgroundColor: Chakra.gray800, borderBottom: `1px solid ${Chakra.gray700}` }}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg text-white" style={{ backgroundColor: Chakra.purple500 }}>
              Δ
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight" style={{ color: Chakra.white }}>Athens.gov</span>
              <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: Chakra.gray400 }}>Municipality Super App</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: Chakra.gray700, color: Chakra.gray300 }}><Sun size={18} /></button>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: Chakra.gray700, color: Chakra.gray300 }}><Search size={18} /></button>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center relative" style={{ backgroundColor: Chakra.gray700, color: Chakra.gray300 }}>
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: Chakra.red500 }} />
            </button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Hero Card */}
        <div className="rounded-xl p-5" style={{ background: `linear-gradient(135deg, ${Chakra.purple500}, ${Chakra.purple400})` }}>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold opacity-80">{formattedDate}</span>
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
            { icon: Wallet, value: '€45.50', label: 'Wallet Balance', badge: '+€12', color: Chakra.teal500 },
            { icon: () => <span className="font-bold">★</span>, value: '1,250', label: 'Citizen Points', color: Chakra.orange500 },
            { icon: Clock, value: 'Active', label: 'Requests', badge: '2', color: Chakra.blue500 },
          ].map((stat, idx) => (
            <button key={idx} onClick={() => navigate('/wallet')} className="min-w-[130px] p-4 rounded-xl text-left" style={{ backgroundColor: Chakra.gray700 }}>
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                  {typeof stat.icon === 'function' ? <stat.icon /> : <stat.icon size={18} />}
                </div>
                {stat.badge && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: stat.color, color: 'white' }}>{stat.badge}</span>}
              </div>
              <div className="text-xl font-bold" style={{ color: Chakra.white }}>{stat.value}</div>
              <div className="text-[10px] font-medium" style={{ color: Chakra.gray400 }}>{stat.label}</div>
            </button>
          ))}
        </div>

        {/* Active Tasks */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-bold" style={{ color: Chakra.white }}>Active Tasks</h2>
            <button className="text-sm font-semibold" style={{ color: Chakra.purple400 }}>View All</button>
          </div>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: Chakra.gray700 }}>
            {activeItems.map((task, idx) => (
              <button key={task.id} onClick={() => navigate(`/requests/details/${task.id}`)} className="w-full p-4 flex items-center gap-3 text-left" style={{ borderBottom: idx < activeItems.length - 1 ? `1px solid ${Chakra.gray600}` : 'none' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: Chakra.purple500 + '30', color: Chakra.purple400 }}>
                  <task.icon size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold" style={{ color: Chakra.white }}>{task.title}</h3>
                  <p className="text-[10px]" style={{ color: Chakra.gray400 }}>{task.date}</p>
                </div>
                <span className="px-2 py-1 rounded-md text-[10px] font-bold" style={{ backgroundColor: task.status === 'in_progress' ? Chakra.orange200 : Chakra.teal200, color: task.status === 'in_progress' ? Chakra.orange500 : Chakra.teal500 }}>
                  {task.status === 'in_progress' ? 'In Progress' : 'Scheduled'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Services */}
        <div>
          <h2 className="text-sm font-bold mb-3" style={{ color: Chakra.white }}>Quick Access</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickServices.map((service, i) => (
              <button key={i} onClick={() => navigate(service.path)} className="p-3 rounded-xl flex flex-col items-center gap-2" style={{ backgroundColor: Chakra.gray700 }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: Chakra.purple500 + '30', color: Chakra.purple400 }}>
                  <service.icon size={20} />
                </div>
                <span className="text-[10px] font-medium" style={{ color: Chakra.gray400 }}>{service.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeChakra;
