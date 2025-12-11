import { announcementCard, bottomNavItems, emergencyInfo, greetingContext, popularServices, quickActions, statsCards, taskItems, userPersona, newsHighlights } from '../designData';
import { Droplets, ThermometerSun, Wind, Sun, Bell, Search, ChevronRight } from 'lucide-react';

const ChakraShowcase = () => {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#1A202C] text-white font-sans overflow-hidden">
      {/* Chakra Header - positioned below Dynamic Island */}
      <header className="shrink-0 bg-[#1A202C] px-4 pt-[52px] pb-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-[#805AD5] rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
              Δ
           </div>
           <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight leading-tight">Athens.gov</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Municipality Super App</span>
           </div>
        </div>
        <div className="flex items-center gap-2">
           <button className="p-2 hover:bg-white/10 rounded-md transition-colors"><Sun size={20}/></button>
           <button className="p-2 hover:bg-white/10 rounded-md transition-colors"><Search size={20}/></button>
           <button className="p-2 hover:bg-white/10 rounded-md transition-colors relative">
              <Bell size={20}/>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E53E3E] rounded-full"></span>
           </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-5 space-y-6 hide-scrollbar min-h-0">
        {/* Chakra Hero - Simple Box with Gradient */}
        <div className="bg-gradient-to-r from-[#553C9A] to-[#805AD5] rounded-lg p-6 shadow-lg">
           <div className="flex justify-between items-start">
              <div>
                 <span className="text-xs font-bold uppercase tracking-wide opacity-80 mb-2 block">{greetingContext.date}</span>
                 <h2 className="text-3xl font-bold leading-tight">
                    {greetingContext.greeting},<br/>
                    {userPersona.name}
                 </h2>
              </div>
              <div className="text-right">
                 <div className="text-5xl font-bold">{userPersona.weather.temp}°</div>
                 <div className="text-sm font-medium opacity-90 mt-1">{userPersona.weather.condition}</div>
              </div>
           </div>
           
           <div className="flex gap-6 mt-6 pt-4 border-t border-white/20">
              <div className="flex flex-col gap-1">
                 <span className="text-xs font-bold uppercase opacity-70">Humidity</span>
                 <span className="flex items-center gap-1 font-semibold"><Droplets size={14}/> {userPersona.weather.humidity}%</span>
              </div>
              <div className="flex flex-col gap-1">
                 <span className="text-xs font-bold uppercase opacity-70">Wind</span>
                 <span className="flex items-center gap-1 font-semibold"><Wind size={14}/> {userPersona.weather.wind}</span>
              </div>
              <div className="flex flex-col gap-1">
                 <span className="text-xs font-bold uppercase opacity-70">Feels Like</span>
                 <span className="flex items-center gap-1 font-semibold"><ThermometerSun size={14}/> 26°</span>
              </div>
           </div>
        </div>

        {/* Stats - Cards with Top Accent */}
        <div className="grid grid-cols-3 gap-4">
           {statsCards.map((card, idx) => (
              <div key={idx} className="bg-[#2D3748] rounded-md p-4 border-t-4 border-[#805AD5] shadow-md hover:bg-[#2D3748]/80 transition-colors">
                 <p className="text-xs font-bold text-gray-400 uppercase mb-1">{card.label}</p>
                 <p className="text-xl font-bold">{card.value}</p>
                 {idx === 0 && <span className="text-xs text-[#48BB78] font-bold mt-1 block">+€12.00</span>}
              </div>
           ))}
        </div>

        {/* Active Tasks - Simple Stack */}
        <div>
           <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400">Active Tasks</h3>
              <button className="text-[#D6BCFA] text-sm font-bold hover:underline">View All</button>
           </div>
           <div className="space-y-3">
              {taskItems.map((task) => (
                 <div key={task.id} className="bg-[#2D3748] p-4 rounded-md flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                       <div className="bg-[#805AD5]/20 p-2 rounded-md text-[#D6BCFA]">
                          <task.icon size={20} />
                       </div>
                       <div>
                          <p className="font-bold text-sm">{task.title}</p>
                          <p className="text-xs text-gray-400">{task.date}</p>
                       </div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                       task.status === 'in_progress'
                       ? 'bg-[#FAF089] text-[#744210]'
                       : 'bg-[#90CDF4] text-[#2A4365]'
                    }`}>
                       {task.status === 'in_progress' ? 'In Progress' : 'Scheduled'}
                    </span>
                 </div>
              ))}
           </div>
        </div>

        {/* Quick Access - Simple Grid */}
        <div>
           <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">Quick Access</h3>
           <div className="grid grid-cols-3 gap-3">
              {quickActions.map((action) => (
                 <button key={action.id} className="bg-[#2D3748] h-24 rounded-md flex flex-col items-center justify-center gap-2 hover:bg-[#4A5568] transition-colors shadow-sm">
                    <action.icon size={24} className="text-[#D6BCFA]" />
                    <span className="text-xs font-semibold">{action.label}</span>
                 </button>
              ))}
           </div>
        </div>

        {/* Announcement - Left Border Accent */}
        <div className="bg-[#FFFFF0] text-[#744210] p-4 rounded-md border-l-4 border-[#D69E2E] shadow-sm">
           <div className="flex gap-3">
              <announcementCard.icon size={24} className="text-[#D69E2E]" />
              <div>
                 <h4 className="font-bold text-sm mb-1">{announcementCard.title}</h4>
                 <p className="text-sm opacity-90 mb-3">{announcementCard.description}</p>
                 <button className="text-xs font-bold uppercase tracking-wide border-b border-[#744210] pb-0.5">
                    {announcementCard.cta}
                 </button>
              </div>
           </div>
        </div>

        {/* Emergency Info - Red Box */}
        <div className="bg-[#FED7D7] text-[#9B2C2C] p-4 rounded-md flex items-center justify-between border border-[#FC8181]">
           <div className="flex items-center gap-3">
              <emergencyInfo.icon size={24} />
              <div>
                 <h4 className="font-bold text-sm">{emergencyInfo.title}</h4>
                 <p className="text-xs opacity-80">{emergencyInfo.description}</p>
              </div>
           </div>
           <button className="bg-[#C53030] text-white text-xs font-bold px-3 py-2 rounded shadow-sm hover:bg-[#9B2C2C]">
              Call Now
           </button>
        </div>

        {/* Popular Services - Minimal List */}
        <div>
           <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">Popular Services</h3>
           <div className="bg-[#2D3748] rounded-md overflow-hidden">
              {popularServices.map((service, idx) => (
                 <div key={service.id} className={`p-4 flex items-center justify-between hover:bg-[#4A5568] transition-colors cursor-pointer ${idx !== popularServices.length -1 ? 'border-b border-gray-600' : ''}`}>
                    <div className="flex items-center gap-3">
                       <service.icon size={18} className="text-gray-400" />
                       <span className="font-semibold text-sm">{service.name}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-500" />
                 </div>
              ))}
           </div>
        </div>

        {/* News - Image Cards */}
        <div className="space-y-4">
           {newsHighlights.map((news) => (
              <div key={news.id} className="bg-[#2D3748] rounded-md overflow-hidden shadow-md flex flex-col">
                 <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${news.image})` }} />
                 <div className="p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D6BCFA] mb-1 block">{news.category}</span>
                    <h4 className="font-bold text-lg mb-1 leading-tight">{news.title}</h4>
                    <p className="text-xs text-gray-400">{news.date}</p>
                 </div>
              </div>
           ))}
        </div>
      </main>

      {/* Chakra Bottom Nav - Flex Layout */}
      <nav className="shrink-0 bg-[#1A202C] border-t border-white/10 px-6 pt-2 pb-12 z-30 flex items-center">
         <div className="flex items-center justify-between w-full">
            {bottomNavItems.map((item, idx) => {
               if (item.label === 'AI') {
                  return (
                     <button key={idx} className="w-12 h-12 bg-[#805AD5] rounded-full flex items-center justify-center text-white shadow-lg -mt-6 border-4 border-[#1A202C]">
                        <item.icon size={20} />
                     </button>
                  )
               }
               return (
                  <button key={idx} className={`flex flex-col items-center gap-1 ${idx === 0 ? 'text-[#D6BCFA]' : 'text-gray-500'}`}>
                     <item.icon size={20} />
                     <span className="text-[10px] font-bold">{item.label}</span>
                  </button>
               )
            })}
         </div>
      </nav>
    </div>
  );
};

export default ChakraShowcase;
