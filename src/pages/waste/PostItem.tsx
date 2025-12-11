import React, { useState } from 'react';
import { ArrowLeft, Camera, MapPin, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PostItem: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/waste/reuse');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50 pb-20">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm sticky top-0 z-10 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-slate-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-800">Post New Item</h1>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload */}
          <div className="w-full aspect-square bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-2 hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Camera size={24} className="text-slate-600" />
            </div>
            <span className="text-xs font-bold">Add Photos</span>
          </div>

          <Input label="Title" placeholder="e.g. Wooden Bookshelf" />
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Category</label>
            <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500">
              <option>Furniture</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Books</option>
              <option>Other</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Condition</label>
            <div className="flex gap-2">
              {['New', 'Like New', 'Good', 'Fair'].map((cond, idx) => (
                <button 
                  type="button"
                  key={cond} 
                  className={`flex-1 py-2 rounded-lg text-xs font-bold border ${idx === 1 ? 'bg-green-50 border-green-500 text-green-700' : 'bg-white border-slate-200 text-slate-600'}`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Location</label>
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800">
              <MapPin size={16} className="text-slate-400" />
              <span className="text-sm">Ag. Meletiou 132 (Your Home)</span>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-green-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-8"
          >
            {isSubmitting ? 'Posting...' : (
              <>
                <Check size={20} />
                Post Item
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const Input: React.FC<{ label: string, placeholder: string }> = ({ label, placeholder }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{label}</label>
    <input 
      type="text" 
      placeholder={placeholder}
      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
    />
  </div>
);

export default PostItem;
