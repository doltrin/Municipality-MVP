import React, { useCallback } from 'react';
import { User, Settings, CreditCard, Bell, HelpCircle, LogOut, ChevronRight, ClipboardList, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  
  const handleNavigation = useCallback((path: string) => () => navigate(path), [navigate]);

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark pb-32">
      {/* Profile Header */}
      <header className="bg-gradient-to-br from-primary to-indigo-700 dark:from-primary/90 dark:to-indigo-800 px-6 pt-14 pb-8 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="flex flex-col items-center text-center relative z-10">
          <div className="w-24 h-24 rounded-full bg-white dark:bg-zinc-800 p-1 shadow-xl mb-4 ring-4 ring-white/20">
            <img 
              src="https://i.pravatar.cc/150?img=11" 
              alt="Profile photo of Alexandros Pappas" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Alexandros Pappas</h1>
          <div className="flex items-center gap-2 mt-2">
            <Shield size={14} className="text-emerald-300" />
            <p className="text-indigo-200 text-sm font-medium">Verified Citizen · ID #84920</p>
          </div>
        </div>
      </header>

      <div className="px-4 mt-6 space-y-5">
        {/* Quick Action */}
        <button
          onClick={handleNavigation('/requests')}
          className="w-full bg-gradient-to-r from-accent to-blue-600 text-white rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-accent/30 border border-white/10 active:scale-[0.98] transition-all hover:shadow-xl"
          aria-label="Start a new municipality request"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <ClipboardList size={24} />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">Municipality</p>
              <p className="text-lg font-bold leading-tight">Start New Request</p>
            </div>
          </div>
          <ChevronRight size={24} className="text-white/70" />
        </button>

        {/* Account Settings */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden">
          <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-700/50 bg-zinc-50/50 dark:bg-zinc-800/30">
            <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Account</h2>
          </div>
          <nav className="divide-y divide-zinc-100 dark:divide-zinc-700/50" aria-label="Account settings">
            <MenuItem icon={User} label="Personal Information" onClick={handleNavigation('/profile/personal')} />
            <MenuItem icon={CreditCard} label="Payment Methods" onClick={handleNavigation('/payments')} />
            <MenuItem icon={Bell} label="Notifications" onClick={handleNavigation('/notifications')} />
          </nav>
        </section>

        {/* App Settings */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden">
          <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-700/50 bg-zinc-50/50 dark:bg-zinc-800/30">
            <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">App</h2>
          </div>
          <nav className="divide-y divide-zinc-100 dark:divide-zinc-700/50" aria-label="App settings">
            <MenuItem icon={Settings} label="Settings" onClick={handleNavigation('/profile/settings')} />
            <MenuItem icon={HelpCircle} label="Help & Support" onClick={handleNavigation('/profile/help')} />
            <button 
              className="w-full p-4 flex items-center gap-4 text-red-600 dark:text-red-400 active:bg-red-50 dark:active:bg-red-900/20 transition-colors hover:bg-red-50/50 dark:hover:bg-red-900/10"
              aria-label="Log out of your account"
            >
              <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center justify-center">
                <LogOut size={20} />
              </div>
              <span className="font-bold text-sm flex-1 text-left">Log Out</span>
            </button>
          </nav>
        </section>
        
        <footer className="text-center py-6">
          <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500">Municipality App</p>
          <p className="text-[10px] text-zinc-400 dark:text-zinc-600 mt-1">Version 1.0.0 (Build 24)</p>
        </footer>
      </div>
    </div>
  );
};

const MenuItem: React.FC<{ icon: React.ElementType, label: string, onClick?: () => void }> = ({ icon: Icon, label, onClick }) => (
  <button 
    onClick={onClick} 
    className={`w-full p-4 flex items-center gap-4 active:bg-zinc-50 dark:active:bg-zinc-800 transition-colors group ${onClick ? 'cursor-pointer hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50' : ''}`}
    aria-label={label}
  >
    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center justify-center group-hover:bg-accent/10 group-hover:text-accent dark:group-hover:bg-accent/20 transition-colors">
      <Icon size={20} />
    </div>
    <span className="font-semibold text-sm text-slate-800 dark:text-white flex-1 text-left">{label}</span>
    <ChevronRight size={18} className="text-zinc-300 dark:text-zinc-600 group-hover:text-accent transition-colors" />
  </button>
);

export default Profile;
