import React, { useState } from 'react';
import { ArrowLeft, Building2, Clock, QrCode, Ticket, Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MuseumAccess: React.FC = () => {
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);

  const museums = [
    { name: 'National Archaeological Museum', discount: '50%', rating: 4.8, image: '🏛️', hours: '9:00 - 17:00' },
    { name: 'Acropolis Museum', discount: '50%', rating: 4.9, image: '🏺', hours: '8:00 - 20:00' },
    { name: 'Byzantine Museum', discount: '50%', rating: 4.6, image: '⛪', hours: '9:00 - 16:00' },
    { name: 'Museum of Cycladic Art', discount: '50%', rating: 4.7, image: '🎭', hours: '10:00 - 17:00' },
  ];

  const visitHistory = [
    { museum: 'Acropolis Museum', date: 'Dec 3, 2024', saved: '€10.00' },
    { museum: 'National Archaeological', date: 'Nov 28, 2024', saved: '€6.00' },
  ];

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark pb-20">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 bg-gradient-to-br from-purple-600 to-indigo-800 text-white">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Museum Access</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Building2 size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">50% Off</h2>
            <p className="text-white/70">All Municipal Museums</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 -mt-4">
        {/* Savings Card */}
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Saved This Year</p>
              <p className="text-3xl font-bold text-green-600">€48.00</p>
            </div>
            <button 
              onClick={() => setShowQR(true)}
              className="bg-purple-600 text-white px-4 py-3 rounded-xl font-semibold flex items-center gap-2"
            >
              <QrCode size={20} />
              Show Pass
            </button>
          </div>
          <div className="flex gap-4 text-center">
            <div className="flex-1 bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">6</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Visits</p>
            </div>
            <div className="flex-1 bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">4</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Museums</p>
            </div>
            <div className="flex-1 bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">50%</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Discount</p>
            </div>
          </div>
        </div>

        {/* Museums List */}
        <div className="mb-6">
          <h3 className="font-bold text-slate-900 dark:text-white mb-3">Participating Museums</h3>
          <div className="space-y-3">
            {museums.map((museum, idx) => (
              <div key={idx} className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-2xl">
                    {museum.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{museum.name}</h4>
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-lg">
                        {museum.discount} OFF
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Star size={12} className="text-yellow-500 fill-yellow-500" />
                        {museum.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {museum.hours}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-3 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm font-medium text-slate-900 dark:text-white flex items-center justify-center gap-1">
                  View Details <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Visit History */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 dark:text-white">Recent Visits</h3>
            <button className="text-sm text-purple-600 font-medium">View All</button>
          </div>
          <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            {visitHistory.map((visit, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <Ticket size={18} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white text-sm">{visit.museum}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{visit.date}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-green-600">Saved {visit.saved}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QR Modal */}
      {showQR && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowQR(false)}>
          <div className="bg-white dark:bg-surface-dark rounded-3xl p-8 text-center max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Museum Pass</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Show at ticket counter for 50% discount</p>
            <div className="bg-white p-6 rounded-2xl inline-block mb-6">
              <QrCode size={160} className="text-slate-900" />
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Citizen Card: ALEXANDROS PAPPAS</p>
            <button onClick={() => setShowQR(false)} className="mt-6 w-full py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-semibold text-slate-900 dark:text-white">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MuseumAccess;
