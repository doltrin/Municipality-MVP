import { announcementCard, bottomNavItems, greetingContext, quickActions, statsCards, taskItems, userPersona } from '../designData';
import { Droplets, ThermometerSun, Wind, Sun, Bell, Search } from 'lucide-react';

const MaterialShowcase = () => {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#141218] text-[#E6E0E9] font-sans overflow-hidden">
      {/* Material 3 Top App Bar - positioned below Dynamic Island (48px from top) */}
      <header className="shrink-0 bg-[#141218] px-5 pt-[52px] pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-xl bg-[#4F378B] text-[#EADDFF] flex items-center justify-center font-bold text-lg shadow-sm">
              Δ
           </div>
           <div className="flex flex-col">
              <span className="text-[17px] font-normal tracking-normal text-[#E6E0E9] leading-tight">Athens.gov</span>
              <span className="text-[11px] text-[#CAC4D0] font-medium tracking-wide">Municipality Super App</span>
           </div>
        </div>
        <div className="flex items-center gap-1">
           <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#49454F]/20 transition-colors text-[#CAC4D0]">
              <Sun size={24} />
           </button>
           <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#49454F]/20 transition-colors text-[#CAC4D0]">
              <Search size={24} />
           </button>
           <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#49454F]/20 transition-colors text-[#CAC4D0] relative">
              <Bell size={24} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#B3261E] rounded-full border border-[#141218]"></span>
           </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 pb-6 space-y-6 hide-scrollbar min-h-0">
        {/* Hero Card */}
        <div className="bg-[#4F378B] rounded-[28px] p-6 text-white relative overflow-hidden shadow-md mt-2">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
          
          <div className="flex justify-between items-start relative z-10">
            <div>
              <span className="inline-block px-3 py-1 bg-[#EADDFF]/20 rounded-lg text-[#EADDFF] text-xs font-medium tracking-wide mb-3 border border-[#EADDFF]/10">
                {greetingContext.date}
              </span>
              <h2 className="text-[32px] leading-[40px] font-normal">
                Good Evening,<br/>
                <span className="font-semibold">{userPersona.name}</span>
              </h2>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[44px] font-normal leading-none">{userPersona.weather.temp}°</span>
              <div className="flex items-center gap-2 mt-2 text-[#EADDFF]">
                <Sun size={20} className="fill-current" />
                <span className="text-sm font-medium">{userPersona.weather.condition}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-6 mt-8 pt-6 border-t border-white/20">
             <div className="flex flex-col gap-1">
                <span className="text-xs text-[#EADDFF] uppercase tracking-wider">Humidity</span>
                <span className="font-medium text-lg flex items-center gap-1"><Droplets size={16}/> {userPersona.weather.humidity}%</span>
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-xs text-[#EADDFF] uppercase tracking-wider">Wind</span>
                <span className="font-medium text-lg flex items-center gap-1"><Wind size={16}/> {userPersona.weather.wind}</span>
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-xs text-[#EADDFF] uppercase tracking-wider">Feels Like</span>
                <span className="font-medium text-lg flex items-center gap-1"><ThermometerSun size={16}/> 26°</span>
             </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          {statsCards.map((card, idx) => (
            <div key={idx} className="bg-[#2B2930] rounded-2xl p-4 flex flex-col justify-between h-32 relative group overflow-hidden">
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${idx === 0 ? 'bg-[#4F378B] text-[#EADDFF]' : 'bg-[#4A4458] text-[#E8DEF8]'}`}>
                {idx === 0 ? <span className="font-bold">€</span> : (idx === 1 ? <span className="font-bold">★</span> : <span className="font-bold">●</span>)}
              </div>
              <div>
                <div className="text-2xl font-normal text-[#E6E0E9]">{card.value}</div>
                <div className="text-xs font-medium text-[#CAC4D0] mt-1">{card.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Active Tasks */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-sm font-medium tracking-wide text-[#E6E0E9]">Active Tasks</h3>
            <button className="text-[#D0BCFF] text-sm font-medium hover:bg-[#D0BCFF]/10 px-3 py-1 rounded-full transition-colors">View All</button>
          </div>
          <div className="bg-[#2B2930] rounded-[24px] overflow-hidden">
            {taskItems.map((task, idx) => (
              <div key={task.id} className={`p-4 flex items-center gap-4 hover:bg-[#36343B] transition-colors relative ${idx !== taskItems.length - 1 ? 'border-b border-[#49454F]' : ''}`}>
                {/* State Layer Overlay */}
                <div className="w-10 h-10 rounded-full bg-[#E8DEF8] text-[#1D192B] flex items-center justify-center">
                  <task.icon size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="text-base text-[#E6E0E9] font-medium">{task.title}</h4>
                  <p className="text-sm text-[#CAC4D0] mt-0.5">{task.date}</p>
                </div>
                <div className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    task.status === 'in_progress' 
                    ? 'bg-[#FFD8E4] text-[#31111D]' // M3 Error/Pink Container
                    : 'bg-[#E8DEF8] text-[#1D192B]' // M3 Secondary Container
                }`}>
                  {task.status === 'in_progress' ? 'In Progress' : 'Scheduled'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div>
           <h3 className="text-sm font-medium tracking-wide text-[#E6E0E9] mb-4 px-1">Quick Access</h3>
           <div className="grid grid-cols-4 gap-4">
             {quickActions.map((action) => (
               <div key={action.id} className="flex flex-col items-center gap-2 group">
                 <div className="w-14 h-14 rounded-2xl bg-[#4A4458] group-hover:bg-[#625B71] text-[#E8DEF8] flex items-center justify-center transition-all duration-200 shadow-sm">
                   <action.icon size={24} strokeWidth={1.5} />
                 </div>
                 <span className="text-[11px] font-medium text-[#CAC4D0] text-center leading-tight">{action.label}</span>
               </div>
             ))}
           </div>
        </div>

        {/* Announcements */}
        <div className="border border-[#938F99] rounded-2xl p-5 relative overflow-hidden">
           <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#EADDFF] text-[#21005D] flex items-center justify-center shrink-0">
                 <announcementCard.icon size={24} />
              </div>
              <div className="flex-1">
                 <h4 className="text-lg text-[#E6E0E9] font-normal mb-1">{announcementCard.title}</h4>
                 <p className="text-sm text-[#CAC4D0] leading-relaxed mb-4">{announcementCard.description}</p>
                 <button className="h-10 px-6 rounded-full bg-[#D0BCFF] text-[#381E72] text-sm font-medium hover:bg-[#E8DEF8] transition-colors">
                    {announcementCard.cta}
                 </button>
              </div>
           </div>
        </div>
      </main>

      {/* M3 Navigation Bar (Bottom) - Adjusted for Home Indicator */}
      <nav className="shrink-0 bg-[#2B2930] pb-12 pt-2 px-4 flex justify-around items-center border-t border-transparent z-30">
         {bottomNavItems.map((item, idx) => {
           const isActive = idx === 0;
           if (item.label === 'AI') {
             return (
               <button key={idx} className="w-14 h-14 bg-[#D0BCFF] text-[#381E72] rounded-2xl flex items-center justify-center shadow-lg hover:bg-[#E8DEF8] transition-all -translate-y-1">
                 <item.icon size={24} />
               </button>
             )
           }
           return (
             <button key={idx} className="flex flex-col items-center gap-1 w-16 group">
               <div className={`w-16 h-8 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-[#4A4458]' : 'bg-transparent group-hover:bg-[#49454F]/20'}`}>
                 <item.icon size={24} className={isActive ? 'text-[#E8DEF8]' : 'text-[#CAC4D0]'} />
               </div>
               <span className={`text-[11px] font-medium ${isActive ? 'text-[#E8DEF8]' : 'text-[#CAC4D0]'}`}>
                 {item.label}
               </span>
             </button>
           )
         })}
      </nav>
    </div>
  );
};

export default MaterialShowcase;
