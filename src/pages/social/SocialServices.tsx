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
              className="w-full bg-white dark:bg-surface-dark rounded-t-3xl max-h-[90%] overflow-y-auto"
            >
              {/* Hero Header with Gradient */}
              <div 
                className="relative px-5 pt-6 pb-8 rounded-t-3xl"
                style={{ 
                  background: `linear-gradient(135deg, ${selectedService.color}15 0%, ${selectedService.color}05 100%)` 
                }}
              >
                <button 
                  onClick={() => setSelectedService(null)} 
                  className="absolute top-4 right-4 w-8 h-8 bg-white/80 dark:bg-zinc-800/80 backdrop-blur rounded-full flex items-center justify-center text-zinc-500"
                >
                  <X size={18} />
                </button>
                
                <div className="flex items-start gap-4">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: selectedService.color }}
                  >
                    <selectedService.icon size={32} className="text-white" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedService.nameGr}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{selectedService.name}</p>
                    {selectedService.status === 'approved' && (
                      <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-semibold rounded-full">
                        <CheckCircle2 size={12} />
                        Active Beneficiary
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed">
                  {selectedService.description}
                </p>
              </div>

              <div className="px-5 pb-6">
                {/* Impact Stats */}
                <div className="grid grid-cols-3 gap-3 -mt-4 mb-5">
                  <div className="bg-white dark:bg-zinc-800 rounded-xl p-3 text-center shadow-sm border border-zinc-100 dark:border-zinc-700">
                    <div className="text-xl font-bold text-slate-900 dark:text-white">2,847</div>
                    <div className="text-[10px] text-zinc-500 font-medium">Families Helped</div>
                  </div>
                  <div className="bg-white dark:bg-zinc-800 rounded-xl p-3 text-center shadow-sm border border-zinc-100 dark:border-zinc-700">
                    <div className="text-xl font-bold" style={{ color: selectedService.color }}>€0</div>
                    <div className="text-[10px] text-zinc-500 font-medium">Service Fee</div>
                  </div>
                  <div className="bg-white dark:bg-zinc-800 rounded-xl p-3 text-center shadow-sm border border-zinc-100 dark:border-zinc-700">
                    <div className="text-xl font-bold text-slate-900 dark:text-white">{selectedService.processingTime.split('-')[0]}</div>
                    <div className="text-[10px] text-zinc-500 font-medium">Days to Approve</div>
                  </div>
                </div>

                {/* What You Get Section */}
                <div className="mb-5">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <ShoppingBag size={16} style={{ color: selectedService.color }} />
                    What You Receive
                  </h4>
                  <div className="bg-gradient-to-r from-zinc-50 to-zinc-100/50 dark:from-zinc-800 dark:to-zinc-800/50 rounded-xl p-4 border border-zinc-200/50 dark:border-zinc-700">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { item: 'Fresh Produce', qty: 'Weekly' },
                        { item: 'Dairy Products', qty: 'Weekly' },
                        { item: 'Pantry Staples', qty: 'Monthly' },
                        { item: 'Hygiene Items', qty: 'Monthly' },
                      ].map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedService.color }} />
                          <div>
                            <span className="text-sm font-medium text-slate-800 dark:text-white">{benefit.item}</span>
                            <span className="text-xs text-zinc-400 ml-1">({benefit.qty})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Eligibility Quick Check */}
                <div className="mb-5">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-500" />
                    Eligibility Criteria
                  </h4>
                  <div className="space-y-2">
                    {[
                      { label: 'Annual income below €12,000 (single) / €18,000 (family)', met: true },
                      { label: 'Resident of the municipality', met: true },
                      { label: 'Valid AMKA number', met: true },
                      { label: 'Not receiving similar benefits elsewhere', met: false },
                    ].map((criteria, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          criteria.met 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600' 
                            : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400'
                        }`}>
                          {criteria.met ? <CheckCircle2 size={12} /> : <div className="w-2 h-2 rounded-full bg-current" />}
                        </div>
                        <span className={`text-xs ${criteria.met ? 'text-slate-700 dark:text-zinc-300' : 'text-zinc-400'}`}>
                          {criteria.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Required Documents */}
                <div className="mb-5">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <FileText size={16} className="text-blue-500" />
                    Required Documents
                  </h4>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800/30">
                    <div className="space-y-2.5">
                      {selectedService.requirements.map((req, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-800/50 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">
                            {idx + 1}
                          </div>
                          <span className="text-sm text-blue-900 dark:text-blue-200">{req}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-blue-600/70 dark:text-blue-400/70 mt-3 pt-3 border-t border-blue-200/50 dark:border-blue-700/30">
                      💡 Tip: You can upload photos of documents directly from your phone
                    </p>
                  </div>
                </div>

                {/* Pickup Location */}
                <div className="mb-5">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Home size={16} className="text-amber-500" />
                    Pickup Location
                  </h4>
                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800/30">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-amber-100 dark:bg-amber-800/50 rounded-lg flex items-center justify-center">
                        <Home size={20} className="text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-amber-900 dark:text-amber-200 text-sm">Municipal Social Center</p>
                        <p className="text-xs text-amber-700 dark:text-amber-300 mt-0.5">Αριστομένους 28, Καλαμάτα</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[10px] text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-800/50 px-2 py-0.5 rounded-full">
                            Mon-Fri: 9:00-14:00
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Processing Timeline */}
                <div className="mb-6">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Clock size={16} className="text-purple-500" />
                    Application Timeline
                  </h4>
                  <div className="relative">
                    <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-zinc-200 dark:bg-zinc-700" />
                    {[
                      { step: 'Submit Application', time: 'Day 1', done: true },
                      { step: 'Document Verification', time: 'Days 2-5', done: false },
                      { step: 'Eligibility Assessment', time: 'Days 6-10', done: false },
                      { step: 'Approval & Card Issued', time: 'Days 11-14', done: false },
                    ].map((milestone, idx) => (
                      <div key={idx} className="flex items-start gap-3 relative mb-3 last:mb-0">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 ${
                          milestone.done 
                            ? 'bg-green-500 text-white' 
                            : 'bg-white dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-600'
                        }`}>
                          {milestone.done ? <CheckCircle2 size={14} /> : <span className="text-xs font-bold text-zinc-400">{idx + 1}</span>}
                        </div>
                        <div className="flex-1 pt-0.5">
                          <p className="text-sm font-medium text-slate-800 dark:text-white">{milestone.step}</p>
                          <p className="text-xs text-zinc-400">{milestone.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-2">
                  {selectedService.status === 'approved' ? (
                    <button className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-500/25">
                      <CheckCircle2 size={20} />
                      View Your Beneficiary Card
                    </button>
                  ) : selectedService.status === 'pending' ? (
                    <button className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25">
                      <Clock size={20} />
                      Application In Progress
                    </button>
                  ) : (
                    <button 
                      onClick={() => setShowApplicationForm(true)}
                      className="w-full py-4 bg-gradient-to-r from-accent to-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-accent/25"
                    >
                      Start Application
                    </button>
                  )}
                  <button className="w-full py-3 bg-zinc-100 dark:bg-zinc-800 text-slate-700 dark:text-white font-semibold rounded-xl flex items-center justify-center gap-2">
                    <Phone size={18} />
                    Call: 27210-12345
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
