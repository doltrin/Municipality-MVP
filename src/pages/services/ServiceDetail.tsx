import React, { useState } from 'react';
import { ArrowLeft, CreditCard, FileText, CheckCircle2, AlertCircle, ChevronRight, Upload, User, Mail, Info, MapPin } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllServices } from '../../data/servicesData';
import FeedbackModal from '../../components/FeedbackModal';

type Step = 'info' | 'form' | 'documents' | 'review' | 'payment' | 'confirmation';

const ServiceDetail: React.FC = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState<Step>('info');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [expandedSection, setExpandedSection] = useState<number>(0);

  // Section validation - check if all required fields are filled
  const isSectionComplete = (sectionIndex: number): boolean => {
    switch (sectionIndex) {
      case 0: // Personal Information
        return !!(formData.fullName && formData.phone && formData.email && formData.address && formData.idNumber && formData.dateOfBirth);
      case 1: // Family & Household
        return !!(formData.maritalStatus && formData.dependents && formData.householdSize && formData.housingType);
      case 2: // Employment & Income
        return !!(formData.employmentStatus && formData.income && formData.incomeSource);
      case 3: // Request Details
        return !!(formData.purpose && formData.urgency);
      case 4: // Documents
        return !!(formData.idUploaded && formData.proofUploaded && formData.incomeUploaded);
      case 5: // Delivery
        return !!formData.delivery;
      default:
        return false;
    }
  };

  const canAccessSection = (sectionIndex: number): boolean => {
    if (sectionIndex === 0) return true;
    return isSectionComplete(sectionIndex - 1);
  };

  const handleSectionToggle = (index: number) => {
    if (canAccessSection(index)) {
      setExpandedSection(expandedSection === index ? -1 : index);
    }
  };

  // Extract service ID from URL path (handles both /services/:cat/:id and /services/cat/id patterns)
  const pathParts = location.pathname.split('/').filter(Boolean);
  const extractedServiceId = serviceId || pathParts[pathParts.length - 1];
  
  // Find the service by ID or by matching path
  const allServices = getAllServices();
  const service = allServices.find(s => 
    s.id === extractedServiceId || 
    s.path === location.pathname ||
    s.path.endsWith('/' + extractedServiceId)
  );

  if (!service) {
    return (
      <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark items-center justify-center p-8">
        <AlertCircle size={48} className="text-zinc-400 mb-4" />
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Service Not Found</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 text-center">The requested service could not be found.</p>
        <button 
          onClick={() => navigate('/services')}
          className="mt-6 px-6 py-3 bg-accent text-white font-bold rounded-xl"
        >
          Browse Services
        </button>
      </div>
    );
  }

  const Icon = service.icon;

  const steps: { id: Step; label: string }[] = [
    { id: 'info', label: 'Overview' },
    { id: 'form', label: 'Application' },
    { id: 'review', label: 'Review' },
    ...(service.fee && service.fee !== '€0' ? [{ id: 'payment' as Step, label: 'Payment' }] : []),
    { id: 'confirmation', label: 'Done' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    } else {
      navigate(-1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'info':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Elegant Hero Card */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200/80 dark:border-zinc-700 overflow-hidden">
              <div className="bg-gradient-to-r from-accent/5 to-blue-500/5 dark:from-accent/10 dark:to-blue-500/10 px-5 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center shadow-md">
                    <Icon size={26} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">{service.name}</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{service.description}</p>
                  </div>
                </div>
              </div>
              
              {/* Quick Info Strip */}
              <div className="flex divide-x divide-zinc-100 dark:divide-zinc-700 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex-1 py-3 text-center">
                  <p className="text-xs text-zinc-400 font-medium">Processing</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white mt-0.5">{service.estimatedTime || '7-14 days'}</p>
                </div>
                <div className="flex-1 py-3 text-center">
                  <p className="text-xs text-zinc-400 font-medium">Fee</p>
                  <p className="text-sm font-semibold text-emerald-600 mt-0.5">{service.fee === '€0' ? 'Free' : service.fee || 'Free'}</p>
                </div>
                <div className="flex-1 py-3 text-center">
                  <p className="text-xs text-zinc-400 font-medium">Delivery</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white mt-0.5">Digital</p>
                </div>
              </div>
            </div>

            {/* Continue Draft - Modern Glass Card */}
            <button className="w-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 dark:from-violet-500/20 dark:to-purple-500/20 backdrop-blur-sm rounded-2xl border border-violet-200/60 dark:border-violet-700/40 p-4 text-left group hover:border-violet-300 dark:hover:border-violet-600 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-sm relative">
                  <FileText size={18} className="text-white" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-[10px] font-bold text-violet-600">2/4</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-violet-900 dark:text-violet-200">Continue Draft</p>
                    <span className="px-1.5 py-0.5 bg-violet-500/20 rounded text-[9px] font-bold text-violet-600 dark:text-violet-300">50%</span>
                  </div>
                  <p className="text-[11px] text-violet-600/70 dark:text-violet-400/70 mt-0.5">Last edited Jan 20 • Step 2 of 4</p>
                </div>
                <ChevronRight size={18} className="text-violet-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>

            {/* Required Documents - Compact */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200/80 dark:border-zinc-700 p-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <FileText size={16} className="text-accent" />
                Required Documents
              </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {['Valid ID or Passport', 'Proof of Address', 'Application Form', 'Photo (if needed)'].map((doc, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0" />
                    <span className="text-xs text-zinc-600 dark:text-zinc-300">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'form': {
        const sections = [
          {
            id: 0,
            title: 'Personal Information',
            icon: User,
            color: 'accent',
            fields: ['fullName', 'phone', 'email', 'address', 'idNumber', 'dateOfBirth'],
          },
          {
            id: 1,
            title: 'Family & Household',
            icon: User,
            color: 'purple-500',
            fields: ['maritalStatus', 'dependents', 'householdSize', 'housingType'],
          },
          {
            id: 2,
            title: 'Employment & Income',
            icon: CreditCard,
            color: 'emerald-500',
            fields: ['employmentStatus', 'income', 'incomeSource'],
          },
          {
            id: 3,
            title: 'Request Details',
            icon: FileText,
            color: 'blue-500',
            fields: ['purpose', 'urgency'],
          },
          {
            id: 4,
            title: 'Required Documents',
            icon: Upload,
            color: 'orange-500',
            fields: ['idUploaded', 'proofUploaded', 'incomeUploaded'],
          },
          {
            id: 5,
            title: 'Delivery Preference',
            icon: Mail,
            color: 'pink-500',
            fields: ['delivery'],
          },
        ];

        const getFilledCount = (sectionIndex: number) => {
          const section = sections[sectionIndex];
          return section.fields.filter(f => formData[f]).length;
        };

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {/* Progress Header */}
            <div className="flex items-center justify-between px-1 mb-2">
              <p className="text-xs text-zinc-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Auto-saving draft
              </p>
              <p className="text-xs font-medium text-accent">
                {sections.filter((_, i) => isSectionComplete(i)).length} of {sections.length} complete
              </p>
            </div>

            {sections.map((section, index) => {
              const SectionIcon = section.icon;
              const isExpanded = expandedSection === index;
              const isAccessible = canAccessSection(index);
              const isComplete = isSectionComplete(index);
              const filledCount = getFilledCount(index);
              const totalFields = section.fields.length;

              return (
                <div
                  key={section.id}
                  className={`bg-white dark:bg-surface-dark rounded-2xl border overflow-hidden transition-all ${
                    isAccessible 
                      ? 'border-zinc-200/80 dark:border-zinc-700' 
                      : 'border-zinc-100 dark:border-zinc-800 opacity-60'
                  }`}
                >
                  {/* Section Header - Always Visible */}
                  <button
                    onClick={() => handleSectionToggle(index)}
                    disabled={!isAccessible}
                    className={`w-full flex items-center gap-3 px-4 py-4 text-left transition-colors ${
                      isAccessible ? 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50' : 'cursor-not-allowed'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      isComplete 
                        ? 'bg-emerald-500 text-white' 
                        : isAccessible
                          ? `bg-${section.color}/10`
                          : 'bg-zinc-100 dark:bg-zinc-800'
                    }`}>
                      {isComplete ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <SectionIcon size={16} className={isAccessible ? `text-${section.color}` : 'text-zinc-400'} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold ${isAccessible ? 'text-slate-900 dark:text-white' : 'text-zinc-400'}`}>
                        {section.title}
                      </p>
                      <p className="text-[10px] text-zinc-400">
                        {isComplete ? 'Completed' : isAccessible ? `${filledCount} of ${totalFields} fields` : 'Complete previous section'}
                      </p>
                    </div>
                    <ChevronRight 
                      size={18} 
                      className={`text-zinc-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                    />
                  </button>

                  {/* Section Content - Collapsible */}
                  <motion.div
                    initial={false}
                    animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className={`px-4 pb-5 pt-2 border-t border-zinc-100 dark:border-zinc-800 ${!isAccessible ? 'pointer-events-none' : ''}`}>
                      {/* Section 0: Personal Information */}
                      {index === 0 && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">Full Name *</label>
                              <input 
                                type="text"
                                value={formData.fullName || ''}
                                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                placeholder="Μαρία Παπαδοπούλου"
                                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-3 text-sm text-slate-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">Phone *</label>
                              <input 
                                type="tel"
                                value={formData.phone || ''}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                placeholder="+30 694 123 4567"
                                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-3 text-sm text-slate-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">Email Address *</label>
                            <input 
                              type="email"
                              value={formData.email || ''}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              placeholder="maria@example.com"
                              className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-3 text-sm text-slate-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">Address *</label>
                            <input 
                              type="text"
                              value={formData.address || ''}
                              onChange={(e) => setFormData({...formData, address: e.target.value})}
                              placeholder="Οδός, Αριθμός, Τ.Κ., Πόλη"
                              className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-3 text-sm text-slate-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">ID Number (ΑΔΤ) *</label>
                              <input 
                                type="text"
                                value={formData.idNumber || ''}
                                onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                                placeholder="ΑΒ 123456"
                                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-3 text-sm text-slate-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">Date of Birth *</label>
                              <input 
                                type="date"
                                value={formData.dateOfBirth || ''}
                                onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                              />
                            </div>
                          </div>
                          {isSectionComplete(0) && (
                            <button 
                              onClick={() => setExpandedSection(1)}
                              className="w-full mt-2 py-2.5 bg-accent/10 text-accent text-sm font-semibold rounded-xl flex items-center justify-center gap-2"
                            >
                              Continue to Family & Household
                              <ChevronRight size={16} />
                            </button>
                          )}
                        </div>
                      )}

                      {/* Section 1: Family & Household */}
                      {index === 1 && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">Marital Status *</label>
                              <select 
                                value={formData.maritalStatus || ''}
                                onChange={(e) => setFormData({...formData, maritalStatus: e.target.value})}
                                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                              >
                                <option value="">Select...</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">Widowed</option>
                                <option value="separated">Separated</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[10px] font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">Dependents *</label>
                              <select 
                                value={formData.dependents || ''}
                                onChange={(e) => setFormData({...formData, dependents: e.target.value})}
                                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                              >
                                <option value="">Select...</option>
                                <option value="0">None</option>
                                <option value="1">1 child</option>
                                <option value="2">2 children</option>
                                <option value="3">3 children</option>
                                <option value="4+">4 or more</option>
                              </select>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">Household Size *</label>
                              <select 
                                value={formData.householdSize || ''}
                                onChange={(e) => setFormData({...formData, householdSize: e.target.value})}
                                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                              >
                                <option value="">Select...</option>
                                <option value="1">1 person</option>
                                <option value="2">2 people</option>
                                <option value="3">3 people</option>
                                <option value="4">4 people</option>
                                <option value="5+">5 or more</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[10px] font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">Housing Type *</label>
                              <select 
                                value={formData.housingType || ''}
                                onChange={(e) => setFormData({...formData, housingType: e.target.value})}
                                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                              >
                                <option value="">Select...</option>
                                <option value="owned">Owned</option>
                                <option value="rented">Rented</option>
                                <option value="family">Living with family</option>
                                <option value="social">Social housing</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                          </div>
                          {isSectionComplete(1) && (
                            <button 
                              onClick={() => setExpandedSection(2)}
                              className="w-full mt-2 py-2.5 bg-accent/10 text-accent text-sm font-semibold rounded-xl flex items-center justify-center gap-2"
                            >
                              Continue to Employment & Income
                              <ChevronRight size={16} />
                            </button>
                          )}
                        </div>
                      )}

                      {/* Section 2: Employment & Income */}
                      {index === 2 && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-[10px] font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">Employment Status *</label>
                            <select 
                              value={formData.employmentStatus || ''}
                              onChange={(e) => setFormData({...formData, employmentStatus: e.target.value})}
                              className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                            >
                              <option value="">Select...</option>
                              <option value="employed">Employed (Full-time)</option>
                              <option value="part-time">Employed (Part-time)</option>
                              <option value="self-employed">Self-employed</option>
                              <option value="unemployed">Unemployed</option>
                              <option value="retired">Retired</option>
                              <option value="student">Student</option>
                              <option value="disabled">Unable to work</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">Annual Household Income *</label>
                            <select 
                              value={formData.income || ''}
                              onChange={(e) => setFormData({...formData, income: e.target.value})}
                              className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                            >
                              <option value="">Select income range...</option>
                              <option value="0-3000">€0 - €3,000</option>
                              <option value="3000-6000">€3,000 - €6,000</option>
                              <option value="6000-9000">€6,000 - €9,000</option>
                              <option value="9000-12000">€9,000 - €12,000</option>
                              <option value="12000-15000">€12,000 - €15,000</option>
                              <option value="15000-18000">€15,000 - €18,000</option>
                              <option value="18000+">€18,000+</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">Primary Income Source *</label>
                            <select 
                              value={formData.incomeSource || ''}
                              onChange={(e) => setFormData({...formData, incomeSource: e.target.value})}
                              className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                            >
                              <option value="">Select...</option>
                              <option value="salary">Salary/Wages</option>
                              <option value="pension">Pension</option>
                              <option value="benefits">Social Benefits</option>
                              <option value="unemployment">Unemployment Benefits</option>
                              <option value="disability">Disability Benefits</option>
                              <option value="self">Self-employment</option>
                              <option value="none">No income</option>
                            </select>
                          </div>
                          {isSectionComplete(2) && (
                            <button 
                              onClick={() => setExpandedSection(3)}
                              className="w-full mt-2 py-2.5 bg-accent/10 text-accent text-sm font-semibold rounded-xl flex items-center justify-center gap-2"
                            >
                              Continue to Request Details
                              <ChevronRight size={16} />
                            </button>
                          )}
                        </div>
                      )}

                      {/* Section 3: Request Details */}
                      {index === 3 && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-[10px] font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">Purpose / Reason *</label>
                            <textarea 
                              value={formData.purpose || ''}
                              onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                              placeholder="Please describe why you need this service and any relevant circumstances..."
                              rows={4}
                              className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-3 text-sm text-slate-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-zinc-400 mb-1.5 uppercase tracking-wide">Urgency Level *</label>
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                { id: 'normal', label: 'Normal', desc: '7-14 days' },
                                { id: 'urgent', label: 'Urgent', desc: '3-5 days' },
                                { id: 'critical', label: 'Critical', desc: '1-2 days' },
                              ].map((level) => (
                                <button
                                  key={level.id}
                                  onClick={() => setFormData({...formData, urgency: level.id})}
                                  className={`p-3 rounded-xl border text-center transition-all ${
                                    formData.urgency === level.id
                                      ? 'border-accent bg-accent/10'
                                      : 'border-zinc-200 dark:border-zinc-700'
                                  }`}
                                >
                                  <p className={`text-sm font-semibold ${formData.urgency === level.id ? 'text-accent' : 'text-slate-900 dark:text-white'}`}>
                                    {level.label}
                                  </p>
                                  <p className="text-[10px] text-zinc-400">{level.desc}</p>
                                </button>
                              ))}
                            </div>
                          </div>
                          {isSectionComplete(3) && (
                            <button 
                              onClick={() => setExpandedSection(4)}
                              className="w-full mt-2 py-2.5 bg-accent/10 text-accent text-sm font-semibold rounded-xl flex items-center justify-center gap-2"
                            >
                              Continue to Documents
                              <ChevronRight size={16} />
                            </button>
                          )}
                        </div>
                      )}

                      {/* Section 4: Documents */}
                      {index === 4 && (
                        <div className="space-y-2.5">
                          {[
                            { key: 'idUploaded', label: 'ID Card / Passport', desc: 'Front and back side' },
                            { key: 'proofUploaded', label: 'Proof of Address', desc: 'Utility bill or bank statement' },
                            { key: 'incomeUploaded', label: 'Income Certificate (E1)', desc: 'Latest tax declaration' },
                          ].map((doc) => (
                            <div 
                              key={doc.key}
                              onClick={() => setFormData({...formData, [doc.key]: 'uploaded'})}
                              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                                formData[doc.key] 
                                  ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' 
                                  : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 hover:border-accent'
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm ${
                                formData[doc.key]
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-white dark:bg-zinc-700 text-zinc-400'
                              }`}>
                                {formData[doc.key] ? <CheckCircle2 size={18} /> : <Upload size={18} />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`font-medium text-sm ${formData[doc.key] ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-900 dark:text-white'}`}>
                                  {doc.label}
                                </p>
                                <p className="text-[10px] text-zinc-400">{formData[doc.key] ? 'Uploaded ✓' : doc.desc}</p>
                              </div>
                              {!formData[doc.key] && (
                                <span className="px-3 py-1.5 bg-accent text-white text-xs font-bold rounded-lg">Upload</span>
                              )}
                            </div>
                          ))}
                          <p className="text-[10px] text-zinc-400 mt-2">📸 Tap to simulate upload (demo mode)</p>
                          {isSectionComplete(4) && (
                            <button 
                              onClick={() => setExpandedSection(5)}
                              className="w-full mt-2 py-2.5 bg-accent/10 text-accent text-sm font-semibold rounded-xl flex items-center justify-center gap-2"
                            >
                              Continue to Delivery
                              <ChevronRight size={16} />
                            </button>
                          )}
                        </div>
                      )}

                      {/* Section 5: Delivery */}
                      {index === 5 && (
                        <div className="space-y-3">
                          <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                            {[
                              { id: 'digital', label: 'Digital (Email)', icon: Mail },
                              { id: 'pickup', label: 'In-Person Pickup', icon: MapPin }
                            ].map((option) => {
                              const OptionIcon = option.icon;
                              const isSelected = formData.delivery === option.id;
                              return (
                                <button
                                  key={option.id}
                                  onClick={() => setFormData({...formData, delivery: option.id})}
                                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
                                    isSelected
                                      ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-sm'
                                      : 'text-zinc-500'
                                  }`}
                                >
                                  <OptionIcon size={14} />
                                  {option.label}
                                </button>
                              );
                            })}
                          </div>
                          {isSectionComplete(5) && (
                            <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                              <CheckCircle2 size={18} className="text-emerald-500" />
                              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                All sections complete! You can proceed to review.
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        );
      }

      case 'documents':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Upload Documents</h3>
              <div className="space-y-3">
                {['ID Card / Passport', 'Proof of Address', 'Supporting Document'].map((doc, i) => (
                  <div key={i} className="border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl p-4 hover:border-accent transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-400">
                        <Upload size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 dark:text-white text-sm">{doc}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">PDF, JPG, PNG up to 10MB</p>
                      </div>
                      <button className="px-3 py-1.5 bg-accent/10 text-accent text-xs font-bold rounded-lg">
                        Upload
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Info size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-200 text-sm">Document Tips</h4>
                  <p className="text-xs text-blue-700 dark:text-blue-300/80 mt-1">
                    Ensure documents are clearly visible and all text is readable. Blurry or incomplete documents may delay processing.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'review':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Review Your Application</h3>
              
              <div className="space-y-4">
                <div className="pb-4 border-b border-zinc-100 dark:border-zinc-700">
                  <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase mb-2">Service</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{service.name}</p>
                </div>
                
                <div className="pb-4 border-b border-zinc-100 dark:border-zinc-700">
                  <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase mb-2">Personal Information</p>
                  <div className="space-y-1">
                    <p className="text-sm text-slate-900 dark:text-white">{formData.fullName || 'Not provided'}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{formData.email || 'Not provided'}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{formData.phone || 'Not provided'}</p>
                  </div>
                </div>

                <div className="pb-4 border-b border-zinc-100 dark:border-zinc-700">
                  <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase mb-2">Delivery Method</p>
                  <p className="text-sm text-slate-900 dark:text-white">{formData.delivery || 'Not selected'}</p>
                </div>

                <div>
                  <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase mb-2">Documents</p>
                  <p className="text-sm text-slate-900 dark:text-white">3 documents uploaded</p>
                </div>
              </div>
            </div>

            {service.fee && service.fee !== '€0' && (
              <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-white">Total Fee</span>
                  <span className="text-xl font-bold text-accent">{service.fee}</span>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
              <input type="checkbox" className="mt-1 w-4 h-4 rounded border-zinc-300 text-accent focus:ring-accent" />
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                I confirm that all information provided is accurate and I agree to the terms and conditions of this service.
              </p>
            </div>
          </motion.div>
        );

      case 'payment':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Payment Method</h3>
              <div className="space-y-3">
                {['Credit/Debit Card', 'Municipal Wallet', 'Bank Transfer'].map((method, i) => (
                  <button
                    key={i}
                    className="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 flex items-center gap-4 hover:border-accent transition-colors"
                  >
                    <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500">
                      <CreditCard size={20} />
                    </div>
                    <span className="font-medium text-slate-900 dark:text-white text-sm">{method}</span>
                    <ChevronRight size={18} className="ml-auto text-zinc-400" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Service Fee</span>
                <span className="font-medium text-slate-900 dark:text-white">{service.fee}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-zinc-100 dark:border-zinc-700">
                <span className="font-bold text-slate-900 dark:text-white">Total</span>
                <span className="text-xl font-bold text-accent">{service.fee}</span>
              </div>
            </div>
          </motion.div>
        );

      case 'confirmation':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Application Submitted!</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6">Your request has been successfully submitted.</p>
            
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-5 text-left mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Reference Number</span>
                <span className="font-mono font-bold text-accent">ATH-2024-{Math.random().toString().slice(2, 8)}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Estimated Completion</span>
                <span className="font-medium text-slate-900 dark:text-white">{service.estimatedTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Status</span>
                <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-full">Processing</span>
              </div>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
              You will receive updates via email and push notifications.
            </p>

            <div className="space-y-3">
              <button 
                onClick={() => navigate('/requests/history')}
                className="w-full py-3 bg-accent text-white font-bold rounded-xl"
              >
                Track My Request
              </button>
              <button 
                onClick={() => setShowFeedback(true)}
                className="w-full py-3 bg-zinc-100 dark:bg-zinc-800 text-slate-900 dark:text-white font-bold rounded-xl"
              >
                Rate This Service
              </button>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-3 text-zinc-500 dark:text-zinc-400 font-medium"
              >
                Back to Home
              </button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark relative">
      {/* Header */}
      <div className="bg-white dark:bg-surface-dark px-4 pt-12 pb-4 sticky top-0 z-10 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={handleBack} className="text-zinc-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-slate-900 dark:text-white truncate">{service.name}</h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{service.categoryName}</p>
          </div>
        </div>

        {/* Progress Steps */}
        {currentStep !== 'confirmation' && (
          <div className="flex items-center gap-1">
            {steps.filter(s => s.id !== 'confirmation').map((step, i) => (
              <React.Fragment key={step.id}>
                <div className={`flex-1 h-1 rounded-full transition-colors ${
                  i <= currentStepIndex ? 'bg-accent' : 'bg-zinc-200 dark:bg-zinc-700'
                }`} />
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 pb-24">
        {renderStepContent()}
      </div>

      {/* Bottom Action */}
      {currentStep !== 'confirmation' && (
        <div className="sticky bottom-0 left-0 right-0 p-4 bg-white dark:bg-surface-dark border-t border-zinc-200 dark:border-zinc-800">
          <button 
            onClick={handleNext}
            className="w-full py-4 bg-accent text-white font-bold rounded-xl active:scale-[0.98] transition-transform"
          >
            {currentStep === 'review' ? (service.fee && service.fee !== '€0' ? 'Proceed to Payment' : 'Submit Application') : 
             currentStep === 'payment' ? 'Pay & Submit' : 
             currentStep === 'info' ? 'Start Application' : 'Continue'}
          </button>
        </div>
      )}

      {/* Feedback Modal */}
      <FeedbackModal 
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        serviceName={service.name}
      />
    </div>
  );
};

export default ServiceDetail;
