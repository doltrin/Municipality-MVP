import React, { useState } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdoptionForm: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/animals');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50 pb-20">
      <div className="bg-rose-500 px-6 pt-12 pb-8 rounded-b-[2rem] shadow-lg text-white">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Adoption Application</h1>
        </div>
        <p className="text-rose-100 text-sm">You are applying to adopt <span className="font-bold text-white">Luna</span>. Please fill out the form below.</p>
      </div>

      <div className="p-6 -mt-6">
        <div className="bg-white rounded-2xl shadow-sleek p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Living Situation</h3>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Type of Home</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500">
                <option>Apartment</option>
                <option>House with Garden</option>
                <option>House without Garden</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Do you have other pets?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="pets" className="text-rose-500 focus:ring-rose-500" />
                  <span className="text-sm">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="pets" className="text-rose-500 focus:ring-rose-500" />
                  <span className="text-sm">No</span>
                </label>
              </div>
            </div>

            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2 pt-2">About You</h3>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Why do you want to adopt?</label>
              <textarea 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 h-24 resize-none"
                placeholder="Tell us a bit about yourself..."
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-rose-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-rose-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Submitting...</span>
              ) : (
                <>
                  <Heart size={20} />
                  Submit Application
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdoptionForm;
