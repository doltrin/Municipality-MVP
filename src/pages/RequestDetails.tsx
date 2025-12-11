import React from 'react';
import { ArrowLeft, CheckCircle, Clock, MapPin } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const RequestDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - in a real app fetch by ID
  const request = {
    id: id || 'REQ-2025-892',
    type: 'Pothole Repair',
    status: 'In Progress',
    date: 'Oct 24, 2025 - 10:30 AM',
    location: 'Ag. Meletiou 132, Athens',
    description: 'Large pothole in the middle of the road causing traffic issues.',
    updates: [
      { status: 'Received', date: 'Oct 24, 10:30 AM', active: true },
      { status: 'Investigating', date: 'Oct 24, 02:15 PM', active: true },
      { status: 'Scheduled', date: 'Oct 25, 09:00 AM', active: false },
      { status: 'Completed', date: 'Pending', active: false },
    ]
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-slate-600">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Request Details</h1>
            <p className="text-xs text-slate-400 font-mono">{request.id}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Status Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
            <Clock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-1">{request.status}</h2>
          <p className="text-slate-500 text-sm">Estimated completion: 2 days</p>
        </div>

        {/* Info */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Category</label>
            <div className="font-bold text-slate-800">{request.type}</div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location</label>
            <div className="flex items-center gap-2 text-slate-800 mt-1">
              <MapPin size={16} className="text-red-500" />
              <span>{request.location}</span>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Description</label>
            <p className="text-slate-600 text-sm mt-1 leading-relaxed">{request.description}</p>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="font-bold text-slate-800 mb-4">Timeline</h3>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
            {request.updates.map((update, idx) => (
              <div key={idx} className="flex gap-4 relative">
                {/* Line */}
                {idx !== request.updates.length - 1 && (
                  <div className={`absolute left-[11px] top-6 bottom-[-24px] w-0.5 ${update.active ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
                )}
                
                <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 flex-shrink-0 ${update.active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-200 text-slate-400'}`}>
                  {update.active ? <CheckCircle size={14} /> : <div className="w-2 h-2 bg-slate-400 rounded-full"></div>}
                </div>
                
                <div>
                  <div className={`font-bold text-sm ${update.active ? 'text-slate-800' : 'text-slate-400'}`}>{update.status}</div>
                  <div className="text-xs text-slate-400">{update.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
