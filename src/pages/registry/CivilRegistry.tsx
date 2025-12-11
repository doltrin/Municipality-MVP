import React, { useState } from 'react';
import { ArrowLeft, FileText, Download, Mail, Printer, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CivilRegistry: React.FC = () => {
  const navigate = useNavigate();
  const [issuing, setIssuing] = useState<number | null>(null);

  const handleIssue = (index: number) => {
    setIssuing(index);
    setTimeout(() => {
      setIssuing(null);
      alert("Certificate issued successfully! Downloading PDF...");
    }, 2000);
  };

  const certificates = [
    { title: 'Birth Certificate', type: 'Official', issued: 'Instant' },
    { title: 'Family Status', type: 'Official', issued: 'Instant' },
    { title: 'Residence Certificate', type: 'Official', issued: '24h Processing' },
    { title: 'Citizenship Act', type: 'Copy', issued: 'Instant' },
    { title: 'Naming Act', type: 'Copy', issued: 'Instant' },
  ];

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <div className="bg-blue-600 px-6 pt-12 pb-8 rounded-b-[2rem] shadow-lg text-white">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Civil Registry</h1>
        </div>
        <p className="text-blue-100 text-sm mb-6">Issue official certificates instantly using your digital signature.</p>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex items-center gap-3 border border-white/20">
          <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
            <Check size={20} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-sm">Digital Identity Verified</div>
            <div className="text-xs text-blue-100">Gov.gr / TaxisNet Connected</div>
          </div>
        </div>
      </div>

      <div className="p-6 pb-20">
        <div className="grid grid-cols-1 gap-4">
          {certificates.map((cert, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <FileText size={20} />
                </div>
                <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{cert.issued}</span>
              </div>
              
              <h3 className="font-bold text-slate-800 mb-1">{cert.title}</h3>
              <p className="text-xs text-slate-400 mb-4">Signed digitally by the Municipality</p>

              <div className="flex gap-2 pt-4 border-t border-slate-50">
                <button 
                  onClick={() => handleIssue(idx)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                >
                  {issuing === idx ? (
                    <span className="animate-pulse">Issuing...</span>
                  ) : (
                    <>
                      <Download size={14} />
                      Issue
                    </>
                  )}
                </button>
                <button className="w-10 flex items-center justify-center bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600">
                  <Mail size={16} />
                </button>
                <button className="w-10 flex items-center justify-center bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600">
                  <Printer size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CivilRegistry;
