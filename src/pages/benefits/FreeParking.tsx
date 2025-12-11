import React, { useState } from 'react';
import { ArrowLeft, Car, MapPin, Clock, QrCode, Info, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FreeParking: React.FC = () => {
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);

  const parkingZones = [
    { zone: 'Zone A', location: 'City Center', hours: '2 hours free', status: 'active' },
    { zone: 'Zone B', location: 'Commercial District', hours: '1 hour free', status: 'active' },
    { zone: 'Zone C', location: 'Residential Areas', hours: 'Unlimited', status: 'active' },
  ];

  const recentSessions = [
    { date: 'Today, 10:30', location: 'Syntagma Square', duration: '1h 45m', zone: 'A' },
    { date: 'Dec 7, 14:20', location: 'Ermou Street', duration: '2h 00m', zone: 'A' },
    { date: 'Dec 5, 09:15', location: 'Monastiraki', duration: '1h 30m', zone: 'B' },
  ];

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark pb-20">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Free Parking</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Car size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">2 Hours Daily</h2>
            <p className="text-white/70">Zone A - City Center</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 -mt-4">
        {/* Quick Actions */}
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex gap-3">
            <button 
              onClick={() => setShowQR(true)}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <QrCode size={20} />
              Show QR Code
            </button>
            <button 
              onClick={() => navigate('/parking')}
              className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-slate-900 dark:text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <MapPin size={20} />
              Find Parking
            </button>
          </div>
        </div>

        {/* Today's Usage */}
        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4 mb-6">
          <h3 className="font-bold text-slate-900 dark:text-white mb-3">Today's Usage</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <Clock size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">1h 45m</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Used today</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">15m</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Remaining</p>
            </div>
          </div>
          <div className="mt-3 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: '87.5%' }}></div>
          </div>
        </div>

        {/* Parking Zones */}
        <div className="mb-6">
          <h3 className="font-bold text-slate-900 dark:text-white mb-3">Available Zones</h3>
          <div className="space-y-3">
            {parkingZones.map((zone, idx) => (
              <div key={idx} className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-blue-600">{zone.zone.split(' ')[1]}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">{zone.zone}</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{zone.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-green-600">{zone.hours}</span>
                  <CheckCircle2 size={16} className="text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 dark:text-white">Recent Sessions</h3>
            <button className="text-sm text-blue-600 font-medium">View All</button>
          </div>
          <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            {recentSessions.map((session, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">{session.zone}</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white text-sm">{session.location}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{session.date}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{session.duration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 flex items-start gap-3">
          <Info size={20} className="text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-900 dark:text-blue-100">
              Your free parking benefit resets daily at midnight. Unused time does not carry over.
            </p>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      {showQR && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowQR(false)}>
          <div className="bg-white dark:bg-surface-dark rounded-3xl p-6 text-center max-w-[85%] w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Parking QR Code</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Scan at parking meter or show to attendant</p>
            <div className="bg-white p-6 rounded-2xl inline-block mb-6">
              <QrCode size={160} className="text-slate-900" />
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Valid for Zone A • Expires in 15 minutes</p>
            <button onClick={() => setShowQR(false)} className="mt-6 w-full py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-semibold text-slate-900 dark:text-white">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreeParking;
