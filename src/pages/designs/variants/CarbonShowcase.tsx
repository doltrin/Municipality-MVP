import { announcementCard, bottomNavItems, emergencyInfo, greetingContext, popularServices, quickActions, statsCards, taskItems, userPersona, newsHighlights } from '../designData';
import { Droplets, ThermometerSun, Wind, Sun, Bell, Search, ChevronRight, ArrowRight } from 'lucide-react';

const CarbonShowcase = () => {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#161616] text-[#F4F4F4] font-sans overflow-hidden">
      {/* Carbon Header - positioned below Dynamic Island */}
      <header className="shrink-0 bg-[#161616] border-b border-[#393939] px-4 pt-[52px] pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0F62FE] text-white flex items-center justify-center font-bold text-lg">
             Δ
          </div>
          <div className="flex flex-col">
             <span className="text-[16px] font-semibold tracking-wide leading-tight">Athens.gov</span>
             <span className="text-[11px] text-[#C6C6C6] tracking-wider">MUNICIPALITY SUPER APP</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white hover:bg-[#393939] p-2 transition-colors"><Sun size={20} /></button>
          <button className="text-white hover:bg-[#393939] p-2 transition-colors"><Search size={20} /></button>
          <button className="text-white hover:bg-[#393939] p-2 transition-colors relative">
             <Bell size={20} />
             <span className="absolute top-1 right-1 w-2 h-2 bg-[#DA1E28] rounded-full border border-[#161616]"></span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar min-h-0">
        {/* Carbon Hero */}
        <div className="bg-[#262626] p-4 border-l-4 border-[#0F62FE] shadow-sm">
          <div className="flex justify-between items-start">
            <div>
               <p className="text-xs text-[#C6C6C6] mb-1 uppercase tracking-wider">{greetingContext.date}</p>
               <h2 className="text-2xl font-light text-white mb-1">{greetingContext.greeting},</h2>
               <h2 className="text-2xl font-semibold text-white">{userPersona.name}</h2>
            </div>
            <div className="text-right">
               <div className="text-4xl font-light text-white">{userPersona.weather.temp}°</div>
               <div className="text-sm text-[#0F62FE] mt-1 font-medium">{userPersona.weather.condition}</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-[#393939]">
             <div className="flex flex-col">
                <span className="text-[10px] text-[#C6C6C6] uppercase mb-1">Humidity</span>
                <span className="flex items-center gap-2 text-sm"><Droplets size={14}/> {userPersona.weather.humidity}%</span>
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] text-[#C6C6C6] uppercase mb-1">Wind</span>
                <span className="flex items-center gap-2 text-sm"><Wind size={14}/> {userPersona.weather.wind}</span>
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] text-[#C6C6C6] uppercase mb-1">Feels Like</span>
                <span className="flex items-center gap-2 text-sm"><ThermometerSun size={14}/> 26°</span>
             </div>
          </div>
        </div>

        {/* Stats - 3 Columns, strict rectangles */}
        <div className="grid grid-cols-3 gap-4">
          {statsCards.map((card, idx) => (
             <div key={idx} className="bg-[#262626] p-3 border-b border-[#393939] hover:bg-[#353535] transition-colors cursor-pointer group">
                <p className="text-[10px] text-[#C6C6C6] uppercase mb-2">{card.label}</p>
                <p className="text-xl font-medium group-hover:text-[#0F62FE] transition-colors">{card.value}</p>
                {idx === 0 && <p className="text-[10px] text-[#42BE65] mt-1">+€12.00</p>}
             </div>
          ))}
        </div>

        {/* Active Tasks - Structured List */}
        <div>
           <div className="flex justify-between items-center mb-2 px-1">
              <h3 className="text-xs uppercase font-semibold text-[#C6C6C6] tracking-wide">Active Tasks</h3>
              <button className="text-[#0F62FE] text-xs hover:underline">View all</button>
           </div>
           <div className="space-y-1">
              {taskItems.map((task) => (
                 <div key={task.id} className="bg-[#262626] p-4 flex items-center justify-between border-l-2 border-transparent hover:border-[#0F62FE] transition-colors group">
                    <div className="flex items-center gap-3">
                       <task.icon size={18} className="text-[#C6C6C6] group-hover:text-white" />
                       <div>
                          <p className="text-sm font-medium text-[#F4F4F4]">{task.title}</p>
                          <p className="text-xs text-[#C6C6C6]">{task.date}</p>
                       </div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 border ${
                       task.status === 'in_progress' 
                       ? 'border-[#F1C21B] text-[#F1C21B]' 
                       : 'border-[#4589FF] text-[#4589FF]'
                    }`}>
                       {task.status === 'in_progress' ? 'In Progress' : 'Scheduled'}
                    </span>
                 </div>
              ))}
           </div>
        </div>

        {/* Quick Access - Grid */}
        <div>
           <h3 className="text-xs uppercase font-semibold text-[#C6C6C6] tracking-wide mb-2 px-1">Quick Access</h3>
           <div className="grid grid-cols-3 gap-1">
              {quickActions.map((action) => (
                 <button key={action.id} className="bg-[#262626] h-24 flex flex-col items-center justify-center gap-2 hover:bg-[#353535] transition-colors group">
                    <action.icon size={20} className="text-[#C6C6C6] group-hover:text-[#0F62FE]" />
                    <span className="text-xs text-[#F4F4F4]">{action.label}</span>
                 </button>
              ))}
           </div>
        </div>

        {/* Announcement - Featured Tile */}
        <div className="bg-[#393939] p-4 flex gap-4 items-start">
           <announcementCard.icon size={24} className="text-[#F1C21B] shrink-0 mt-1" />
           <div className="flex-1">
              <h4 className="text-base font-semibold text-white mb-1">{announcementCard.title}</h4>
              <p className="text-sm text-[#C6C6C6] mb-3">{announcementCard.description}</p>
              <button className="bg-[#0F62FE] text-white text-sm px-4 py-2 hover:bg-[#0353E9] w-full text-left flex justify-between items-center group">
                 {announcementCard.cta} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>

        {/* Emergency Info - Red Accent */}
        <div className="bg-[#DA1E28] p-4 flex items-center justify-between text-white">
           <div className="flex items-center gap-3">
              <emergencyInfo.icon size={20} />
              <div>
                 <p className="font-semibold text-sm">{emergencyInfo.title}</p>
                 <p className="text-xs opacity-90">{emergencyInfo.description}</p>
              </div>
           </div>
           <button className="border border-white px-3 py-1 text-xs font-medium hover:bg-white hover:text-[#DA1E28] transition-colors">
              Call Now
           </button>
        </div>

        {/* Popular Services - Link List */}
        <div>
           <h3 className="text-xs uppercase font-semibold text-[#C6C6C6] tracking-wide mb-2 px-1">Popular Services</h3>
           <div className="bg-[#262626]">
              {popularServices.map((service, idx) => (
                 <div key={service.id} className={`p-4 flex items-center justify-between hover:bg-[#353535] cursor-pointer group ${idx !== popularServices.length -1 ? 'border-b border-[#393939]' : ''}`}>
                    <div className="flex items-center gap-3">
                       <service.icon size={18} className="text-[#8D8D8D] group-hover:text-white" />
                       <span className="text-sm text-[#F4F4F4]">{service.name}</span>
                    </div>
                    <ChevronRight size={16} className="text-[#8D8D8D]" />
                 </div>
              ))}
           </div>
        </div>

        {/* News - Card with Image */}
        <div>
           <h3 className="text-xs uppercase font-semibold text-[#C6C6C6] tracking-wide mb-2 px-1">Latest News</h3>
           <div className="space-y-4">
              {newsHighlights.map((news) => (
                 <div key={news.id} className="bg-[#262626] flex group cursor-pointer hover:bg-[#353535] transition-colors">
                    <div className="w-24 bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${news.image})` }} />
                    <div className="p-3 flex-1">
                       <p className="text-[10px] text-[#0F62FE] uppercase font-bold mb-1">{news.category}</p>
                       <h4 className="text-sm font-medium text-white mb-2 leading-tight">{news.title}</h4>
                       <p className="text-[10px] text-[#8D8D8D]">{news.date}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </main>

      {/* Carbon Bottom Nav - Fixed, squared */}
      <nav className="shrink-0 bg-[#161616] border-t border-[#393939] pb-12 pt-2 flex items-stretch z-30">
         {bottomNavItems.map((item, idx) => {
            const isCenter = item.label === 'AI';
            if (isCenter) {
               return (
                  <button key={idx} className="flex-1 bg-[#0F62FE] text-white flex flex-col items-center justify-center gap-1 hover:bg-[#0353E9] transition-colors -mt-2 pt-2 pb-2">
                     <item.icon size={24} />
                     <span className="text-[10px] font-medium">AI Agent</span>
                  </button>
               )
            }
            return (
               <button key={idx} className="flex-1 flex flex-col items-center justify-center gap-1 text-[#C6C6C6] hover:bg-[#353535] hover:text-white transition-colors border-r border-[#393939] last:border-r-0">
                  <item.icon size={20} />
                  <span className="text-[10px]">{item.label}</span>
               </button>
            )
         })}
      </nav>
    </div>
  );
};

export default CarbonShowcase;
