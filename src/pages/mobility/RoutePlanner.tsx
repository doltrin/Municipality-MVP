import React, { useState } from 'react';
import { ArrowLeft, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RoutePlanner: React.FC = () => {
  const navigate = useNavigate();
  const [route, setRoute] = useState<any>(null);

  const handlePlan = () => {
    setRoute({
      duration: '25 min',
      cost: '€1.20',
      steps: [
        { type: 'walk', desc: 'Walk to Stop A (5 min)' },
        { type: 'bus', desc: 'Bus 101 to Center (15 min)' },
        { type: 'walk', desc: 'Walk to Destination (5 min)' }
      ]
    });
  };

  const handleStart = () => {
    // Simulate starting navigation
    navigate('/transport', { state: { navigationActive: true } });
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50 pb-20">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-slate-600">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-slate-800">Plan Trip</h1>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <input type="text" placeholder="Current Location" className="bg-transparent w-full text-sm font-bold text-slate-800 focus:outline-none" defaultValue="Current Location" />
          </div>
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <input type="text" placeholder="Where to?" className="bg-transparent w-full text-sm font-bold text-slate-800 focus:outline-none" />
          </div>
          <button 
            onClick={handlePlan}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-600/30 active:scale-95 transition-transform"
          >
            Show Routes
          </button>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative min-h-[250px]">
        {/* Detailed Athens Map */}
        <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: '#f2efe9' }}>
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Main roads */}
            <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#fff" strokeWidth="8" />
            <line x1="0" y1="55%" x2="100%" y2="55%" stroke="#fff" strokeWidth="12" />
            <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#fff" strokeWidth="6" />
            <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#fff" strokeWidth="6" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#fff" strokeWidth="10" />
            <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#fff" strokeWidth="6" />
            
            {/* Secondary streets */}
            <line x1="0" y1="15%" x2="100%" y2="15%" stroke="#fff" strokeWidth="3" />
            <line x1="0" y1="42%" x2="100%" y2="42%" stroke="#fff" strokeWidth="3" />
            <line x1="0" y1="65%" x2="100%" y2="65%" stroke="#fff" strokeWidth="3" />
            <line x1="8%" y1="0" x2="8%" y2="100%" stroke="#fff" strokeWidth="3" />
            <line x1="35%" y1="0" x2="35%" y2="100%" stroke="#fff" strokeWidth="3" />
            <line x1="65%" y1="0" x2="65%" y2="100%" stroke="#fff" strokeWidth="3" />
            
            {/* Parks */}
            <rect x="10%" y="5%" width="8%" height="12%" rx="4" fill="#bbf7d0" />
            <rect x="70%" y="35%" width="12%" height="15%" rx="4" fill="#bbf7d0" />
            
            {/* Buildings */}
            <rect x="22%" y="32%" width="11%" height="8%" rx="2" fill="#e5e7eb" />
            <rect x="55%" y="58%" width="9%" height="8%" rx="2" fill="#e5e7eb" />
            <rect x="38%" y="17%" width="10%" height="10%" rx="2" fill="#e5e7eb" />
            
            {/* Syntagma Square */}
            <rect x="45%" y="45%" width="10%" height="10%" rx="3" fill="#fef9c3" stroke="#fbbf24" strokeWidth="1" />
            
            {/* Route line when active */}
            {route && (
              <>
                <path d="M 20% 70% L 35% 55% L 50% 50% L 75% 35%" stroke="#3b82f6" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="20%" cy="70%" r="8" fill="#3b82f6" stroke="#fff" strokeWidth="3" />
                <circle cx="75%" cy="35%" r="8" fill="#ef4444" stroke="#fff" strokeWidth="3" />
              </>
            )}
          </svg>
          
          {/* Street labels */}
          <div className="absolute top-[28%] left-[25%] text-[8px] text-zinc-400 font-medium">ERMOU</div>
          <div className="absolute top-[53%] left-[30%] text-[9px] text-zinc-500 font-semibold">PANEPISTIMIOU</div>
          <div className="absolute top-[48%] left-[47%] text-[7px] text-amber-600 font-bold">Syntagma</div>
        </div>
      </div>

      <div className="p-6 bg-white -mt-4 rounded-t-3xl relative z-10 shadow-lg">
        {route ? (
          <div className="animate-in slide-in-from-bottom-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-800">Recommended Route</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <ClockIcon />
                  <span>{route.duration}</span>
                  <span>•</span>
                  <Coins size={14} />
                  <span>{route.cost}</span>
                </div>
              </div>
              <button 
                onClick={handleStart}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors active:scale-95"
              >
                Start Navigation
              </button>
            </div>

            <div className="space-y-4 relative">
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-200"></div>
              {route.steps.map((step: any, idx: number) => (
                <div key={idx} className="flex items-center gap-4 relative z-10">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    idx === 0 ? 'bg-blue-500 text-white' : idx === route.steps.length - 1 ? 'bg-red-500 text-white' : 'bg-white border-2 border-slate-300 text-slate-600'
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="text-sm font-medium text-slate-700">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-400">
            <p className="text-sm">Enter destination and tap "Show Routes"</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default RoutePlanner;
