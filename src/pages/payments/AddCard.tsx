import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddCard: React.FC = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/payments');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm sticky top-0 z-10 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-slate-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-800">Add Payment Method</h1>
      </div>

      <div className="p-6">
        {/* Card Preview */}
        <div className="w-full aspect-[1.586] bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl p-6 relative overflow-hidden shadow-2xl mb-8">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="relative z-10 flex flex-col justify-between h-full text-white">
            <div className="flex justify-between items-start">
              <CreditCard size={32} className="opacity-80" />
              <div className="font-mono text-lg font-bold italic opacity-60">VISA</div>
            </div>
            <div>
              <div className="font-mono text-xl tracking-widest mb-2">•••• •••• •••• ••••</div>
              <div className="flex justify-between items-end">
                <div className="text-xs opacity-70">CARD HOLDER NAME</div>
                <div className="text-xs opacity-70">MM/YY</div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <Input label="Card Number" placeholder="0000 0000 0000 0000" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Expiry Date" placeholder="MM/YY" />
            <Input label="CVV" placeholder="123" icon={Lock} />
          </div>
          <Input label="Cardholder Name" placeholder="e.g. Alexandros Pappas" />

          <div className="flex items-center gap-2 mb-6">
            <div className="w-5 h-5 rounded border border-slate-300 bg-white flex items-center justify-center text-blue-600">
              <Check size={14} />
            </div>
            <span className="text-xs text-slate-500">Save this card securely for future payments</span>
          </div>

          <button 
            type="submit"
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? 'Verifying...' : 'Save Card'}
          </button>
        </form>
      </div>
    </div>
  );
};

const Input: React.FC<{ label: string, placeholder: string, icon?: React.ElementType }> = ({ label, placeholder, icon: Icon }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{label}</label>
    <div className="relative">
      <input 
        type="text" 
        placeholder={placeholder}
        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-300"
      />
      {Icon && <Icon className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />}
    </div>
  </div>
);

export default AddCard;
