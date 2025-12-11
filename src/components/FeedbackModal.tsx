import React, { useState } from 'react';
import { X, Star, Send, MessageSquare, ThumbsUp } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  onSubmit?: (rating: number, comment: string) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, serviceName, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(rating, comment);
    }
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setRating(0);
      setComment('');
    }, 2000);
  };

  const quickFeedback = [
    'Fast & Easy',
    'Very Helpful',
    'Great Service',
    'Could be better',
  ];

  if (submitted) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white dark:bg-surface-dark rounded-3xl p-6 w-full max-w-[85%] text-center animate-in zoom-in-95">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <ThumbsUp size={36} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Thank You!</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Your feedback helps us improve our services.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-surface-dark rounded-t-3xl p-5 w-full max-h-[80%] overflow-y-auto animate-in slide-in-from-bottom-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
              <MessageSquare size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Rate Your Experience</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{serviceName}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center"
          >
            <X size={18} className="text-zinc-500" />
          </button>
        </div>

        {/* Star Rating */}
        <div className="mb-6">
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-3 text-center">How was your experience?</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1 transition-transform hover:scale-110 active:scale-95"
              >
                <Star 
                  size={36} 
                  className={`transition-colors ${
                    star <= (hoveredRating || rating) 
                      ? 'text-amber-400 fill-amber-400' 
                      : 'text-zinc-300 dark:text-zinc-600'
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-center text-sm font-medium text-amber-600 dark:text-amber-400 mt-2">
              {rating === 5 ? 'Excellent!' : rating === 4 ? 'Great!' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Poor'}
            </p>
          )}
        </div>

        {/* Quick Feedback Tags */}
        <div className="mb-4">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">Quick feedback (optional)</p>
          <div className="flex flex-wrap gap-2">
            {quickFeedback.map((tag) => (
              <button
                key={tag}
                onClick={() => setComment(prev => prev.includes(tag) ? prev.replace(tag + ' ', '') : prev + tag + ' ')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  comment.includes(tag)
                    ? 'bg-accent text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Comment Box */}
        <div className="mb-6">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us more about your experience... (optional)"
            rows={3}
            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold rounded-xl"
          >
            Skip
          </button>
          <button 
            onClick={handleSubmit}
            disabled={rating === 0}
            className="flex-1 py-3 bg-accent text-white font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
