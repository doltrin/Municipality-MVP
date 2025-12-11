import React, { useState } from 'react';
import { ArrowLeft, MapPin, Car, Clock, CreditCard, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SmartParking: React.FC = () => {
  const navigate = useNavigate();
  const [locating, setLocating] = useState(false);
  const selectedZone = true; // Default selected for demo

  const handleLocate = () => {
    setLocating(true);
    setTimeout(() => setLocating(false), 1500);
  };

  return (
    <div className="flex flex-col min-h-full bg-background">
      <div className="bg-background px-6 pt-12 pb-4 shadow-sm z-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="text-zinc-400 hover:text-primary transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-primary">Smart Parking</h1>
        </div>
        
        {/* Search Mock */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
          <input 
            type="text" 
            placeholder="Search location or zone..." 
            className="w-full bg-white border border-zinc-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 text-primary placeholder:text-zinc-400"
          />
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 bg-zinc-200 relative overflow-hidden min-h-[50vh]">
        {/* Detailed Athens Map Simulation */}
        <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: '#f2efe9' }}>
          {/* Base grid - city blocks */}
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
            
            {/* Diagonal avenue */}
            <line x1="0" y1="20%" x2="60%" y2="80%" stroke="#fef3c7" strokeWidth="10" />
            
            {/* Parks */}
            <rect x="10%" y="5%" width="8%" height="8%" rx="4" fill="#bbf7d0" />
            <rect x="70%" y="35%" width="12%" height="10%" rx="4" fill="#bbf7d0" />
            <rect x="25%" y="78%" width="15%" height="8%" rx="4" fill="#bbf7d0" />
            <ellipse cx="85%" cy="15%" rx="6%" ry="5%" fill="#bbf7d0" />
            
            {/* Buildings/blocks */}
            <rect x="22%" y="32%" width="11%" height="8%" rx="2" fill="#e5e7eb" />
            <rect x="55%" y="58%" width="9%" height="6%" rx="2" fill="#e5e7eb" />
            <rect x="12%" y="58%" width="6%" height="5%" rx="2" fill="#e5e7eb" />
            <rect x="72%" y="68%" width="8%" height="6%" rx="2" fill="#e5e7eb" />
            <rect x="38%" y="17%" width="10%" height="7%" rx="2" fill="#e5e7eb" />
            <rect x="5%" y="38%" width="7%" height="5%" rx="2" fill="#e5e7eb" />
            <rect x="82%" y="48%" width="10%" height="8%" rx="2" fill="#e5e7eb" />
            
            {/* Landmark - Syntagma Square */}
            <rect x="45%" y="45%" width="10%" height="10%" rx="3" fill="#fef9c3" stroke="#fbbf24" strokeWidth="1" />
            
            {/* Water feature */}
            <ellipse cx="15%" cy="85%" rx="8%" ry="4%" fill="#bfdbfe" />
          </svg>
          
          {/* Street labels */}
          <div className="absolute top-[28%] left-[25%] text-[8px] text-zinc-400 font-medium tracking-wider transform -rotate-0">ERMOU</div>
          <div className="absolute top-[53%] left-[30%] text-[9px] text-zinc-500 font-semibold tracking-wider">PANEPISTIMIOU</div>
          <div className="absolute top-[40%] left-[48%] text-[8px] text-zinc-400 font-medium transform rotate-90">STADIOU</div>
          <div className="absolute top-[48%] left-[47%] text-[7px] text-amber-600 font-bold">Syntagma</div>
        </div>
        {/* Map overlay for better visibility of markers */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20"></div>
        
        <button 
          onClick={handleLocate}
          className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full shadow-floating flex items-center justify-center text-zinc-700 z-20 active:scale-95 transition-transform"
        >
          {locating ? <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin"></div> : <Navigation size={24} className="text-accent" />}
        </button>

        {/* Parking Spots Overlay */}
        <div className="absolute top-1/4 left-1/4 bg-emerald-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg border-2 border-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform animate-bounce [animation-duration:3s]">
          Free
        </div>
        <div className="absolute top-1/3 right-1/3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg border-2 border-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform">
          Full
        </div>
        <div className="absolute bottom-1/3 left-1/2 bg-emerald-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg border-2 border-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform animate-pulse">
          12 Spots
        </div>

        {/* Current Location Pin */}
        {!locating && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-accent rounded-full border-2 border-white shadow-lg relative">
              <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-50"></div>
            </div>
          </div>
        )}

        {/* Selected Zone Card */}
        {selectedZone && (
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-[1.5rem] p-5 shadow-floating animate-in slide-in-from-bottom-10 z-30 border border-zinc-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-primary">Zone A - City Center</h3>
                <p className="text-xs text-zinc-500">Mon-Fri, 08:00 - 21:00</p>
              </div>
              <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                Available
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                <div className="flex items-center gap-2 text-zinc-400 mb-1">
                  <Car size={14} />
                  <span className="text-xs">Capacity</span>
                </div>
                <span className="font-bold text-primary">45/120</span>
              </div>
              <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                <div className="flex items-center gap-2 text-zinc-400 mb-1">
                  <CreditCard size={14} />
                  <span className="text-xs">Rate</span>
                </div>
                <span className="font-bold text-primary">€1.50/h</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/parking/session')}
              className="w-full bg-accent text-white font-bold py-3.5 rounded-xl shadow-glow active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
            >
              <Clock size={18} />
              Start Parking Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartParking;
