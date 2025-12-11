import React, { useState, useMemo } from 'react';
import { Calendar, Clock, ChevronRight, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { newsData } from '../data/newsData';

const categories = ['All', 'Announcements', 'Events', 'Culture', 'Sports'] as const;
type Category = typeof categories[number];

const News: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredNews = useMemo(() => {
    if (activeCategory === 'All') return newsData;
    return newsData.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());
  }, [activeCategory]);

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark pb-32">
      {/* Header */}
      <header className="bg-white dark:bg-surface-dark px-6 pt-12 pb-4 sticky top-0 z-10 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">News & Events</h1>
        <nav className="flex gap-2 mt-4 overflow-x-auto hide-scrollbar pb-1" aria-label="News categories">
          {categories.map((tag) => (
            <button 
              key={tag}
              onClick={() => setActiveCategory(tag)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 ${
                activeCategory === tag 
                  ? 'bg-accent text-white shadow-md shadow-accent/25' 
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
              aria-pressed={activeCategory === tag}
            >
              {tag}
            </button>
          ))}
        </nav>
      </header>

      <main className="p-4 space-y-4">
        {filteredNews.length === 0 ? (
          <div className="text-center py-16">
            <Bookmark size={48} className="mx-auto text-zinc-300 dark:text-zinc-600 mb-4" />
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">No news in this category</p>
          </div>
        ) : (
          filteredNews.map((item) => (
            <article 
              key={item.id}
              className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden group"
            >
              <button 
                onClick={() => navigate(`/news/${item.id}`)}
                className="w-full text-left active:scale-[0.99] transition-all"
                aria-label={`Read article: ${item.title}`}
              >
                <div className="h-44 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={`Cover image for ${item.title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-white/95 dark:bg-zinc-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[10px] font-bold text-accent uppercase tracking-wider shadow-sm">
                    {item.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">{item.content}</p>
                  
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-700/50">
                    <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} />
                        <span>{item.readTime}</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 group-hover:bg-accent group-hover:text-white transition-colors">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </button>
            </article>
          ))
        )}
      </main>
    </div>
  );
};

export default News;
