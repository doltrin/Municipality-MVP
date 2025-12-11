import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Navigation, Star, Bell, ChevronRight, RefreshCw, Route } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface BusRoute {
  id: string;
  number: string;
  name: string;
  color: string;
  startPoint: string;
  endPoint: string;
  frequency: string;
  operatingHours: string;
}

interface BusStop {
  id: string;
  name: string;
  routes: string[];
  distance: string;
  arrivals: BusArrival[];
  isFavorite?: boolean;
}

interface BusArrival {
  routeId: string;
  routeNumber: string;
  destination: string;
  arrivalMinutes: number;
  isLive: boolean;
  occupancy: 'low' | 'medium' | 'high';
  busId: string;
}

const BusTracker: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'nearby' | 'routes' | 'favorites'>('nearby');
  const [selectedStop, setSelectedStop] = useState<BusStop | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNotificationSet, setShowNotificationSet] = useState(false);

  const routes: BusRoute[] = [
    { id: '1', number: '1', name: 'Κέντρο - Βέργα', color: '#ef4444', startPoint: 'Πλ. 23ης Μαρτίου', endPoint: 'Βέργα', frequency: '20 λεπτά', operatingHours: '06:00 - 22:30' },
    { id: '2', number: '2', name: 'Κέντρο - Μεσσήνη', color: '#3b82f6', startPoint: 'Πλ. 23ης Μαρτίου', endPoint: 'Μεσσήνη', frequency: '30 λεπτά', operatingHours: '06:30 - 21:00' },
    { id: '3', number: '3', name: 'Κέντρο - Αρφαρά', color: '#22c55e', startPoint: 'Πλ. 23ης Μαρτίου', endPoint: 'Αρφαρά', frequency: '45 λεπτά', operatingHours: '07:00 - 20:00' },
    { id: '4', number: '4', name: 'Παραλία - Νοσοκομείο', color: '#f59e0b', startPoint: 'Παραλία', endPoint: 'Νοσοκομείο', frequency: '15 λεπτά', operatingHours: '06:00 - 23:00' },
    { id: '5', number: '5', name: 'ΚΤΕΛ - Πανεπιστήμιο', color: '#8b5cf6', startPoint: 'ΚΤΕΛ', endPoint: 'Πανεπιστήμιο', frequency: '25 λεπτά', operatingHours: '07:00 - 21:30' },
  ];

  const [stops, setStops] = useState<BusStop[]>([
    {
      id: '1',
      name: 'Πλατεία 23ης Μαρτίου',
      routes: ['1', '2', '3'],
      distance: '150m',
      isFavorite: true,
      arrivals: [
        { routeId: '1', routeNumber: '1', destination: 'Βέργα', arrivalMinutes: 3, isLive: true, occupancy: 'low', busId: 'BUS-101' },
        { routeId: '2', routeNumber: '2', destination: 'Μεσσήνη', arrivalMinutes: 8, isLive: true, occupancy: 'medium', busId: 'BUS-205' },
        { routeId: '1', routeNumber: '1', destination: 'Βέργα', arrivalMinutes: 23, isLive: false, occupancy: 'low', busId: 'BUS-102' },
      ]
    },
    {
      id: '2',
      name: 'Αριστομένους (Δημαρχείο)',
      routes: ['1', '4'],
      distance: '280m',
      arrivals: [
        { routeId: '4', routeNumber: '4', destination: 'Νοσοκομείο', arrivalMinutes: 5, isLive: true, occupancy: 'high', busId: 'BUS-401' },
        { routeId: '1', routeNumber: '1', destination: 'Βέργα', arrivalMinutes: 12, isLive: true, occupancy: 'low', busId: 'BUS-103' },
      ]
    },
    {
      id: '3',
      name: 'Παραλία Καλαμάτας',
      routes: ['4'],
      distance: '450m',
      isFavorite: true,
      arrivals: [
        { routeId: '4', routeNumber: '4', destination: 'Νοσοκομείο', arrivalMinutes: 2, isLive: true, occupancy: 'medium', busId: 'BUS-402' },
        { routeId: '4', routeNumber: '4', destination: 'Παραλία', arrivalMinutes: 18, isLive: true, occupancy: 'low', busId: 'BUS-403' },
      ]
    },
    {
      id: '4',
      name: 'ΚΤΕΛ Μεσσηνίας',
      routes: ['2', '5'],
      distance: '800m',
      arrivals: [
        { routeId: '5', routeNumber: '5', destination: 'Πανεπιστήμιο', arrivalMinutes: 7, isLive: true, occupancy: 'low', busId: 'BUS-501' },
        { routeId: '2', routeNumber: '2', destination: 'Κέντρο', arrivalMinutes: 15, isLive: false, occupancy: 'medium', busId: 'BUS-206' },
      ]
    },
  ]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setStops(prev => prev.map(stop => ({
        ...stop,
        arrivals: stop.arrivals.map(arr => ({
          ...arr,
          arrivalMinutes: Math.max(1, arr.arrivalMinutes - 1)
        }))
      })));
      setIsRefreshing(false);
    }, 1000);
  };

  const toggleFavorite = (stopId: string) => {
    setStops(prev => prev.map(stop => 
      stop.id === stopId ? { ...stop, isFavorite: !stop.isFavorite } : stop
    ));
  };

  const getOccupancyInfo = (occupancy: string) => {
    switch (occupancy) {
      case 'low': return { label: 'Χαμηλή πληρότητα', color: 'text-green-600', icon: '🟢' };
      case 'medium': return { label: 'Μέτρια πληρότητα', color: 'text-amber-600', icon: '🟡' };
      case 'high': return { label: 'Υψηλή πληρότητα', color: 'text-red-600', icon: '🔴' };
      default: return { label: 'Άγνωστη', color: 'text-zinc-500', icon: '⚪' };
    }
  };

  const getRouteColor = (routeNumber: string) => {
    const route = routes.find(r => r.number === routeNumber);
    return route?.color || '#6b7280';
  };

  const favoriteStops = stops.filter(s => s.isFavorite);

  // Auto-refresh arrivals
  useEffect(() => {
    const interval = setInterval(() => {
      setStops(prev => prev.map(stop => ({
        ...stop,
        arrivals: stop.arrivals.map(arr => ({
          ...arr,
          arrivalMinutes: Math.max(0, arr.arrivalMinutes - 1)
        })).filter(arr => arr.arrivalMinutes > 0)
      })));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark">
      {/* Header */}
      <div className="bg-white dark:bg-surface-dark px-4 pt-12 pb-4 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-zinc-500 dark:text-zinc-400">
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Bus Tracker</h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Real-time arrivals</p>
            </div>
          </div>
          <button 
            onClick={handleRefresh}
            className={`p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCw size={20} className="text-zinc-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-xl p-1">
          {[
            { key: 'nearby', label: 'Nearby', icon: MapPin },
            { key: 'routes', label: 'Routes', icon: Route },
            { key: 'favorites', label: 'Favorites', icon: Star }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'nearby' | 'routes' | 'favorites')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 transition-colors ${
                activeTab === tab.key 
                  ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-sm' 
                  : 'text-zinc-500'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-24">
        {/* Nearby Stops */}
        {activeTab === 'nearby' && (
          <div className="space-y-3">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              {stops.length} stops nearby • Last updated just now
            </p>
            
            {stops.map(stop => (
              <motion.div
                key={stop.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden"
              >
                <button
                  onClick={() => setSelectedStop(selectedStop?.id === stop.id ? null : stop)}
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900 dark:text-white">{stop.name}</h3>
                        {stop.isFavorite && <Star size={14} className="text-amber-500 fill-amber-500" />}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-zinc-500 flex items-center gap-1">
                          <Navigation size={12} />
                          {stop.distance}
                        </span>
                        <div className="flex gap-1">
                          {stop.routes.map(r => (
                            <span 
                              key={r}
                              className="w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                              style={{ backgroundColor: getRouteColor(r) }}
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <ChevronRight 
                      size={20} 
                      className={`text-zinc-400 transition-transform ${selectedStop?.id === stop.id ? 'rotate-90' : ''}`} 
                    />
                  </div>

                  {/* Quick Arrivals Preview */}
                  {stop.arrivals.length > 0 && selectedStop?.id !== stop.id && (
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                      {stop.arrivals.slice(0, 2).map((arr, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span 
                            className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center"
                            style={{ backgroundColor: getRouteColor(arr.routeNumber) }}
                          >
                            {arr.routeNumber}
                          </span>
                          <span className={`text-sm font-bold ${arr.arrivalMinutes <= 3 ? 'text-green-600' : 'text-slate-900 dark:text-white'}`}>
                            {arr.arrivalMinutes <= 1 ? 'Now' : `${arr.arrivalMinutes}'`}
                          </span>
                          {arr.isLive && (
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </button>

                {/* Expanded Arrivals */}
                <AnimatePresence>
                  {selectedStop?.id === stop.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-zinc-100 dark:border-zinc-800"
                    >
                      <div className="p-4 space-y-3">
                        {stop.arrivals.map((arrival, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-10 h-10 rounded-xl text-white font-bold flex items-center justify-center"
                                style={{ backgroundColor: getRouteColor(arrival.routeNumber) }}
                              >
                                {arrival.routeNumber}
                              </div>
                              <div>
                                <p className="font-medium text-slate-900 dark:text-white text-sm">
                                  → {arrival.destination}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-zinc-500">
                                  <span className={getOccupancyInfo(arrival.occupancy).color}>
                                    {getOccupancyInfo(arrival.occupancy).icon} {getOccupancyInfo(arrival.occupancy).label}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={`text-lg font-bold ${arrival.arrivalMinutes <= 3 ? 'text-green-600' : 'text-slate-900 dark:text-white'}`}>
                                {arrival.arrivalMinutes <= 1 ? 'Now' : `${arrival.arrivalMinutes}'`}
                              </p>
                              {arrival.isLive && (
                                <span className="text-[10px] text-green-600 flex items-center justify-end gap-1">
                                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                  Live
                                </span>
                              )}
                            </div>
                          </div>
                        ))}

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(stop.id);
                            }}
                            className={`flex-1 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-1.5 ${
                              stop.isFavorite 
                                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' 
                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                            }`}
                          >
                            <Star size={16} className={stop.isFavorite ? 'fill-amber-500' : ''} />
                            {stop.isFavorite ? 'Saved' : 'Save'}
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowNotificationSet(true);
                            }}
                            className="flex-1 py-2 rounded-xl text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center gap-1.5"
                          >
                            <Bell size={16} />
                            Notify
                          </button>
                          <button className="flex-1 py-2 rounded-xl text-sm font-medium bg-accent text-white flex items-center justify-center gap-1.5">
                            <Navigation size={16} />
                            Navigate
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}

        {/* Routes */}
        {activeTab === 'routes' && (
          <div className="space-y-3">
            {routes.map(route => (
              <button
                key={route.id}
                onClick={() => setSelectedRoute(selectedRoute?.id === route.id ? null : route)}
                className="w-full bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-xl text-white font-bold text-xl flex items-center justify-center"
                    style={{ backgroundColor: route.color }}
                  >
                    {route.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{route.name}</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {route.startPoint} ↔ {route.endPoint}
                    </p>
                  </div>
                  <ChevronRight 
                    size={20} 
                    className={`text-zinc-400 transition-transform ${selectedRoute?.id === route.id ? 'rotate-90' : ''}`} 
                  />
                </div>

                <AnimatePresence>
                  {selectedRoute?.id === route.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3">
                          <p className="text-xs text-zinc-500 mb-1">Frequency</p>
                          <p className="font-semibold text-slate-900 dark:text-white text-sm">{route.frequency}</p>
                        </div>
                        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3">
                          <p className="text-xs text-zinc-500 mb-1">Hours</p>
                          <p className="font-semibold text-slate-900 dark:text-white text-sm">{route.operatingHours}</p>
                        </div>
                      </div>
                      <button className="w-full mt-3 py-2.5 bg-accent text-white rounded-xl text-sm font-semibold">
                        View Full Schedule
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>
        )}

        {/* Favorites */}
        {activeTab === 'favorites' && (
          <div className="space-y-3">
            {favoriteStops.length === 0 ? (
              <div className="text-center py-12">
                <Star size={48} className="mx-auto text-zinc-300 dark:text-zinc-600 mb-3" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">No Favorites Yet</h3>
                <p className="text-sm text-zinc-500">Save stops for quick access</p>
              </div>
            ) : (
              favoriteStops.map(stop => (
                <div
                  key={stop.id}
                  className="bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">{stop.name}</h3>
                      <p className="text-xs text-zinc-500">{stop.distance} away</p>
                    </div>
                    <button onClick={() => toggleFavorite(stop.id)}>
                      <Star size={20} className="text-amber-500 fill-amber-500" />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {stop.arrivals.slice(0, 3).map((arr, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 border-t border-zinc-100 dark:border-zinc-800 first:border-0 first:pt-0">
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-7 h-7 rounded-lg text-white text-xs font-bold flex items-center justify-center"
                            style={{ backgroundColor: getRouteColor(arr.routeNumber) }}
                          >
                            {arr.routeNumber}
                          </span>
                          <span className="text-sm text-zinc-600 dark:text-zinc-300">→ {arr.destination}</span>
                        </div>
                        <span className={`font-bold ${arr.arrivalMinutes <= 3 ? 'text-green-600' : 'text-slate-900 dark:text-white'}`}>
                          {arr.arrivalMinutes <= 1 ? 'Now' : `${arr.arrivalMinutes}'`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Notification Modal */}
      <AnimatePresence>
        {showNotificationSet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-end"
            onClick={() => setShowNotificationSet(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onClick={e => e.stopPropagation()}
              className="w-full bg-white dark:bg-surface-dark rounded-t-3xl p-4"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Set Arrival Alert</h3>
              
              <p className="text-sm text-zinc-500 mb-4">
                Get notified when the bus is approaching
              </p>

              <div className="space-y-2 mb-4">
                {[3, 5, 10].map(mins => (
                  <button
                    key={mins}
                    onClick={() => {
                      setShowNotificationSet(false);
                      // Show toast
                    }}
                    className="w-full py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-sm font-medium text-slate-900 dark:text-white flex items-center justify-between px-4"
                  >
                    <span>Notify {mins} minutes before</span>
                    <Bell size={18} className="text-zinc-400" />
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => setShowNotificationSet(false)}
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

export default BusTracker;
