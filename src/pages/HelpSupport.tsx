import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, MessageSquare, Phone, Mail, FileText, ChevronRight, ChevronDown, Search, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
}

const HelpSupport: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs: FAQItem[] = [
    {
      question: 'How do I reset my password?',
      answer: 'Go to Profile > Settings > Security, then tap "Change Password". You\'ll receive a verification code via SMS to confirm the change.'
    },
    {
      question: 'How do I submit a service request?',
      answer: 'Navigate to the Services tab, select the service you need, fill out the required information, and submit. You\'ll receive a confirmation with a tracking number.'
    },
    {
      question: 'How can I track my request status?',
      answer: 'Go to Profile > My Requests to see all your submitted requests and their current status. You\'ll also receive notifications for status updates.'
    },
    {
      question: 'How do I update my personal information?',
      answer: 'Go to Profile > Personal Data. You can update your contact information, address, and other details. Some changes may require verification.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept credit/debit cards (Visa, Mastercard), bank transfers, and payments through the Digital Wallet. All transactions are secure and encrypted.'
    },
    {
      question: 'How do I enable notifications?',
      answer: 'Go to Profile > Settings > Notifications to customize which alerts you receive. You can enable push notifications, email, or SMS alerts.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we use industry-standard encryption and comply with GDPR regulations. Your personal data is protected and never shared with third parties without consent.'
    },
  ];

  const contactOptions = [
    {
      icon: Phone,
      title: 'Call Us',
      subtitle: '1595 (Mon-Fri, 8:00-20:00)',
      action: () => window.location.href = 'tel:1595',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      subtitle: 'Chat with our AI assistant',
      action: () => navigate('/'),
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      icon: Mail,
      title: 'Email Support',
      subtitle: 'support@athens.gov.gr',
      action: () => window.location.href = 'mailto:support@athens.gov.gr',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-surface-dark px-6 pt-12 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Help & Support</h1>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
          <input
            type="text"
            placeholder="Search help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </div>
      </div>

      <div className="flex-1 px-4 py-6 space-y-6">
        {/* Contact Options */}
        <div>
          <h2 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-3 px-2">Contact Us</h2>
          <div className="bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            {contactOptions.map((option, idx) => {
              const Icon = option.icon;
              return (
                <button
                  key={idx}
                  onClick={option.action}
                  className={`w-full p-4 flex items-center gap-4 text-left active:bg-zinc-50 dark:active:bg-zinc-800 transition-colors ${
                    idx < contactOptions.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-800' : ''
                  }`}
                >
                  <div className={`w-12 h-12 ${option.bgColor} dark:bg-opacity-20 rounded-xl flex items-center justify-center`}>
                    <Icon size={24} className={option.color} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 dark:text-white">{option.title}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{option.subtitle}</p>
                  </div>
                  <ChevronRight size={20} className="text-zinc-300 dark:text-zinc-600" />
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-3 px-2">
            Frequently Asked Questions
          </h2>
          <div className="bg-white dark:bg-surface-dark rounded-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            {filteredFAQs.length === 0 ? (
              <div className="p-6 text-center">
                <HelpCircle size={32} className="text-zinc-300 mx-auto mb-2" />
                <p className="text-sm text-zinc-500">No results found</p>
              </div>
            ) : (
              filteredFAQs.map((faq, idx) => (
                <div 
                  key={idx}
                  className={idx < filteredFAQs.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-800' : ''}
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                    className="w-full p-4 flex items-center gap-3 text-left"
                  >
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <HelpCircle size={16} className="text-accent" />
                    </div>
                    <span className="flex-1 font-medium text-slate-900 dark:text-white text-sm">{faq.question}</span>
                    <ChevronDown 
                      size={20} 
                      className={`text-zinc-400 transition-transform ${expandedFAQ === idx ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  {expandedFAQ === idx && (
                    <div className="px-4 pb-4 pl-16">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Additional Resources */}
        <div>
          <h2 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-3 px-2">Resources</h2>
          <div className="space-y-2">
            <button className="w-full bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 flex items-center gap-3 text-left">
              <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center">
                <FileText size={20} className="text-violet-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">User Guide</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Complete app documentation</p>
              </div>
              <ExternalLink size={18} className="text-zinc-400" />
            </button>
            
            <button className="w-full bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 flex items-center gap-3 text-left">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                <FileText size={20} className="text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Terms of Service</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Legal terms and conditions</p>
              </div>
              <ExternalLink size={18} className="text-zinc-400" />
            </button>
            
            <button className="w-full bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 flex items-center gap-3 text-left">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                <FileText size={20} className="text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Privacy Policy</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">How we protect your data</p>
              </div>
              <ExternalLink size={18} className="text-zinc-400" />
            </button>
          </div>
        </div>

        {/* App Version */}
        <div className="text-center pt-4">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">Athens Digital Services v1.0.0</p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">© 2025 Municipality of Athens</p>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
