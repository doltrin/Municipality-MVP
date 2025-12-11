import React, { useState } from 'react';
import { ArrowLeft, Baby, CheckCircle2, Clock, Info, User, Calendar, MapPin, Building2, Download, Share2, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FeedbackModal from '../../../components/FeedbackModal';

type Step = 'type' | 'details' | 'delivery' | 'review' | 'confirmation';

interface FormData {
  certificateType: string;
  personName: string;
  birthDate: string;
  birthPlace: string;
  fatherName: string;
  motherName: string;
  copies: number;
  purpose: string;
  delivery: string;
  urgent: boolean;
}

const BirthCertificate: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('type');
  const [showFeedback, setShowFeedback] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    certificateType: '',
    personName: '',
    birthDate: '',
    birthPlace: '',
    fatherName: '',
    motherName: '',
    copies: 1,
    purpose: '',
    delivery: '',
    urgent: false
  });

  const steps: { id: Step; label: string }[] = [
    { id: 'type', label: 'Type' },
    { id: 'details', label: 'Details' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'review', label: 'Review' },
    { id: 'confirmation', label: 'Done' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const certificateTypes = [
    { id: 'full', name: 'Full Birth Certificate', nameGr: 'Πλήρες Πιστοποιητικό', description: 'Complete record with all details', fee: '€0' },
    { id: 'extract', name: 'Birth Certificate Extract', nameGr: 'Απόσπασμα Ληξιαρχικής Πράξης', description: 'Summary version', fee: '€0' },
    { id: 'multilingual', name: 'Multilingual Certificate', nameGr: 'Πολύγλωσσο Πιστοποιητικό', description: 'For international use', fee: '€5' },
  ];

  const purposes = [
    'Passport Application',
    'School Enrollment',
    'Marriage Registration',
    'Legal Proceedings',
    'Insurance',
    'Other'
  ];

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

  const canProceed = () => {
    switch (currentStep) {
      case 'type': return !!formData.certificateType;
      case 'details': return formData.personName && formData.birthDate;
      case 'delivery': return !!formData.delivery;
      case 'review': return true;
      default: return true;
    }
  };

  const selectedType = certificateTypes.find(t => t.id === formData.certificateType);
  const totalFee = selectedType?.fee === '€0' ? '€0' : `€${(parseInt(selectedType?.fee?.replace('€', '') || '0') * formData.copies)}`;

  const renderStepContent = () => {
    switch (currentStep) {
      case 'type':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Select Certificate Type</h3>
              <div className="space-y-3">
                {certificateTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setFormData({...formData, certificateType: type.id})}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      formData.certificateType === type.id
                        ? 'border-accent bg-accent/5'
                        : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{type.name}</h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{type.nameGr}</p>
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">{type.description}</p>
                      </div>
                      <span className={`text-sm font-bold ${type.fee === '€0' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                        {type.fee === '€0' ? 'Free' : type.fee}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Info size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-200 text-sm">Which one do I need?</h4>
                  <p className="text-xs text-blue-700 dark:text-blue-300/80 mt-1">
                    For most domestic purposes, the standard certificate is sufficient. Choose multilingual for international use (apostille included).
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'details':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Person's Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2">Full Name (as registered)</label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input 
                      type="text"
                      value={formData.personName}
                      onChange={(e) => setFormData({...formData, personName: e.target.value})}
                      placeholder="Enter full name"
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2">Date of Birth</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input 
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2">Place of Birth</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input 
                      type="text"
                      value={formData.birthPlace}
                      onChange={(e) => setFormData({...formData, birthPlace: e.target.value})}
                      placeholder="City, Hospital (if known)"
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2">Father's Name</label>
                    <input 
                      type="text"
                      value={formData.fatherName}
                      onChange={(e) => setFormData({...formData, fatherName: e.target.value})}
                      placeholder="Father's name"
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2">Mother's Name</label>
                    <input 
                      type="text"
                      value={formData.motherName}
                      onChange={(e) => setFormData({...formData, motherName: e.target.value})}
                      placeholder="Mother's name"
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Request Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2">Number of Copies</label>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setFormData({...formData, copies: Math.max(1, formData.copies - 1)})}
                      className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-slate-900 dark:text-white font-bold"
                    >
                      -
                    </button>
                    <span className="text-xl font-bold text-slate-900 dark:text-white w-8 text-center">{formData.copies}</span>
                    <button 
                      onClick={() => setFormData({...formData, copies: Math.min(10, formData.copies + 1)})}
                      className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-slate-900 dark:text-white font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2">Purpose</label>
                  <div className="flex flex-wrap gap-2">
                    {purposes.map((purpose) => (
                      <button
                        key={purpose}
                        onClick={() => setFormData({...formData, purpose})}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          formData.purpose === purpose
                            ? 'bg-accent text-white'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        {purpose}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'delivery':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Delivery Method</h3>
              <div className="space-y-3">
                {[
                  { id: 'digital', name: 'Digital Certificate', description: 'Receive via email (PDF with digital signature)', time: 'Within 24 hours', icon: Download },
                  { id: 'pickup', name: 'Pickup at Office', description: 'Collect from municipal office', time: '2-3 business days', icon: Building2 },
                  { id: 'mail', name: 'Postal Mail', description: 'Delivered to your address', time: '5-7 business days', icon: MapPin },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setFormData({...formData, delivery: method.id})}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      formData.delivery === method.id
                        ? 'border-accent bg-accent/5'
                        : 'border-zinc-200 dark:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        formData.delivery === method.id ? 'bg-accent/10 text-accent' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                      }`}>
                        <method.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{method.name}</h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{method.description}</p>
                        <p className="text-xs text-accent font-medium mt-1">{method.time}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={formData.urgent}
                  onChange={(e) => setFormData({...formData, urgent: e.target.checked})}
                  className="w-5 h-5 rounded border-zinc-300 text-accent focus:ring-accent"
                />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">Urgent Processing</span>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Get it faster (+€10)</p>
                </div>
              </label>
            </div>
          </motion.div>
        );

      case 'review':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Review Your Request</h3>
              
              <div className="space-y-4">
                <div className="pb-4 border-b border-zinc-100 dark:border-zinc-700">
                  <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase mb-2">Certificate Type</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedType?.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{selectedType?.nameGr}</p>
                </div>

                <div className="pb-4 border-b border-zinc-100 dark:border-zinc-700">
                  <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase mb-2">Person Details</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{formData.personName}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Born: {formData.birthDate} • {formData.birthPlace}</p>
                </div>

                <div className="pb-4 border-b border-zinc-100 dark:border-zinc-700">
                  <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase mb-2">Copies & Purpose</p>
                  <p className="text-sm text-slate-900 dark:text-white">{formData.copies} {formData.copies === 1 ? 'copy' : 'copies'} • {formData.purpose}</p>
                </div>

                <div>
                  <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase mb-2">Delivery</p>
                  <p className="text-sm text-slate-900 dark:text-white capitalize">{formData.delivery} {formData.urgent && '(Urgent)'}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">Certificate Fee</span>
                  <span className="text-slate-900 dark:text-white">{totalFee}</span>
                </div>
                {formData.urgent && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500 dark:text-zinc-400">Urgent Processing</span>
                    <span className="text-slate-900 dark:text-white">€10</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-zinc-100 dark:border-zinc-700">
                  <span className="text-slate-900 dark:text-white">Total</span>
                  <span className="text-accent">
                    {formData.urgent ? `€${parseInt(totalFee.replace('€', '')) + 10}` : totalFee}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
              <input type="checkbox" className="mt-1 w-4 h-4 rounded border-zinc-300 text-accent focus:ring-accent" />
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                I confirm that all information provided is accurate and I am authorized to request this certificate.
              </p>
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
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Request Submitted!</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6">Your birth certificate request is being processed.</p>
            
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-5 text-left mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Reference Number</span>
                <span className="font-mono font-bold text-accent">BC-{new Date().getFullYear()}-{Math.random().toString().slice(2, 8)}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Delivery Method</span>
                <span className="font-medium text-slate-900 dark:text-white capitalize">{formData.delivery}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Status</span>
                <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-full">Processing</span>
              </div>
            </div>

            {formData.delivery === 'digital' && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-4 mb-6 text-left">
                <p className="text-sm text-blue-900 dark:text-blue-200 font-medium">
                  You will receive your digital certificate via email within 24 hours.
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button 
                onClick={() => navigate('/requests/history')}
                className="flex-1 py-3 bg-accent text-white font-bold rounded-xl flex items-center justify-center gap-2"
              >
                <Clock size={18} />
                Track Request
              </button>
              <button 
                onClick={() => {}}
                className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-600 dark:text-zinc-400"
              >
                <Share2 size={20} />
              </button>
            </div>
            
            <button 
              onClick={() => setShowFeedback(true)}
              className="w-full mt-3 py-3 bg-zinc-100 dark:bg-zinc-800 text-slate-900 dark:text-white font-bold rounded-xl flex items-center justify-center gap-2"
            >
              <Star size={18} />
              Rate This Service
            </button>
            
            <button 
              onClick={() => navigate('/')}
              className="w-full mt-2 py-3 text-zinc-600 dark:text-zinc-400 font-medium"
            >
              Back to Home
            </button>
          </motion.div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark">
      {/* Header */}
      <div className="bg-white dark:bg-surface-dark px-4 pt-12 pb-4 sticky top-0 z-10 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={handleBack} className="text-zinc-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">Birth Certificate</h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Πιστοποιητικό Γέννησης</p>
          </div>
          <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Baby size={20} />
          </div>
        </div>

        {/* Progress Steps */}
        {currentStep !== 'confirmation' && (
          <div className="flex items-center gap-2">
            {steps.filter(s => s.id !== 'confirmation').map((step, i) => (
              <div key={step.id} className="flex-1 flex items-center gap-2">
                <div className={`flex-1 h-1.5 rounded-full transition-colors ${
                  i <= currentStepIndex ? 'bg-accent' : 'bg-zinc-200 dark:bg-zinc-700'
                }`} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 pb-24">
        {renderStepContent()}
      </div>

      {/* Bottom Action - sticky instead of fixed to work within device frame */}
      {currentStep !== 'confirmation' && (
        <div className="sticky bottom-0 left-0 right-0 p-4 bg-white dark:bg-surface-dark border-t border-zinc-200 dark:border-zinc-800">
          <button 
            onClick={handleNext}
            disabled={!canProceed()}
            className={`w-full py-4 font-bold rounded-xl active:scale-[0.98] transition-all ${
              canProceed() 
                ? 'bg-accent text-white' 
                : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400 dark:text-zinc-500'
            }`}
          >
            {currentStep === 'review' ? 'Submit Request' : 'Continue'}
          </button>
        </div>
      )}

      {/* Feedback Modal */}
      <FeedbackModal 
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        serviceName="Birth Certificate"
      />
    </div>
  );
};

export default BirthCertificate;
