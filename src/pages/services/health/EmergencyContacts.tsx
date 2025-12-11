import React from 'react';
import { ArrowLeft, Phone, Siren, Flame, Stethoscope, Shield, Car, Anchor, Zap, Droplets, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EmergencyContact {
  name: string;
  nameGr: string;
  number: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  description: string;
}

const EmergencyContacts: React.FC = () => {
  const navigate = useNavigate();

  const emergencyContacts: EmergencyContact[] = [
    {
      name: 'European Emergency',
      nameGr: 'Ευρωπαϊκός Αριθμός Έκτακτης Ανάγκης',
      number: '112',
      icon: Siren,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      description: 'All emergencies (Police, Fire, Ambulance)'
    },
    {
      name: 'Police',
      nameGr: 'Αστυνομία',
      number: '100',
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Crime, accidents, public safety'
    },
    {
      name: 'Ambulance (EKAB)',
      nameGr: 'ΕΚΑΒ',
      number: '166',
      icon: Stethoscope,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      description: 'Medical emergencies'
    },
    {
      name: 'Fire Department',
      nameGr: 'Πυροσβεστική',
      number: '199',
      icon: Flame,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      description: 'Fires, rescues, hazardous materials'
    },
    {
      name: 'Coast Guard',
      nameGr: 'Λιμενικό Σώμα',
      number: '108',
      icon: Anchor,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100',
      description: 'Maritime emergencies'
    },
    {
      name: 'Traffic Police',
      nameGr: 'Τροχαία',
      number: '10400',
      icon: Car,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      description: 'Traffic accidents, road assistance'
    },
    {
      name: 'Electricity (DEDDIE)',
      nameGr: 'ΔΕΔΔΗΕ - Βλάβες',
      number: '11500',
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      description: 'Power outages, electrical hazards'
    },
    {
      name: 'Water Supply (EYDAP)',
      nameGr: 'ΕΥΔΑΠ - Βλάβες',
      number: '1022',
      icon: Droplets,
      color: 'text-sky-600',
      bgColor: 'bg-sky-100',
      description: 'Water supply issues, leaks'
    },
    {
      name: 'Gas Emergency',
      nameGr: 'Αέριο - Έκτακτη Ανάγκη',
      number: '11711',
      icon: AlertTriangle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
      description: 'Gas leaks, smell of gas'
    },
  ];

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 px-6 pt-12 pb-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold">Emergency Contacts</h1>
            <p className="text-sm text-white/70">Τηλέφωνα Έκτακτης Ανάγκης</p>
          </div>
        </div>
        
        {/* Main Emergency Number */}
        <button 
          onClick={() => handleCall('112')}
          className="w-full mt-4 bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4 border border-white/30 active:scale-[0.98] transition-transform"
        >
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
            <Siren size={32} className="text-red-600" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-3xl font-black">112</p>
            <p className="text-sm text-white/80">European Emergency Number</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Phone size={24} />
          </div>
        </button>
      </div>

      {/* Contact List */}
      <div className="flex-1 px-4 py-6 pb-24 -mt-2">
        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
          {emergencyContacts.slice(1).map((contact, idx) => {
            const Icon = contact.icon;
            return (
              <button
                key={contact.number}
                onClick={() => handleCall(contact.number)}
                className={`w-full p-4 flex items-center gap-4 text-left active:bg-zinc-50 dark:active:bg-zinc-800 transition-colors ${
                  idx < emergencyContacts.length - 2 ? 'border-b border-zinc-100 dark:border-zinc-800' : ''
                }`}
              >
                <div className={`w-12 h-12 ${contact.bgColor} dark:bg-opacity-20 rounded-xl flex items-center justify-center`}>
                  <Icon size={24} className={contact.color} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 dark:text-white">{contact.name}</h3>
                    <span className="text-lg font-black text-accent">{contact.number}</span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{contact.nameGr}</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{contact.description}</p>
                </div>
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                  <Phone size={18} className="text-emerald-600" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm">Important</h4>
              <p className="text-xs text-amber-700 dark:text-amber-300/80 mt-1">
                Only call emergency numbers for genuine emergencies. Misuse of emergency services is a criminal offense.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;
