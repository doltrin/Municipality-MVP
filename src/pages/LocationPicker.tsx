import React, { useState } from 'react';
import { ArrowLeft, MapPin, Navigation, Check } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const LocationPicker: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnPath = searchParams.get('returnTo') || '/requests';
  
  const [locating, setLocating] = useState(false);
  const [selected, setSelected] = useState(false);
  const [address, setAddress] = useState('Ag. Meletiou 132');

  // Simulated map drag
  const handleMapClick = () => {
    setSelected(true);
  };

  const handleLocateMe = () => {
    setLocating(true);
    setTimeout(() => {
      setLocating(false);
      setSelected(true);
      setAddress('Current Location (GPS)');
    }, 1500);
  };

  const handleConfirm = () => {
    // Pass location back via state
    navigate(returnPath, { state: { location: address } });
  };

  return (
    <div className="flex flex-col h-screen bg-slate-100 relative overflow-hidden">
      {/* Map Background - Detailed Athens SVG Map */}
      <div 
        className="absolute inset-0 cursor-move"
        onClick={handleMapClick}
      >
        <svg viewBox="0 0 400 800" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {/* Background */}
          <rect width="400" height="800" fill="#f0f4f0"/>
          
          {/* City blocks */}
          <g fill="#e8e8e8" stroke="#d0d0d0" strokeWidth="0.5">
            <rect x="20" y="50" width="80" height="60" rx="2"/>
            <rect x="120" y="50" width="100" height="60" rx="2"/>
            <rect x="240" y="50" width="70" height="60" rx="2"/>
            <rect x="330" y="50" width="60" height="60" rx="2"/>
            
            <rect x="20" y="140" width="60" height="80" rx="2"/>
            <rect x="100" y="140" width="90" height="80" rx="2"/>
            <rect x="210" y="140" width="80" height="80" rx="2"/>
            <rect x="310" y="140" width="80" height="80" rx="2"/>
            
            <rect x="20" y="260" width="100" height="70" rx="2"/>
            <rect x="140" y="260" width="70" height="70" rx="2"/>
            <rect x="230" y="260" width="90" height="70" rx="2"/>
            <rect x="340" y="260" width="50" height="70" rx="2"/>
            
            <rect x="20" y="370" width="70" height="90" rx="2"/>
            <rect x="110" y="370" width="100" height="90" rx="2"/>
            <rect x="230" y="370" width="80" height="90" rx="2"/>
            <rect x="330" y="370" width="60" height="90" rx="2"/>
            
            <rect x="20" y="500" width="90" height="60" rx="2"/>
            <rect x="130" y="500" width="80" height="60" rx="2"/>
            <rect x="230" y="500" width="100" height="60" rx="2"/>
            <rect x="350" y="500" width="40" height="60" rx="2"/>
            
            <rect x="20" y="600" width="110" height="80" rx="2"/>
            <rect x="150" y="600" width="90" height="80" rx="2"/>
            <rect x="260" y="600" width="70" height="80" rx="2"/>
            <rect x="350" y="600" width="40" height="80" rx="2"/>
            
            <rect x="20" y="720" width="80" height="60" rx="2"/>
            <rect x="120" y="720" width="100" height="60" rx="2"/>
            <rect x="240" y="720" width="90" height="60" rx="2"/>
          </g>
          
          {/* Parks */}
          <g fill="#c8e6c9">
            <ellipse cx="170" cy="180" rx="25" ry="20"/>
            <ellipse cx="280" cy="420" rx="30" ry="25"/>
            <rect x="50" y="530" width="40" height="30" rx="8"/>
          </g>
          
          {/* Main roads */}
          <g stroke="#ffffff" strokeWidth="8" fill="none">
            <line x1="0" y1="130" x2="400" y2="130"/>
            <line x1="0" y1="350" x2="400" y2="350"/>
            <line x1="0" y1="580" x2="400" y2="580"/>
            <line x1="200" y1="0" x2="200" y2="800"/>
          </g>
          
          {/* Secondary roads */}
          <g stroke="#ffffff" strokeWidth="4" fill="none">
            <line x1="0" y1="240" x2="400" y2="240"/>
            <line x1="0" y1="480" x2="400" y2="480"/>
            <line x1="0" y1="700" x2="400" y2="700"/>
            <line x1="100" y1="0" x2="100" y2="800"/>
            <line x1="320" y1="0" x2="320" y2="800"/>
          </g>
          
          {/* Street labels */}
          <g fill="#888" fontSize="8" fontFamily="system-ui">
            <text x="50" y="127" textAnchor="middle">ΠΑΤΗΣΙΩΝ</text>
            <text x="300" y="347" textAnchor="middle">ΑΛΕΞΑΝΔΡΑΣ</text>
            <text x="150" y="577" textAnchor="middle">ΚΗΦΙΣΙΑΣ</text>
            <text x="203" y="200" textAnchor="start" transform="rotate(90, 203, 200)">ΒΑΣΙΛΙΣΣΗΣ ΣΟΦΙΑΣ</text>
          </g>
          
          {/* Buildings of interest */}
          <g>
            <rect x="155" y="290" width="30" height="25" fill="#bbdefb" stroke="#64b5f6" strokeWidth="1" rx="2"/>
            <rect x="270" y="520" width="35" height="30" fill="#ffe0b2" stroke="#ffb74d" strokeWidth="1" rx="2"/>
            <rect x="60" y="380" width="25" height="20" fill="#e1bee7" stroke="#ba68c8" strokeWidth="1" rx="2"/>
          </g>
          
          {/* Metro stations */}
          <g>
            <circle cx="200" cy="350" r="6" fill="#1565c0"/>
            <text x="200" y="340" fill="#1565c0" fontSize="6" textAnchor="middle" fontWeight="bold">M</text>
            <circle cx="100" cy="130" r="6" fill="#1565c0"/>
            <text x="100" y="120" fill="#1565c0" fontSize="6" textAnchor="middle" fontWeight="bold">M</text>
          </g>
        </svg>
      </div>
      
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 pt-12 z-10 pointer-events-none">
        <button onClick={() => navigate(-1)} className="bg-white rounded-full p-3 shadow-lg pointer-events-auto active:scale-95 transition-transform">
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Center Pin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 flex flex-col items-center -mt-8 pointer-events-none">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-lg mb-2 shadow-lg whitespace-nowrap"
        >
          {selected ? address : 'Move map to adjust'}
        </motion.div>
        <MapPin size={48} className="text-red-500 drop-shadow-xl filter" fill="#ef4444" />
        <div className="w-2 h-2 bg-black/20 rounded-full blur-sm mt-1"></div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white rounded-t-[2rem] shadow-2xl z-20">
        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>
        
        <h2 className="text-xl font-bold text-slate-800 mb-2">Set Location</h2>
        <p className="text-slate-500 text-sm mb-6">Drag the map to pinpoint the exact location of the issue.</p>

        <div className="space-y-3">
           {!selected && (
             <button 
              onClick={handleLocateMe}
              className="w-full py-3 rounded-xl border border-slate-200 flex items-center justify-center gap-2 font-bold text-slate-700 hover:bg-slate-50 transition-colors active:scale-[0.98]"
             >
               {locating ? (
                 <span className="animate-pulse">Locating...</span>
               ) : (
                 <>
                   <Navigation size={18} />
                   Use Current Location
                 </>
               )}
             </button>
           )}

           <button 
             onClick={handleConfirm}
             disabled={!selected && !locating} 
             className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98] ${selected ? 'bg-slate-900 shadow-slate-900/30' : 'bg-slate-300 cursor-not-allowed'}`}
           >
             {selected ? (
               <>
                 <Check size={20} />
                 Confirm Location
               </>
             ) : (
               'Set Location'
             )}
           </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
