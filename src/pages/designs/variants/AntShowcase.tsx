import { announcementCard, bottomNavItems, emergencyInfo, greetingContext, popularServices, quickActions, statsCards, taskItems, userPersona, newsHighlights, } from '../designData';
import { Droplets, ThermometerSun, Wind, Sun, ArrowRight, Bell, Search, Menu, ChevronRight } from 'lucide-react';

const AntShowcase = () => {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#141414] text-white/85 font-sans overflow-hidden">
      {/* Ant Layout Header - positioned below Dynamic Island */}
      <header className="shrink-0 bg-[#141414] px-5 pt-[52px] pb-3 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1890ff] text-white rounded-lg flex items-center justify-center font-bold text-lg">
             Δ
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-medium text-white/85 leading-tight">Athens.gov</span>
            <span className="text-[10px] text-white/45 uppercase tracking-wider">Municipality Super App</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Sun className="text-white/45 hover:text-white cursor-pointer transition-colors" size={20} />
          <Search className="text-white/45 hover:text-white cursor-pointer transition-colors" size={20} />
          <div className="relative cursor-pointer group">
             <Bell className="text-white/45 group-hover:text-white transition-colors" size={20} />
             <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#ff4d4f] rounded-full ring-2 ring-[#141414]"></span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar min-h-0">
        {/* Ant Hero */}
        <div className="bg-[#1f1f1f] rounded-lg p-6 shadow-sm border border-[#303030] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#1890ff] blur-[60px] opacity-20"></div>
          
          <div className="flex justify-between items-start relative z-10">
            <div>
               <p className="text-xs text-[#1890ff] font-medium mb-2">{greetingContext.date}</p>
               <h2 className="text-2xl font-medium text-white/85">
                 {greetingContext.greeting}, <br/>
                 <span className="font-semibold">{userPersona.name}</span>
               </h2>
               <p className="text-white/45 text-sm mt-1">{userPersona.city}</p>
            </div>
            <div className="text-right">
               <div className="text-5xl font-light text-white/85 flex items-start justify-end gap-1">
                 {userPersona.weather.temp}<span className="text-2xl mt-1">°</span>
               </div>
               <div className="flex items-center justify-end gap-2 mt-1 text-white/65">
                 <Sun size={14} className="text-[#faad14]" />
                 <span className="text-sm">{userPersona.weather.condition}</span>
               </div>
            </div>
          </div>

          <div className="flex justify-between mt-6 pt-4 border-t border-[#303030]">
             <div className="flex items-center gap-2">
                <Droplets size={14} className="text-[#1890ff]" />
                <span className="text-sm text-white/65">{userPersona.weather.humidity}%</span>
             </div>
             <div className="w-[1px] h-4 bg-[#303030]"></div>
             <div className="flex items-center gap-2">
                <Wind size={14} className="text-[#1890ff]" />
                <span className="text-sm text-white/65">{userPersona.weather.wind} km/h</span>
             </div>
             <div className="w-[1px] h-4 bg-[#303030]"></div>
             <div className="flex items-center gap-2">
                <ThermometerSun size={14} className="text-[#1890ff]" />
                <span className="text-sm text-white/65">Feels 26°</span>
             </div>
          </div>
        </div>

        {/* Ant Stats - Compact Cards */}
        <div className="grid grid-cols-3 gap-3">
          {statsCards.map((card, idx) => (
             <div key={idx} className="bg-[#1f1f1f] p-3 rounded-lg border border-[#303030] hover:border-[#1890ff] transition-colors cursor-pointer">
                <p className="text-[11px] text-white/45 uppercase mb-1">{card.label}</p>
                <p className="text-lg font-semibold text-white/85">{card.value}</p>
                {idx === 0 && <span className="text-[10px] text-[#52c41a] bg-[#135200] px-1 rounded">+€12</span>}
             </div>
          ))}
        </div>

        {/* Ant List - Active Tasks */}
        <div className="bg-[#1f1f1f] rounded-lg border border-[#303030] overflow-hidden">
           <div className="px-4 py-3 border-b border-[#303030] flex justify-between items-center bg-[#1f1f1f]">
              <h3 className="text-sm font-medium text-white/85">Active Tasks</h3>
              <button className="text-xs text-[#1890ff] hover:text-[#40a9ff]">View All</button>
           </div>
           <div>
              {taskItems.map((task, idx) => (
                 <div key={task.id} className={`p-4 flex items-center justify-between hover:bg-[#262626] cursor-pointer transition-colors ${idx !== taskItems.length - 1 ? 'border-b border-[#303030]' : ''}`}>
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded bg-[#111d2c] text-[#1890ff] flex items-center justify-center border border-[#112a45]">
                          <task.icon size={16} />
                       </div>
                       <div>
                          <p className="text-sm text-white/85 mb-0.5">{task.title}</p>
                          <p className="text-xs text-white/45">{task.date}</p>
                       </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded border ${
                       task.status === 'in_progress'
                       ? 'bg-[#2b2111] text-[#faad14] border-[#443b24]' // Warning status
                       : 'bg-[#111d2c] text-[#1890ff] border-[#112a45]' // Processing status
                    }`}>
                       {task.status === 'in_progress' ? 'Processing' : 'Waiting'}
                    </span>
                 </div>
              ))}
           </div>
        </div>

        {/* Ant Grid - Quick Access */}
        <div>
           <h3 className="text-sm font-medium text-white/85 mb-3 px-1">Quick Access</h3>
           <div className="grid grid-cols-4 gap-3">
              {quickActions.map((action) => (
                 <div key={action.id} className="flex flex-col items-center gap-2 cursor-pointer group">
                    <div className="w-12 h-12 rounded-lg bg-[#1f1f1f] border border-[#303030] group-hover:border-[#1890ff] group-hover:text-[#1890ff] text-white/65 flex items-center justify-center transition-all shadow-sm">
                       <action.icon size={20} strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] text-center text-white/65 group-hover:text-white/85">{action.label}</span>
                 </div>
              ))}
           </div>
        </div>

        {/* Ant Announcement - Alert Style */}
        <div className="bg-[#2b2111] border border-[#443b24] rounded-lg p-4 flex gap-3">
           <announcementCard.icon className="text-[#faad14] shrink-0" size={20} />
           <div className="flex-1">
              <h4 className="text-sm font-medium text-[#faad14] mb-1">{announcementCard.title}</h4>
              <p className="text-xs text-white/65 mb-3">{announcementCard.description}</p>
              <button className="bg-[#faad14] text-black text-xs px-3 py-1 rounded hover:bg-[#ffc53d] transition-colors font-medium">
                 {announcementCard.cta}
              </button>
           </div>
        </div>

        {/* Emergency Info - Danger Button */}
        <div className="bg-[#2a1215] border border-[#5c131a] rounded-lg p-4 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <emergencyInfo.icon className="text-[#ff4d4f]" size={20} />
              <div>
                 <h4 className="text-sm font-medium text-[#ff4d4f]">{emergencyInfo.title}</h4>
                 <p className="text-xs text-white/45">{emergencyInfo.description}</p>
              </div>
           </div>
           <button className="text-[#ff4d4f] border border-[#ff4d4f] text-xs px-3 py-1 rounded hover:bg-[#ff4d4f] hover:text-white transition-colors">
              {emergencyInfo.cta}
           </button>
        </div>

        {/* Ant List - Popular Services */}
        <div className="bg-[#1f1f1f] rounded-lg border border-[#303030] overflow-hidden">
           <div className="px-4 py-3 border-b border-[#303030] bg-[#1f1f1f]">
              <h3 className="text-sm font-medium text-white/85">Popular Services</h3>
           </div>
           <div>
              {popularServices.map((service, idx) => (
                 <div key={service.id} className={`p-4 flex items-center justify-between hover:bg-[#262626] cursor-pointer group ${idx !== popularServices.length - 1 ? 'border-b border-[#303030]' : ''}`}>
                    <div className="flex items-center gap-3">
                       <service.icon size={16} className="text-white/45 group-hover:text-[#1890ff] transition-colors" />
                       <span className="text-sm text-white/85">{service.name}</span>
                    </div>
                    <ChevronRight size={14} className="text-white/30" />
                 </div>
              ))}
           </div>
        </div>

        {/* News Feed - Cards */}
        <div>
           <div className="flex justify-between items-center mb-3 px-1">
              <h3 className="text-sm font-medium text-white/85">Latest News</h3>
              <button className="text-xs text-[#1890ff]">More</button>
           </div>
           <div className="space-y-3">
              {newsHighlights.map((news) => (
                 <div key={news.id} className="bg-[#1f1f1f] rounded-lg border border-[#303030] overflow-hidden hover:border-[#404040] transition-colors flex">
                    <div className="w-24 bg-cover bg-center" style={{ backgroundImage: `url(${news.image})` }} />
                    <div className="p-3 flex-1">
                       <span className="text-[10px] text-[#1890ff] bg-[#111d2c] px-1 py-0.5 rounded mb-2 inline-block">
                          {news.category}
                       </span>
                       <h4 className="text-sm font-medium text-white/85 mb-1 leading-snug">{news.title}</h4>
                       <p className="text-[10px] text-white/45">{news.date}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </main>

      {/* Ant Bottom Nav */}
      <nav className="shrink-0 bg-[#141414] border-t border-[#303030] px-6 pt-2 pb-12 flex items-center justify-between z-30">
         {bottomNavItems.map((item, idx) => {
            if (item.label === 'AI') {
               return (
                  <button key={idx} className="w-12 h-12 rounded-full bg-[#1890ff] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(24,144,255,0.4)] hover:bg-[#40a9ff] transition-colors mx-auto">
                     <item.icon size={22} />
                  </button>
               )
            }
            return (
               <button key={idx} className="flex flex-col items-center gap-1 group">
                  <item.icon size={20} className={idx === 0 ? 'text-[#1890ff]' : 'text-white/45 group-hover:text-white/85 transition-colors'} />
                  <span className={`text-[10px] ${idx === 0 ? 'text-[#1890ff]' : 'text-white/45'}`}>{item.label}</span>
               </button>
            )
         })}
      </nav>
    </div>
  );
};

export default AntShowcase;
