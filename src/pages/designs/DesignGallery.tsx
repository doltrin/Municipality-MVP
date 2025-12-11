import { Link } from 'react-router-dom';

const designOptions = [
  { id: 'material', title: 'Material Design 3', blurb: 'Soft tonal surfaces, expressive cards, elevated FAB.' },
  { id: 'carbon', title: 'IBM Carbon', blurb: 'Precision grid, high-contrast tiles, IBM Plex typography.' },
  { id: 'ant', title: 'Ant Design', blurb: 'Bright surfaces, card grids, primary blue accents.' },
  { id: 'chakra', title: 'Chakra UI', blurb: 'Relaxed spacing, accessible colors, rounded cards.' },
  { id: 'mui', title: 'MUI', blurb: 'Paper surfaces, chips, Material elevation tokens.' },
  { id: 'daisy', title: 'Tailwind + DaisyUI', blurb: 'Utility-first with playful Daisy components.' },
  { id: 'patternfly', title: 'PatternFly', blurb: 'Enterprise layout, sectioned datalists, toolbar controls.' },
  { id: 'bootstrap', title: 'Bootstrap', blurb: 'Classic grid, pill nav, friendly defaults.' },
];

const DesignGallery = () => {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-cyan-300 uppercase tracking-[0.4em] text-xs mb-3">Choose a style</p>
        <h2 className="text-3xl font-semibold">Homepage explorations</h2>
        <p className="text-slate-300 mt-2 max-w-3xl">
          Each tile opens a dedicated screen where the municipality app homepage is rebuilt using the
          visual language of that system. All screens reuse the same data so differences come purely
          from the design system choices.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {designOptions.map((option) => (
          <Link
            key={option.id}
            to={`/designs/${option.id}`}
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-cyan-300 hover:bg-white/10 transition-all"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Concept #{option.id}</p>
                <h3 className="text-2xl font-bold mt-2 group-hover:text-cyan-300">{option.title}</h3>
                <p className="text-sm text-slate-300 mt-2">{option.blurb}</p>
              </div>
              <span className="text-cyan-300 text-sm font-semibold">View →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DesignGallery;
