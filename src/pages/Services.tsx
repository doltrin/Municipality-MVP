import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Clock, ChevronRight, Star, TrendingUp, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Removed framer-motion for instant transitions
import { serviceCategories, getAllServices, getPopularServices, getNewServices, searchServices } from '../data/servicesData';
import type { ServiceItem } from '../data/servicesData';

// Service Card Component
interface ServiceCardProps {
  service: ServiceItem;
  categoryName?: string;
  showMeta?: boolean;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, categoryName, showMeta, onClick }) => {
  const Icon = service.icon;
  return (
    <button 
      onClick={onClick}
      className="w-full card-interactive p-4 flex items-center gap-3 group"
      aria-label={`${service.name}${categoryName ? `, ${categoryName}` : ''}${service.estimatedTime ? `, estimated time ${service.estimatedTime}` : ''}`}
    >
      <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:bg-accent/10 group-hover:text-accent transition-colors flex-shrink-0">
        <Icon size={24} strokeWidth={1.8} />
      </div>
      <div className="flex-1 text-left min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm truncate">{service.name}</h3>
          {service.new && (
            <span className="badge-accent flex-shrink-0">NEW</span>
          )}
          {service.popular && (
            <Star size={14} className="text-amber-500 fill-amber-500 flex-shrink-0" aria-label="Popular" />
          )}
        </div>
        {categoryName && (
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">{categoryName}</p>
        )}
        {showMeta && service.estimatedTime && (
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-[11px] text-zinc-400 flex items-center gap-1">
              <Clock size={12} /> {service.estimatedTime}
            </span>
            {service.fee && (
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">{service.fee}</span>
            )}
          </div>
        )}
      </div>
      <ChevronRight size={20} className="text-zinc-300 dark:text-zinc-600 group-hover:text-accent transition-colors flex-shrink-0" aria-hidden="true" />
    </button>
  );
};

type ViewMode = 'categories' | 'popular' | 'new';

const Services: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('categories');
  const navigate = useNavigate();

  const popularServices = useMemo(() => getPopularServices(), []);
  const newServices = useMemo(() => getNewServices(), []);
  const filteredServices = useMemo(() => 
    searchQuery ? searchServices(searchQuery) : [], 
    [searchQuery]
  );

  const handleServiceClick = (path: string) => {
    navigate(path);
  };

  const activeTab = serviceCategories.find(c => c.id === activeCategory);

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark">
      {/* Header */}
      <header className="bg-white dark:bg-surface-dark px-4 pt-12 pb-4 sticky top-0 z-10 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Services</h1>
          <span className="badge bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
            {getAllServices().length} total
          </span>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <label htmlFor="services-search" className="sr-only">Search services</label>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={20} />
          <input 
            id="services-search"
            type="search" 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setActiveCategory(null);
            }}
            placeholder="Search 100+ services..." 
            className="input pl-11"
            autoComplete="off"
          />
        </div>

        {/* Quick Filter Tabs - Improved touch targets */}
        {!searchQuery && !activeCategory && (
          <nav className="flex gap-2 mt-4 overflow-x-auto hide-scrollbar -mx-4 px-4 snap-x" aria-label="Filter services">
            {[
              { id: 'categories', label: 'All Categories', icon: null },
              { id: 'popular', label: 'Popular', icon: Star },
              { id: 'new', label: 'New', icon: Sparkles },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setViewMode(tab.id as ViewMode)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all snap-start ${
                  viewMode === tab.id
                    ? 'bg-accent text-white shadow-md shadow-accent/25'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
                aria-pressed={viewMode === tab.id}
              >
                {tab.icon && <tab.icon size={14} aria-hidden="true" />}
                {tab.label}
              </button>
            ))}
          </nav>
        )}

        {/* Relocated New Request CTA - Improved accessibility */}
        <button
          onClick={() => navigate('/requests')}
          className="w-full mt-5 bg-gradient-to-br from-accent to-blue-600 text-white rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-accent/30 border border-white/10 active:scale-[0.98] transition-transform group"
          aria-label="Start a new service request"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center group-hover:bg-white/25 transition-colors">
              <ClipboardList size={26} />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Service Desk
              </p>
              <p className="text-lg font-bold leading-tight">Start a New Request</p>
            </div>
          </div>
          <ChevronRight size={24} className="text-white/80 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </button>
      </header>

      <div className="p-4 pb-32">
          {searchQuery ? (
            // Search Results
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Results</h2>
                <span className="text-xs text-zinc-400">{filteredServices.length} found</span>
              </div>
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <ServiceCard 
                    key={service.id} 
                    service={service} 
                    categoryName={service.categoryName}
                    onClick={() => handleServiceClick(service.path)} 
                  />
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={24} className="text-zinc-400" />
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-400 font-medium">No services found</p>
                  <p className="text-xs text-zinc-400 mt-1">Try different keywords</p>
                </div>
              )}
            </div>
          ) : activeCategory && activeTab ? (
            // Category Detail View
            <div>
              <button 
                onClick={() => setActiveCategory(null)}
                className="text-xs text-accent font-bold flex items-center gap-1 hover:underline mb-2"
              >
                ← All Categories
              </button>
              
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeTab.bgColor} ${activeTab.darkBgColor} ${activeTab.color}`}>
                  <activeTab.icon size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">{activeTab.name}</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{activeTab.services.length} services</p>
                </div>
              </div>

              <div className="space-y-2">
                {activeTab.services.map((service) => (
                  <ServiceCard 
                    key={service.id} 
                    service={service}
                    showMeta
                    onClick={() => handleServiceClick(service.path)} 
                  />
                ))}
              </div>
            </div>
          ) : viewMode === 'popular' ? (
            // Popular Services
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={18} className="text-amber-500" />
                <h2 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Most Used Services</h2>
              </div>
              {popularServices.map((service) => (
                <ServiceCard 
                  key={service.id} 
                  service={service}
                  categoryName={service.categoryName}
                  showMeta
                  onClick={() => handleServiceClick(service.path)} 
                />
              ))}
            </div>
          ) : viewMode === 'new' ? (
            // New Services
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-accent" />
                <h2 className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Recently Added</h2>
              </div>
              {newServices.map((service) => (
                <ServiceCard 
                  key={service.id} 
                  service={service}
                  categoryName={service.categoryName}
                  showMeta
                  onClick={() => handleServiceClick(service.path)} 
                />
              ))}
            </div>
          ) : (
            // Categories Grid
            <div className="grid grid-cols-2 gap-3">
              {serviceCategories.map((category) => (
                <button 
                  key={category.id} 
                  onClick={() => setActiveCategory(category.id)}
                  className="card-interactive p-4 text-left group"
                  aria-label={`${category.name}, ${category.services.length} services`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${category.bgColor} ${category.darkBgColor} ${category.color} mb-3 group-hover:scale-110 transition-transform duration-200`}>
                    <category.icon size={26} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5 line-clamp-1">{category.name}</h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">{category.services.length} services</p>
                </button>
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default Services;
