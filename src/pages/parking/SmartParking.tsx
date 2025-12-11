import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, CreditCard, Car, Navigation, Search, Filter, Star, Zap, ChevronRight, Timer, Receipt, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ParkingZone {
  id: string;
  name: string;
  address: string;
  availableSpots: number;
  totalSpots: number;
  pricePerHour: number;
  distance: string;
  type: 'street' | 'lot' | 'garage';
  features: string[];
  coordinates: { lat: number; lng: number };
}

interface ActiveSession {
  id: string;
  zone: ParkingZone;
  startTime: Date;
  duration: number; // minutes
  licensePlate: string;
  cost: number;
}

const SmartParking: React.FC = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<'map' | 'list'>('map');
  const [selectedZone, setSelectedZone] = useState<ParkingZone | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showActiveSession, setShowActiveSession] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [licensePlate, setLicensePlate] = useState('ΑΒΓ 1234');
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showExtend, setShowExtend] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'street' | 'lot' | 'garage'>('all');

  const parkingZones: ParkingZone[] = [
    {
      id: '1',
      name: 'Πλατεία Ναυαρίνου',
      address: 'Ναυαρίνου & Αριστομένους',
      availableSpots: 12,
      totalSpots: 45,
      pricePerHour: 1.50,
      distance: '150m',
      type: 'street',
      features: ['EV Charging', 'Disabled Access'],
      coordinates: { lat: 37.0389, lng: 22.1128 }
    },
    {
      id: '2',
      name: 'Δημοτικό Πάρκινγκ Κέντρου',
      address: 'Φαρών 25',
      availableSpots: 34,
      totalSpots: 120,
      pricePerHour: 1.00,
      distance: '300m',
      type: 'garage',
      features: ['24/7', 'Security', 'EV Charging'],
      coordinates: { lat: 37.0392, lng: 22.1145 }
    },
    {
      id: '3',
      name: 'Παραλία Καλαμάτας',
      address: 'Ναυαρίνου (Παραλιακή)',
      availableSpots: 5,
      totalSpots: 80,
      pricePerHour: 2.00,
      distance: '450m',
      type: 'lot',
      features: ['Beach Access', 'Disabled Access'],
      coordinates: { lat: 37.0356, lng: 22.1098 }
    },
    {
      id: '4',
      name: 'Δημαρχείο',
      address: 'Αριστομένους 28',
      availableSpots: 0,
      totalSpots: 25,
      pricePerHour: 1.50,
      distance: '200m',
      type: 'street',
      features: ['Disabled Access'],
      coordinates: { lat: 37.0401, lng: 22.1132 }
    },
    {
      id: '5',
      name: 'Κεντρική Αγορά',
      address: 'Σιδηροδρομικού Σταθμού',
      availableSpots: 28,
      totalSpots: 60,
      pricePerHour: 0.80,
      distance: '600m',
      type: 'lot',
      features: ['Free first 30min'],
      coordinates: { lat: 37.0425, lng: 22.1156 }
    }
  ];

  const filteredZones = parkingZones.filter(zone => 
    filterType === 'all' || zone.type === filterType
  );

  const getAvailabilityColor = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio > 0.3) return 'text-green-600 bg-green-100 dark:bg-green-900/30';
    if (ratio > 0.1) return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30';
    return 'text-red-600 bg-red-100 dark:bg-red-900/30';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'garage': return '🏢';
      case 'lot': return '🅿️';
      default: return '🛣️';
    }
  };

  const handleStartParking = () => {
    if (!selectedZone) return;
    
    const session: ActiveSession = {
      id: `PS-${Date.now()}`,
      zone: selectedZone,
      startTime: new Date(),
      duration: selectedDuration,
      licensePlate,
      cost: (selectedDuration / 60) * selectedZone.pricePerHour
    };
    
    setActiveSession(session);
    setShowPayment(false);
    setSelectedZone(null);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      setShowActiveSession(true);
    }, 2000);
  };

  const handleExtendSession = (extraMinutes: number) => {
    if (!activeSession) return;
    
    setActiveSession({
      ...activeSession,
      duration: activeSession.duration + extraMinutes,
      cost: activeSession.cost + (extraMinutes / 60) * activeSession.zone.pricePerHour
    });
    setShowExtend(false);
  };

  const handleEndSession = () => {
    setActiveSession(null);
    setShowActiveSession(false);
  };

  // Simulated time remaining
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  
  useEffect(() => {
    if (activeSession) {
      const interval = setInterval(() => {
        const elapsed = (Date.now() - activeSession.startTime.getTime()) / 1000 / 60;
        const remaining = activeSession.duration - elapsed;
        setTimeRemaining(Math.max(0, remaining));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activeSession]);

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark relative">
      {/* Header */}
      <div className="bg-white dark:bg-surface-dark px-4 pt-12 pb-4 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-zinc-500 dark:text-zinc-400">
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Smart Parking</h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Find & pay for parking</p>
            </div>
          </div>
          {activeSession && (
            <button 
              onClick={() => setShowActiveSession(true)}
              className="bg-accent text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse"
            >
              <Timer size={14} />
              Active
            </button>
          )}
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text"
              placeholder="Search location..."
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-sm border-0 focus:ring-2 focus:ring-accent"
            />
          </div>
          <button className="p-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
            <Filter size={20} className="text-zinc-500" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar">
          {[
            { key: 'all', label: 'All' },
            { key: 'street', label: '🛣️ Street' },
            { key: 'lot', label: '🅿️ Lot' },
            { key: 'garage', label: '🏢 Garage' }
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilterType(f.key as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                filterType === f.key 
                  ? 'bg-accent text-white' 
                  : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map View */}
      <div className="flex-1 relative">
        {/* SVG Map */}
        <svg viewBox="0 0 400 500" className="w-full h-full" style={{ minHeight: '400px' }}>
          {/* Background */}
          <rect width="400" height="500" fill="#e8f4e8" className="dark:fill-zinc-900" />
          
          {/* Water/Sea */}
          <path d="M0 350 Q100 320 200 340 Q300 360 400 330 L400 500 L0 500 Z" fill="#a8d4e6" className="dark:fill-blue-900/30" />
          
          {/* Main Roads */}
          <g stroke="#ffffff" strokeWidth="8" fill="none" className="dark:stroke-zinc-700">
            <path d="M0 200 L400 200" />
            <path d="M200 0 L200 350" />
            <path d="M50 100 L350 100" />
            <path d="M100 0 L100 300" />
            <path d="M300 50 L300 280" />
          </g>
          
          {/* Road outlines */}
          <g stroke="#d1d5db" strokeWidth="1" fill="none" className="dark:stroke-zinc-600">
            <path d="M0 196 L400 196" />
            <path d="M0 204 L400 204" />
            <path d="M196 0 L196 350" />
            <path d="M204 0 L204 350" />
          </g>
          
          {/* Buildings */}
          <g fill="#d1d5db" className="dark:fill-zinc-700">
            <rect x="20" y="120" width="60" height="60" rx="4" />
            <rect x="120" y="30" width="50" height="50" rx="4" />
            <rect x="230" y="120" width="50" height="60" rx="4" />
            <rect x="320" y="30" width="60" height="50" rx="4" />
            <rect x="20" y="220" width="70" height="50" rx="4" />
            <rect x="230" y="220" width="60" height="70" rx="4" />
            <rect x="320" y="150" width="60" height="40" rx="4" />
          </g>
          
          {/* Parking Zone Markers */}
          {filteredZones.map((zone, idx) => {
            const positions = [
              { x: 180, y: 180 },
              { x: 280, y: 100 },
              { x: 150, y: 300 },
              { x: 80, y: 180 },
              { x: 320, y: 220 }
            ];
            const pos = positions[idx] || { x: 200, y: 200 };
            const isSelected = selectedZone?.id === zone.id;
            const hasSpots = zone.availableSpots > 0;
            
            return (
              <g 
                key={zone.id} 
                onClick={() => setSelectedZone(zone)}
                style={{ cursor: 'pointer' }}
              >
                {/* Pulse animation for available spots */}
                {hasSpots && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isSelected ? 28 : 22}
                    fill={hasSpots ? '#22c55e' : '#ef4444'}
                    opacity={0.2}
                  >
                    <animate attributeName="r" values={isSelected ? "28;35;28" : "22;28;22"} dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.2;0.1;0.2" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                
                {/* Main marker */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isSelected ? 24 : 18}
                  fill={hasSpots ? '#22c55e' : '#ef4444'}
                  stroke="white"
                  strokeWidth="3"
                  className="transition-all duration-200"
                />
                
                {/* Spot count */}
                <text
                  x={pos.x}
                  y={pos.y + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize={isSelected ? "14" : "11"}
                  fontWeight="bold"
                >
                  {zone.availableSpots}
                </text>
              </g>
            );
          })}
          
          {/* Current Location */}
          <g>
            <circle cx="200" cy="200" r="8" fill="#0ea5e9" stroke="white" strokeWidth="3" />
            <circle cx="200" cy="200" r="20" fill="#0ea5e9" opacity="0.2">
              <animate attributeName="r" values="20;30;20" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0.1;0.2" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
          
          {/* Legend */}
          <g transform="translate(10, 460)">
            <rect width="120" height="30" rx="6" fill="white" fillOpacity="0.9" className="dark:fill-zinc-800" />
            <circle cx="20" cy="15" r="6" fill="#22c55e" />
            <text x="32" y="19" fontSize="10" fill="#374151" className="dark:fill-zinc-300">Available</text>
            <circle cx="85" cy="15" r="6" fill="#ef4444" />
            <text x="97" y="19" fontSize="10" fill="#374151" className="dark:fill-zinc-300">Full</text>
          </g>
        </svg>

        {/* Zone List Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-surface-dark rounded-t-3xl shadow-2xl max-h-[40%] overflow-y-auto">
          <div className="p-4">
            <div className="w-12 h-1 bg-zinc-300 dark:bg-zinc-600 rounded-full mx-auto mb-4" />
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">Nearby Parking ({filteredZones.length})</h3>
            
            <div className="space-y-2">
              {filteredZones.map(zone => (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className={`w-full p-3 rounded-xl border transition-all text-left ${
                    selectedZone?.id === zone.id 
                      ? 'border-accent bg-accent/5' 
                      : 'border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span>{getTypeIcon(zone.type)}</span>
                        <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{zone.name}</h4>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{zone.address}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-zinc-500 flex items-center gap-1">
                          <Navigation size={12} />
                          {zone.distance}
                        </span>
                        <span className="text-xs font-semibold text-accent">
                          €{zone.pricePerHour.toFixed(2)}/hr
                        </span>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-lg text-xs font-bold ${getAvailabilityColor(zone.availableSpots, zone.totalSpots)}`}>
                      {zone.availableSpots}/{zone.totalSpots}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Zone Detail Modal */}
      <AnimatePresence>
        {selectedZone && !showPayment && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="absolute bottom-0 left-0 right-0 bg-white dark:bg-surface-dark rounded-t-3xl shadow-2xl z-30"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-2xl">
                    {getTypeIcon(selectedZone.type)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{selectedZone.name}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{selectedZone.address}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedZone(null)} className="p-2 text-zinc-400">
                  <X size={20} />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-green-600">{selectedZone.availableSpots}</p>
                  <p className="text-[10px] text-zinc-500">Available</p>
                </div>
                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-accent">€{selectedZone.pricePerHour.toFixed(2)}</p>
                  <p className="text-[10px] text-zinc-500">Per Hour</p>
                </div>
                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedZone.distance}</p>
                  <p className="text-[10px] text-zinc-500">Distance</p>
                </div>
              </div>

              {/* Features */}
              {selectedZone.features.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedZone.features.map((feature, idx) => (
                    <span key={idx} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-semibold text-slate-900 dark:text-white flex items-center justify-center gap-2">
                  <Navigation size={18} />
                  Navigate
                </button>
                <button 
                  onClick={() => setShowPayment(true)}
                  disabled={selectedZone.availableSpots === 0}
                  className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                    selectedZone.availableSpots > 0 
                      ? 'bg-accent text-white' 
                      : 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
                  }`}
                >
                  <Car size={18} />
                  {selectedZone.availableSpots > 0 ? 'Park Here' : 'Full'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayment && selectedZone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-end"
            onClick={() => setShowPayment(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onClick={e => e.stopPropagation()}
              className="w-full bg-white dark:bg-surface-dark rounded-t-3xl p-4"
            >
              <div className="w-12 h-1 bg-zinc-300 dark:bg-zinc-600 rounded-full mx-auto mb-4" />
              
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Start Parking Session</h3>
              
              {/* Zone Info */}
              <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{getTypeIcon(selectedZone.type)}</div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{selectedZone.name}</p>
                    <p className="text-xs text-zinc-500">{selectedZone.address}</p>
                  </div>
                </div>
              </div>

              {/* License Plate */}
              <div className="mb-4">
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1 block">License Plate</label>
                <input
                  type="text"
                  value={licensePlate}
                  onChange={e => setLicensePlate(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-center text-lg font-bold tracking-wider border-0"
                  placeholder="ΑΒΓ 1234"
                />
              </div>

              {/* Duration Selection */}
              <div className="mb-4">
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 block">Duration</label>
                <div className="grid grid-cols-4 gap-2">
                  {[30, 60, 120, 180].map(mins => (
                    <button
                      key={mins}
                      onClick={() => setSelectedDuration(mins)}
                      className={`py-3 rounded-xl text-sm font-semibold transition-colors ${
                        selectedDuration === mins 
                          ? 'bg-accent text-white' 
                          : 'bg-zinc-100 dark:bg-zinc-800 text-slate-900 dark:text-white'
                      }`}
                    >
                      {mins < 60 ? `${mins}m` : `${mins / 60}h`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cost Summary */}
              <div className="bg-accent/10 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-600 dark:text-zinc-400">Total Cost</span>
                  <span className="text-2xl font-bold text-accent">
                    €{((selectedDuration / 60) * selectedZone.pricePerHour).toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-1">
                  {selectedDuration} minutes @ €{selectedZone.pricePerHour.toFixed(2)}/hour
                </p>
              </div>

              {/* Payment Method */}
              <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white dark:bg-zinc-700 rounded-lg flex items-center justify-center">
                    <CreditCard size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">•••• 4242</p>
                    <p className="text-xs text-zinc-500">Visa</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-zinc-400" />
              </div>

              {/* Pay Button */}
              <button 
                onClick={handleStartParking}
                className="w-full py-4 bg-accent text-white font-bold rounded-xl flex items-center justify-center gap-2"
              >
                <CreditCard size={20} />
                Pay & Start Parking
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-20 left-4 right-4 bg-green-500 text-white p-4 rounded-xl shadow-lg z-50 flex items-center gap-3"
          >
            <CheckCircle2 size={24} />
            <div>
              <p className="font-bold">Parking Started!</p>
              <p className="text-sm opacity-90">Session active for {selectedDuration} minutes</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Session Modal */}
      <AnimatePresence>
        {showActiveSession && activeSession && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            onClick={() => setShowActiveSession(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-sm bg-white dark:bg-surface-dark rounded-3xl p-6"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Car size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Active Session</h3>
                <p className="text-sm text-zinc-500">{activeSession.zone.name}</p>
              </div>

              {/* Timer */}
              <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-6 text-center mb-4">
                <p className="text-xs text-zinc-500 mb-1">Time Remaining</p>
                <p className="text-4xl font-bold text-slate-900 dark:text-white font-mono">
                  {timeRemaining !== null ? (
                    `${Math.floor(timeRemaining / 60)}:${String(Math.floor(timeRemaining % 60)).padStart(2, '0')}`
                  ) : '--:--'}
                </p>
                {timeRemaining !== null && timeRemaining < 10 && (
                  <p className="text-xs text-red-500 mt-2 flex items-center justify-center gap-1">
                    <AlertCircle size={12} />
                    Session ending soon!
                  </p>
                )}
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">License Plate</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{activeSession.licensePlate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Started</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {activeSession.startTime.toLocaleTimeString('el-GR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Total Paid</span>
                  <span className="font-semibold text-accent">€{activeSession.cost.toFixed(2)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button 
                  onClick={() => setShowExtend(true)}
                  className="w-full py-3 bg-accent text-white font-semibold rounded-xl flex items-center justify-center gap-2"
                >
                  <Clock size={18} />
                  Extend Time
                </button>
                <button 
                  onClick={handleEndSession}
                  className="w-full py-3 bg-zinc-100 dark:bg-zinc-800 text-slate-900 dark:text-white font-semibold rounded-xl"
                >
                  End Session
                </button>
                <button 
                  onClick={() => setShowActiveSession(false)}
                  className="w-full py-3 text-zinc-500 font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Extend Time Modal */}
      <AnimatePresence>
        {showExtend && activeSession && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end"
            onClick={() => setShowExtend(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onClick={e => e.stopPropagation()}
              className="w-full bg-white dark:bg-surface-dark rounded-t-3xl p-4"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Extend Parking</h3>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[30, 60, 120].map(mins => (
                  <button
                    key={mins}
                    onClick={() => handleExtendSession(mins)}
                    className="py-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl"
                  >
                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                      +{mins < 60 ? `${mins}m` : `${mins / 60}h`}
                    </p>
                    <p className="text-xs text-accent font-semibold">
                      €{((mins / 60) * activeSession.zone.pricePerHour).toFixed(2)}
                    </p>
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => setShowExtend(false)}
                className="w-full py-3 text-zinc-500 font-medium"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartParking;
