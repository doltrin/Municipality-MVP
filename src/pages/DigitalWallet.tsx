import React, { useState } from 'react';
import { QrCode, Award, History, ArrowLeft, Share2, Building2, Car, Recycle, Bus, Ticket, X, ChevronRight, Coffee, ShoppingBag, Dumbbell, Film, Check, Gift, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface Reward {
  id: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  points: number;
  category: 'transport' | 'entertainment' | 'shopping' | 'fitness';
}

const rewards: Reward[] = [
  { id: '1', icon: Bus, iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600 dark:text-blue-400', title: 'Bus Ticket', description: 'Single Ride', points: 100, category: 'transport' },
  { id: '2', icon: Ticket, iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400', title: 'Concert Discount', description: '€5 Off Coupon', points: 300, category: 'entertainment' },
  { id: '3', icon: Coffee, iconBg: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600 dark:text-amber-400', title: 'Free Coffee', description: 'Any municipal café', points: 50, category: 'shopping' },
  { id: '4', icon: Film, iconBg: 'bg-purple-100 dark:bg-purple-900/30', iconColor: 'text-purple-600 dark:text-purple-400', title: 'Cinema Ticket', description: '50% off any movie', points: 200, category: 'entertainment' },
  { id: '5', icon: Dumbbell, iconBg: 'bg-red-100 dark:bg-red-900/30', iconColor: 'text-red-600 dark:text-red-400', title: 'Gym Day Pass', description: 'Municipal sports center', points: 150, category: 'fitness' },
  { id: '6', icon: ShoppingBag, iconBg: 'bg-pink-100 dark:bg-pink-900/30', iconColor: 'text-pink-600 dark:text-pink-400', title: 'Market Voucher', description: '€10 at local market', points: 400, category: 'shopping' },
  { id: '7', icon: Car, iconBg: 'bg-indigo-100 dark:bg-indigo-900/30', iconColor: 'text-indigo-600 dark:text-indigo-400', title: 'Parking Credit', description: '2 hours free parking', points: 120, category: 'transport' },
];

type RedeemStep = 'list' | 'confirm' | 'success';

const DigitalWallet: React.FC = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState<'citizen' | 'youth'>('citizen');
  const [showPoints, setShowPoints] = useState(false);
  const [userPoints, setUserPoints] = useState(450);
  const [redeemStep, setRedeemStep] = useState<RedeemStep>('list');
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);

  const handleSelectReward = (reward: Reward) => {
    if (userPoints >= reward.points) {
      setSelectedReward(reward);
      setRedeemStep('confirm');
    }
  };

  const handleConfirmRedeem = () => {
    if (!selectedReward) return;
    setIsRedeeming(true);
    
    // Simulate API call
    setTimeout(() => {
      setUserPoints(prev => prev - selectedReward.points);
      setIsRedeeming(false);
      setRedeemStep('success');
    }, 1500);
  };

  const handleCloseModal = () => {
    setShowPoints(false);
    setRedeemStep('list');
    setSelectedReward(null);
  };

  const handleBackToList = () => {
    setRedeemStep('list');
    setSelectedReward(null);
  };

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark pb-20">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex items-center justify-between bg-white dark:bg-surface-dark border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-zinc-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Digital Wallet</h1>
        </div>
        <button className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
          <History size={20} />
        </button>
      </div>

      <div className="flex-1 px-6 overflow-y-auto hide-scrollbar">
        {/* Card Selector */}
        <div className="flex bg-zinc-200 dark:bg-zinc-800 p-1 rounded-xl mb-8">
          <button 
            onClick={() => setActiveCard('citizen')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeCard === 'citizen' ? 'bg-accent text-white shadow-lg' : 'text-zinc-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'}`}
          >
            Citizen Card
          </button>
          <button 
            onClick={() => setActiveCard('youth')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeCard === 'youth' ? 'bg-purple-600 text-white shadow-lg' : 'text-zinc-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'}`}
          >
            Youth Card
          </button>
        </div>

        {/* Card Display */}
        <div className="mb-8 relative group perspective-1000">
          <div className={`w-full aspect-[1.586] rounded-2xl p-6 relative overflow-hidden shadow-2xl transition-all duration-500 transform ${activeCard === 'citizen' ? 'bg-gradient-to-br from-blue-600 to-indigo-800' : 'bg-gradient-to-br from-purple-600 to-pink-600'}`}>
            {/* Card Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg opacity-90">{activeCard === 'citizen' ? 'MUNICIPALITY CITIZEN' : 'YOUTH PASS'}</h3>
                  <p className="text-xs opacity-70 tracking-wider">OFFICIAL DIGITAL ID</p>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Building2 size={20} className="text-white/80" />
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs opacity-70 mb-1">CARD HOLDER</p>
                  <p className="font-mono font-bold text-lg tracking-wider">ALEXANDROS PAPPAS</p>
                  <p className="font-mono text-sm opacity-70">ID: 8492-1039-4820</p>
                </div>
                <div className="bg-white p-2 rounded-lg">
                  <QrCode className="text-slate-900" size={40} />
                </div>
              </div>
            </div>
          </div>

          {/* Card Actions */}
          <div className="flex justify-center gap-6 mt-6">
            <button className="flex flex-col items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                <Share2 size={20} />
              </div>
              <span className="text-xs">Share</span>
            </button>
            <button 
              onClick={() => setShowPoints(true)}
              className="flex flex-col items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
                <Gift size={20} />
              </div>
              <span className="text-xs font-semibold">Points: {userPoints}</span>
            </button>
          </div>
        </div>

        {/* Benefits List */}
        <div>
          <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-4 mt-6">Your Benefits</h3>
          <div className="space-y-3">
            {activeCard === 'citizen' ? (
              <>
                <BenefitItem icon={Car} title="Free Parking" desc="2 hours daily in Zone A" path="/benefits/parking" />
                <BenefitItem icon={Building2} title="Museum Access" desc="50% off municipal museums" path="/benefits/museum" />
                <BenefitItem icon={Recycle} title="Recycling Reward" desc="50 points per bin visit" path="/benefits/recycling" />
              </>
            ) : (
              <>
                 <BenefitItem icon={Bus} title="Transport Pass" desc="Unlimited bus travel" path="/benefits/transport" />
                 <BenefitItem icon={Ticket} title="Concert Tickets" desc="Priority booking for events" path="/benefits/concerts" />
                 <BenefitItem icon={Award} title="Sports Center" desc="Free gym membership" path="/benefits/sports" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Points Modal */}
      <AnimatePresence>
        {showPoints && (
          <div className="absolute inset-0 z-50 flex items-end justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-surface-dark w-full max-w-md rounded-t-3xl relative z-10 max-h-[85vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  {redeemStep !== 'list' && (
                    <button 
                      onClick={handleBackToList}
                      className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                      <ArrowLeft size={16} />
                    </button>
                  )}
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {redeemStep === 'list' && 'Points & Rewards'}
                    {redeemStep === 'confirm' && 'Confirm Redemption'}
                    {redeemStep === 'success' && 'Success!'}
                  </h2>
                </div>
                <button 
                  onClick={handleCloseModal} 
                  className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                  {/* List View */}
                  {redeemStep === 'list' && (
                    <motion.div
                      key="list"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      {/* Points Balance Card */}
                      <div className="bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-400 p-6 rounded-2xl mb-6 relative overflow-hidden">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/20 rounded-full blur-xl" />
                        <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full blur-lg" />
                        <div className="relative">
                          <p className="text-xs font-bold uppercase text-yellow-900/70 mb-1 tracking-wider">Total Balance</p>
                          <div className="text-5xl font-extrabold text-yellow-900">
                            {userPoints} <span className="text-xl font-bold">pts</span>
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <Sparkles size={14} className="text-yellow-900/60" />
                            <span className="text-xs text-yellow-900/70 font-medium">Earn more by using city services</span>
                          </div>
                        </div>
                      </div>

                      {/* Rewards List */}
                      <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <Gift size={18} className="text-accent" />
                        Redeem For
                      </h3>
                      <div className="space-y-3">
                        {rewards.map((reward) => {
                          const canAfford = userPoints >= reward.points;
                          const Icon = reward.icon;
                          return (
                            <button
                              key={reward.id}
                              onClick={() => handleSelectReward(reward)}
                              disabled={!canAfford}
                              className={`w-full flex items-center justify-between p-4 border rounded-xl transition-all ${
                                canAfford 
                                  ? 'border-zinc-200 dark:border-zinc-700 hover:border-accent dark:hover:border-accent active:scale-[0.98]' 
                                  : 'border-zinc-100 dark:border-zinc-800 opacity-50 cursor-not-allowed'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${reward.iconBg} ${reward.iconColor}`}>
                                  <Icon size={22} />
                                </div>
                                <div className="text-left">
                                  <p className="font-bold text-slate-900 dark:text-white text-sm">{reward.title}</p>
                                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{reward.description}</p>
                                </div>
                              </div>
                              <div className={`px-4 py-2 rounded-xl text-xs font-bold ${
                                canAfford 
                                  ? 'bg-slate-900 dark:bg-accent text-white' 
                                  : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400'
                              }`}>
                                {reward.points} pts
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Confirm View */}
                  {redeemStep === 'confirm' && selectedReward && (
                    <motion.div
                      key="confirm"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="text-center"
                    >
                      {/* Reward Preview */}
                      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 ${selectedReward.iconBg} ${selectedReward.iconColor}`}>
                        <selectedReward.icon size={40} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{selectedReward.title}</h3>
                      <p className="text-zinc-500 dark:text-zinc-400 mb-6">{selectedReward.description}</p>

                      {/* Points Summary */}
                      <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-5 mb-6">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-zinc-500 dark:text-zinc-400">Current Balance</span>
                          <span className="font-bold text-slate-900 dark:text-white">{userPoints} pts</span>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-zinc-500 dark:text-zinc-400">Redemption Cost</span>
                          <span className="font-bold text-red-500">-{selectedReward.points} pts</span>
                        </div>
                        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-3">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-slate-900 dark:text-white">New Balance</span>
                            <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">{userPoints - selectedReward.points} pts</span>
                          </div>
                        </div>
                      </div>

                      {/* Confirm Button */}
                      <button
                        onClick={handleConfirmRedeem}
                        disabled={isRedeeming}
                        className="w-full py-4 bg-gradient-to-r from-accent to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-accent/30 active:scale-[0.98] transition-transform disabled:opacity-70 flex items-center justify-center gap-2"
                      >
                        {isRedeeming ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Check size={20} />
                            Confirm Redemption
                          </>
                        )}
                      </button>
                      <p className="text-xs text-zinc-400 mt-3">This action cannot be undone</p>
                    </motion.div>
                  )}

                  {/* Success View */}
                  {redeemStep === 'success' && selectedReward && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-6"
                    >
                      {/* Success Animation */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 10, stiffness: 200, delay: 0.1 }}
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30"
                      >
                        <Check size={48} className="text-white" strokeWidth={3} />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Redemption Complete!</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                          Your <span className="font-semibold text-slate-900 dark:text-white">{selectedReward.title}</span> is ready to use.
                        </p>

                        {/* Voucher Code */}
                        <div className="bg-gradient-to-br from-accent/10 to-blue-500/10 border-2 border-dashed border-accent/30 rounded-2xl p-6 mb-6">
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Your Voucher Code</p>
                          <p className="text-3xl font-mono font-bold text-accent tracking-widest">ATH-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
                          <p className="text-xs text-zinc-400 mt-2">Valid for 30 days</p>
                        </div>

                        {/* New Balance */}
                        <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4 mb-6">
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">New Points Balance</p>
                          <p className="text-2xl font-bold text-slate-900 dark:text-white">{userPoints} pts</p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          <button
                            onClick={handleBackToList}
                            className="flex-1 py-3 bg-zinc-100 dark:bg-zinc-800 text-slate-900 dark:text-white font-semibold rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                          >
                            Redeem More
                          </button>
                          <button
                            onClick={handleCloseModal}
                            className="flex-1 py-3 bg-accent text-white font-semibold rounded-xl shadow-md shadow-accent/30 active:scale-[0.98] transition-transform"
                          >
                            Done
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BenefitItem: React.FC<{ icon: React.ElementType, title: string, desc: string, path: string }> = ({ icon: Icon, title, desc, path }) => {
  const navigate = useNavigate();
  return (
    <button 
      onClick={() => navigate(path)}
      className="w-full bg-white dark:bg-surface-dark border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 flex items-center gap-4 hover:border-accent dark:hover:border-accent transition-colors text-left"
    >
      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <h4 className="text-slate-900 dark:text-white font-bold text-sm">{title}</h4>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs">{desc}</p>
      </div>
      <ChevronRight size={18} className="text-zinc-400" />
    </button>
  );
};

export default DigitalWallet;
