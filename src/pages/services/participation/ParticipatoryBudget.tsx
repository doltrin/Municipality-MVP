import React, { useState } from 'react';
import { ArrowLeft, PiggyBank, ThumbsUp, MapPin, Users, CheckCircle2, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  titleGr: string;
  description: string;
  category: string;
  location: string;
  budget: number;
  votes: number;
  target: number;
  image: string;
  status: 'voting' | 'funded' | 'completed';
  hasVoted?: boolean;
}

const ParticipatoryBudget: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [votedProjects, setVotedProjects] = useState<Set<string>>(new Set());

  const totalBudget = 500000;
  const allocatedBudget = 320000;
  const remainingVotes = 3;

  const projects: Project[] = [
    {
      id: '1',
      title: 'Kypseli Green Park Renovation',
      titleGr: 'Ανάπλαση Πάρκου Κυψέλης',
      description: 'Transform the central park with new playground equipment, walking paths, and native plant gardens.',
      category: 'Parks & Green Spaces',
      location: 'Kypseli',
      budget: 85000,
      votes: 1247,
      target: 1500,
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=400&q=80',
      status: 'voting'
    },
    {
      id: '2',
      title: 'Smart Street Lighting',
      titleGr: 'Έξυπνος Δημοτικός Φωτισμός',
      description: 'Install energy-efficient LED lights with motion sensors in residential areas.',
      category: 'Infrastructure',
      location: 'Pagrati',
      budget: 120000,
      votes: 892,
      target: 1000,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
      status: 'voting'
    },
    {
      id: '3',
      title: 'Community Sports Center',
      titleGr: 'Κοινοτικό Αθλητικό Κέντρο',
      description: 'Build a multi-purpose sports facility with basketball courts and fitness equipment.',
      category: 'Sports & Recreation',
      location: 'Nea Smyrni',
      budget: 200000,
      votes: 2103,
      target: 2000,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80',
      status: 'funded'
    },
    {
      id: '4',
      title: 'Bike Lane Network Expansion',
      titleGr: 'Επέκταση Δικτύου Ποδηλατοδρόμων',
      description: 'Create 5km of protected bike lanes connecting major neighborhoods.',
      category: 'Mobility',
      location: 'City-wide',
      budget: 95000,
      votes: 756,
      target: 1200,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
      status: 'voting'
    },
    {
      id: '5',
      title: 'Senior Citizens Day Center',
      titleGr: 'Κέντρο Ημέρας Ηλικιωμένων',
      description: 'Renovate and expand the KAPI facility with modern amenities and activities.',
      category: 'Social Services',
      location: 'Kolonaki',
      budget: 75000,
      votes: 1589,
      target: 1500,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
      status: 'funded'
    },
  ];

  const categories = ['all', 'Parks & Green Spaces', 'Infrastructure', 'Sports & Recreation', 'Mobility', 'Social Services'];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const handleVote = (projectId: string) => {
    if (votedProjects.has(projectId)) {
      const newVoted = new Set(votedProjects);
      newVoted.delete(projectId);
      setVotedProjects(newVoted);
    } else if (votedProjects.size < remainingVotes) {
      setVotedProjects(new Set([...votedProjects, projectId]));
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-zinc-100 dark:bg-background-dark pb-32">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-slate-800 dark:from-accent dark:to-blue-700 px-4 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">Participatory Budget</h1>
            <p className="text-xs text-white/70">Συμμετοχικός Προϋπολογισμός 2025</p>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <PiggyBank size={20} className="text-white" />
          </div>
        </div>

        {/* Budget Overview */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mt-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/70 text-sm">Total Budget</span>
            <span className="text-white font-bold text-lg">€{totalBudget.toLocaleString()}</span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden mb-2">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(allocatedBudget / totalBudget) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-emerald-400 rounded-full"
            />
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-white/70">€{allocatedBudget.toLocaleString()} allocated</span>
            <span className="text-emerald-300">€{(totalBudget - allocatedBudget).toLocaleString()} remaining</span>
          </div>
        </div>

        {/* Your Votes */}
        <div className="flex items-center justify-between mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-3">
          <div className="flex items-center gap-2">
            <ThumbsUp size={18} className="text-white" />
            <span className="text-white text-sm font-medium">Your Votes</span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  i <= votedProjects.size 
                    ? 'bg-emerald-400 text-white' 
                    : 'bg-white/20 text-white/50'
                }`}
              >
                {i <= votedProjects.size ? '✓' : i}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 py-3 bg-white dark:bg-surface-dark border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-10">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeFilter === cat
                  ? 'bg-accent text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              {cat === 'all' ? 'All Projects' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="p-4 space-y-4">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-surface-dark rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden shadow-sm"
            >
              {/* Project Image */}
              <div className="relative h-40 bg-zinc-200 dark:bg-zinc-800">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                    project.status === 'funded' 
                      ? 'bg-emerald-500 text-white' 
                      : project.status === 'completed'
                      ? 'bg-blue-500 text-white'
                      : 'bg-amber-500 text-white'
                  }`}>
                    {project.status === 'funded' ? '✓ Funded' : project.status === 'completed' ? 'Completed' : 'Voting Open'}
                  </span>
                </div>
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
                  <span className="text-white text-xs font-bold">€{project.budget.toLocaleString()}</span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{project.title}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{project.titleGr}</p>
                  </div>
                </div>
                
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 line-clamp-2">{project.description}</p>

                <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    {project.votes.toLocaleString()} votes
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-500 dark:text-zinc-400">Progress</span>
                    <span className="font-bold text-slate-900 dark:text-white">{Math.round((project.votes / project.target) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (project.votes / project.target) * 100)}%` }}
                      transition={{ duration: 0.5 }}
                      className={`h-full rounded-full ${
                        project.status === 'funded' ? 'bg-emerald-500' : 'bg-accent'
                      }`}
                    />
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-1">{project.target - project.votes > 0 ? `${project.target - project.votes} votes needed` : 'Target reached!'}</p>
                </div>

                {/* Vote Button */}
                {project.status === 'voting' && (
                  <button
                    onClick={() => handleVote(project.id)}
                    disabled={!votedProjects.has(project.id) && votedProjects.size >= remainingVotes}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                      votedProjects.has(project.id)
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-2 border-emerald-500'
                        : votedProjects.size >= remainingVotes
                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                        : 'bg-accent text-white active:scale-[0.98]'
                    }`}
                  >
                    {votedProjects.has(project.id) ? '✓ Voted - Tap to Remove' : 'Vote for This Project'}
                  </button>
                )}

                {project.status === 'funded' && (
                  <div className="w-full py-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-bold text-sm text-center flex items-center justify-center gap-2">
                    <Award size={18} />
                    Project Approved!
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Submit Vote Button */}
      {votedProjects.size > 0 && (
        <div className="sticky bottom-0 left-0 right-0 p-4 bg-white dark:bg-surface-dark border-t border-zinc-200 dark:border-zinc-800">
          <button 
            onClick={() => {
              // Submit votes
              alert('Your votes have been submitted! Thank you for participating.');
              navigate('/');
            }}
            className="w-full py-4 bg-accent text-white font-bold rounded-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={20} />
            Submit {votedProjects.size} Vote{votedProjects.size > 1 ? 's' : ''}
          </button>
        </div>
      )}
    </div>
  );
};

export default ParticipatoryBudget;
