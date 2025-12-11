import { announcementCard, bottomNavItems, emergencyInfo, greetingContext, popularServices, quickActions, statsCards, taskItems, userPersona, newsHighlights } from '../designData';
import { Droplets, ThermometerSun, Wind, Sun, Bell, Search, ChevronRight } from 'lucide-react';

const MuiShowcase = () => {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#121212] text-white font-sans overflow-hidden">
      {/* MUI AppBar - positioned below Dynamic Island */}
      <header className="shrink-0 bg-[#121212] px-4 pt-[52px] pb-3 flex items-center justify-between shadow-[0_4px_5px_0_rgba(0,0,0,0.14),0_1px_10px_0_rgba(0,0,0,0.12),0_2px_4px_-1px_rgba(0,0,0,0.2)]">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-[#1565c0] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
              Δ
           </div>
           <div className="flex flex-col">
              <span className="text-xl font-medium tracking-wide leading-tight">Athens.gov</span>
              <span className="text-[10px] text-white/60 font-medium tracking-widest uppercase">Municipality Super App</span>
           </div>
        </div>
        <div className="flex items-center gap-2">
           <button className="p-2 rounded-full hover:bg-white/5 transition-colors"><Sun size={24}/></button>
           <button className="p-2 rounded-full hover:bg-white/5 transition-colors"><Search size={24}/></button>
           <button className="p-2 rounded-full hover:bg-white/5 transition-colors relative">
              <Bell size={24}/>
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#f44336] rounded-full border border-[#121212]"></span>
           </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar min-h-0">
        {/* MUI Hero - Paper Elevation 3 */}
        <div className="bg-[#1e1e1e] rounded shadow-[0_3px_5px_-1px_rgba(0,0,0,0.2),0_6px_10px_0_rgba(0,0,0,0.14),0_1px_18px_0_rgba(0,0,0,0.12)] overflow-hidden">
           <div className="bg-gradient-to-br from-[#1565c0] to-[#0d47a1] p-5">
              <div className="flex justify-between items-start">
                 <div>
                    <span className="text-xs font-medium uppercase text-white/70 block mb-1">{greetingContext.date}</span>
                    <h2 className="text-2xl font-normal leading-snug">
                       {greetingContext.greeting},<br/>
                       {userPersona.name}
                    </h2>
                 </div>
                 <div className="text-right">
                    <div className="text-4xl font-normal">{userPersona.weather.temp}°</div>
                    <div className="flex items-center justify-end gap-1 mt-1 text-white/80">
                       <Sun size={16}/>
                       <span className="text-sm">{userPersona.weather.condition}</span>
                    </div>
                 </div>
              </div>

              <div className="flex justify-between mt-6 pt-4 border-t border-white/10 text-white/90">
                 <div className="text-center">
                    <span className="text-[10px] uppercase opacity-70 block">Humidity</span>
                    <span className="text-sm font-medium flex items-center gap-1 justify-center"><Droplets size={14}/> {userPersona.weather.humidity}%</span>
                 </div>
                 <div className="text-center">
                    <span className="text-[10px] uppercase opacity-70 block">Wind</span>
                    <span className="text-sm font-medium flex items-center gap-1 justify-center"><Wind size={14}/> {userPersona.weather.wind}</span>
                 </div>
                 <div className="text-center">
                    <span className="text-[10px] uppercase opacity-70 block">Feels Like</span>
                    <span className="text-sm font-medium flex items-center gap-1 justify-center"><ThermometerSun size={14}/> 26°</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Stats - Paper Elevation 1 */}
        <div className="grid grid-cols-3 gap-3">
           {statsCards.map((card, idx) => (
              <div key={idx} className="bg-[#1e1e1e] rounded p-3 shadow-[0_2px_1px_-1px_rgba(0,0,0,0.2),0_1px_1px_0_rgba(0,0,0,0.14),0_1px_3px_0_rgba(0,0,0,0.12)]">
                 <p className="text-[10px] text-white/60 uppercase font-medium mb-2 tracking-wider">{card.label}</p>
                 <p className="text-xl text-white/90 font-normal">{card.value}</p>
                 {idx === 0 && <span className="text-[10px] text-[#66bb6a] block mt-1 font-medium uppercase">+€12.00 ADDED</span>}
              </div>
           ))}
        </div>

        {/* Active Tasks - List in Paper */}
        <div className="bg-[#1e1e1e] rounded shadow-[0_2px_1px_-1px_rgba(0,0,0,0.2),0_1px_1px_0_rgba(0,0,0,0.14),0_1px_3px_0_rgba(0,0,0,0.12)]">
           <div className="px-4 py-3 flex justify-between items-center border-b border-white/5">
              <h3 className="text-sm font-medium text-white/70 uppercase tracking-wide">Active Tasks</h3>
              <button className="text-[#90caf9] text-sm font-medium uppercase hover:bg-[#90caf9]/10 px-2 py-1 rounded transition-colors">VIEW ALL</button>
           </div>
           <div>
              {taskItems.map((task, idx) => (
                 <div key={task.id} className={`p-4 flex items-center justify-between hover:bg-white/5 cursor-pointer ${idx !== taskItems.length -1 ? 'border-b border-white/5' : ''}`}>
                    <div className="flex items-center gap-4">
                       <task.icon size={24} className="text-white/60" />
                       <div>
                          <p className="text-base text-white/90 font-normal">{task.title}</p>
                          <p className="text-xs text-white/60">{task.date}</p>
                       </div>
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-1 rounded-full border ${
                       task.status === 'in_progress'
                       ? 'text-[#ffb74d] border-[#ffb74d]/50 bg-[#ffb74d]/10'
                       : 'text-[#90caf9] border-[#90caf9]/50 bg-[#90caf9]/10'
                    }`}>
                       {task.status === 'in_progress' ? 'IN PROGRESS' : 'SCHEDULED'}
                    </span>
                 </div>
              ))}
           </div>
        </div>

        {/* Quick Access - Grid */}
        <div>
           <h3 className="text-sm font-medium text-white/70 uppercase tracking-wide mb-3 pl-1">Quick Access</h3>
           <div className="grid grid-cols-3 gap-3">
              {quickActions.map((action) => (
                 <button key={action.id} className="bg-[#1e1e1e] h-24 rounded shadow-[0_2px_1px_-1px_rgba(0,0,0,0.2),0_1px_1px_0_rgba(0,0,0,0.14),0_1px_3px_0_rgba(0,0,0,0.12)] flex flex-col items-center justify-center gap-2 hover:bg-[#2c2c2c] transition-colors active:shadow-none">
                    <action.icon size={24} className="text-[#90caf9]" />
                    <span className="text-xs text-white/90 font-medium uppercase tracking-tight">{action.label}</span>
                 </button>
              ))}
           </div>
        </div>

        {/* Announcement - Card with Actions */}
        <div className="bg-[#1e1e1e] rounded shadow-[0_2px_1px_-1px_rgba(0,0,0,0.2),0_1px_1px_0_rgba(0,0,0,0.14),0_1px_3px_0_rgba(0,0,0,0.12)] overflow-hidden">
           <div className="p-4">
              <div className="flex gap-4">
                 <announcementCard.icon size={28} className="text-[#ffb74d]" />
                 <div>
                    <h4 className="text-lg font-normal text-white/90 mb-1">{announcementCard.title}</h4>
                    <p className="text-sm text-white/60 leading-relaxed">{announcementCard.description}</p>
                 </div>
              </div>
           </div>
           <div className="px-2 py-2 flex justify-end">
              <button className="text-[#ffb74d] text-sm font-medium uppercase px-3 py-1.5 rounded hover:bg-[#ffb74d]/10 transition-colors">
                 {announcementCard.cta}
              </button>
           </div>
        </div>

        {/* Emergency - Outlined Error */}
        <div className="border border-[#ef5350] rounded p-4 flex items-center justify-between bg-[#ef5350]/5">
           <div className="flex items-center gap-4">
              <emergencyInfo.icon size={24} className="text-[#ef5350]" />
              <div>
                 <h4 className="text-sm font-medium text-[#ef5350] uppercase">{emergencyInfo.title}</h4>
                 <p className="text-xs text-white/60">{emergencyInfo.description}</p>
              </div>
           </div>
           <button className="text-[#ef5350] font-medium text-sm uppercase px-3 py-1 hover:bg-[#ef5350]/10 rounded transition-colors">
              Call
           </button>
        </div>

        {/* Popular Services - List Group Linked */}
        <div className="bg-[#1e1e1e] rounded shadow-[0_2px_1px_-1px_rgba(0,0,0,0.2),0_1px_1px_0_rgba(0,0,0,0.14),0_1px_3px_0_rgba(0,0,0,0.12)]">
           <div className="px-4 py-3 border-b border-white/5">
              <h3 className="text-sm font-medium text-white/70 uppercase tracking-wide">Popular Services</h3>
           </div>
           <div>
              {popularServices.map((service, idx) => (
                 <div key={service.id} className={`p-4 flex items-center justify-between hover:bg-white/5 cursor-pointer ${idx !== popularServices.length - 1 ? 'border-b border-white/5' : ''}`}>
                    <div className="flex items-center gap-3">
                       <service.icon size={18} className="text-white/60" />
                       <span className="text-sm text-white/90 font-medium">{service.name}</span>
                    </div>
                    <ChevronRight size={16} className="text-white/40" />
                 </div>
              ))}
           </div>
        </div>

        {/* News - Standard Card List */}
        <div>
           <div className="flex justify-between items-center mb-3 pl-1">
              <h3 className="text-sm font-medium text-white/70 uppercase tracking-wide">Latest News</h3>
              <button className="text-[#90caf9] text-sm font-medium uppercase">MORE</button>
           </div>
           <div className="space-y-3">
              {newsHighlights.map((news) => (
                 <div key={news.id} className="bg-[#1e1e1e] flex rounded shadow-[0_2px_1px_-1px_rgba(0,0,0,0.2),0_1px_1px_0_rgba(0,0,0,0.14),0_1px_3px_0_rgba(0,0,0,0.12)] overflow-hidden h-24">
                    <div className="w-24 bg-cover bg-center" style={{ backgroundImage: `url(${news.image})` }} />
                    <div className="p-3 flex-1 flex flex-col justify-between">
                       <div>
                          <span className="text-[10px] text-[#90caf9] uppercase font-bold tracking-wider">{news.category}</span>
                          <h4 className="text-sm font-medium text-white/90 leading-tight mt-1 line-clamp-2">{news.title}</h4>
                       </div>
                       <p className="text-[10px] text-white/50">{news.date}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </main>

      {/* MUI Bottom Navigation - Flex Layout */}
      <nav className="shrink-0 bg-[#1e1e1e] shadow-[0_-2px_4px_-1px_rgba(0,0,0,0.2)] z-30 pb-12 pt-2 flex items-center border-t border-white/5">
         {bottomNavItems.map((item, idx) => {
            const isSelected = idx === 0;
            if (item.label === 'AI') {
               return (
                  <div key={idx} className="flex-1 flex justify-center items-center relative">
                     <button className="absolute -top-6 w-14 h-14 rounded-full bg-[#90caf9] shadow-[0_3px_5px_-1px_rgba(0,0,0,0.2),0_6px_10px_0_rgba(0,0,0,0.14),0_1px_18px_0_rgba(0,0,0,0.12)] text-[#000000] flex items-center justify-center hover:bg-[#64b5f6] transition-colors">
                        <item.icon size={24} />
                     </button>
                  </div>
               )
            }
            return (
               <button key={idx} className={`flex-1 flex flex-col items-center justify-center gap-1 ${isSelected ? 'text-[#90caf9]' : 'text-white/60'} hover:text-[#90caf9] transition-colors`}>
                  <item.icon size={24} />
                  <span className="text-[10px] uppercase font-medium tracking-wide scale-90">{item.label}</span>
               </button>
            )
         })}
      </nav>
    </div>
  );
};

export default MuiShowcase;
