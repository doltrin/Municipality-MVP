import React, { useState, useEffect } from 'react';
import { Camera, MapPin, ChevronRight, History, Check, ArrowLeft, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Requests: React.FC = () => {
  const navigate = useNavigate();
  const locationState = useLocation();

  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if returning from LocationPicker with a location
    if (locationState.state && locationState.state.location) {
      setLocation(locationState.state.location);
    }
  }, [locationState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !location) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/requests/history');
    }, 1500);
  };

  const isFormValid = category && location;

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-surface-dark px-6 pt-12 pb-4 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)} 
              className="text-zinc-400 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">New Request</h1>
          </div>
          <button 
            onClick={() => navigate('/requests/history')}
            className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-accent hover:bg-accent/10 transition-colors"
            aria-label="View request history"
          >
            <History size={20} />
          </button>
        </div>
      </header>

      <main className="p-4">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Category Selection */}
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                Category
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select 
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent font-medium text-slate-900 dark:text-white"
                  aria-required="true"
                >
                  <option value="" disabled>Select a category...</option>
                  <option value="pothole">Pothole / Road Damage</option>
                  <option value="garbage">Garbage / Cleaning</option>
                  <option value="lighting">Street Lighting</option>
                  <option value="greenery">Parks & Greenery</option>
                  <option value="stray">Stray Animals</option>
                  <option value="other">Other</option>
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 rotate-90 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900 dark:text-white">Photo Evidence</label>
              <button
                type="button"
                className="w-full border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-xl p-6 flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500 gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:border-accent dark:hover:border-accent transition-all cursor-pointer active:scale-[0.99]"
                aria-label="Upload photo evidence"
              >
                <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  <Camera size={24} />
                </div>
                <span className="text-xs font-medium">Tap to take or upload a photo</span>
              </button>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                Location
                <span className="text-red-500">*</span>
              </label>
              <button 
                type="button"
                onClick={() => navigate('/requests/location', { state: { from: 'requests' } })}
                className={`w-full border rounded-xl px-4 py-3.5 text-sm flex items-center gap-3 transition-all active:scale-[0.99] ${
                  location 
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' 
                    : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700'
                }`}
                aria-label="Set location on map"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  location 
                    ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400 dark:text-zinc-500'
                }`}>
                  <MapPin size={18} />
                </div>
                <span className={`flex-1 text-left font-medium truncate ${
                  location ? 'text-slate-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'
                }`}>
                  {location || 'Tap to set location on map'}
                </span>
                {location && <Check size={18} className="text-emerald-600 dark:text-emerald-400" />}
              </button>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-bold text-slate-900 dark:text-white">Description</label>
              <textarea 
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent h-28 resize-none font-medium text-slate-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                placeholder="Describe the issue in detail..."
              />
            </div>

            {/* Validation Message */}
            {!isFormValid && (category || location) && (
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-medium bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg">
                <AlertCircle size={14} />
                Please fill in all required fields
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
                (!isFormValid || isSubmitting) 
                  ? 'bg-zinc-300 dark:bg-zinc-700 cursor-not-allowed text-zinc-500 dark:text-zinc-400' 
                  : 'bg-accent shadow-lg shadow-accent/30 active:scale-[0.98] hover:shadow-xl'
              }`}
              aria-disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Request'
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Requests;
