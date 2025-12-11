import React from 'react';
import { ArrowLeft, QrCode, Scale, Trash2, History, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PAYT: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <div className="bg-green-600 px-6 pt-12 pb-8 rounded-b-[2rem] shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-white">Pay-As-You-Throw</h1>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white border border-white/20">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-medium text-green-100">Current Balance</span>
            <div className="bg-white/20 p-1.5 rounded-lg">
              <Scale size={20} />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">12.5 kg</div>
          <div className="text-xs text-green-100">Total waste this month</div>
        </div>
      </div>

      <div className="px-6 -mt-6 space-y-6 pb-20">
        {/* ID Card */}
        <div className="bg-white rounded-2xl shadow-sleek p-6 flex flex-col items-center text-center">
          <div className="w-48 h-48 bg-slate-100 rounded-xl mb-4 flex items-center justify-center">
            <QrCode size={120} className="text-slate-800" />
          </div>
          <h3 className="font-bold text-lg text-slate-800">Alexandros Pappas</h3>
          <p className="text-sm text-slate-500 mb-4">Bin ID: #8492-TR-2025</p>
          <p className="text-xs text-slate-400 max-w-[200px]">Scan this QR code at the smart bin to unlock it and weigh your waste.</p>
        </div>

        {/* History */}
        <div>
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <History size={18} />
            Recent Throws
          </h3>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {[
              { date: 'Oct 23', weight: '2.4 kg', cost: '€0.12' },
              { date: 'Oct 20', weight: '3.1 kg', cost: '€0.15' },
              { date: 'Oct 18', weight: '1.8 kg', cost: '€0.09' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 border-b border-slate-50 last:border-0 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Trash2 size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{item.weight}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Calendar size={10} />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
                <span className="font-mono font-bold text-slate-600">{item.cost}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PAYT;
