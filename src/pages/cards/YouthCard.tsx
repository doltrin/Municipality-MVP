import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Gift, Ticket, Music, GraduationCap, Bus, Dumbbell, ChevronRight, QrCode, Star, MapPin, Clock, CheckCircle2, X, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface Benefit {
  id: string;
  name: string;
  nameGr: string;
  description: string;
  discount: string;
  icon: React.ElementType;
  color: string;
  category: string;
  locations?: string[];
  validUntil?: string;
}

interface Activity {
  id: string;
  type: 'discount_used' | 'points_earned' | 'event_attended';
  description: string;
  date: string;
  points?: number;
  savings?: string;
}

const YouthCard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'card' | 'benefits' | 'events'>('card');
  const [showQR, setShowQR] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [hasCard, setHasCard] = useState(true); // Mock: user has card

  const cardData = {
    name: 'ΜΑΡΙΑ ΠΑΠΑΔΟΠΟΥΛΟΥ',
    cardNumber: 'YC-2024-12345',
    validUntil: '31 Dec 2025',
    age: 22,
    points: 1250,
    level: 'Gold'
  };

  const benefits: Benefit[] = [
    {
      id: '1',
      name: 'Cinema Tickets',
      nameGr: 'Εισιτήρια Σινεμά',
      description: 'Discounted movie tickets at all partner cinemas',
      discount: '30% off',
      icon: Ticket,
      color: '#ef4444',
      category: 'Entertainment',
      locations: ['Odeon Kalamata', 'Village Cinemas'],
      validUntil: 'Always'
    },
    {
      id: '2',
      name: 'Public Transport',
      nameGr: 'Δημόσια Συγκοινωνία',
      description: 'Reduced fare on municipal buses',
      discount: '50% off',
      icon: Bus,
      color: '#3b82f6',
      category: 'Transport',
      locations: ['All municipal bus routes'],
      validUntil: 'Always'
    },
    {
      id: '3',
      name: 'Gym & Sports',
      nameGr: 'Γυμναστήριο & Αθλητισμός',
      description: 'Free access to municipal sports facilities',
      discount: 'Free',
      icon: Dumbbell,
      color: '#22c55e',
      category: 'Sports',
      locations: ['Municipal Stadium', 'Sports Center', 'Swimming Pool'],
      validUntil: 'Always'
    },
    {
      id: '4',
      name: 'Concerts & Events',
      nameGr: 'Συναυλίες & Εκδηλώσεις',
      description: 'Priority access and discounts for municipal events',
      discount: '20-50% off',
      icon: Music,
      color: '#8b5cf6',
      category: 'Entertainment',
      locations: ['Municipal Theater', 'Open Air Theater'],
      validUntil: 'Per event'
    },
    {
      id: '5',
      name: 'Educational Programs',
      nameGr: 'Εκπαιδευτικά Προγράμματα',
      description: 'Free workshops and courses',
      discount: 'Free',
      icon: GraduationCap,
      color: '#f59e0b',
      category: 'Education',
      locations: ['Municipal Library', 'Youth Center'],
      validUntil: 'Always'
    },
    {
      id: '6',
      name: 'Partner Discounts',
      nameGr: 'Εκπτώσεις Συνεργατών',
      description: 'Special offers at local businesses',
      discount: '10-25% off',
      icon: Gift,
      color: '#ec4899',
      category: 'Shopping',
      locations: ['50+ partner stores'],
      validUntil: 'Varies'
    }
  ];

  const upcomingEvents = [
    { id: '1', name: 'Summer Music Festival', date: '15 Jul 2025', location: 'Paralia', discount: 'Free entry', image: '🎵' },
    { id: '2', name: 'Career Workshop', date: '20 Jan 2025', location: 'Youth Center', discount: 'Free', image: '💼' },
    { id: '3', name: 'Beach Volleyball Tournament', date: '10 Aug 2025', location: 'Kalamata Beach', discount: 'Free registration', image: '🏐' },
    { id: '4', name: 'Photography Course', date: '5 Feb 2025', location: 'Municipal Library', discount: 'Free', image: '📷' },
  ];

  const recentActivity: Activity[] = [
    { id: '1', type: 'discount_used', description: 'Cinema ticket discount', date: '5 Dec 2024', savings: '€3.50' },
    { id: '2', type: 'points_earned', description: 'Attended Career Workshop', date: '1 Dec 2024', points: 100 },
    { id: '3', type: 'discount_used', description: 'Bus fare discount', date: '28 Nov 2024', savings: '€0.70' },
    { id: '4', type: 'event_attended', description: 'Youth Council Meeting', date: '25 Nov 2024', points: 50 },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Gold': return 'from-amber-400 to-amber-600';
      case 'Silver': return 'from-zinc-300 to-zinc-500';
      case 'Bronze': return 'from-orange-400 to-orange-600';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  if (!hasCard) {
    return (
      <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark">
        {/* Header */}
        <div className="bg-white dark:bg-surface-dark px-4 pt-12 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-zinc-500 dark:text-zinc-400">
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Youth Card</h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Ages 15-29</p>
            </div>
          </div>
        </div>

        {/* No Card State */}
        <div className="flex-1 p-4 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mb-4">
            <CreditCard size={48} className="text-accent" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Get Your Youth Card</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 max-w-xs">
            Unlock exclusive discounts, free access to sports facilities, and priority event tickets.
          </p>
          
          <div className="w-full max-w-xs space-y-3 mb-6">
            {['Free public transport', 'Cinema discounts', 'Sports facilities access', 'Event priority'].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <CheckCircle2 size={16} className="text-green-500" />
                {item}
              </div>
            ))}
          </div>

          <button 
            onClick={() => setShowApplicationForm(true)}
            className="w-full max-w-xs py-3 bg-accent text-white font-semibold rounded-xl"
          >
            Apply Now - It's Free!
          </button>
          
          <p className="text-xs text-zinc-400 mt-3">For citizens aged 15-29</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark relative">
      {/* Header */}
      <div className="bg-white dark:bg-surface-dark px-4 pt-12 pb-4 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-20">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="text-zinc-500 dark:text-zinc-400">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Youth Card</h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Your benefits & discounts</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-xl p-1">
          {[
            { key: 'card', label: 'My Card' },
            { key: 'benefits', label: 'Benefits' },
            { key: 'events', label: 'Events' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key 
                  ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-sm' 
                  : 'text-zinc-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-24">
        {/* My Card Tab */}
        {activeTab === 'card' && (
          <div className="space-y-4">
            {/* Digital Card */}
            <div className={`bg-gradient-to-br ${getLevelColor(cardData.level)} rounded-3xl p-5 text-white shadow-xl relative overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>
              
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-xs opacity-80">ΔΗΜΟΣ ΚΑΛΑΜΑΤΑΣ</p>
                    <h3 className="text-lg font-bold">ΚΑΡΤΑ ΝΕΩΝ</h3>
                  </div>
                  <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                    <Star size={12} className="fill-white" />
                    <span className="text-xs font-bold">{cardData.level}</span>
                  </div>
                </div>
                
                <p className="text-lg font-bold tracking-wider mb-1">{cardData.name}</p>
                <p className="text-xs opacity-80 mb-4">{cardData.cardNumber}</p>
                
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] opacity-70">VALID UNTIL</p>
                    <p className="text-sm font-semibold">{cardData.validUntil}</p>
                  </div>
                  <button 
                    onClick={() => setShowQR(true)}
                    className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"
                  >
                    <QrCode size={24} />
                  </button>
                </div>
              </div>
            </div>

            {/* Points */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-900 dark:text-white">Your Points</h3>
                <span className="text-2xl font-bold text-accent">{cardData.points.toLocaleString()}</span>
              </div>
              <div className="bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                <div className="bg-accent h-full rounded-full" style={{ width: '62%' }} />
              </div>
              <p className="text-xs text-zinc-500 mt-2">750 more points to Platinum level</p>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.description}</p>
                      <p className="text-xs text-zinc-500">{activity.date}</p>
                    </div>
                    {activity.savings && (
                      <span className="text-sm font-semibold text-green-600">-{activity.savings}</span>
                    )}
                    {activity.points && (
                      <span className="text-sm font-semibold text-accent">+{activity.points} pts</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Benefits Tab */}
        {activeTab === 'benefits' && (
          <div className="space-y-3">
            {benefits.map(benefit => {
              const Icon = benefit.icon;
              return (
                <button
                  key={benefit.id}
                  onClick={() => setSelectedBenefit(benefit)}
                  className="w-full bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4 text-left"
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${benefit.color}20` }}
                    >
                      <Icon size={24} style={{ color: benefit.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900 dark:text-white">{benefit.nameGr}</h3>
                        <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 text-xs font-bold rounded-full">
                          {benefit.discount}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5">{benefit.description}</p>
                      <p className="text-xs text-zinc-400 mt-1">{benefit.category}</p>
                    </div>
                    <ChevronRight size={20} className="text-zinc-300 dark:text-zinc-600" />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-3">
            <p className="text-sm text-zinc-500 mb-2">Exclusive events for Youth Card holders</p>
            
            {upcomingEvents.map(event => (
              <div
                key={event.id}
                className="bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-2xl">
                    {event.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{event.name}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {event.location}
                      </span>
                    </div>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                      {event.discount}
                    </span>
                  </div>
                </div>
                <button className="w-full mt-3 py-2 bg-accent text-white rounded-xl text-sm font-semibold">
                  Register Interest
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-surface-dark rounded-3xl p-6 text-center max-w-sm w-full"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Your Youth Card</h3>
              <p className="text-sm text-zinc-500 mb-4">Show this QR code to redeem benefits</p>
              
              <div className="bg-white p-6 rounded-2xl inline-block mb-4">
                <QrCode size={160} className="text-slate-900" />
              </div>
              
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{cardData.name}</p>
              <p className="text-xs text-zinc-500">{cardData.cardNumber}</p>
              
              <button 
                onClick={() => setShowQR(false)}
                className="w-full mt-6 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-semibold text-slate-900 dark:text-white"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Benefit Detail Modal */}
      <AnimatePresence>
        {selectedBenefit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-end"
            onClick={() => setSelectedBenefit(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onClick={e => e.stopPropagation()}
              className="w-full bg-white dark:bg-surface-dark rounded-t-3xl"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${selectedBenefit.color}20` }}
                    >
                      <selectedBenefit.icon size={28} style={{ color: selectedBenefit.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">{selectedBenefit.nameGr}</h3>
                      <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 text-xs font-bold rounded-full">
                        {selectedBenefit.discount}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedBenefit(null)} className="p-2 text-zinc-400">
                    <X size={20} />
                  </button>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  {selectedBenefit.description}
                </p>

                {selectedBenefit.locations && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Where to use</h4>
                    <div className="space-y-2">
                      {selectedBenefit.locations.map((loc, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                          <MapPin size={14} className="text-accent" />
                          {loc}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-accent/10 rounded-xl p-3 mb-4">
                  <p className="text-sm text-accent font-medium">
                    Show your Youth Card QR code at the venue to redeem this benefit.
                  </p>
                </div>

                <button 
                  onClick={() => { setSelectedBenefit(null); setShowQR(true); }}
                  className="w-full py-3 bg-accent text-white font-semibold rounded-xl"
                >
                  Show QR Code
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Application Form Modal */}
      <AnimatePresence>
        {showApplicationForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white dark:bg-background-dark z-50 flex flex-col"
          >
            <div className="bg-white dark:bg-surface-dark px-4 pt-12 pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <button onClick={() => setShowApplicationForm(false)} className="text-zinc-500">
                  <X size={24} />
                </button>
                <h2 className="font-bold text-slate-900 dark:text-white">Apply for Youth Card</h2>
                <div className="w-6" />
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-zinc-500 mb-1 block">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0"
                  />
                </div>
                
                <div>
                  <label className="text-xs font-medium text-zinc-500 mb-1 block">Date of Birth</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0"
                  />
                </div>
                
                <div>
                  <label className="text-xs font-medium text-zinc-500 mb-1 block">ID Number</label>
                  <input 
                    type="text" 
                    placeholder="Enter ID number"
                    className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0"
                  />
                </div>
                
                <div>
                  <label className="text-xs font-medium text-zinc-500 mb-1 block">Email</label>
                  <input 
                    type="email" 
                    placeholder="Enter email"
                    className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0"
                  />
                </div>
                
                <div>
                  <label className="text-xs font-medium text-zinc-500 mb-1 block">Photo</label>
                  <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-xl p-6 text-center">
                    <Camera size={32} className="mx-auto text-zinc-400 mb-2" />
                    <p className="text-sm text-zinc-500">Take or upload a photo</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-surface-dark border-t border-zinc-200 dark:border-zinc-800">
              <button 
                onClick={() => { setShowApplicationForm(false); setHasCard(true); }}
                className="w-full py-4 bg-accent text-white font-bold rounded-xl"
              >
                Submit Application
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default YouthCard;
