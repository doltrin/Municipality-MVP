import React, { useState } from 'react';
import { ArrowLeft, Building, FileText, Map, ChevronRight, CheckCircle2, Clock, AlertCircle, X, Upload, Calendar, Euro, MapPin, Search, Filter, Eye, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface PermitType {
  id: string;
  name: string;
  nameGr: string;
  description: string;
  fee: string;
  processingTime: string;
  requirements: string[];
}

interface Permit {
  id: string;
  typeId: string;
  typeName: string;
  address: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'revision_required';
  submittedDate?: string;
  lastUpdate: string;
  permitNumber?: string;
  inspector?: string;
  nextStep?: string;
}

const UrbanPlanning: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'permits' | 'apply' | 'map'>('permits');
  const [selectedPermitType, setSelectedPermitType] = useState<PermitType | null>(null);
  const [selectedPermit, setSelectedPermit] = useState<Permit | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationStep, setApplicationStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const permitTypes: PermitType[] = [
    {
      id: 'building',
      name: 'Building Permit',
      nameGr: 'Άδεια Δόμησης',
      description: 'Full construction permit for new buildings or major additions',
      fee: '€500-5,000+',
      processingTime: '30-90 days',
      requirements: ['Architectural plans', 'Structural study', 'Land ownership proof', 'Topographic survey', 'Energy efficiency study']
    },
    {
      id: 'renovation',
      name: 'Renovation Permit',
      nameGr: 'Άδεια Ανακαίνισης',
      description: 'Minor works, interior renovations, and facade changes',
      fee: '€100-500',
      processingTime: '15-30 days',
      requirements: ['Work description', 'Floor plans', 'Photos of current state', 'Contractor details']
    },
    {
      id: 'demolition',
      name: 'Demolition Permit',
      nameGr: 'Άδεια Κατεδάφισης',
      description: 'Authorization to demolish existing structures',
      fee: '€200-1,000',
      processingTime: '30-45 days',
      requirements: ['Structural assessment', 'Asbestos survey', 'Demolition plan', 'Waste management plan']
    },
    {
      id: 'land-use',
      name: 'Land Use Certificate',
      nameGr: 'Βεβαίωση Χρήσης Γης',
      description: 'Verification of permitted land uses and zoning',
      fee: '€20',
      processingTime: '5-10 days',
      requirements: ['Property coordinates', 'Cadastral reference', 'ID copy']
    },
    {
      id: 'encroachment',
      name: 'Sidewalk Encroachment',
      nameGr: 'Άδεια Κατάληψης Πεζοδρομίου',
      description: 'Temporary use of public sidewalk for construction',
      fee: '€50-200',
      processingTime: '7-14 days',
      requirements: ['Site plan', 'Duration estimate', 'Safety measures', 'Insurance']
    }
  ];

  const myPermits: Permit[] = [
    {
      id: 'PRM-2024-001',
      typeId: 'building',
      typeName: 'Building Permit',
      address: 'Αριστομένους 120, Καλαμάτα',
      status: 'under_review',
      submittedDate: '15 Nov 2024',
      lastUpdate: '5 Dec 2024',
      inspector: 'Κ. Παπαδόπουλος',
      nextStep: 'Site inspection scheduled for Dec 15'
    },
    {
      id: 'PRM-2024-002',
      typeId: 'renovation',
      typeName: 'Renovation Permit',
      address: 'Φαρών 45, Καλαμάτα',
      status: 'approved',
      submittedDate: '1 Oct 2024',
      lastUpdate: '20 Oct 2024',
      permitNumber: 'ΑΝ-2024-0892'
    },
    {
      id: 'PRM-2024-003',
      typeId: 'land-use',
      typeName: 'Land Use Certificate',
      address: 'ΟΤ 234, Μεσσήνη',
      status: 'revision_required',
      submittedDate: '28 Nov 2024',
      lastUpdate: '3 Dec 2024',
      nextStep: 'Please provide updated cadastral reference'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600', label: 'Approved' };
      case 'under_review':
        return { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600', label: 'Under Review' };
      case 'submitted':
        return { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600', label: 'Submitted' };
      case 'revision_required':
        return { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600', label: 'Revision Required' };
      case 'rejected':
        return { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600', label: 'Rejected' };
      case 'draft':
        return { bg: 'bg-zinc-100 dark:bg-zinc-800', text: 'text-zinc-600', label: 'Draft' };
      default:
        return { bg: 'bg-zinc-100', text: 'text-zinc-600', label: status };
    }
  };

  const handleSubmitApplication = () => {
    if (applicationStep < 5) {
      setApplicationStep(applicationStep + 1);
    } else {
      setShowApplicationForm(false);
      setShowSuccess(true);
      setApplicationStep(1);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark relative">
      {/* Header */}
      <div className="bg-white dark:bg-surface-dark px-4 pt-12 pb-4 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-20">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="text-zinc-500 dark:text-zinc-400">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Urban Planning</h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Permits & land use</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-xl p-1">
          {[
            { key: 'permits', label: 'My Permits', icon: FileText },
            { key: 'apply', label: 'Apply', icon: Building },
            { key: 'map', label: 'Zoning Map', icon: Map }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 transition-colors ${
                activeTab === tab.key 
                  ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-sm' 
                  : 'text-zinc-500'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-24">
        {/* My Permits Tab */}
        {activeTab === 'permits' && (
          <div className="space-y-3">
            {myPermits.length === 0 ? (
              <div className="text-center py-12">
                <FileText size={48} className="mx-auto text-zinc-300 dark:text-zinc-600 mb-3" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">No Permits</h3>
                <p className="text-sm text-zinc-500">Start a new permit application</p>
                <button 
                  onClick={() => setActiveTab('apply')}
                  className="mt-4 px-6 py-2 bg-accent text-white rounded-xl font-medium"
                >
                  Apply Now
                </button>
              </div>
            ) : (
              myPermits.map(permit => {
                const status = getStatusBadge(permit.status);
                
                return (
                  <button
                    key={permit.id}
                    onClick={() => setSelectedPermit(permit)}
                    className="w-full bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4 text-left"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">{permit.typeName}</h3>
                        <p className="text-xs text-zinc-500">{permit.id}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${status.bg} ${status.text}`}>
                        {status.label}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-zinc-500 mb-2">
                      <MapPin size={12} />
                      {permit.address}
                    </div>

                    {permit.nextStep && (
                      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-2 mt-2">
                        <p className="text-xs text-amber-700 dark:text-amber-300 flex items-start gap-1">
                          <AlertCircle size={12} className="mt-0.5 shrink-0" />
                          {permit.nextStep}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                      <span className="text-xs text-zinc-400">Updated: {permit.lastUpdate}</span>
                      <ChevronRight size={16} className="text-zinc-300" />
                    </div>
                  </button>
                );
              })
            )}
          </div>
        )}

        {/* Apply Tab */}
        {activeTab === 'apply' && (
          <div className="space-y-3">
            <div className="relative mb-4">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="text"
                placeholder="Search permit types..."
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm"
              />
            </div>

            {permitTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setSelectedPermitType(type)}
                className="w-full bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4 text-left"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Building size={24} className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{type.nameGr}</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">{type.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-accent font-semibold flex items-center gap-1">
                        <Euro size={12} />
                        {type.fee}
                      </span>
                      <span className="text-xs text-zinc-400 flex items-center gap-1">
                        <Clock size={12} />
                        {type.processingTime}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-zinc-300 dark:text-zinc-600" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Zoning Map Tab */}
        {activeTab === 'map' && (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="text"
                placeholder="Search address or parcel..."
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm"
              />
            </div>

            {/* Map Placeholder */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
              <svg viewBox="0 0 400 300" className="w-full">
                {/* Background */}
                <rect width="400" height="300" fill="#f0fdf4" className="dark:fill-zinc-900" />
                
                {/* Zoning Areas */}
                <rect x="20" y="20" width="120" height="100" fill="#bbf7d0" stroke="#22c55e" strokeWidth="2" rx="4" />
                <text x="80" y="75" textAnchor="middle" fontSize="12" fill="#166534">Residential</text>
                
                <rect x="160" y="20" width="100" height="80" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="4" />
                <text x="210" y="65" textAnchor="middle" fontSize="12" fill="#92400e">Commercial</text>
                
                <rect x="280" y="20" width="100" height="120" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="4" />
                <text x="330" y="85" textAnchor="middle" fontSize="12" fill="#1e40af">Mixed Use</text>
                
                <rect x="20" y="140" width="80" height="80" fill="#fecaca" stroke="#ef4444" strokeWidth="2" rx="4" />
                <text x="60" y="185" textAnchor="middle" fontSize="12" fill="#991b1b">Industrial</text>
                
                <rect x="120" y="120" width="140" height="100" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" rx="4" />
                <text x="190" y="175" textAnchor="middle" fontSize="12" fill="#3730a3">Public</text>
                
                <rect x="280" y="160" width="100" height="80" fill="#d1fae5" stroke="#10b981" strokeWidth="2" rx="4" />
                <text x="330" y="205" textAnchor="middle" fontSize="12" fill="#065f46">Green Space</text>
                
                {/* Roads */}
                <line x1="0" y1="240" x2="400" y2="240" stroke="#d1d5db" strokeWidth="8" />
                <line x1="150" y1="0" x2="150" y2="300" stroke="#d1d5db" strokeWidth="6" />
                <line x1="270" y1="0" x2="270" y2="300" stroke="#d1d5db" strokeWidth="6" />
              </svg>
            </div>

            {/* Legend */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Zoning Legend</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { color: '#bbf7d0', label: 'Residential' },
                  { color: '#fef3c7', label: 'Commercial' },
                  { color: '#dbeafe', label: 'Mixed Use' },
                  { color: '#fecaca', label: 'Industrial' },
                  { color: '#e0e7ff', label: 'Public/Institutional' },
                  { color: '#d1fae5', label: 'Green Space' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-3 text-center">
                <Eye size={20} className="mx-auto text-accent mb-1" />
                <span className="text-xs font-medium text-slate-900 dark:text-white">View My Property</span>
              </button>
              <button className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-3 text-center">
                <Download size={20} className="mx-auto text-accent mb-1" />
                <span className="text-xs font-medium text-slate-900 dark:text-white">Download PDF</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Permit Type Detail Modal */}
      <AnimatePresence>
        {selectedPermitType && !showApplicationForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-end"
            onClick={() => setSelectedPermitType(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onClick={e => e.stopPropagation()}
              className="w-full bg-white dark:bg-surface-dark rounded-t-3xl max-h-[85%] overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{selectedPermitType.nameGr}</h3>
                    <p className="text-xs text-zinc-500">{selectedPermitType.name}</p>
                  </div>
                  <button onClick={() => setSelectedPermitType(null)} className="p-2 text-zinc-400">
                    <X size={20} />
                  </button>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  {selectedPermitType.description}
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3 text-center">
                    <Euro size={18} className="mx-auto text-accent mb-1" />
                    <p className="text-xs text-zinc-500">Fee</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{selectedPermitType.fee}</p>
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3 text-center">
                    <Clock size={18} className="mx-auto text-accent mb-1" />
                    <p className="text-xs text-zinc-500">Processing</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{selectedPermitType.processingTime}</p>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-4">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Required Documents</h4>
                  <div className="space-y-2">
                    {selectedPermitType.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <CheckCircle2 size={16} className="text-green-500" />
                        {req}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <button 
                  onClick={() => setShowApplicationForm(true)}
                  className="w-full py-3 bg-accent text-white font-semibold rounded-xl"
                >
                  Start Application
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Permit Detail Modal */}
      <AnimatePresence>
        {selectedPermit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-end"
            onClick={() => setSelectedPermit(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onClick={e => e.stopPropagation()}
              className="w-full bg-white dark:bg-surface-dark rounded-t-3xl max-h-[90%] overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 dark:text-white">Permit Details</h3>
                  <button onClick={() => setSelectedPermit(null)} className="p-2 text-zinc-400">
                    <X size={20} />
                  </button>
                </div>

                {/* Status Banner */}
                {(() => {
                  const status = getStatusBadge(selectedPermit.status);
                  return (
                    <div className={`${status.bg} rounded-xl p-3 mb-4 flex items-center gap-2`}>
                      {selectedPermit.status === 'approved' && <CheckCircle2 size={20} className={status.text} />}
                      {selectedPermit.status === 'under_review' && <Clock size={20} className={status.text} />}
                      {selectedPermit.status === 'revision_required' && <AlertCircle size={20} className={status.text} />}
                      <span className={`font-semibold ${status.text}`}>{status.label}</span>
                    </div>
                  );
                })()}

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-500">Application ID</span>
                    <span className="font-medium text-slate-900 dark:text-white">{selectedPermit.id}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-500">Type</span>
                    <span className="font-medium text-slate-900 dark:text-white">{selectedPermit.typeName}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-500">Address</span>
                    <span className="font-medium text-slate-900 dark:text-white text-right text-sm">{selectedPermit.address}</span>
                  </div>
                  {selectedPermit.permitNumber && (
                    <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                      <span className="text-zinc-500">Permit #</span>
                      <span className="font-medium text-slate-900 dark:text-white">{selectedPermit.permitNumber}</span>
                    </div>
                  )}
                  {selectedPermit.submittedDate && (
                    <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                      <span className="text-zinc-500">Submitted</span>
                      <span className="font-medium text-slate-900 dark:text-white">{selectedPermit.submittedDate}</span>
                    </div>
                  )}
                  {selectedPermit.inspector && (
                    <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                      <span className="text-zinc-500">Inspector</span>
                      <span className="font-medium text-slate-900 dark:text-white">{selectedPermit.inspector}</span>
                    </div>
                  )}
                </div>

                {selectedPermit.nextStep && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-3 mb-4">
                    <h4 className="font-semibold text-amber-900 dark:text-amber-200 text-sm mb-1">Next Step</h4>
                    <p className="text-xs text-amber-700 dark:text-amber-300">{selectedPermit.nextStep}</p>
                  </div>
                )}

                {/* Timeline */}
                <div className="mb-4">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Application Timeline</h4>
                  <div className="space-y-3">
                    {[
                      { date: selectedPermit.submittedDate || 'N/A', event: 'Application Submitted', done: true },
                      { date: selectedPermit.status !== 'submitted' ? '2 days later' : 'Pending', event: 'Initial Review', done: selectedPermit.status !== 'submitted' },
                      { date: selectedPermit.status === 'approved' ? selectedPermit.lastUpdate : 'Pending', event: 'Final Decision', done: selectedPermit.status === 'approved' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.done ? 'bg-green-100 dark:bg-green-900/30' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
                          {item.done ? (
                            <CheckCircle2 size={14} className="text-green-600" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{item.event}</p>
                          <p className="text-xs text-zinc-500">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  {selectedPermit.status === 'approved' && (
                    <button className="w-full py-3 bg-accent text-white font-semibold rounded-xl flex items-center justify-center gap-2">
                      <Download size={18} />
                      Download Permit PDF
                    </button>
                  )}
                  {selectedPermit.status === 'revision_required' && (
                    <button className="w-full py-3 bg-accent text-white font-semibold rounded-xl flex items-center justify-center gap-2">
                      <Upload size={18} />
                      Submit Revision
                    </button>
                  )}
                  <button className="w-full py-3 bg-zinc-100 dark:bg-zinc-800 text-slate-900 dark:text-white font-semibold rounded-xl">
                    Contact Inspector
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Application Form Modal */}
      <AnimatePresence>
        {showApplicationForm && selectedPermitType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white dark:bg-background-dark z-50 flex flex-col"
          >
            {/* Form Header */}
            <div className="bg-white dark:bg-surface-dark px-4 pt-12 pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => { setShowApplicationForm(false); setApplicationStep(1); }} className="text-zinc-500">
                  <X size={24} />
                </button>
                <h2 className="font-bold text-slate-900 dark:text-white text-sm">{selectedPermitType.nameGr}</h2>
                <div className="w-6" />
              </div>
              
              {/* Progress */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(step => (
                  <div 
                    key={step}
                    className={`flex-1 h-1 rounded-full ${
                      step <= applicationStep ? 'bg-accent' : 'bg-zinc-200 dark:bg-zinc-700'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-zinc-500 mt-2">Step {applicationStep} of 5</p>
            </div>

            {/* Form Content */}
            <div className="flex-1 p-4 overflow-y-auto">
              {applicationStep === 1 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Property Information</h3>
                  
                  <div>
                    <label className="text-xs font-medium text-zinc-500 mb-1 block">Property Address</label>
                    <input 
                      type="text" 
                      placeholder="Enter full address"
                      className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-zinc-500 mb-1 block">Cadastral Reference (KAEK)</label>
                    <input 
                      type="text" 
                      placeholder="e.g., 220101234567"
                      className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-zinc-500 mb-1 block">Property Type</label>
                    <select className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0">
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Mixed Use</option>
                      <option>Industrial</option>
                      <option>Land (undeveloped)</option>
                    </select>
                  </div>
                </div>
              )}

              {applicationStep === 2 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Applicant Information</h3>
                  
                  <div>
                    <label className="text-xs font-medium text-zinc-500 mb-1 block">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue="Αλέξανδρος Παππάς"
                      className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-zinc-500 mb-1 block">Tax ID (AFM)</label>
                    <input 
                      type="text" 
                      defaultValue="123456789"
                      className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-zinc-500 mb-1 block">Email</label>
                    <input 
                      type="email" 
                      defaultValue="alex.pappas@email.com"
                      className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-zinc-500 mb-1 block">Phone</label>
                    <input 
                      type="tel" 
                      defaultValue="+30 697 123 4567"
                      className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0"
                    />
                  </div>
                </div>
              )}

              {applicationStep === 3 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Project Details</h3>
                  
                  <div>
                    <label className="text-xs font-medium text-zinc-500 mb-1 block">Project Description</label>
                    <textarea 
                      rows={4}
                      placeholder="Describe the proposed work..."
                      className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0 resize-none"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-zinc-500 mb-1 block">Total Area (m²)</label>
                      <input 
                        type="number" 
                        placeholder="0"
                        className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-zinc-500 mb-1 block">Floors</label>
                      <input 
                        type="number" 
                        placeholder="0"
                        className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-zinc-500 mb-1 block">Estimated Start Date</label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0"
                    />
                  </div>
                </div>
              )}

              {applicationStep === 4 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Upload Documents</h3>
                  
                  {selectedPermitType.requirements.map((req, idx) => (
                    <div key={idx} className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-900 dark:text-white">{req}</span>
                        <button className="px-3 py-1.5 bg-accent text-white text-xs font-medium rounded-lg flex items-center gap-1">
                          <Upload size={14} />
                          Upload
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {applicationStep === 5 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Review & Submit</h3>
                  
                  <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">Permit Type</span>
                      <span className="font-medium text-slate-900 dark:text-white">{selectedPermitType.nameGr}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">Processing Time</span>
                      <span className="font-medium text-slate-900 dark:text-white">{selectedPermitType.processingTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">Documents</span>
                      <span className="font-medium text-green-600">{selectedPermitType.requirements.length} uploaded</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-zinc-200 dark:border-zinc-700">
                      <span className="text-zinc-500">Application Fee</span>
                      <span className="font-bold text-accent">{selectedPermitType.fee}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-3">
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      Your application will be reviewed by the Urban Planning Department. You will receive updates via email and SMS.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="p-4 bg-white dark:bg-surface-dark border-t border-zinc-200 dark:border-zinc-800">
              <button 
                onClick={handleSubmitApplication}
                className="w-full py-4 bg-accent text-white font-bold rounded-xl"
              >
                {applicationStep === 5 ? 'Pay & Submit Application' : 'Continue'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-20 left-4 right-4 bg-green-500 text-white p-4 rounded-xl shadow-lg z-50 flex items-center gap-3"
          >
            <CheckCircle2 size={24} />
            <div>
              <p className="font-bold">Application Submitted!</p>
              <p className="text-sm opacity-90">Reference: PRM-2024-004</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UrbanPlanning;
