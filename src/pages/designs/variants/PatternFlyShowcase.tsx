import { announcementCard, bottomNavItems, emergencyInfo, greetingContext, popularServices, quickActions, statsCards, taskItems, userPersona, newsHighlights } from '../designData';
import { Droplets, ThermometerSun, Wind, Sun, Bell, Search, ChevronRight } from 'lucide-react';

const PatternFlyShowcase = () => {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#151515] text-[#e0e0e0] font-sans overflow-hidden">
      {/* PatternFly Masthead - positioned below Dynamic Island */}
      <header className="shrink-0 bg-[#151515] border-b border-[#2b2b2b] px-4 pt-[52px] pb-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-[#0066cc] flex items-center justify-center text-white font-bold rounded">
              Δ
           </div>
           <div className="flex flex-col">
              <span className="text-lg font-medium text-white leading-tight">Athens.gov</span>
              <span className="text-[10px] uppercase text-[#6a6e73] font-bold tracking-widest">Municipality</span>
           </div>
        </div>
        <div className="flex items-center gap-6">
           <Sun size={18} className="text-white hover:text-[#0066cc] cursor-pointer" />
           <Search size={18} className="text-white hover:text-[#0066cc] cursor-pointer" />
           <Bell size={18} className="text-white hover:text-[#0066cc] cursor-pointer" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar min-h-0">
        {/* PatternFly Hero - Card with Blue Border Top */}
        <div className="bg-[#212427] border-t-2 border-[#0066cc] shadow-sm">
           <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <span className="inline-block px-2 py-0.5 bg-[#0066cc]/20 text-[#73bcf7] text-xs font-bold uppercase mb-2 rounded-sm border border-[#0066cc]/40">
                       {greetingContext.date}
                    </span>
                    <h2 className="text-2xl font-normal text-white">
                       {greetingContext.greeting}, <span className="font-bold">{userPersona.name}</span>
                    </h2>
                 </div>
                 <div className="text-right">
                    <div className="text-4xl font-light text-white">{userPersona.weather.temp}°</div>
                    <div className="flex justify-end items-center gap-2 mt-1 text-[#0066cc] font-medium text-sm">
                       <Sun size={16}/> {userPersona.weather.condition}
                    </div>
                 </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 border-t border-[#2b2b2b] pt-4">
                 <div>
                    <span className="text-xs text-[#6a6e73] font-bold uppercase block mb-1">Humidity</span>
                    <span className="text-sm text-white flex items-center gap-2"><Droplets size={14}/> {userPersona.weather.humidity}%</span>
                 </div>
                 <div>
                    <span className="text-xs text-[#6a6e73] font-bold uppercase block mb-1">Wind</span>
                    <span className="text-sm text-white flex items-center gap-2"><Wind size={14}/> {userPersona.weather.wind}</span>
                 </div>
                 <div>
                    <span className="text-xs text-[#6a6e73] font-bold uppercase block mb-1">Feels Like</span>
                    <span className="text-sm text-white flex items-center gap-2"><ThermometerSun size={14}/> 26°</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Stats - Cards with distinct headers */}
        <div className="grid grid-cols-3 gap-4">
           {statsCards.map((card, idx) => (
              <div key={idx} className="bg-[#212427] border border-[#2b2b2b] p-4 hover:border-[#0066cc] transition-colors cursor-pointer group">
                 <h4 className="text-xs font-bold text-[#6a6e73] uppercase mb-2 group-hover:text-[#0066cc]">{card.label}</h4>
                 <div className="text-xl font-medium text-white">{card.value}</div>
                 {idx === 0 && <div className="text-xs text-[#3e8635] mt-1 font-bold">+€12.00</div>}
              </div>
           ))}
        </div>

        {/* Active Tasks - Data List */}
        <div className="bg-[#212427] border border-[#2b2b2b]">
           <div className="px-4 py-3 border-b border-[#2b2b2b] flex justify-between items-center bg-[#292e34]">
              <h3 className="font-bold text-sm text-white">Active Tasks</h3>
              <button className="text-[#2b9af3] text-sm hover:underline font-medium">View all tasks</button>
           </div>
           <div className="divide-y divide-[#2b2b2b]">
              {taskItems.map((task) => (
                 <div key={task.id} className="p-4 flex items-center justify-between hover:bg-[#292e34] cursor-pointer border-l-4 border-transparent hover:border-l-[#0066cc]">
                    <div className="flex items-center gap-3">
                       <task.icon size={18} className="text-[#6a6e73]" />
                       <div>
                          <p className="text-sm font-bold text-white mb-0.5">{task.title}</p>
                          <p className="text-xs text-[#6a6e73]">{task.date}</p>
                       </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 border ${
                       task.status === 'in_progress'
                       ? 'border-[#f0ab00] text-[#f0ab00]'
                       : 'border-[#2b9af3] text-[#2b9af3]'
                    }`}>
                       {task.status === 'in_progress' ? 'Running' : 'Queued'}
                    </span>
                 </div>
              ))}
           </div>
        </div>

        {/* Quick Access - Grid */}
        <div>
           <h3 className="font-bold text-sm text-white mb-3">Quick Access</h3>
           <div className="grid grid-cols-3 gap-4">
              {quickActions.map((action) => (
                 <button key={action.id} className="bg-[#212427] border border-[#2b2b2b] h-24 flex flex-col items-center justify-center gap-2 hover:bg-[#292e34] hover:border-[#0066cc] transition-all">
                    <action.icon size={20} className="text-[#2b9af3]" />
                    <span className="text-xs font-medium text-white">{action.label}</span>
                 </button>
              ))}
           </div>
        </div>

        {/* Announcement - Warning Toast Style */}
        <div className="bg-[#212427] border-l-4 border-[#f0ab00] p-4 flex gap-4 shadow-sm">
           <announcementCard.icon size={20} className="text-[#f0ab00]" />
           <div className="flex-1">
              <h4 className="font-bold text-sm text-white mb-1">{announcementCard.title}</h4>
              <p className="text-sm text-[#e0e0e0] mb-3">{announcementCard.description}</p>
              <button className="text-[#2b9af3] font-bold text-sm hover:underline uppercase tracking-wide">
                 {announcementCard.cta}
              </button>
           </div>
        </div>

        {/* Emergency Info - Danger */}
        <div className="bg-[#212427] border-l-4 border-[#c9190b] p-4 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <emergencyInfo.icon size={20} className="text-[#c9190b]" />
              <div>
                 <h4 className="font-bold text-sm text-[#c9190b]">{emergencyInfo.title}</h4>
                 <p className="text-xs text-[#e0e0e0]">{emergencyInfo.description}</p>
              </div>
           </div>
           <button className="bg-[#c9190b] text-white text-xs font-bold px-4 py-1.5 hover:bg-[#a30000]">
              Call
           </button>
        </div>

        {/* Popular Services - Link List */}
        <div className="bg-[#212427] border border-[#2b2b2b]">
           <div className="px-4 py-3 border-b border-[#2b2b2b] bg-[#292e34]">
              <h3 className="font-bold text-sm text-white">Popular Services</h3>
           </div>
           <div className="divide-y divide-[#2b2b2b]">
              {popularServices.map((service) => (
                 <button key={service.id} className="w-full text-left p-4 flex items-center justify-between hover:bg-[#292e34] group">
                    <div className="flex items-center gap-3">
                       <service.icon size={16} className="text-[#6a6e73] group-hover:text-white" />
                       <span className="text-sm text-[#2b9af3] font-medium group-hover:underline">{service.name}</span>
                    </div>
                    <ChevronRight size={14} className="text-[#6a6e73]" />
                 </button>
              ))}
           </div>
        </div>

        {/* News - Card Grid */}
        <div>
           <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm text-white">Latest News</h3>
              <button className="text-[#2b9af3] text-sm hover:underline font-medium">View all</button>
           </div>
           <div className="space-y-4">
              {newsHighlights.map((news) => (
                 <div key={news.id} className="bg-[#212427] border border-[#2b2b2b] hover:border-[#0066cc] cursor-pointer flex">
                    <div className="w-24 bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${news.image})` }} />
                    <div className="p-3 flex-1">
                       <span className="text-[10px] font-bold uppercase text-[#6a6e73] mb-1 block">{news.category}</span>
                       <h4 className="text-sm font-medium text-white mb-2">{news.title}</h4>
                       <p className="text-xs text-[#6a6e73]">{news.date}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </main>

      {/* PatternFly Bottom Nav */}
      <nav className="shrink-0 bg-[#151515] border-t border-[#2b2b2b] pb-12 pt-2 flex items-stretch z-30">
         {bottomNavItems.map((item, idx) => {
            if (item.label === 'AI') {
               return (
                  <button key={idx} className="flex-1 flex flex-col items-center justify-center gap-1 bg-[#212427] border-l border-r border-[#2b2b2b] text-white hover:bg-[#292e34] relative overflow-hidden group -mt-2 pt-2 pb-2">
                     <div className="absolute top-0 left-0 w-full h-0.5 bg-[#0066cc]"></div>
                     <item.icon size={20} />
                     <span className="text-[10px] font-bold">AI Assistant</span>
                  </button>
               )
            }
            return (
               <button key={idx} className={`flex-1 flex flex-col items-center justify-center gap-1 ${idx === 0 ? 'text-[#2b9af3]' : 'text-[#d2d2d2]'} hover:text-white hover:bg-[#292e34]`}>
                  {idx === 0 && <div className="absolute top-0 w-1/5 h-0.5 bg-[#2b9af3]"></div>}
                  <item.icon size={18} />
                  <span className="text-[10px] font-medium">{item.label}</span>
               </button>
            )
         })}
      </nav>
    </div>
  );
};

export default PatternFlyShowcase;
