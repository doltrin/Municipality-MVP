import React, { useState } from 'react';
import { ArrowLeft, CreditCard, AlertTriangle, Check, Receipt, ChevronDown, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentGateway: React.FC = () => {
  const navigate = useNavigate();
  const [payingId, setPayingId] = useState<string | null>(null);
  const [expandedHistoryId, setExpandedHistoryId] = useState<string | null>(null);
  
  const [pendingItems, setPendingItems] = useState([
    { id: 'PN-2025-892', title: 'Illegal Parking', ref: '#PN-2025-892', amount: 45.00, due: 'Due in 3 days' }
  ]);

  const [historyItems, setHistoryItems] = useState([
    { id: 'hist-1', title: 'Municipal Tax 2024', date: 'Sep 15, 2024', amount: 120.00, method: 'Visa **** 4242', ref: 'TAX-2024-001' },
    { id: 'hist-2', title: 'Water Bill Q3', date: 'Aug 02, 2024', amount: 32.50, method: 'Mastercard **** 8899', ref: 'WTR-2024-Q3' },
    { id: 'hist-3', title: 'Building Permit Fee', date: 'Jul 10, 2024', amount: 50.00, method: 'Visa **** 4242', ref: 'PMT-2024-112' },
  ]);

  const totalDue = pendingItems.reduce((sum, item) => sum + item.amount, 0);

  const handlePayAll = () => {
    if (totalDue === 0) return;
    setPayingId('all');
    setTimeout(() => {
      const newHistory = pendingItems.map(item => ({
        id: `new-${Date.now()}-${item.id}`,
        title: item.title,
        date: 'Just now',
        amount: item.amount,
        method: 'Visa **** 4242',
        ref: item.ref
      }));
      setHistoryItems([...newHistory, ...historyItems]);
      setPendingItems([]);
      setPayingId(null);
    }, 2000);
  };

  const handlePayItem = (id: string) => {
    setPayingId(id);
    setTimeout(() => {
      const item = pendingItems.find(i => i.id === id);
      if (item) {
        setHistoryItems([{
          id: `new-${Date.now()}`,
          title: item.title,
          date: 'Just now',
          amount: item.amount,
          method: 'Visa **** 4242',
          ref: item.ref
        }, ...historyItems]);
        setPendingItems(pendingItems.filter(i => i.id !== id));
      }
      setPayingId(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark">
      <div className="bg-primary dark:bg-surface-dark px-6 pt-12 pb-8 rounded-b-[2rem] shadow-lg text-white transition-all duration-500">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Payments</h1>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex justify-between items-center transition-all duration-500">
          <div>
            <p className="text-sm text-slate-300 mb-1">Total Due</p>
            <h2 className={`text-3xl font-bold transition-all duration-500 ${totalDue === 0 ? 'text-green-400' : ''}`}>
              €{totalDue.toFixed(2)}
            </h2>
          </div>
          {totalDue > 0 ? (
            <button 
              onClick={handlePayAll}
              disabled={payingId !== null}
              className="bg-blue-600 px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-600/30 active:scale-95 transition-transform disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {payingId === 'all' ? (
                <span className="animate-pulse">Processing...</span>
              ) : (
                'Pay All'
              )}
            </button>
          ) : (
            <div className="flex items-center gap-2 text-green-400 font-bold bg-green-400/10 px-4 py-2 rounded-xl">
              <Check size={18} />
              <span>All Paid</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6 pb-20">
        {pendingItems.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-orange-500" />
              Pending Payments
            </h3>
            
            <div className="space-y-3">
              {pendingItems.map(item => (
                <div key={item.id} className="bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                      <Receipt size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-500">Ref: {item.ref}</p>
                      <p className="text-xs text-red-500 font-medium mt-1">{item.due}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-800 mb-2">€{item.amount.toFixed(2)}</div>
                    <button 
                      onClick={() => handlePayItem(item.id)}
                      disabled={payingId !== null}
                      className="px-4 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 hover:bg-blue-600 hover:text-white transition-colors disabled:opacity-50"
                    >
                      {payingId === item.id ? '...' : 'Pay'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <HistoryIcon />
            Payment History
          </h3>
          
          <div className="space-y-2">
            {historyItems.map((item) => (
              <div key={item.id} className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                <button 
                  onClick={() => setExpandedHistoryId(expandedHistoryId === item.id ? null : item.id)}
                  className="w-full p-4 flex justify-between items-center hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Check size={14} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-slate-800 text-xs">{item.title}</h4>
                      <p className="text-[10px] text-slate-400">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-600 text-sm">€{item.amount.toFixed(2)}</span>
                    {expandedHistoryId === item.id ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
                  </div>
                </button>
                
                {expandedHistoryId === item.id && (
                  <div className="bg-slate-50 p-4 text-xs border-t border-slate-100 animate-in slide-in-from-top-1">
                     <div className="grid grid-cols-2 gap-2 text-slate-500">
                       <div>Reference:</div>
                       <div className="font-mono text-slate-700 text-right">{item.ref}</div>
                       <div>Payment Method:</div>
                       <div className="text-slate-700 text-right">{item.method}</div>
                       <div>Status:</div>
                       <div className="text-green-600 font-bold text-right flex items-center justify-end gap-1">
                         <Check size={10} /> Completed
                       </div>
                     </div>
                     <button className="w-full mt-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 font-bold flex items-center justify-center gap-2 hover:bg-slate-50">
                       <Receipt size={14} />
                       Download Receipt
                     </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-sm text-slate-700">Saved Cards</span>
            <button 
              onClick={() => navigate('/payments/add-card')}
              className="text-blue-600 text-xs font-bold hover:underline"
            >
              + Add New
            </button>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <CreditCard size={20} className="text-slate-500" />
            <div className="flex-1">
              <div className="text-xs font-bold text-slate-700">Visa ending in 4242</div>
              <div className="text-[10px] text-slate-400">Expires 12/28</div>
            </div>
            <div className="w-4 h-4 rounded-full border-2 border-blue-600 flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HistoryIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
    <path d="M12 7v5l4 2"/>
  </svg>
);

export default PaymentGateway;
