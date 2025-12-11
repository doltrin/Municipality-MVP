import React, { useState, useCallback } from 'react';
import { ArrowLeft, Save, Camera, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PersonalData: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: 'Alexandros',
    lastName: 'Pappas',
    email: 'alex.pappas@email.com',
    phone: '+30 694 123 4567',
    address: 'Ag. Meletiou 132',
    city: 'Athens',
    postalCode: '10446'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = useCallback(() => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark pb-20">
      <header className="bg-white dark:bg-surface-dark px-6 pt-12 pb-4 sticky top-0 z-10 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)} 
              className="text-zinc-400 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Edit Profile</h1>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`font-bold text-sm flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
              saved 
                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                : 'bg-accent/10 text-accent hover:bg-accent/20'
            }`}
            aria-label="Save changes"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            ) : saved ? (
              <Check size={18} />
            ) : (
              <Save size={18} />
            )}
            {saved ? 'Saved!' : 'Save'}
          </button>
        </div>
      </header>

      <main className="p-4">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 rounded-full bg-zinc-200 dark:bg-zinc-700 relative mb-3">
            <img 
              src="https://i.pravatar.cc/150?img=11" 
              alt="Profile photo" 
              className="w-full h-full rounded-full object-cover border-4 border-white dark:border-zinc-800 shadow-lg" 
            />
            <button 
              className="absolute bottom-0 right-0 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white dark:border-zinc-800 hover:bg-accent-hover transition-colors"
              aria-label="Change profile picture"
            >
              <Camera size={18} />
            </button>
          </div>
          <button className="text-sm text-accent font-bold hover:underline">Change Profile Picture</button>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <Input label="First Name" value={formData.firstName} onChange={(v) => setFormData({...formData, firstName: v})} />
            <Input label="Last Name" value={formData.lastName} onChange={(v) => setFormData({...formData, lastName: v})} />
          </div>
          
          <Input label="Email Address" type="email" value={formData.email} onChange={(v) => setFormData({...formData, email: v})} />
          <Input label="Phone Number" type="tel" value={formData.phone} onChange={(v) => setFormData({...formData, phone: v})} />
          
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm">Address Details</h3>
            <div className="space-y-4">
              <Input label="Street Address" value={formData.address} onChange={(v) => setFormData({...formData, address: v})} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="City" value={formData.city} onChange={(v) => setFormData({...formData, city: v})} />
                <Input label="Postal Code" value={formData.postalCode} onChange={(v) => setFormData({...formData, postalCode: v})} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const Input: React.FC<{ label: string, value: string, type?: string, onChange: (val: string) => void }> = ({ label, value, type = 'text', onChange }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">{label}</label>
    <input 
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all placeholder:text-zinc-400"
    />
  </div>
);

export default PersonalData;
