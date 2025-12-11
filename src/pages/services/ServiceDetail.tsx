import React, { useState } from 'react';
import { ArrowLeft, Clock, CreditCard, FileText, CheckCircle2, AlertCircle, ChevronRight, Upload, User, Phone, Mail, Info, MapPin } from 'lucide-react';
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
    { id: 'info', label: 'Information' },
    { id: 'form', label: 'Application' },
    { id: 'documents', label: 'Documents' },
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
            className="space-y-6"
          >
            {/* Service Header */}
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                  <Icon size={28} />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">{service.name}</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{service.description}</p>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-4">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 mb-1">
                  <Clock size={14} />
                  <span className="text-xs font-medium">Processing Time</span>
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{service.estimatedTime || 'Varies'}</p>
              </div>
              <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-4">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 mb-1">
                  <CreditCard size={14} />
                  <span className="text-xs font-medium">Fee</span>
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{service.fee || 'Free'}</p>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText size={18} className="text-accent" />
                Required Documents
              </h3>
              <ul className="space-y-3">
                {['Valid ID or Passport', 'Proof of Address', 'Application Form (provided)', 'Recent Photograph (if applicable)'].map((doc, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Notes */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Info size={18} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm">Important Information</h4>
                  <p className="text-xs text-amber-700 dark:text-amber-300/80 mt-1">
                    Please ensure all documents are valid and up to date. Incomplete applications may be delayed.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'form':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2">Full Name</label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input 
                      type="text"
                      value={formData.fullName || ''}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      placeholder="Enter your full name"
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input 
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your@email.com"
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input 
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+30 694 123 4567"
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2">Address</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input 
                      type="text"
                      value={formData.address || ''}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="Street address"
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Service Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2">Purpose / Reason</label>
                  <textarea 
                    value={formData.purpose || ''}
                    onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                    placeholder="Please describe the purpose of your request..."
                    rows={3}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2">Preferred Delivery Method</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Digital (Email)', 'Physical (Pickup)'].map((method) => (
                      <button
                        key={method}
                        onClick={() => setFormData({...formData, delivery: method})}
                        className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                          formData.delivery === method
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

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
