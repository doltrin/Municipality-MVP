import React, { useState, useCallback, useMemo } from 'react';
import { 
  Bell, Search, Wallet, Bus, Recycle, Zap, AlertTriangle, FileText, 
  Sun, ChevronRight, Calendar, CreditCard, 
  Sparkles, Clock, Shield, 
  Megaphone, TrendingUp, Star,
  CloudSun, Wind, Droplets, ThermometerSun, Moon, ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { newsData } from '../data/newsData';
import { AnimatePresence, motion } from 'framer-motion';
import { getPopularServices } from '../data/servicesData';
import { useTheme } from '../components/ThemeProvider';
import { TeamMemberModal } from '../components';
import { useAppStore } from '../stores';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const user = useAppStore((s) => s.user);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Memoized navigation handler for performance
  const handleNavigate = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  // Quick access services - 6 items for cleaner 3x2 grid
  const quickServices = useMemo(() => [
    { label: 'Certificates', icon: FileText, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/30', path: '/services/civil/birth-certificate', ariaLabel: 'Request certificates' },
    { label: 'Report Issue', icon: AlertTriangle, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/30', path: '/requests', ariaLabel: 'Report a city issue' },
    { label: 'Payments', icon: CreditCard, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/30', path: '/payments', ariaLabel: 'Make payments' },
    { label: 'Transport', icon: Bus, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/30', path: '/transport', ariaLabel: 'Public transport info' },
    { label: 'Waste', icon: Recycle, color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-900/30', path: '/waste/schedule', ariaLabel: 'Waste collection schedule' },
    { label: 'All Services', icon: Sparkles, color: 'text-accent', bg: 'bg-accent/10', path: '/services', ariaLabel: 'View all services' },
  ], []);

  // Active requests/tasks simulation
  const activeItems = [
    { id: 1, type: 'request', title: 'Street Light Repair', status: 'in_progress', date: '2 days ago', icon: Zap },
    { id: 2, type: 'appointment', title: 'Certificate Pickup', status: 'scheduled', date: 'Tomorrow, 10:00', icon: Calendar },
  ];

  // Weather data (simulated)
  const weather = {
    temp: 24,
    condition: 'Sunny',
    humidity: 45,
    wind: 12,
    uv: 'Low'
  };

  // Current date
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short' };
  const formattedDate = today.toLocaleDateString('en-GB', dateOptions);

  // Get greeting based on time
  const getGreeting = () => {
    const hour = today.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const popularServices = getPopularServices().slice(0, 3);

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark font-sans pb-32">
      {/* Sticky Header - Improved accessibility */}
      <header 
        className="px-4 pt-12 pb-3 bg-white dark:bg-surface-dark border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-30"
        role="banner"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center text-white font-bold text-base shadow-md"
              aria-hidden="true"
            >
              Δ
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Athens<span className="text-accent">.gov</span>
              </h1>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium -mt-0.5">Municipality Super App</p>
            </div>
          </div>
          <nav className="flex items-center gap-2" aria-label="Header actions">
            {/* Theme Toggle - Improved touch target */}
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white active:scale-95 transition-all"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white active:scale-95 transition-all"
              aria-label="Search"
              aria-expanded={showSearch}
            >
              <Search size={20} />
            </button>
            <button 
              onClick={() => handleNavigate('/notifications')}
              className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white active:scale-95 transition-all relative"
              aria-label="Notifications, 3 unread"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-surface-dark" aria-hidden="true" />
            </button>
          </nav>
        </div>

        {/* Search Bar - Expandable with better UX */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="relative mt-3">
                <label htmlFor="home-search" className="sr-only">Search services, news, and requests</label>
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={18} />
                <input 
                  id="home-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search services, news, requests..."
                  className="input pl-11 pr-4"
                  autoFocus
                  autoComplete="off"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="p-4 space-y-5">
        {/* Welcome Card with Weather */}
        <div className="bg-gradient-to-br from-primary to-slate-800 dark:from-accent dark:to-blue-700 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-white/70 uppercase tracking-wide">{formattedDate}</p>
                <h1 className="text-2xl font-extrabold mt-1 leading-tight">
                  {getGreeting()},<br/>{user?.name || 'Guest'}
                </h1>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <CloudSun size={28} className="text-amber-300" />
                  <span className="text-3xl font-bold">{weather.temp}°</span>
                </div>
                <p className="text-xs text-white/70 mt-1">{weather.condition} • UV {weather.uv}</p>
              </div>
            </div>

            {/* Weather Details */}
            <div className="flex gap-4 mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center gap-1.5 text-xs text-white/80">
                <Droplets size={14} />
                <span>{weather.humidity}%</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-white/80">
                <Wind size={14} />
                <span>{weather.wind} km/h</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-white/80">
                <ThermometerSun size={14} />
                <span>Feels 26°</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Row - Improved scroll UX */}
        <section aria-label="Quick statistics">
          <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 snap-x snap-mandatory pb-1">
            {/* Wallet Card */}
            <button 
              onClick={() => handleNavigate('/wallet')}
              className="min-w-[140px] flex-shrink-0 snap-start card-interactive p-4 text-left"
              aria-label="Wallet balance: 45 euros 50 cents, plus 12 euros recent"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
                  <Wallet size={20} />
                </div>
                <span className="badge-success">+€12</span>
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">€45.50</div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">Wallet Balance</div>
            </button>

            {/* Points Card */}
            <button 
              onClick={() => handleNavigate('/wallet')}
              className="min-w-[140px] flex-shrink-0 snap-start card-interactive p-4 text-left"
              aria-label="Citizen points: 1250"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="p-2.5 bg-amber-50 dark:bg-amber-900/30 rounded-xl text-amber-600 dark:text-amber-400">
                  <Star size={20} />
                </div>
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">1,250</div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">Citizen Points</div>
            </button>

            {/* Active Requests */}
            <button 
              onClick={() => handleNavigate('/requests/history')}
              className="min-w-[140px] flex-shrink-0 snap-start card-interactive p-4 text-left"
              aria-label="2 active requests"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                  <Clock size={20} />
                </div>
                <span className="badge bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400">2</span>
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">Active</div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">Requests</div>
            </button>
          </div>
        </section>

        {/* Active Tasks/Requests - Improved semantics */}
        {activeItems.length > 0 && (
          <section aria-labelledby="active-tasks-heading">
            <div className="flex justify-between items-center mb-3">
              <h2 id="active-tasks-heading" className="section-header">Active Tasks</h2>
              <button 
                onClick={() => handleNavigate('/requests/history')} 
                className="text-accent text-xs font-bold flex items-center gap-1 hover:underline"
              >
                View All <ArrowRight size={12} />
              </button>
            </div>
            <ul className="space-y-2" role="list">
              {activeItems.map((task) => (
                <li key={task.id}>
                  <button
                    onClick={() => handleNavigate(`/requests/details/${task.id}`)}
                    className="w-full card-interactive p-3.5 flex items-center gap-3"
                    aria-label={`${task.title}, ${task.status === 'in_progress' ? 'in progress' : 'scheduled'}, ${task.date}`}
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      task.status === 'in_progress' ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    }`}>
                      <task.icon size={22} />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm truncate">{task.title}</h3>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">{task.date}</p>
                    </div>
                    <span className={`badge flex-shrink-0 ${
                      task.status === 'in_progress' 
                        ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400' 
                        : 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400'
                    }`}>
                      {task.status === 'in_progress' ? 'In Progress' : 'Scheduled'}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Quick Services Grid - Improved touch targets */}
        <section aria-labelledby="quick-access-heading">
          <h2 id="quick-access-heading" className="section-header mb-3">Quick Access</h2>
          <div className="grid grid-cols-3 gap-2.5">
            {quickServices.map((service, i) => (
              <button 
                key={i}
                onClick={() => handleNavigate(service.path)}
                className="card-interactive p-3.5 flex flex-col items-center gap-2.5 group"
                aria-label={service.ariaLabel}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${service.bg} ${service.color} group-hover:scale-110 transition-transform duration-200`}>
                  <service.icon size={22} strokeWidth={1.8} />
                </div>
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 text-center leading-tight">{service.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Announcements / Alerts - Improved contrast */}
        <section aria-label="Important announcements">
          <article className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0" aria-hidden="true">
                <Megaphone size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-amber-900 dark:text-amber-200 text-sm">Water Supply Notice</h3>
                <p className="text-xs text-amber-700 dark:text-amber-300/80 mt-1 leading-relaxed">Scheduled maintenance on Dec 8th, 09:00-14:00 in Kypseli area.</p>
                <button 
                  onClick={() => handleNavigate('/announcements')}
                  className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-2.5 flex items-center gap-1 hover:underline focus:underline"
                >
                  Learn More <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </article>
        </section>

        {/* Popular Services - Improved list semantics */}
        <section aria-labelledby="popular-services-heading">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-accent" aria-hidden="true" />
              <h2 id="popular-services-heading" className="section-header">Popular Services</h2>
            </div>
            <button 
              onClick={() => handleNavigate('/services')} 
              className="text-accent text-xs font-bold flex items-center gap-1 hover:underline"
            >
              See All <ArrowRight size={12} />
            </button>
          </div>
          <ul className="space-y-2" role="list">
            {popularServices.map((service) => {
              const Icon = service.icon;
              return (
                <li key={service.id}>
                  <button
                    onClick={() => handleNavigate(service.path)}
                    className="w-full card-interactive p-3.5 flex items-center gap-3 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                      <Icon size={22} />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm truncate">{service.name}</h3>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">{service.categoryName}</p>
                    </div>
                    <ChevronRight size={20} className="text-zinc-300 dark:text-zinc-600 group-hover:text-accent transition-colors flex-shrink-0" />
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* City News Feed - Improved image handling */}
        <section aria-labelledby="news-heading">
          <div className="flex justify-between items-center mb-3">
            <h2 id="news-heading" className="section-header">Latest News</h2>
            <button 
              onClick={() => handleNavigate('/news')} 
              className="text-accent text-xs font-bold flex items-center gap-1 hover:underline"
            >
              View All <ArrowRight size={12} />
            </button>
          </div>
          <div className="card divide-y divide-zinc-100 dark:divide-zinc-700/50 overflow-hidden">
            {newsData.slice(0, 2).map((news) => (
              <article key={news.id}>
                <button 
                  onClick={() => handleNavigate(`/news/${news.id}`)}
                  className="w-full p-4 flex gap-4 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50 active:bg-zinc-100 dark:active:bg-zinc-800 transition-colors"
                >
                  <div 
                    className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-xl bg-cover bg-center flex-shrink-0" 
                    style={{backgroundImage: `url(${news.image})`}}
                    role="img"
                    aria-label={news.title}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="badge-accent">{news.category}</span>
                      <span className="text-[10px] text-zinc-400">• {news.date}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 text-balance">{news.title}</h3>
                  </div>
                  <ChevronRight size={18} className="text-zinc-300 dark:text-zinc-600 self-center flex-shrink-0" aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* Emergency Contacts - Improved prominence */}
        <section aria-label="Emergency services">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-2xl p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 bg-red-100 dark:bg-red-900/50 rounded-xl flex items-center justify-center text-red-600 dark:text-red-400 flex-shrink-0" aria-hidden="true">
                  <Shield size={22} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-red-900 dark:text-red-200 text-sm">Emergency Services</h3>
                  <p className="text-xs text-red-700 dark:text-red-300/80 truncate">Quick access to emergency contacts</p>
                </div>
              </div>
              <button 
                onClick={() => handleNavigate('/services/health/emergency')}
                className="btn-primary !bg-red-600 hover:!bg-red-700 !shadow-red-600/25 px-4 py-2.5 text-xs flex-shrink-0"
              >
                View
              </button>
            </div>
          </div>
        </section>

      </div>
      
      {/* Team Member Modal */}
      <TeamMemberModal />
    </div>
  );
};

export default Home;
