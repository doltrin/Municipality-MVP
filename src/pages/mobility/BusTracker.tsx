import React from 'react';
import { ArrowLeft, Clock, Bus, Users, Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BusTracker: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header with Map Background */}
      <div className="flex-1 relative bg-slate-200 min-h-[50vh] overflow-hidden">
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
            <line x1="0" y1="88%" x2="100%" y2="88%" stroke="#fff" strokeWidth="3" />
            <line x1="8%" y1="0" x2="8%" y2="100%" stroke="#fff" strokeWidth="3" />
            <line x1="35%" y1="0" x2="35%" y2="100%" stroke="#fff" strokeWidth="3" />
            <line x1="65%" y1="0" x2="65%" y2="100%" stroke="#fff" strokeWidth="3" />
            <line x1="92%" y1="0" x2="92%" y2="100%" stroke="#fff" strokeWidth="3" />
            
            {/* Bus route line */}
            <path d="M 10% 20% Q 30% 35% 50% 50% T 90% 80%" stroke="#3b82f6" strokeWidth="4" fill="none" strokeDasharray="8,4" />
            
            {/* Parks */}
            <rect x="10%" y="5%" width="8%" height="8%" rx="4" fill="#bbf7d0" />
            <rect x="70%" y="35%" width="12%" height="10%" rx="4" fill="#bbf7d0" />
            <rect x="25%" y="78%" width="15%" height="8%" rx="4" fill="#bbf7d0" />
            
            {/* Buildings */}
            <rect x="22%" y="32%" width="11%" height="8%" rx="2" fill="#e5e7eb" />
            <rect x="55%" y="58%" width="9%" height="6%" rx="2" fill="#e5e7eb" />
            <rect x="72%" y="68%" width="8%" height="6%" rx="2" fill="#e5e7eb" />
            <rect x="38%" y="17%" width="10%" height="7%" rx="2" fill="#e5e7eb" />
            
            {/* Syntagma Square */}
            <rect x="45%" y="45%" width="10%" height="10%" rx="3" fill="#fef9c3" stroke="#fbbf24" strokeWidth="1" />
            
            {/* Bus stops */}
            <circle cx="25%" cy="28%" r="6" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
            <circle cx="50%" cy="50%" r="6" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
            <circle cx="75%" cy="72%" r="6" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
          </svg>
          
          {/* Street labels */}
          <div className="absolute top-[28%] left-[25%] text-[8px] text-zinc-400 font-medium">ERMOU</div>
          <div className="absolute top-[53%] left-[30%] text-[9px] text-zinc-500 font-semibold">PANEPISTIMIOU</div>
          <div className="absolute top-[48%] left-[47%] text-[7px] text-amber-600 font-bold">Syntagma</div>
        </div>
          
        {/* Bus Markers */}
        <div className="absolute top-1/3 left-1/4 animate-bounce duration-[2000ms]">
           <div className="bg-blue-600 p-2 rounded-full shadow-xl border-2 border-white z-10 relative">
             <Bus size={24} className="text-white" />
           </div>
           <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-lg">
             Line 101
           </div>
        </div>

        <div className="absolute bottom-1/3 right-1/3 animate-bounce duration-[2500ms]">
           <div className="bg-blue-600 p-2 rounded-full shadow-xl border-2 border-white z-10 relative">
             <Bus size={24} className="text-white" />
           </div>
           <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-lg">
             Line 205
           </div>
        </div>

        {/* Header Controls */}
        <div className="absolute top-0 left-0 right-0 p-6 pt-12 flex justify-between items-start z-20">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-slate-700 active:scale-95 transition-transform">
            <ArrowLeft size={24} />
          </button>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('/transport/route')}
              className="bg-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 text-blue-600 font-bold text-xs active:scale-95 transition-transform"
            >
               <Map size={16} />
               Plan Trip
            </button>
            <div className="bg-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               <span className="text-xs font-bold text-slate-700">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="bg-white rounded-t-[2rem] -mt-6 relative z-10 p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>
        
        <h2 className="text-xl font-bold text-slate-800 mb-4">Nearby Stops</h2>
        
        <div className="space-y-4">
          {[
            { name: 'Central Square', line: '101', eta: '2 min', dest: 'City Hall', crowded: false },
            { name: 'Municipal Library', line: '205', eta: '8 min', dest: 'Port', crowded: true },
            { name: 'High School', line: '101', eta: '15 min', dest: 'Stadium', crowded: false },
          ].map((stop, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-100 transition-colors cursor-pointer active:scale-[0.99]">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex flex-col items-center justify-center text-blue-700 font-bold border border-blue-200">
                <span className="text-xs">BUS</span>
                <span className="text-lg leading-none">{stop.line}</span>
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-slate-800">{stop.name}</h3>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <span>To {stop.dest}</span>
                  {stop.crowded && (
                    <>
                      <span className="w-1 h-1 bg-slate-300 rounded-full mx-1"></span>
                      <span className="text-red-500 flex items-center gap-0.5">
                        <Users size={10} /> Crowded
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="block text-xl font-bold text-slate-800">{stop.eta}</span>
                <div className="flex items-center justify-end gap-1 text-green-600 text-xs font-medium">
                  <Clock size={10} />
                  <span>On time</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusTracker;

