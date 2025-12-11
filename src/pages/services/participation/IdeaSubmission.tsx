import React, { useState } from 'react';
import { ArrowLeft, Lightbulb, MapPin, Camera, Send, CheckCircle2, ThumbsUp, MessageCircle, Clock, Tag, ChevronRight, Plus, X, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

type ViewMode = 'browse' | 'submit';

interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  status: 'pending' | 'under_review' | 'approved' | 'implemented';
  hasLiked?: boolean;
}

const IdeaSubmission: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('browse');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [likedIdeas, setLikedIdeas] = useState<Set<string>>(new Set());
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    images: [] as string[]
  });
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { id: 'all', label: 'All Ideas' },
    { id: 'infrastructure', label: 'Infrastructure' },
    { id: 'environment', label: 'Environment' },
    { id: 'mobility', label: 'Mobility' },
    { id: 'culture', label: 'Culture' },
    { id: 'social', label: 'Social' },
    { id: 'digital', label: 'Digital Services' },
  ];

  const ideas: Idea[] = [
    {
      id: '1',
      title: 'Free WiFi in all public squares',
      description: 'Install free public WiFi hotspots in all major squares and parks to improve connectivity for citizens and tourists.',
      category: 'digital',
      location: 'City-wide',
      author: 'Maria K.',
      date: '2 days ago',
      likes: 234,
      comments: 18,
      status: 'under_review'
    },
    {
      id: '2',
      title: 'More recycling bins in Exarchia',
      description: 'The neighborhood needs more recycling bins, especially for plastic and paper. Current bins are always overflowing.',
      category: 'environment',
      location: 'Exarchia',
      author: 'Nikos P.',
      date: '5 days ago',
      likes: 156,
      comments: 12,
      status: 'approved'
    },
    {
      id: '3',
      title: 'Pedestrian zone on Ermou Street weekends',
      description: 'Close Ermou Street to traffic on weekends to create a pedestrian-friendly shopping experience.',
      category: 'mobility',
      location: 'Syntagma',
      author: 'Elena T.',
      date: '1 week ago',
      likes: 412,
      comments: 45,
      status: 'implemented'
    },
    {
      id: '4',
      title: 'Community garden in abandoned lot',
      description: 'Transform the abandoned lot on Patision Street into a community garden where residents can grow vegetables.',
      category: 'environment',
      location: 'Patisia',
      author: 'Dimitris M.',
      date: '3 days ago',
      likes: 89,
      comments: 7,
      status: 'pending'
    },
    {
      id: '5',
      title: 'Night bus service extension',
      description: 'Extend night bus service hours until 3 AM on weekends to improve nightlife accessibility.',
      category: 'mobility',
      location: 'City-wide',
      author: 'Sofia L.',
      date: '4 days ago',
      likes: 298,
      comments: 23,
      status: 'under_review'
    },
  ];

  const filteredIdeas = activeCategory === 'all' 
    ? ideas 
    : ideas.filter(i => i.category === activeCategory);

  const handleLike = (ideaId: string) => {
    const newLiked = new Set(likedIdeas);
    if (newLiked.has(ideaId)) {
      newLiked.delete(ideaId);
    } else {
      newLiked.add(ideaId);
    }
    setLikedIdeas(newLiked);
  };

  const handleSubmit = () => {
    // Simulate submission
    setSubmitted(true);
  };

  const getStatusBadge = (status: Idea['status']) => {
    const styles = {
      pending: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400',
      under_review: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
      approved: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
      implemented: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    };
    const labels = {
      pending: 'Pending Review',
      under_review: 'Under Review',
      approved: 'Approved',
      implemented: 'Implemented',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  if (submitted) {
    return (
      <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Idea Submitted!</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">Thank you for contributing to our city.</p>
          
          <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-5 text-left mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-zinc-500 dark:text-zinc-400">Reference</span>
              <span className="font-mono font-bold text-accent">IDEA-{new Date().getFullYear()}-{Math.random().toString().slice(2, 6)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-500 dark:text-zinc-400">Status</span>
              {getStatusBadge('pending')}
            </div>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
            You'll receive notifications as your idea is reviewed.
          </p>

          <div className="space-y-3">
            <button 
              onClick={() => {
                setSubmitted(false);
                setViewMode('browse');
                setFormData({ title: '', description: '', category: '', location: '', images: [] });
              }}
              className="w-full py-3 bg-accent text-white font-bold rounded-xl"
            >
              Browse Other Ideas
            </button>
            <button 
              onClick={() => navigate('/')}
              className="w-full py-3 text-zinc-600 dark:text-zinc-400 font-medium"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark pb-32">
      {/* Header */}
      <div className="bg-white dark:bg-surface-dark px-4 pt-12 pb-4 sticky top-0 z-10 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => viewMode === 'submit' ? setViewMode('browse') : navigate(-1)} className="text-zinc-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              {viewMode === 'submit' ? 'Submit Your Idea' : 'Citizen Ideas'}
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {viewMode === 'submit' ? 'Share your vision for the city' : 'Υποβολή Ιδεών Πολιτών'}
            </p>
          </div>
          <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/30 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Lightbulb size={20} />
          </div>
        </div>

        {/* View Toggle */}
        {viewMode === 'browse' && (
          <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-accent text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'browse' ? (
          <motion.div
            key="browse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 space-y-4"
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-3 text-center">
                <p className="text-xl font-bold text-slate-900 dark:text-white">127</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Total Ideas</p>
              </div>
              <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-3 text-center">
                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">23</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Implemented</p>
              </div>
              <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-3 text-center">
                <p className="text-xl font-bold text-amber-600 dark:text-amber-400">34</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">In Review</p>
              </div>
            </div>

            {/* Ideas List */}
            {filteredIdeas.map((idea, index) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm flex-1">{idea.title}</h3>
                  {getStatusBadge(idea.status)}
                </div>
                
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 line-clamp-2">{idea.description}</p>

                <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {idea.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {idea.date}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-700">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">by {idea.author}</span>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => handleLike(idea.id)}
                      className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                        likedIdeas.has(idea.id) 
                          ? 'text-accent' 
                          : 'text-zinc-500 dark:text-zinc-400 hover:text-accent'
                      }`}
                    >
                      <ThumbsUp size={14} className={likedIdeas.has(idea.id) ? 'fill-current' : ''} />
                      {idea.likes + (likedIdeas.has(idea.id) ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-accent">
                      <MessageCircle size={14} />
                      {idea.comments}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="submit"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-4 space-y-4"
          >
            <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Your Idea</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2">Title</label>
                  <input 
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Give your idea a catchy title"
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2">Description</label>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe your idea in detail. What problem does it solve? How would it benefit the community?"
                    rows={4}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.filter(c => c.id !== 'all').map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setFormData({...formData, category: cat.id})}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          formData.category === cat.id
                            ? 'bg-accent text-white'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2">Location</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input 
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="Neighborhood or specific location"
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Add Photos (Optional)</h3>
              <div className="grid grid-cols-3 gap-3">
                <button className="aspect-square rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-700 flex flex-col items-center justify-center gap-1 text-zinc-400 hover:border-accent hover:text-accent transition-colors">
                  <Camera size={24} />
                  <span className="text-[10px] font-medium">Add Photo</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Action */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white dark:bg-surface-dark border-t border-zinc-200 dark:border-zinc-800">
        {viewMode === 'browse' ? (
          <button 
            onClick={() => setViewMode('submit')}
            className="w-full py-4 bg-accent text-white font-bold rounded-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Submit Your Idea
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            disabled={!formData.title || !formData.description || !formData.category}
            className={`w-full py-4 font-bold rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
              formData.title && formData.description && formData.category
                ? 'bg-accent text-white'
                : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400'
            }`}
          >
            <Send size={20} />
            Submit Idea
          </button>
        )}
      </div>
    </div>
  );
};

export default IdeaSubmission;
