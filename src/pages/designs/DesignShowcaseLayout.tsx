import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const showcaseLinks = [
  { path: '/designs', label: 'Gallery' },
  { path: '/designs/material', label: 'Material 3' },
  { path: '/designs/carbon', label: 'Carbon' },
  { path: '/designs/ant', label: 'Ant Design' },
  { path: '/designs/chakra', label: 'Chakra UI' },
  { path: '/designs/mui', label: 'MUI' },
  { path: '/designs/daisy', label: 'Tailwind + Daisy' },
  { path: '/designs/patternfly', label: 'PatternFly' },
  { path: '/designs/bootstrap', label: 'Bootstrap' },
];

const detailLinks = showcaseLinks.slice(1); // exclude gallery

const DesignShowcaseLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentIndex = detailLinks.findIndex((link) => location.pathname === link.path);
  const currentLabel = currentIndex >= 0 ? detailLinks[currentIndex].label : '';
  const isGallery = location.pathname === '/designs';

  const handlePrev = () => {
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + detailLinks.length) % detailLinks.length;
    navigate(detailLinks[prevIndex].path);
  };

  const handleNext = () => {
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % detailLinks.length;
    navigate(detailLinks[nextIndex].path);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value) {
      navigate(value);
    }
  };

  if (isGallery) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Design Explorer</p>
              <h1 className="text-2xl font-bold">Municipality App Concept</h1>
            </div>
            <Link
              to="/"
              className="text-sm font-semibold text-cyan-300 hover:text-white transition-colors"
            >
              ← Back to App
            </Link>
          </div>
          <nav className="max-w-6xl mx-auto px-4 pb-4">
            <div className="flex flex-wrap gap-3 items-center text-xs">
              {showcaseLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-full border transition-all whitespace-nowrap ${
                      active
                        ? 'border-cyan-400 bg-cyan-400/10 text-white'
                        : 'border-white/10 text-slate-300 hover:border-cyan-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-10">
          <Outlet />
        </main>
      </div>
    );
  }

  // Standalone view for variants
  return (
    <div className="min-h-screen bg-black flex justify-center items-start overflow-y-auto relative">
      {/* Design Switcher Controls (Fixed Top Left) */}
      <div className="fixed top-8 left-8 z-[100] flex items-center gap-3 text-xs font-medium text-white">
        <Link
          to="/designs"
          className="px-4 py-2.5 rounded-full border border-white/20 bg-black/50 backdrop-blur-md hover:border-cyan-400 hover:text-cyan-300 transition-all shadow-lg"
        >
          ← Gallery
        </Link>
        <div className="relative">
           <select
             className="appearance-none bg-black/50 backdrop-blur-md border border-white/20 rounded-full pl-4 pr-10 py-2.5 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-lg cursor-pointer hover:bg-white/5"
             value={currentIndex === -1 ? '' : detailLinks[currentIndex].path}
             onChange={handleSelect}
           >
             <option value="" disabled>Jump to design...</option>
             {detailLinks.map((link) => (
               <option key={link.path} value={link.path} className="bg-slate-900 text-white">
                 {link.label}
               </option>
             ))}
           </select>
           <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1L5 5L9 1"/></svg>
           </div>
        </div>
      </div>

      {/* Navigation Controls (Fixed Top Right) */}
      <div className="fixed top-8 right-8 z-[100] flex items-center gap-2 text-xs font-medium text-white">
         <button
            className="px-4 py-2.5 rounded-full border border-white/20 bg-black/50 backdrop-blur-md hover:border-cyan-400 hover:text-cyan-300 disabled:opacity-30 disabled:hover:border-white/20 disabled:cursor-not-allowed transition-all shadow-lg flex items-center gap-2"
            onClick={handlePrev}
            disabled={currentIndex === -1}
         >
            ← Prev
         </button>
         <button
            className="px-4 py-2.5 rounded-full border border-white/20 bg-black/50 backdrop-blur-md hover:border-cyan-400 hover:text-cyan-300 disabled:opacity-30 disabled:hover:border-white/20 disabled:cursor-not-allowed transition-all shadow-lg flex items-center gap-2"
            onClick={handleNext}
            disabled={currentIndex === -1}
         >
            Next →
         </button>
      </div>

      {/* Mobile Frame Container - iPhone 14/15 Pro Max Dimensions */}
      <div className="w-[430px] h-[932px] bg-black relative shadow-2xl overflow-hidden rounded-[55px] border-[14px] border-[#1a1a1a] shrink-0 my-10">
         {/* Dynamic Island */}
         <div className="absolute top-[11px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-[20px] z-[60]"></div>
         
         {/* Content Area - Full height, variants handle their own safe area padding */}
         <div className="w-full h-full overflow-hidden">
            <Outlet />
         </div>

         {/* Home Indicator - Always visible on top */}
         <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white/30 rounded-full z-[60]"></div>
      </div>
    </div>
  );
};

export default DesignShowcaseLayout;
