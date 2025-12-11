import React, { useState } from 'react';
import { ArrowLeft, FileText, CheckCircle, Clock, AlertCircle, Download, ChevronRight, ChevronDown, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PermitDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const applications = [
    { 
      id: 'PMT-2025-001', 
      type: 'Outdoor Seating', 
      status: 'Approved', 
      date: 'Oct 20, 2025', 
      color: 'text-green-600 bg-green-100',
      details: {
        location: 'Ag. Meletiou 132',
        sqm: '12 sq.m.',
        expiry: 'Oct 20, 2026'
      }
    },
    { 
      id: 'PMT-2025-042', 
      type: 'Business License Renewal', 
      status: 'In Review', 
      date: 'Oct 24, 2025', 
      color: 'text-blue-600 bg-blue-100',
      details: {
        location: 'Kypselis 45',
        type: 'Retail Store',
        assignee: 'D. Papadopoulos'
      }
    },
    { 
      id: 'URB-2025-113', 
      type: 'Building Permit (Small Scale)', 
      status: 'Action Required', 
      date: 'Oct 15, 2025', 
      color: 'text-orange-600 bg-orange-100',
      details: {
        location: 'Fokionos Negri 12',
        issue: 'Missing Site Plan',
        deadline: 'Nov 1, 2025'
      }
    },
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-slate-600">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold text-slate-800">Permits & Licenses</h1>
          </div>
          <button 
            onClick={() => navigate('/permits/new')}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg shadow-orange-500/20 active:scale-95 transition-transform"
          >
            + New Application
          </button>
        </div>
        
        <div className="flex gap-4 mb-2">
          <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
            <div className="text-lg font-bold text-slate-800">3</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold">Active</div>
          </div>
          <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
            <div className="text-lg font-bold text-slate-800">12</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold">History</div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4 pb-20">
        <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">My Applications</h2>
        
        {applications.map((app) => (
          <div key={app.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 transition-all duration-300">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold mb-2 ${app.color}`}>
                  {app.status === 'Approved' && <CheckCircle size={10} />}
                  {app.status === 'In Review' && <Clock size={10} />}
                  {app.status === 'Action Required' && <AlertCircle size={10} />}
                  <span>{app.status}</span>
                </div>
                <h3 className="font-bold text-slate-800">{app.type}</h3>
                <p className="text-xs text-slate-400 font-mono mt-1">Ref: {app.id}</p>
              </div>
              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
                <FileText size={20} />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <span className="text-xs text-slate-400">Submitted: {app.date}</span>
              {app.status === 'Approved' ? (
                <button className="flex items-center gap-1 text-green-600 text-xs font-bold hover:text-green-700 transition-colors">
                  <Download size={14} />
                  Download PDF
                </button>
              ) : (
                <button 
                  onClick={() => toggleExpand(app.id)}
                  className="flex items-center gap-1 text-blue-600 text-xs font-bold hover:text-blue-700 transition-colors"
                >
                  {expandedId === app.id ? 'Hide Details' : 'View Details'}
                  {expandedId === app.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
              )}
            </div>

            {/* Expanded Details */}
            {expandedId === app.id && (
              <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <div className="text-slate-400 mb-1 flex items-center gap-1">
                      <MapPin size={10} /> Location
                    </div>
                    <div className="font-bold text-slate-700">{app.details.location}</div>
                  </div>
                  {app.details.expiry && (
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <div className="text-slate-400 mb-1 flex items-center gap-1">
                        <Calendar size={10} /> Expiry
                      </div>
                      <div className="font-bold text-slate-700">{app.details.expiry}</div>
                    </div>
                  )}
                  {app.details.issue && (
                    <div className="bg-red-50 p-2 rounded-lg col-span-2">
                      <div className="text-red-500 mb-1 font-bold flex items-center gap-1">
                        <AlertCircle size={10} /> Action Required
                      </div>
                      <div className="text-slate-700">{app.details.issue}</div>
                      <div className="text-red-500 mt-1 font-medium">Due by {app.details.deadline}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermitDashboard;
