import { announcementCard, bottomNavItems, emergencyInfo, greetingContext, popularServices, quickActions, statsCards, taskItems, userPersona, newsHighlights } from '../designData';
import { Droplets, ThermometerSun, Wind, Sun, Bell, Search, ChevronRight } from 'lucide-react';

const DaisyShowcase = () => {
  return (
    <div className="absolute inset-0 flex flex-col bg-neutral text-neutral-content font-sans overflow-hidden">
      {/* Daisy Navbar - positioned below Dynamic Island */}
      <div className="navbar bg-base-100 shadow-xl shrink-0 px-4 pt-[52px] pb-3 h-auto items-start">
         <div className="flex-1 flex-col gap-1">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-primary text-primary-content rounded-box flex items-center justify-center font-bold text-lg">
                  Δ
               </div>
               <div>
                  <a className="btn btn-ghost normal-case text-xl p-0 h-auto min-h-0 leading-none">Athens.gov</a>
                  <span className="text-[10px] opacity-70 block uppercase tracking-wider">Municipality Super App</span>
               </div>
            </div>
         </div>
         <div className="flex-none gap-2">
            <button className="btn btn-ghost btn-circle btn-sm">
               <Sun size={20} />
            </button>
            <button className="btn btn-ghost btn-circle btn-sm">
               <Search size={20} />
            </button>
            <button className="btn btn-ghost btn-circle btn-sm">
               <div className="indicator">
                  <Bell size={20} />
                  <span className="badge badge-xs badge-error indicator-item"></span>
               </div>
            </button>
         </div>
      </div>

      <main className="flex-1 overflow-y-auto p-4 space-y-6 hide-scrollbar min-h-0">
        {/* Daisy Hero - Card with Primary/Secondary Gradient */}
        <div className="card w-full bg-gradient-to-r from-secondary to-accent text-secondary-content shadow-xl">
           <div className="card-body p-6">
              <div className="flex justify-between items-start">
                 <div>
                    <div className="badge badge-outline badge-sm mb-2 opacity-80 border-secondary-content text-secondary-content">{greetingContext.date}</div>
                    <h2 className="card-title text-3xl font-bold">
                       {greetingContext.greeting},<br/>
                       {userPersona.name}
                    </h2>
                 </div>
                 <div className="text-right">
                    <div className="text-5xl font-black">{userPersona.weather.temp}°</div>
                    <div className="flex justify-end items-center gap-1 mt-1 opacity-90">
                       <Sun size={16}/>
                       <span>{userPersona.weather.condition}</span>
                    </div>
                 </div>
              </div>

              <div className="divider divider-vertical before:bg-secondary-content/20 after:bg-secondary-content/20"></div>

              <div className="flex justify-between text-center">
                 <div>
                    <div className="stat-title text-secondary-content opacity-70 text-xs uppercase">Humidity</div>
                    <div className="stat-value text-lg text-secondary-content flex items-center gap-1"><Droplets size={16}/> {userPersona.weather.humidity}%</div>
                 </div>
                 <div>
                    <div className="stat-title text-secondary-content opacity-70 text-xs uppercase">Wind</div>
                    <div className="stat-value text-lg text-secondary-content flex items-center gap-1"><Wind size={16}/> {userPersona.weather.wind}</div>
                 </div>
                 <div>
                    <div className="stat-title text-secondary-content opacity-70 text-xs uppercase">Feels Like</div>
                    <div className="stat-value text-lg text-secondary-content flex items-center gap-1"><ThermometerSun size={16}/> 26°</div>
                 </div>
              </div>
           </div>
        </div>

        {/* Daisy Stats - Stats Component */}
        <div className="stats shadow w-full bg-base-200">
           {statsCards.map((card, idx) => (
              <div key={idx} className="stat place-items-center p-2">
                 <div className="stat-title text-[10px] uppercase">{card.label}</div>
                 <div className={`stat-value text-xl ${idx === 0 ? 'text-primary' : ''}`}>{card.value}</div>
                 {idx === 0 && <div className="stat-desc text-success">↗︎ €12 (24%)</div>}
              </div>
           ))}
        </div>

        {/* Active Tasks - Card with Actions */}
        <div className="card w-full bg-base-100 shadow-xl">
           <div className="card-body p-0">
              <div className="p-4 border-b border-base-300 flex justify-between items-center">
                 <h3 className="card-title text-sm uppercase opacity-70">Active Tasks</h3>
                 <button className="btn btn-xs btn-link text-secondary no-underline">View All</button>
              </div>
              <ul className="menu bg-base-100 w-full rounded-b-box p-2">
                 {taskItems.map((task) => (
                    <li key={task.id}>
                       <a className="flex gap-4 items-center py-3">
                          <div className="avatar placeholder">
                             <div className="bg-neutral-focus text-neutral-content rounded-xl w-10">
                                <task.icon size={20} />
                             </div>
                          </div>
                          <div className="flex-1">
                             <span className="font-bold">{task.title}</span>
                             <span className="block text-xs opacity-50">{task.date}</span>
                          </div>
                          <div className={`badge ${task.status === 'in_progress' ? 'badge-warning' : 'badge-info'} badge-sm`}>
                             {task.status === 'in_progress' ? 'Processing' : 'Scheduled'}
                          </div>
                       </a>
                    </li>
                 ))}
              </ul>
           </div>
        </div>

        {/* Quick Access - Button Grid */}
        <div>
           <h3 className="text-sm font-bold uppercase opacity-70 mb-3 px-1">Quick Access</h3>
           <div className="grid grid-cols-3 gap-3">
              {quickActions.map((action) => (
                 <button key={action.id} className="btn btn-outline btn-neutral h-24 flex-col gap-2 normal-case rounded-box hover:bg-neutral hover:text-white border-base-300 bg-base-100">
                    <action.icon size={24} className="text-primary" />
                    <span className="text-xs">{action.label}</span>
                 </button>
              ))}
           </div>
        </div>

        {/* Announcement - Alert */}
        <div className="alert shadow-lg bg-warning/10 border-warning border text-warning-content">
           <announcementCard.icon size={24} className="text-warning" />
           <div>
              <h3 className="font-bold">{announcementCard.title}</h3>
              <div className="text-xs">{announcementCard.description}</div>
           </div>
           <button className="btn btn-sm btn-warning">{announcementCard.cta}</button>
        </div>

        {/* Emergency - Alert Error */}
        <div className="alert shadow-lg bg-error/10 border-error border text-error-content flex justify-between">
           <div className="flex gap-2 items-center">
              <emergencyInfo.icon size={24} className="text-error" />
              <div>
                 <h3 className="font-bold">{emergencyInfo.title}</h3>
                 <div className="text-xs opacity-80">{emergencyInfo.description}</div>
              </div>
           </div>
           <button className="btn btn-sm btn-error btn-outline">Call</button>
        </div>

        {/* Popular Services - Compact Menu */}
        <div className="card w-full bg-base-100 shadow-xl">
           <div className="card-body p-4">
              <h3 className="card-title text-sm uppercase opacity-70 mb-2">Popular Services</h3>
              <div className="grid gap-2">
                 {popularServices.map((service) => (
                    <button key={service.id} className="btn btn-ghost justify-between bg-base-200 hover:bg-base-300 normal-case">
                       <div className="flex gap-3 items-center">
                          <service.icon size={18} />
                          <span>{service.name}</span>
                       </div>
                       <ChevronRight size={16} className="opacity-50" />
                    </button>
                 ))}
              </div>
           </div>
        </div>

        {/* News - Image Cards */}
        <div className="carousel w-full gap-4">
           {newsHighlights.map((news) => (
              <div key={news.id} className="carousel-item w-3/4">
                 <div className="card w-full bg-base-100 shadow-xl image-full">
                    <figure><img src={news.image} alt={news.title} /></figure>
                    <div className="card-body p-4 justify-end">
                       <div className="badge badge-secondary badge-sm mb-1">{news.category}</div>
                       <h2 className="card-title text-sm">{news.title}</h2>
                       <p className="text-xs opacity-70 flex-grow-0">{news.date}</p>
                    </div>
                 </div>
              </div>
           ))}
        </div>
      </main>

      {/* Daisy Bottom Nav - Flex Layout */}
      <div className="btm-nav btm-nav-lg z-30 bg-base-100 border-t border-base-300 relative shrink-0 pb-12 pt-2 h-auto items-center">
         {bottomNavItems.map((item, idx) => {
            if (item.label === 'AI') {
               return (
                  <button key={idx} className="active bg-secondary text-secondary-content border-secondary circle overflow-visible relative -mt-4 h-16 w-16 rounded-full p-0 flex items-center justify-center">
                     <div className="absolute -top-2 bg-secondary p-3 rounded-full shadow-lg border-4 border-base-100">
                        <item.icon size={24} />
                     </div>
                  </button>
               )
            }
            return (
               <button key={idx} className={`${idx === 0 ? 'text-primary active' : ''} hover:bg-base-200 h-full flex flex-col gap-1 py-2`}>
                  <item.icon size={20} />
                  <span className="btm-nav-label text-[10px]">{item.label}</span>
               </button>
            )
         })}
      </div>
    </div>
  );
};

export default DaisyShowcase;
