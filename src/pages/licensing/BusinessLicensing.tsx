import React, { useState } from 'react';
import { ArrowLeft, Store, Music, Utensils, Megaphone, FileText, ChevronRight, CheckCircle2, Clock, AlertCircle, X, Upload, Calendar, Euro, MapPin, Building, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface LicenseType {
  id: string;
  name: string;
  nameGr: string;
  description: string;
  icon: React.ElementType;
  color: string;
  fee: string;
  duration: string;
  processingTime: string;
  requirements: string[];
}

interface License {
  id: string;
  typeId: string;
  typeName: string;
  businessName: string;
  address: string;
  status: 'active' | 'pending' | 'expired' | 'rejected';
  issueDate?: string;
  expiryDate?: string;
  applicationDate?: string;
  licenseNumber?: string;
}

const BusinessLicensing: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'licenses' | 'apply' | 'renew'>('licenses');
  const [selectedLicenseType, setSelectedLicenseType] = useState<LicenseType | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationStep, setApplicationStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null);

  const licenseTypes: LicenseType[] = [
    {
      id: 'outdoor-seating',
      name: 'Outdoor Seating Permit',
      nameGr: 'Άδεια Τραπεζοκαθισμάτων',
      description: 'Permit for placing tables and chairs on public sidewalks',
      icon: Store,
      color: '#22c55e',
      fee: '€50-500/year',
      duration: '1 year',
      processingTime: '10-20 days',
      requirements: ['Business license', 'Floor plan', 'Insurance certificate', 'Tax clearance']
    },
    {
      id: 'music',
      name: 'Music/Entertainment License',
      nameGr: 'Άδεια Μουσικής',
      description: 'Permit for playing music and hosting entertainment',
      icon: Music,
      color: '#8b5cf6',
      fee: '€100-300/year',
      duration: '1 year',
      processingTime: '15-30 days',
      requirements: ['Business license', 'Soundproofing certificate', 'Neighbor consent', 'Fire safety certificate']
    },
    {
      id: 'food',
      name: 'Food Service License',
      nameGr: 'Άδεια Υγειονομικού Ενδιαφέροντος',
      description: 'Health permit for restaurants, cafes, and food businesses',
      icon: Utensils,
      color: '#f59e0b',
      fee: '€150-400',
      duration: 'Indefinite',
      processingTime: '20-40 days',
      requirements: ['Health inspection', 'HACCP certification', 'Staff health cards', 'Floor plan']
    },
    {
      id: 'advertising',
      name: 'Advertising Sign Permit',
      nameGr: 'Άδεια Διαφημιστικής Πινακίδας',
      description: 'Permit for outdoor advertising signs and banners',
      icon: Megaphone,
      color: '#ef4444',
      fee: '€30-200/year',
      duration: '1 year',
      processingTime: '10-20 days',
      requirements: ['Sign design/dimensions', 'Location photos', 'Property owner consent']
    },
    {
      id: 'market',
      name: 'Market Stall License',
      nameGr: 'Άδεια Λαϊκής Αγοράς',
      description: 'Permit for selling at farmers markets',
      icon: Building,
      color: '#3b82f6',
      fee: '€50-200/year',
      duration: '1 year',
      processingTime: '7-14 days',
      requirements: ['Producer certificate', 'Tax registration', 'Health certificate (for food)']
    }
  ];

  const myLicenses: License[] = [
    {
      id: 'LIC-2024-001',
      typeId: 'outdoor-seating',
      typeName: 'Outdoor Seating Permit',
      businessName: 'Καφέ Παραλία',
      address: 'Ναυαρίνου 45, Καλαμάτα',
      status: 'active',
      issueDate: '15 Mar 2024',
      expiryDate: '14 Mar 2025',
      licenseNumber: 'ΤΡΠ-2024-0123'
    },
    {
      id: 'LIC-2024-002',
      typeId: 'music',
      typeName: 'Music License',
      businessName: 'Καφέ Παραλία',
      address: 'Ναυαρίνου 45, Καλαμάτα',
      status: 'pending',
      applicationDate: '1 Dec 2024'
    },
    {
      id: 'LIC-2023-015',
      typeId: 'food',
      typeName: 'Food Service License',
      businessName: 'Καφέ Παραλία',
      address: 'Ναυαρίνου 45, Καλαμάτα',
      status: 'active',
      issueDate: '10 Jun 2023',
      licenseNumber: 'ΥΓ-2023-0456'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600', label: 'Active' };
      case 'pending':
        return { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600', label: 'Pending' };
      case 'expired':
        return { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600', label: 'Expired' };
      case 'rejected':
        return { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600', label: 'Rejected' };
      default:
        return { bg: 'bg-zinc-100', text: 'text-zinc-600', label: status };
    }
  };

  const getLicenseTypeInfo = (typeId: string) => {
    return licenseTypes.find(t => t.id === typeId);
  };

  const handleSubmitApplication = () => {
    if (applicationStep < 4) {
      setApplicationStep(applicationStep + 1);
    } else {
      setShowApplicationForm(false);
      setShowSuccess(true);
      setApplicationStep(1);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const expiringLicenses = myLicenses.filter(l => {
    if (l.status !== 'active' || !l.expiryDate) return false;
    const expiry = new Date(l.expiryDate);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 90;
  });

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark relative">
      {/* Header */}
      <div className="bg-white dark:bg-surface-dark px-4 pt-12 pb-4 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-20">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="text-zinc-500 dark:text-zinc-400">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Business Licensing</h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Permits & licenses</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-xl p-1">
          {[
            { key: 'licenses', label: 'My Licenses' },
            { key: 'apply', label: 'Apply New' },
            { key: 'renew', label: 'Renew' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key 
                  ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-sm' 
                  : 'text-zinc-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-24">
        {/* My Licenses Tab */}
        {activeTab === 'licenses' && (
          <div className="space-y-3">
            {myLicenses.length === 0 ? (
              <div className="text-center py-12">
                <FileText size={48} className="mx-auto text-zinc-300 dark:text-zinc-600 mb-3" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">No Licenses</h3>
                <p className="text-sm text-zinc-500">Apply for your first license</p>
                <button 
                  onClick={() => setActiveTab('apply')}
                  className="mt-4 px-6 py-2 bg-accent text-white rounded-xl font-medium"
                >
                  Apply Now
                </button>
              </div>
            ) : (
              myLicenses.map(license => {
                const status = getStatusBadge(license.status);
                const typeInfo = getLicenseTypeInfo(license.typeId);
                const Icon = typeInfo?.icon || FileText;
                
                return (
                  <button
                    key={license.id}
                    onClick={() => setSelectedLicense(license)}
                    className="w-full bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4 text-left"
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${typeInfo?.color || '#6b7280'}20` }}
                      >
                        <Icon size={24} style={{ color: typeInfo?.color || '#6b7280' }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{license.typeName}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${status.bg} ${status.text}`}>
                            {status.label}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-0.5">{license.businessName}</p>
                        {license.licenseNumber && (
                          <p className="text-xs text-zinc-400 mt-1">#{license.licenseNumber}</p>
                        )}
                        {license.expiryDate && license.status === 'active' && (
                          <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                            <Calendar size={12} />
                            Expires: {license.expiryDate}
                          </p>
                        )}
                        {license.status === 'pending' && (
                          <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                            <Clock size={12} />
                            Applied: {license.applicationDate}
                          </p>
                        )}
                      </div>
                      <ChevronRight size={20} className="text-zinc-300 dark:text-zinc-600" />
                    </div>
                  </button>
                );
              })
            )}
          </div>
        )}

        {/* Apply New Tab */}
        {activeTab === 'apply' && (
          <div className="space-y-3">
            <p className="text-sm text-zinc-500 mb-4">Select the type of license you need</p>
            
            {licenseTypes.map(type => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedLicenseType(type)}
                  className="w-full bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4 text-left"
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${type.color}20` }}
                    >
                      <Icon size={24} style={{ color: type.color }} />
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
              );
            })}
          </div>
        )}

        {/* Renew Tab */}
        {activeTab === 'renew' && (
          <div className="space-y-3">
            {expiringLicenses.length === 0 ? (
              <div className="text-center py-12">
                <RefreshCw size={48} className="mx-auto text-zinc-300 dark:text-zinc-600 mb-3" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">No Renewals Needed</h3>
                <p className="text-sm text-zinc-500">All your licenses are up to date</p>
              </div>
            ) : (
              <>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={18} className="text-amber-600" />
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      {expiringLicenses.length} license(s) expiring soon
                    </p>
                  </div>
                </div>
                
                {expiringLicenses.map(license => {
                  const typeInfo = getLicenseTypeInfo(license.typeId);
                  const Icon = typeInfo?.icon || FileText;
                  
                  return (
                    <div
                      key={license.id}
                      className="bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${typeInfo?.color || '#6b7280'}20` }}
                        >
                          <Icon size={24} style={{ color: typeInfo?.color || '#6b7280' }} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 dark:text-white">{license.typeName}</h3>
                          <p className="text-xs text-zinc-500">{license.businessName}</p>
                          <p className="text-xs text-red-500 mt-1">Expires: {license.expiryDate}</p>
                        </div>
                      </div>
                      <button className="w-full py-2.5 bg-accent text-white rounded-xl font-semibold text-sm">
                        Renew Now
                      </button>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>

      {/* License Type Detail Modal */}
      <AnimatePresence>
        {selectedLicenseType && !showApplicationForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-end"
            onClick={() => setSelectedLicenseType(null)}
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
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${selectedLicenseType.color}20` }}
                    >
                      <selectedLicenseType.icon size={28} style={{ color: selectedLicenseType.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">{selectedLicenseType.nameGr}</h3>
                      <p className="text-xs text-zinc-500">{selectedLicenseType.name}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedLicenseType(null)} className="p-2 text-zinc-400">
                    <X size={20} />
                  </button>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  {selectedLicenseType.description}
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3 text-center">
                    <Euro size={18} className="mx-auto text-accent mb-1" />
                    <p className="text-xs text-zinc-500">Fee</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{selectedLicenseType.fee}</p>
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3 text-center">
                    <Calendar size={18} className="mx-auto text-accent mb-1" />
                    <p className="text-xs text-zinc-500">Duration</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{selectedLicenseType.duration}</p>
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3 text-center">
                    <Clock size={18} className="mx-auto text-accent mb-1" />
                    <p className="text-xs text-zinc-500">Processing</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{selectedLicenseType.processingTime}</p>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-4">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Required Documents</h4>
                  <div className="space-y-2">
                    {selectedLicenseType.requirements.map((req, idx) => (
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

      {/* License Detail Modal */}
      <AnimatePresence>
        {selectedLicense && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-end"
            onClick={() => setSelectedLicense(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onClick={e => e.stopPropagation()}
              className="w-full bg-white dark:bg-surface-dark rounded-t-3xl"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 dark:text-white">License Details</h3>
                  <button onClick={() => setSelectedLicense(null)} className="p-2 text-zinc-400">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-500">Type</span>
                    <span className="font-medium text-slate-900 dark:text-white">{selectedLicense.typeName}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-500">Business</span>
                    <span className="font-medium text-slate-900 dark:text-white">{selectedLicense.businessName}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-500">Address</span>
                    <span className="font-medium text-slate-900 dark:text-white text-right text-sm">{selectedLicense.address}</span>
                  </div>
                  {selectedLicense.licenseNumber && (
                    <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                      <span className="text-zinc-500">License #</span>
                      <span className="font-medium text-slate-900 dark:text-white">{selectedLicense.licenseNumber}</span>
                    </div>
                  )}
                  {selectedLicense.issueDate && (
                    <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                      <span className="text-zinc-500">Issue Date</span>
                      <span className="font-medium text-slate-900 dark:text-white">{selectedLicense.issueDate}</span>
                    </div>
                  )}
                  {selectedLicense.expiryDate && (
                    <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                      <span className="text-zinc-500">Expiry Date</span>
                      <span className="font-medium text-slate-900 dark:text-white">{selectedLicense.expiryDate}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 space-y-2">
                  {selectedLicense.status === 'active' && (
                    <>
                      <button className="w-full py-3 bg-accent text-white font-semibold rounded-xl">
                        Download License PDF
                      </button>
                      <button className="w-full py-3 bg-zinc-100 dark:bg-zinc-800 text-slate-900 dark:text-white font-semibold rounded-xl">
                        Request Amendment
                      </button>
                    </>
                  )}
                  {selectedLicense.status === 'pending' && (
                    <button className="w-full py-3 bg-amber-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2">
                      <Clock size={18} />
                      Application Under Review
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Application Form Modal */}
      <AnimatePresence>
        {showApplicationForm && selectedLicenseType && (
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
                <h2 className="font-bold text-slate-900 dark:text-white text-sm">{selectedLicenseType.nameGr}</h2>
                <div className="w-6" />
              </div>
              
              {/* Progress */}
              <div className="flex gap-2">
                {[1, 2, 3, 4].map(step => (
                  <div 
                    key={step}
                    className={`flex-1 h-1 rounded-full ${
                      step <= applicationStep ? 'bg-accent' : 'bg-zinc-200 dark:bg-zinc-700'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-zinc-500 mt-2">Step {applicationStep} of 4</p>
            </div>

            {/* Form Content */}
            <div className="flex-1 p-4 overflow-y-auto">
              {applicationStep === 1 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Business Information</h3>
                  
                  <div>
                    <label className="text-xs font-medium text-zinc-500 mb-1 block">Business Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter business name"
                      className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-zinc-500 mb-1 block">Tax ID (AFM)</label>
                    <input 
                      type="text" 
                      placeholder="Enter AFM"
                      className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-zinc-500 mb-1 block">Business Address</label>
                    <input 
                      type="text" 
                      placeholder="Enter address"
                      className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-zinc-500 mb-1 block">Contact Phone</label>
                    <input 
                      type="tel" 
                      placeholder="+30 XXX XXX XXXX"
                      className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0"
                    />
                  </div>
                </div>
              )}

              {applicationStep === 2 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">License Details</h3>
                  
                  {selectedLicenseType.id === 'outdoor-seating' && (
                    <>
                      <div>
                        <label className="text-xs font-medium text-zinc-500 mb-1 block">Number of Tables</label>
                        <input 
                          type="number" 
                          placeholder="0"
                          className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-zinc-500 mb-1 block">Number of Chairs</label>
                        <input 
                          type="number" 
                          placeholder="0"
                          className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-zinc-500 mb-1 block">Area (m²)</label>
                        <input 
                          type="number" 
                          placeholder="0"
                          className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0"
                        />
                      </div>
                    </>
                  )}
                  
                  {selectedLicenseType.id === 'music' && (
                    <>
                      <div>
                        <label className="text-xs font-medium text-zinc-500 mb-1 block">Music Type</label>
                        <select className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0">
                          <option>Background Music</option>
                          <option>Live Music</option>
                          <option>DJ/Club</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-zinc-500 mb-1 block">Operating Hours</label>
                        <div className="flex gap-2">
                          <input type="time" className="flex-1 px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0" />
                          <span className="py-3">to</span>
                          <input type="time" className="flex-1 px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {applicationStep === 3 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Upload Documents</h3>
                  
                  {selectedLicenseType.requirements.map((req, idx) => (
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

              {applicationStep === 4 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Review & Pay</h3>
                  
                  <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">License Type</span>
                      <span className="font-medium text-slate-900 dark:text-white">{selectedLicenseType.nameGr}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">Processing Time</span>
                      <span className="font-medium text-slate-900 dark:text-white">{selectedLicenseType.processingTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">Duration</span>
                      <span className="font-medium text-slate-900 dark:text-white">{selectedLicenseType.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-zinc-200 dark:border-zinc-700">
                      <span className="text-zinc-500">Fee</span>
                      <span className="font-bold text-accent">{selectedLicenseType.fee}</span>
                    </div>
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
                {applicationStep === 4 ? 'Pay & Submit' : 'Continue'}
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
              <p className="text-sm opacity-90">You'll receive updates via email</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BusinessLicensing;
