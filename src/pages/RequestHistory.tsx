import React, { useState } from 'react';
import { ArrowLeft, Clock, CheckCircle, Filter, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RequestHistory: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  const requests = [
    { id: 'REQ-2025-892', type: 'Pothole Repair', status: 'In Progress', date: 'Oct 24, 2025', location: 'Ag. Meletiou 132' },
    { id: 'REQ-2025-741', type: 'Bulky Waste Pickup', status: 'Scheduled', date: 'Oct 22, 2025', location: 'Home Address' },
    { id: 'REQ-2025-103', type: 'Street Light Repair', status: 'Completed', date: 'Oct 10, 2025', location: 'Park Entrance' },
    { id: 'REQ-2025-055', type: 'Bin Replacement', status: 'Completed', date: 'Sep 28, 2025', location: 'Home Address' },
  ];

  const filteredRequests = requests.filter(req => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Active') return req.status === 'In Progress' || req.status === 'Scheduled';
    if (activeFilter === 'Completed') return req.status === 'Completed';
    return true;
  });

  return (
    <div className="flex flex-col min-h-full bg-slate-50 pb-20">
      <div className="bg-white px-6 pt-12 pb-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-slate-600">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold text-slate-800">My Requests</h1>
          </div>
          <button className="p-2 bg-slate-100 rounded-full text-slate-600">
            <Filter size={20} />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {['All', 'Active', 'Completed'].map((filter) => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${activeFilter === filter ? 'bg-slate-800 text-white shadow-lg shadow-slate-800/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-4 min-h-[60vh]">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((req) => (
            <button 
              key={req.id} 
              onClick={() => navigate(`/requests/details/${req.id}`)}
              className="w-full text-left bg-white p-5 rounded-2xl shadow-sm border border-slate-100 active:scale-[0.99] transition-transform group"
            >
              <div className="flex justify-between items-start mb-2">
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide
                  ${req.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                    req.status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                  {req.status === 'Completed' ? <CheckCircle size={12} /> : <Clock size={12} />}
                  {req.status}
                </div>
                <span className="text-[10px] text-slate-400 font-mono">{req.id}</span>
              </div>
              
              <h3 className="font-bold text-slate-800 text-lg mb-1">{req.type}</h3>
              <p className="text-sm text-slate-500 mb-4 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                {req.location}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="text-xs text-slate-400">Submitted on {req.date}</span>
                <div className="flex items-center gap-1 text-blue-600 text-xs font-bold group-hover:translate-x-1 transition-transform">
                  Details <ChevronRight size={14} />
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Filter size={24} />
            </div>
            <p className="text-sm font-medium">No requests found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestHistory;
