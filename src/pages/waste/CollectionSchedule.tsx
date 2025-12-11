import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, CheckCircle, Calendar, XCircle, RotateCw, Check, X, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CollectionSchedule: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'scheduled' | 'cancelled' | 'rescheduled'>('scheduled');
  const [pickupDate, setPickupDate] = useState('Tomorrow, Oct 27');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Thursday, Oct 29');

  const handleCancel = () => {
    setStatus('cancelled');
    setShowCancelModal(false);
  };

  const handleReschedule = () => {
    setPickupDate(selectedDate);
    setStatus('rescheduled');
    setShowRescheduleModal(false);
    setTimeout(() => setStatus('scheduled'), 2000);
  };

  const rescheduleOptions = [
    { date: 'Thursday, Oct 29', time: '07:00 - 09:00' },
    { date: 'Friday, Oct 30', time: '07:00 - 09:00' },
    { date: 'Monday, Nov 2', time: '07:00 - 09:00' },
  ];

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <div className="bg-green-600 px-6 pt-12 pb-6 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-white">Collection Schedule</h1>
        </div>
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-white flex items-center gap-3">
          <MapPin size={20} className="text-green-200" />
          <div>
            <p className="text-xs text-green-100">Your Location</p>
            <p className="font-bold text-sm">Ag. Meletiou 132, Athens</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-20">
        {/* Next Pickup */}
        <div className={`bg-white rounded-2xl shadow-sleek p-6 border-l-4 ${status === 'cancelled' ? 'border-red-500' : 'border-green-500'} transition-all duration-300`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg uppercase tracking-wider ${status === 'cancelled' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                {status === 'cancelled' ? 'Cancelled' : status === 'rescheduled' ? 'Updated' : 'Next Pickup'}
              </span>
              <h2 className="text-2xl font-bold text-slate-800 mt-2">{pickupDate}</h2>
              <p className="text-slate-500 text-sm">07:00 AM - 09:00 AM</p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${status === 'cancelled' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
              {status === 'cancelled' ? <XCircle size={24} /> : status === 'rescheduled' ? <Check size={24} /> : <Clock size={24} />}
            </div>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <CheckCircle size={16} className="text-green-500" />
              <span>General Waste (Green Bin)</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <CheckCircle size={16} className="text-blue-500" />
              <span>Recycling (Blue Bin)</span>
            </div>
          </div>

          {status !== 'cancelled' && (
            <div className="flex gap-3 pt-4 border-t border-slate-50">
              <button 
                onClick={() => setShowCancelModal(true)}
                className="flex-1 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2"
              >
                <XCircle size={14} />
                Cancel
              </button>
              <button 
                onClick={() => setShowRescheduleModal(true)}
                className="flex-1 py-2 bg-green-50 border border-green-100 rounded-lg text-xs font-bold text-green-700 hover:bg-green-100 flex items-center justify-center gap-2"
              >
                <RotateCw size={14} />
                Reschedule
              </button>
            </div>
          )}
        </div>

        {/* Weekly Schedule */}
        <div>
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Calendar size={18} />
            Weekly Schedule
          </h3>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {[
              { day: 'Monday', types: ['Organic (Brown)'] },
              { day: 'Tuesday', types: ['General', 'Recycling'] },
              { day: 'Thursday', types: ['General'] },
              { day: 'Friday', types: ['Recycling', 'Glass'] },
            ].map((item, idx) => (
              <div key={idx} className="p-4 border-b border-slate-50 last:border-0 flex justify-between items-center">
                <span className="font-bold text-slate-700">{item.day}</span>
                <div className="flex gap-2">
                  {item.types.map((t) => (
                    <span key={t} className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alert Box */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
          <p className="font-bold mb-1">Holiday Notice</p>
          <p className="opacity-80">No collection on Oct 28 (Ohi Day). Service resumes Oct 29.</p>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-5 w-full max-w-[90%] shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Cancel Pickup?</h3>
                <p className="text-sm text-slate-500">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              Are you sure you want to cancel your scheduled pickup for <strong>{pickupDate}</strong>? You'll need to reschedule if you change your mind.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-3 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50"
              >
                Keep Pickup
              </button>
              <button 
                onClick={handleCancel}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-t-3xl p-5 w-full shadow-xl max-h-[70%] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800 text-xl">Reschedule Pickup</h3>
              <button 
                onClick={() => setShowRescheduleModal(false)}
                className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center"
              >
                <X size={18} className="text-slate-500" />
              </button>
            </div>
            
            <p className="text-sm text-slate-500 mb-4">Select a new pickup date:</p>
            
            <div className="space-y-3 mb-6">
              {rescheduleOptions.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(option.date)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    selectedDate === option.date 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800">{option.date}</p>
                      <p className="text-sm text-slate-500">{option.time}</p>
                    </div>
                    {selectedDate === option.date && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button 
              onClick={handleReschedule}
              className="w-full py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <RotateCw size={18} />
              Confirm Reschedule
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionSchedule;
