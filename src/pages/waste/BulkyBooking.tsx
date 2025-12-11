import React, { useState } from 'react';
import { ArrowLeft, Calendar, Camera, Truck, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BulkyBooking: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-slate-600">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-slate-800">Bulky Waste Pickup</h1>
        </div>
      </div>

      <div className="p-6">
        {step === 1 ? (
          <div className="space-y-6 animate-in slide-in-from-right-8">
            {/* Type Selection */}
            <div className="space-y-3">
              <label className="font-bold text-slate-700">What are you throwing away?</label>
              <div className="grid grid-cols-2 gap-3">
                {['Furniture', 'Appliances', 'Green Waste', 'Construction'].map((type) => (
                  <button key={type} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-green-500 hover:bg-green-50 transition-all text-left">
                    <span className="font-medium text-slate-700">{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Photo */}
            <div className="space-y-3">
              <label className="font-bold text-slate-700">Add a Photo</label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 gap-2 bg-slate-50">
                <Camera size={32} />
                <span className="text-sm">Tap to take picture</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <label className="font-bold text-slate-700">Description</label>
              <textarea 
                className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 min-h-[100px]"
                placeholder="e.g., Old sofa and 2 chairs..."
              />
            </div>

            <button 
              onClick={() => setStep(2)}
              className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-600/30 mt-4"
            >
              Continue
            </button>
          </div>
        ) : step === 2 ? (
          <div className="space-y-6 animate-in slide-in-from-right-8">
             <div className="bg-green-50 p-4 rounded-xl flex items-start gap-3 border border-green-100">
               <Truck className="text-green-600 mt-1" size={20} />
               <div>
                 <h3 className="font-bold text-green-800 text-sm">Pickup Info</h3>
                 <p className="text-xs text-green-700 mt-1">Items must be placed on the curb by 7:00 AM on the scheduled day.</p>
               </div>
             </div>

             <div className="space-y-3">
               <label className="font-bold text-slate-700">Select Date</label>
               <div className="space-y-2">
                 {['Mon, Oct 26', 'Wed, Oct 28', 'Fri, Oct 30'].map((date, idx) => (
                   <button key={date} className={`w-full p-4 rounded-xl border flex justify-between items-center ${idx === 0 ? 'border-green-500 bg-green-50' : 'border-slate-200 bg-white'}`}>
                     <div className="flex items-center gap-3">
                       <Calendar size={18} className={idx === 0 ? 'text-green-600' : 'text-slate-400'} />
                       <span className={`font-medium ${idx === 0 ? 'text-slate-800' : 'text-slate-600'}`}>{date}</span>
                     </div>
                     <span className="text-xs font-bold bg-white px-2 py-1 rounded border border-slate-100">08:00 - 12:00</span>
                   </button>
                 ))}
               </div>
             </div>

             <button 
              onClick={() => setStep(3)}
              className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-600/30 mt-8"
            >
              Confirm Booking
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Booking Confirmed!</h2>
            <p className="text-slate-500 text-center mb-8">Your pickup is scheduled for Mon, Oct 26. You will receive a notification when the truck is nearby.</p>
            <button 
              onClick={() => navigate('/services')}
              className="px-8 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl"
            >
              Back to Services
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkyBooking;
