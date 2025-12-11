import React, { useState } from 'react';
import { ArrowLeft, Heart, Home, Pill, ShoppingBag, Users, Phone, Calendar, FileText, ChevronRight, CheckCircle2, Clock, AlertCircle, X, Upload, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface SocialService {
  id: string;
  name: string;
  nameGr: string;
  description: string;
  icon: React.ElementType;
  color: string;
  requirements: string[];
  processingTime: string;
  status?: 'available' | 'applied' | 'approved' | 'pending';
}

interface Application {
  id: string;
  serviceId: string;
  serviceName: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  submittedDate: string;
  lastUpdate: string;
  caseWorker?: string;
  nextStep?: string;
}

const SocialServices: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'services' | 'applications' | 'appointments'>('services');
  const [selectedService, setSelectedService] = useState<SocialService | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [applicationStep, setApplicationStep] = useState(1);

  const services: SocialService[] = [
    {
      id: 'grocery',
      name: 'Social Grocery',
      nameGr: 'Κοινωνικό Παντοπωλείο',
      description: 'Free groceries and essential items for families in need',
      icon: ShoppingBag,
      color: '#22c55e',
      requirements: ['Income certificate', 'Family status certificate', 'Tax declaration (E1)', 'ID copy'],
      processingTime: '7-14 days',
      status: 'available'
    },
    {
      id: 'pharmacy',
      name: 'Social Pharmacy',
      nameGr: 'Κοινωνικό Φαρμακείο',
      description: 'Free medications and medical supplies',
      icon: Pill,
      color: '#ef4444',
      requirements: ['Medical prescription', 'AMKA', 'Income certificate', 'ID copy'],
      processingTime: '3-7 days',
      status: 'approved'
    },
    {
      id: 'home-help',
      name: 'Home Help Program',
      nameGr: 'Βοήθεια στο Σπίτι',
      description: 'In-home assistance for elderly and disabled citizens',
      icon: Home,
      color: '#3b82f6',
      requirements: ['Medical certificate', 'Disability certificate (if applicable)', 'Income proof', 'ID copy'],
      processingTime: '14-30 days',
      status: 'pending'
    },
    {
      id: 'kapi',
      name: 'Elderly Day Care (KAPI)',
      nameGr: 'ΚΑΠΗ',
      description: 'Day center activities and social programs for seniors',
      icon: Users,
      color: '#f59e0b',
      requirements: ['Age 60+', 'ID copy', 'Health certificate'],
      processingTime: '7-14 days',
      status: 'available'
    },
    {
      id: 'psychological',
      name: 'Psychological Support',
      nameGr: 'Ψυχολογική Υποστήριξη',
      description: 'Free counseling and mental health services',
      icon: Heart,
      color: '#ec4899',
      requirements: ['No documents required', 'Appointment booking'],
      processingTime: '3-7 days',
      status: 'available'
    }
  ];

  const applications: Application[] = [
    {
      id: 'APP-2024-001',
      serviceId: 'pharmacy',
      serviceName: 'Social Pharmacy',
      status: 'approved',
      submittedDate: '15 Nov 2024',
      lastUpdate: '22 Nov 2024',
      caseWorker: 'Μαρία Παπαδοπούλου',
      nextStep: 'Visit pharmacy with your card'
    },
    {
      id: 'APP-2024-002',
      serviceId: 'home-help',
      serviceName: 'Home Help Program',
      status: 'under_review',
      submittedDate: '28 Nov 2024',
      lastUpdate: '2 Dec 2024',
      caseWorker: 'Γιώργος Νικολάου',
      nextStep: 'Home assessment scheduled for Dec 10'
    },
    {
      id: 'APP-2024-003',
      serviceId: 'grocery',
      serviceName: 'Social Grocery',
      status: 'pending',
      submittedDate: '5 Dec 2024',
      lastUpdate: '5 Dec 2024',
      nextStep: 'Awaiting document verification'
    }
  ];

  const appointments = [
    { id: '1', type: 'Home Assessment', date: '10 Dec 2024', time: '10:00', location: 'Your Home', service: 'Home Help Program' },
    { id: '2', type: 'Counseling Session', date: '12 Dec 2024', time: '14:30', location: 'Municipal Center', service: 'Psychological Support' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600', label: 'Approved' };
      case 'under_review':
        return { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600', label: 'Under Review' };
      case 'pending':
        return { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600', label: 'Pending' };
      case 'rejected':
        return { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600', label: 'Rejected' };
      default:
        return { bg: 'bg-zinc-100', text: 'text-zinc-600', label: status };
    }
  };

  const handleSubmitApplication = () => {
    if (applicationStep < 3) {
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
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Social Services</h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Support programs & welfare</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-xl p-1">
          {[
            { key: 'services', label: 'Services' },
            { key: 'applications', label: 'My Applications' },
            { key: 'appointments', label: 'Appointments' }
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
        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-3">
            {/* Emergency Contact */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-xl flex items-center justify-center">
                  <Phone size={24} className="text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-red-900 dark:text-red-200">Emergency Helpline</h3>
                  <p className="text-xs text-red-700 dark:text-red-300">24/7 Social Support</p>
                </div>
                <a href="tel:1595" className="px-4 py-2 bg-red-600 text-white rounded-xl font-bold text-sm">
                  Call 1595
                </a>
              </div>
            </div>

            {services.map(service => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className="w-full bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4 text-left"
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${service.color}20` }}
                    >
                      <Icon size={24} style={{ color: service.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900 dark:text-white">{service.nameGr}</h3>
                        {service.status === 'approved' && (
                          <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 text-[10px] font-bold rounded-full">
                            ACTIVE
                          </span>
                        )}
                        {service.status === 'pending' && (
                          <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 text-[10px] font-bold rounded-full">
                            PENDING
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{service.description}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-zinc-400">
                        <Clock size={12} />
                        <span>{service.processingTime}</span>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-zinc-300 dark:text-zinc-600" />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-3">
            {applications.length === 0 ? (
              <div className="text-center py-12">
                <FileText size={48} className="mx-auto text-zinc-300 dark:text-zinc-600 mb-3" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">No Applications</h3>
                <p className="text-sm text-zinc-500">Apply for services to see them here</p>
              </div>
            ) : (
              applications.map(app => {
                const status = getStatusBadge(app.status);
                return (
                  <div
                    key={app.id}
                    className="bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">{app.serviceName}</h3>
                        <p className="text-xs text-zinc-500">{app.id}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${status.bg} ${status.text}`}>
                        {status.label}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Submitted</span>
                        <span className="text-slate-900 dark:text-white">{app.submittedDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Last Update</span>
                        <span className="text-slate-900 dark:text-white">{app.lastUpdate}</span>
                      </div>
                      {app.caseWorker && (
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Case Worker</span>
                          <span className="text-slate-900 dark:text-white">{app.caseWorker}</span>
                        </div>
                      )}
                    </div>

                    {app.nextStep && (
                      <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-start gap-2">
                          <AlertCircle size={16} className="text-accent mt-0.5" />
                          <p className="text-xs text-zinc-600 dark:text-zinc-400">{app.nextStep}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="space-y-3">
            {appointments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar size={48} className="mx-auto text-zinc-300 dark:text-zinc-600 mb-3" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">No Appointments</h3>
                <p className="text-sm text-zinc-500">Scheduled appointments will appear here</p>
              </div>
            ) : (
              appointments.map(apt => (
                <div
                  key={apt.id}
                  className="bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 bg-accent/10 rounded-xl flex flex-col items-center justify-center">
                      <span className="text-lg font-bold text-accent">{apt.date.split(' ')[0]}</span>
                      <span className="text-[10px] text-accent">{apt.date.split(' ')[1]}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white">{apt.type}</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">{apt.service}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {apt.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Home size={12} />
                          {apt.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && !showApplicationForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-end"
            onClick={() => setSelectedService(null)}
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
                      style={{ backgroundColor: `${selectedService.color}20` }}
                    >
                      <selectedService.icon size={28} style={{ color: selectedService.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">{selectedService.nameGr}</h3>
                      <p className="text-xs text-zinc-500">{selectedService.name}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedService(null)} className="p-2 text-zinc-400">
                    <X size={20} />
                  </button>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  {selectedService.description}
                </p>

                {/* Processing Time */}
                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-zinc-500" />
                    <span className="text-sm text-zinc-600 dark:text-zinc-300">
                      Processing time: <strong>{selectedService.processingTime}</strong>
                    </span>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-4">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Required Documents</h4>
                  <div className="space-y-2">
                    {selectedService.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <CheckCircle2 size={16} className="text-green-500" />
                        {req}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Eligibility Info */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-3 mb-4">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-200 text-sm mb-1">Eligibility</h4>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Income-based eligibility. Annual household income must be below €12,000 for single persons or €18,000 for families.
                  </p>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  {selectedService.status === 'approved' ? (
                    <button className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2">
                      <CheckCircle2 size={20} />
                      Already Enrolled
                    </button>
                  ) : selectedService.status === 'pending' ? (
                    <button className="w-full py-3 bg-amber-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2">
                      <Clock size={20} />
                      Application Pending
                    </button>
                  ) : (
                    <button 
                      onClick={() => setShowApplicationForm(true)}
                      className="w-full py-3 bg-accent text-white font-semibold rounded-xl"
                    >
                      Apply Now
                    </button>
                  )}
                  <button className="w-full py-3 bg-zinc-100 dark:bg-zinc-800 text-slate-900 dark:text-white font-semibold rounded-xl flex items-center justify-center gap-2">
                    <Phone size={18} />
                    Contact Social Services
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Application Form Modal */}
      <AnimatePresence>
        {showApplicationForm && selectedService && (
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
                <h2 className="font-bold text-slate-900 dark:text-white">Apply for {selectedService.nameGr}</h2>
                <div className="w-6" />
              </div>
              
              {/* Progress */}
              <div className="flex gap-2">
                {[1, 2, 3].map(step => (
                  <div 
                    key={step}
                    className={`flex-1 h-1 rounded-full ${
                      step <= applicationStep ? 'bg-accent' : 'bg-zinc-200 dark:bg-zinc-700'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-zinc-500 mt-2">Step {applicationStep} of 3</p>
            </div>

            {/* Form Content */}
            <div className="flex-1 p-4 overflow-y-auto">
              {applicationStep === 1 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Personal Information</h3>
                  
                  <div>
                    <label className="text-xs font-medium text-zinc-500 mb-1 block">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue="Αλέξανδρος Παππάς"
                      className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-zinc-500 mb-1 block">AMKA</label>
                    <input 
                      type="text" 
                      defaultValue="12345678901"
                      className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-zinc-500 mb-1 block">AFM (Tax ID)</label>
                    <input 
                      type="text" 
                      defaultValue="123456789"
                      className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-0"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-zinc-500 mb-1 block">Address</label>
                    <input 
                      type="text" 
                      defaultValue="Αριστομένους 45, Καλαμάτα"
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

              {applicationStep === 2 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Upload Documents</h3>
                  <p className="text-sm text-zinc-500">Please upload the required documents</p>
                  
                  {selectedService.requirements.map((req, idx) => (
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
                  
                  <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-xl p-6 text-center">
                    <Camera size={32} className="mx-auto text-zinc-400 mb-2" />
                    <p className="text-sm text-zinc-500">Take a photo or upload from gallery</p>
                  </div>
                </div>
              )}

              {applicationStep === 3 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Review & Submit</h3>
                  
                  <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">Service</span>
                      <span className="font-medium text-slate-900 dark:text-white">{selectedService.nameGr}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">Applicant</span>
                      <span className="font-medium text-slate-900 dark:text-white">Αλέξανδρος Παππάς</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">Documents</span>
                      <span className="font-medium text-green-600">{selectedService.requirements.length} uploaded</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">Processing Time</span>
                      <span className="font-medium text-slate-900 dark:text-white">{selectedService.processingTime}</span>
                    </div>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-3">
                    <p className="text-xs text-amber-700 dark:text-amber-300">
                      By submitting this application, you confirm that all information provided is accurate and complete.
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
                {applicationStep === 3 ? 'Submit Application' : 'Continue'}
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
              <p className="text-sm opacity-90">You'll receive updates via SMS</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialServices;
