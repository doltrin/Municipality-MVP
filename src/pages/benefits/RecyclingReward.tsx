import React, { useState } from 'react';
import { ArrowLeft, Recycle, MapPin, QrCode, Gift, TrendingUp, Leaf, ChevronRight, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecyclingReward: React.FC = () => {
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);

  const recyclingBins = [
    { location: 'Syntagma Square', distance: '0.3 km', type: 'Smart Bin', status: 'Available' },
    { location: 'Ermou Street', distance: '0.5 km', type: 'Smart Bin', status: 'Available' },
    { location: 'Monastiraki Metro', distance: '0.7 km', type: 'Smart Bin', status: 'Full' },
    { location: 'Plaka District', distance: '0.9 km', type: 'Standard', status: 'Available' },
  ];

  const recentActivity = [
    { date: 'Today, 09:30', location: 'Syntagma Square', points: '+50', type: 'Plastic' },
    { date: 'Dec 7, 14:15', location: 'Ermou Street', points: '+50', type: 'Paper' },
    { date: 'Dec 6, 11:00', location: 'Syntagma Square', points: '+50', type: 'Glass' },
    { date: 'Dec 5, 16:45', location: 'Plaka District', points: '+25', type: 'Mixed' },
  ];

  const rewards = [
    { name: 'Bus Ticket', points: 100, icon: '🚌' },
    { name: 'Coffee Voucher', points: 150, icon: '☕' },
    { name: 'Movie Ticket', points: 300, icon: '🎬' },
    { name: 'Grocery Discount', points: 500, icon: '🛒' },
  ];

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark pb-20">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 bg-gradient-to-br from-green-600 to-emerald-800 text-white">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Recycling Rewards</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Recycle size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">50 Points</h2>
            <p className="text-white/70">Per Smart Bin Visit</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 -mt-4">
        {/* Points Summary */}
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Points Earned</p>
              <p className="text-3xl font-bold text-green-600">1,250</p>
            </div>
            <button 
              onClick={() => setShowQR(true)}
              className="bg-green-600 text-white px-4 py-3 rounded-xl font-semibold flex items-center gap-2"
            >
              <QrCode size={20} />
              Scan Bin
            </button>
          </div>
          <div className="flex gap-4 text-center">
            <div className="flex-1 bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">47</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Visits</p>
            </div>
            <div className="flex-1 bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">12kg</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Recycled</p>
            </div>
            <div className="flex-1 bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3">
              <div className="flex items-center justify-center gap-1">
                <TrendingUp size={16} className="text-green-500" />
                <p className="text-lg font-bold text-green-600">+15%</p>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">This Month</p>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 mb-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-800/30 rounded-xl flex items-center justify-center">
            <Leaf size={24} className="text-green-600" />
          </div>
          <div>
            <p className="font-bold text-green-900 dark:text-green-100">Your Impact</p>
            <p className="text-sm text-green-700 dark:text-green-300">You've saved 8.5kg of CO₂ this month!</p>
          </div>
        </div>

        {/* Nearby Bins */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 dark:text-white">Nearby Smart Bins</h3>
            <button className="text-sm text-green-600 font-medium flex items-center gap-1">
              <MapPin size={14} /> Map View
            </button>
          </div>
          <div className="space-y-3">
            {recyclingBins.map((bin, idx) => (
              <div key={idx} className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${bin.status === 'Available' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                    <Recycle size={18} className={bin.status === 'Available' ? 'text-green-600' : 'text-red-500'} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{bin.location}</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{bin.distance} • {bin.type}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-lg ${bin.status === 'Available' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                  {bin.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Redeem Rewards */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 dark:text-white">Redeem Points</h3>
            <button className="text-sm text-green-600 font-medium">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {rewards.map((reward, idx) => (
              <div key={idx} className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 text-center">
                <div className="text-3xl mb-2">{reward.icon}</div>
                <p className="font-semibold text-slate-900 dark:text-white text-sm">{reward.name}</p>
                <p className="text-xs text-green-600 font-bold mt-1">{reward.points} pts</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-6">
          <h3 className="font-bold text-slate-900 dark:text-white mb-3">Recent Activity</h3>
          <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <Recycle size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white text-sm">{activity.location}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{activity.date} • {activity.type}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-green-600">{activity.points}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QR Modal */}
      {showQR && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowQR(false)}>
          <div className="bg-white dark:bg-surface-dark rounded-3xl p-8 text-center max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Scan Smart Bin</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Point your camera at the bin's QR code</p>
            <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-2xl mb-6">
              <div className="w-40 h-40 mx-auto border-4 border-dashed border-green-500 rounded-2xl flex items-center justify-center">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Camera Preview</p>
              </div>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Earn 50 points per smart bin visit</p>
            <button onClick={() => setShowQR(false)} className="mt-6 w-full py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-semibold text-slate-900 dark:text-white">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecyclingReward;
