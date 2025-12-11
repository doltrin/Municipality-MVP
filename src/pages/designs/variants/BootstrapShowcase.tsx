import { announcementCard, bottomNavItems, emergencyInfo, greetingContext, popularServices, quickActions, statsCards, taskItems, userPersona, newsHighlights, } from '../designData';
import { Droplets, ThermometerSun, Wind, Sun, ArrowRight, Bell, Search, Menu, ChevronRight } from 'lucide-react';

const BootstrapShowcase = () => {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#212529] text-[#f8f9fa] font-sans overflow-hidden">
      {/* Bootstrap Navbar (Dark) - positioned below Dynamic Island */}
      <nav className="shrink-0 bg-[#212529] border-b border-[#343a40] px-3 pt-[52px] pb-2 flex items-center justify-between">
         <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#0d6efd] rounded text-white flex items-center justify-center font-bold text-lg border border-[#0a58ca]">
               Δ
            </div>
            <div className="flex flex-col">
               <span className="text-xl font-medium leading-none">Athens.gov</span>
               <span className="text-[10px] text-[#adb5bd] uppercase tracking-wide">Municipality Super App</span>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <Sun size={20} className="text-[#adb5bd]" />
            <Search size={20} className="text-[#adb5bd]" />
            <div className="position-relative">
               <Bell size={20} className="text-[#adb5bd]" />
               <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#dc3545]"></span>
            </div>
         </div>
      </nav>

      <main className="flex-1 overflow-y-auto p-3 space-y-3 hide-scrollbar min-h-0">
        {/* Bootstrap Hero - Card */}
        <div className="bg-[#0d6efd] rounded border border-[#0a58ca] text-white p-4 shadow-sm">
           <div className="flex justify-between items-start mb-4">
              <div>
                 <span className="badge bg-[#0a58ca] text-white mb-2 font-normal">{greetingContext.date}</span>
                 <h1 className="h2 font-medium mb-0">
                    {greetingContext.greeting},<br/>
                    {userPersona.name}
                 </h1>
              </div>
              <div className="text-right">
                 <div className="display-4 font-light text-5xl">{userPersona.weather.temp}°</div>
                 <div className="d-flex align-items-center justify-end gap-1 mt-1">
                    <Sun size={16}/> {userPersona.weather.condition}
                 </div>
              </div>
           </div>

           <div className="row g-0 flex border-t border-white/20 pt-3 mt-3">
              <div className="col flex-1 text-center border-end border-white/20">
                 <div className="small text-uppercase opacity-75 text-[10px]">Humidity</div>
                 <div className="fw-bold flex items-center justify-center gap-1"><Droplets size={14}/> {userPersona.weather.humidity}%</div>
              </div>
              <div className="col flex-1 text-center border-end border-white/20">
                 <div className="small text-uppercase opacity-75 text-[10px]">Wind</div>
                 <div className="fw-bold flex items-center justify-center gap-1"><Wind size={14}/> {userPersona.weather.wind}</div>
              </div>
              <div className="col flex-1 text-center">
                 <div className="small text-uppercase opacity-75 text-[10px]">Feels Like</div>
                 <div className="fw-bold flex items-center justify-center gap-1"><ThermometerSun size={14}/> 26°</div>
              </div>
           </div>
        </div>

        {/* Stats - Card Group */}
        <div className="grid grid-cols-3 gap-3">
           {statsCards.map((card, idx) => (
              <div key={idx} className="bg-[#2c3034] border border-[#373b3e] rounded p-3">
                 <div className="text-muted text-[10px] uppercase mb-1 font-bold tracking-wide text-[#adb5bd]">{card.label}</div>
                 <div className="h4 mb-0 font-medium text-xl">{card.value}</div>
                 {idx === 0 && <div className="text-[#198754] text-[10px] mt-1 font-bold">+€12.00</div>}
              </div>
           ))}
        </div>

        {/* Active Tasks - List Group */}
        <div className="card bg-[#2c3034] border border-[#373b3e] rounded overflow-hidden">
           <div className="card-header bg-[#212529] border-b border-[#373b3e] p-3 flex justify-between items-center">
              <span className="text-sm font-medium">Active Tasks</span>
              <button className="btn btn-link btn-sm text-[#0d6efd] no-underline p-0 text-xs">View All</button>
           </div>
           <div className="list-group list-group-flush">
              {taskItems.map((task, idx) => (
                 <div key={task.id} className={`list-group-item bg-[#2c3034] text-white p-3 flex items-center justify-between border-b border-[#373b3e] last:border-0 hover:bg-[#343a40]`}>
                    <div className="flex items-center gap-3">
                       <div className="bg-[#212529] p-2 rounded text-[#0d6efd] border border-[#373b3e]">
                          <task.icon size={18} />
                       </div>
                       <div>
                          <div className="fw-bold text-sm">{task.title}</div>
                          <div className="small text-[#adb5bd] text-xs">{task.date}</div>
                       </div>
                    </div>
                    <span className={`badge rounded-pill ${
                       task.status === 'in_progress'
                       ? 'bg-[#ffc107] text-black'
                       : 'bg-[#0dcaf0] text-black'
                    }`}>
                       {task.status === 'in_progress' ? 'Processing' : 'Scheduled'}
                    </span>
                 </div>
              ))}
           </div>
        </div>

        {/* Quick Access - Grid */}
        <div>
           <div className="h6 mb-2 text-[#adb5bd] text-sm font-bold pl-1">Quick Access</div>
           <div className="grid grid-cols-3 gap-3">
              {quickActions.map((action) => (
                 <button key={action.id} className="btn btn-outline-light bg-[#2c3034] border border-[#373b3e] h-24 flex flex-col items-center justify-center gap-2 rounded hover:bg-[#343a40] hover:border-[#495057]">
                    <action.icon size={24} className="text-[#0d6efd]" />
                    <span className="small text-xs">{action.label}</span>
                 </button>
              ))}
           </div>
        </div>

        {/* Announcement - Warning Alert */}
        <div className="alert alert-warning bg-[#332701] border border-[#997404] text-[#ffda6a] p-3 rounded flex gap-3" role="alert">
           <announcementCard.icon size={24} className="flex-shrink-0" />
           <div>
              <h4 className="alert-heading text-sm font-bold mb-1">{announcementCard.title}</h4>
              <p className="mb-2 text-xs opacity-90">{announcementCard.description}</p>
              <button className="btn btn-warning btn-sm text-xs font-bold py-1 px-2 bg-[#ffc107] text-black border-0">
                 {announcementCard.cta}
              </button>
           </div>
        </div>

        {/* Emergency - Danger Alert */}
        <div className="alert alert-danger bg-[#2c0b0e] border border-[#842029] text-[#ea868f] p-3 rounded flex justify-between items-center mb-3">
           <div className="flex gap-2 items-center">
              <emergencyInfo.icon size={20} />
              <div>
                 <span className="fw-bold block text-sm">{emergencyInfo.title}</span>
                 <span className="small text-xs opacity-75">{emergencyInfo.description}</span>
              </div>
           </div>
           <button className="btn btn-danger btn-sm text-xs font-bold bg-[#dc3545] text-white border-0">Call</button>
        </div>

        {/* Popular Services - List Group Linked */}
        <div className="card bg-[#2c3034] border border-[#373b3e] rounded mb-3">
           <div className="card-header bg-[#212529] border-b border-[#373b3e] p-3">
              <span className="text-sm font-medium">Popular Services</span>
           </div>
           <div className="list-group list-group-flush">
              {popularServices.map((service, idx) => (
                 <button key={service.id} className="list-group-item list-group-item-action bg-[#2c3034] text-white p-3 flex justify-between items-center border-b border-[#373b3e] last:border-0 hover:bg-[#343a40]">
                    <div className="flex gap-2 items-center">
                       <service.icon size={16} className="text-[#adb5bd]" />
                       <span className="text-sm text-[#0d6efd]">{service.name}</span>
                    </div>
                    <ChevronRight size={14} className="text-[#6c757d]" />
                 </button>
              ))}
           </div>
        </div>

        {/* News - Card Deck */}
        <div className="mb-3">
           <div className="flex justify-between items-center mb-2 pl-1">
              <div className="h6 mb-0 text-[#adb5bd] text-sm font-bold">Latest News</div>
              <button className="btn btn-link btn-sm text-[#0d6efd] no-underline p-0 text-xs">More</button>
           </div>
           <div className="space-y-3">
              {newsHighlights.map((news) => (
                 <div key={news.id} className="card bg-[#2c3034] border border-[#373b3e] text-white flex-row overflow-hidden rounded">
                    <div className="w-24 bg-cover bg-center" style={{ backgroundImage: `url(${news.image})` }} />
                    <div className="card-body p-3 flex-1">
                       <span className="badge bg-[#0d6efd] mb-1 text-[10px]">{news.category}</span>
                       <h5 className="card-title text-sm font-bold mb-1">{news.title}</h5>
                       <p className="card-text text-[#adb5bd] text-[10px]">{news.date}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </main>

      {/* Bootstrap Bottom Nav */}
      <nav className="navbar shrink-0 bg-[#212529] border-t border-[#343a40] pb-12 pt-2 flex items-stretch z-30 h-auto">
         <div className="container-fluid flex p-0 h-full w-full">
            {bottomNavItems.map((item, idx) => {
               if (item.label === 'AI') {
                  return (
                     <div key={idx} className="flex-1 flex justify-center items-center">
                        <button className="btn btn-primary rounded-circle w-12 h-12 flex items-center justify-center p-0 shadow bg-[#0d6efd] border-[#0d6efd] -mt-4">
                           <item.icon size={22} className="text-white" />
                        </button>
                     </div>
                  )
               }
               return (
                  <button key={idx} className="flex-1 border-0 bg-transparent flex flex-col items-center justify-center gap-1 text-[#6c757d] hover:text-[#f8f9fa] py-2">
                     <item.icon size={20} className={idx === 0 ? 'text-[#0d6efd]' : ''} />
                     <span className={`small text-[10px] ${idx === 0 ? 'text-[#0d6efd] fw-bold' : ''}`}>{item.label}</span>
                  </button>
               )
            })}
         </div>
      </nav>
    </div>
  );
};

export default BootstrapShowcase;
