import React from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Lock, Bell, Globe, ChevronRight, ShieldCheck, LogOut, HelpCircle, Eye, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { useAppStore } from '../stores';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppStore((s) => s.user);

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-surface-dark px-6 pt-12 pb-4 sticky top-0 z-10 shadow-sm border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-slate-400 dark:text-zinc-400 hover:text-slate-600 dark:hover:text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Settings</h1>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Appearance Section */}
        <section>
          <h2 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3 ml-2">Appearance</h2>
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500 dark:text-zinc-400">
                <Palette size={20} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-800 dark:text-white text-sm">Theme</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Choose your preferred appearance</div>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </section>

        {/* Profile Section */}
        <section>
          <h2 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3 ml-2">Profile</h2>
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            <SettingsItem 
              icon={User} 
              label="Personal Information" 
              value={user?.name || '—'} 
              onClick={() => navigate('/profile/personal')} 
            />
            <SettingsItem icon={Mail} label="Email Address" value={user?.email || '—'} />
            <SettingsItem icon={Phone} label="Phone Number" value={user?.phone || '—'} />
            <SettingsItem icon={MapPin} label="Address" value="—" />
          </div>
        </section>

        {/* Security Section */}
        <section>
          <h2 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3 ml-2">Security</h2>
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            <SettingsItem icon={Lock} label="Change Password" />
            <SettingsItem icon={ShieldCheck} label="Two-Factor Authentication" value="Enabled" />
          </div>
        </section>

        {/* Preferences Section */}
        <section>
          <h2 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3 ml-2">Preferences</h2>
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            <SettingsItem icon={Bell} label="Notifications" value="Push, Email" onClick={() => navigate('/notifications')} />
            <SettingsItem icon={Globe} label="Language" value="English (EN)" />
            <SettingsItem icon={Eye} label="Accessibility" value="Default" />
          </div>
        </section>

        {/* Support Section */}
        <section>
          <h2 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3 ml-2">Support</h2>
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            <SettingsItem icon={HelpCircle} label="Help Center" />
            <SettingsItem icon={HelpCircle} label="Contact Support" />
          </div>
        </section>

        {/* Logout Button */}
        <button className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
          <LogOut size={20} />
          Log Out
        </button>
        
        <div className="text-center text-xs text-slate-400">
          App Version 1.2.0 (Build 2025.10.26)
        </div>
      </div>
    </div>
  );
};

const SettingsItem: React.FC<{ icon: React.ElementType, label: string, value?: string, onClick?: () => void }> = ({ icon: Icon, label, value, onClick }) => (
  <div 
    onClick={onClick}
    className={`p-4 flex items-center gap-4 border-b border-zinc-100 dark:border-zinc-700/50 last:border-0 ${onClick ? 'cursor-pointer active:bg-zinc-50 dark:active:bg-zinc-800' : ''}`}
  >
    <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500 dark:text-zinc-400">
      <Icon size={20} />
    </div>
    <div className="flex-1">
      <div className="font-bold text-slate-800 dark:text-white text-sm">{label}</div>
      {value && <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{value}</div>}
    </div>
    <ChevronRight size={16} className="text-zinc-300 dark:text-zinc-600" />
  </div>
);

export default Settings;
