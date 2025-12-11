import React from 'react';
import { ArrowLeft, Calendar, Share2, Bookmark, Clock } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { newsData } from '../data/newsData';

const NewsDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const newsItem = newsData.find(item => item.id === id) || newsData[0];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-full bg-white"
    >
      {/* Hero Image */}
      <div className="relative h-72 w-full">
        <img 
          src={newsItem.image} 
          alt="News Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-12 left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="absolute top-12 right-6 flex gap-3">
          <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <Bookmark size={20} />
          </button>
          <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 -mt-8 bg-white rounded-t-[2rem] relative">
        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>
        
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
            {newsItem.category}
          </span>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <Clock size={14} />
            <span>{newsItem.readTime} read</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
          {newsItem.title}
        </h1>

        <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-6">
          <div className="w-10 h-10 bg-slate-100 rounded-full overflow-hidden">
             <img src="https://i.pravatar.cc/150?img=12" alt="Author" className="w-full h-full object-cover" />
          </div>
          <div>
             <p className="text-sm font-bold text-slate-800">Municipality Press</p>
             <div className="flex items-center gap-1 text-xs text-slate-500">
               <Calendar size={12} />
               <span>{newsItem.date}, 2025</span>
             </div>
          </div>
        </div>

        <div className="prose prose-slate prose-sm max-w-none text-slate-600 leading-relaxed space-y-4 whitespace-pre-line">
          {newsItem.content}
        </div>
      </div>
    </motion.div>
  );
};

export default NewsDetail;
