import React, { useState } from 'react';
import { ArrowLeft, Car, Check, MapPin, Wallet, CreditCard, Coins, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FeedbackModal from '../../components/FeedbackModal';

const ParkingSession: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [duration, setDuration] = useState(60); // minutes
  const [selectedMethod, setSelectedMethod] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const handlePayment = () => {
    setStep(3);
  };

  const totalCost = ((duration / 60) * 1.5).toFixed(2);

  return (
    <div className="flex flex-col min-h-full bg-slate-50 pb-20">
      <div className="bg-blue-600 px-6 pt-12 pb-8 rounded-b-[2rem] shadow-lg text-white">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Start Parking</h1>
        </div>
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
          <MapPin className="text-blue-200" />
          <div>
            <div className="text-xs text-blue-200 uppercase font-bold">Location</div>
            <div className="font-bold">Zone A - City Center</div>
          </div>
        </div>
      </div>

      <div className="p-6 -mt-6 space-y-6">
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right-8">
             {/* Vehicle Selection */}
             <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
               <h3 className="font-bold text-slate-800 mb-4">Select Vehicle</h3>
               <div className="space-y-3">
                 <button className="w-full p-4 rounded-xl border-2 border-blue-500 bg-blue-50 flex justify-between items-center">
                   <div className="flex items-center gap-3">
                     <Car size={20} className="text-blue-600" />
                     <div className="text-left">
                       <div className="font-bold text-slate-800">Toyota Yaris</div>
                       <div className="text-xs text-slate-500">IPO-3244</div>
                     </div>
                   </div>
                   <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                     <div className="w-2 h-2 bg-white rounded-full"></div>
                   </div>
                 </button>
                 <button className="w-full p-4 rounded-xl border border-slate-200 flex justify-between items-center text-slate-400">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg border border-dashed border-slate-300 flex items-center justify-center">
                       +
                     </div>
                     <span className="font-bold text-sm">Add New Vehicle</span>
                   </div>
                 </button>
               </div>
             </div>

             {/* Duration */}
             <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
               <h3 className="font-bold text-slate-800 mb-4">Duration</h3>
               <div className="flex items-center justify-between mb-6">
                 <button onClick={() => setDuration(Math.max(30, duration - 15))} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xl">-</button>
                 <div className="text-center">
                   <div className="text-3xl font-bold text-slate-800">{Math.floor(duration / 60)}h {duration % 60}m</div>
                   <div className="text-xs text-slate-400">Time</div>
                 </div>
                 <button onClick={() => setDuration(duration + 15)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xl">+</button>
               </div>
               
               <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                 <span className="text-sm font-bold text-slate-600">Total Cost</span>
                 <span className="text-xl font-bold text-blue-600">€{totalCost}</span>
               </div>
             </div>

             <button 
               onClick={() => setStep(2)}
               className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-600/30 active:scale-[0.98] transition-transform"
             >
               Proceed to Payment
             </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-8">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4">Payment Method</h3>
              <div className="space-y-3">
                {[
                  { id: 'wallet', icon: Wallet, label: 'Digital Wallet', balance: '€45.50' },
                  { id: 'card', icon: CreditCard, label: 'Visa **** 4242', balance: 'Expires 12/28' },
                  { id: 'points', icon: Coins, label: 'Reward Points', balance: '2,450 pts' }
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full p-4 rounded-xl border-2 flex justify-between items-center transition-all ${selectedMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedMethod === method.id ? 'bg-blue-200 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                        <method.icon size={20} />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-slate-800">{method.label}</div>
                        <div className="text-xs text-slate-500">{method.balance}</div>
                      </div>
                    </div>
                    {selectedMethod === method.id && (
                      <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-slate-100">
               <span className="text-sm font-bold text-slate-600">Amount to Pay</span>
               <span className="text-xl font-bold text-blue-600">€{totalCost}</span>
             </div>

            <button 
               onClick={handlePayment}
               disabled={!selectedMethod}
               className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-600/30 active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
             >
               Confirm Payment
             </button>
             <button 
               onClick={() => setStep(1)}
               className="w-full bg-white text-slate-600 py-4 rounded-xl font-bold border border-slate-200"
             >
               Back
             </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right-8">
             <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 text-center py-8">
               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                 <Check size={40} />
               </div>
               <h2 className="text-2xl font-bold text-slate-800 mb-2">Parking Started!</h2>
               <p className="text-slate-500 text-sm mb-6">Your session for IPO-3244 is active.</p>
               
               <div className="bg-slate-50 p-4 rounded-xl mb-6">
                 <div className="text-xs text-slate-400 uppercase font-bold mb-1">Time Remaining</div>
                 <div className="text-4xl font-mono font-bold text-slate-800">0{Math.floor(duration/60)}:{(duration%60).toString().padStart(2, '0')}:00</div>
               </div>

               <div className="space-y-3">
                 <button 
                   onClick={() => navigate('/parking')}
                   className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold"
                 >
                   Back to Map
                 </button>
                 <button 
                   onClick={() => setShowFeedback(true)}
                   className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                 >
                   <Star size={18} />
                   Rate Experience
                 </button>
               </div>
             </div>
          </div>
        )}
      </div>

      {/* Feedback Modal */}
      <FeedbackModal 
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        serviceName="Smart Parking"
      />
    </div>
  );
};

export default ParkingSession;
