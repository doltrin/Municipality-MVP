import React, { useState } from 'react';
import { ArrowLeft, Heart, Clock, Trophy, UserPlus, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../stores';

const VolunteerRegistry: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppStore((s) => s.user);
  const [joining, setJoining] = useState<number | null>(null);
  const [joinedEvents, setJoinedEvents] = useState<number[]>([]);

  const handleJoin = (id: number) => {
    setJoining(id);
    setTimeout(() => {
      setJoining(null);
      setJoinedEvents([...joinedEvents, id]);
    }, 1500);
  };

  const opportunities = [
    { id: 1, title: 'Park Clean-up Day', org: 'Green City', date: 'Sat, Oct 31', hours: 4, spots: 12, type: 'Environment' },
    { id: 2, title: 'Food Bank Sorting', org: 'Solidarity Net', date: 'Sun, Nov 1', hours: 3, spots: 5, type: 'Social' },
    { id: 3, title: 'Tree Planting', org: 'Reforest', date: 'Sat, Nov 7', hours: 5, spots: 20, type: 'Environment' },
  ];

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header Profile */}
      <div className="bg-rose-600 px-6 pt-12 pb-8 rounded-b-[2rem] shadow-lg text-white">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Volunteer Hub</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
            <Heart size={32} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">{user?.name || 'Guest'}</h2>
            <div className="flex items-center gap-2 text-rose-200 text-sm">
              <Trophy size={14} />
              <span>Level 3 Volunteer</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-md border border-white/10">
            <div className="text-2xl font-bold">24</div>
            <div className="text-[10px] text-rose-200 uppercase tracking-wider">Hours</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-md border border-white/10">
            <div className="text-2xl font-bold">6</div>
            <div className="text-[10px] text-rose-200 uppercase tracking-wider">Events</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-md border border-white/10">
            <div className="text-2xl font-bold">150</div>
            <div className="text-[10px] text-rose-200 uppercase tracking-wider">Points</div>
          </div>
        </div>
      </div>

      <div className="p-6 pb-20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800 text-lg">Open Opportunities</h3>
          <button className="text-rose-600 text-sm font-bold">View All</button>
        </div>

        <div className="space-y-4">
          {opportunities.map((opp) => {
            const isJoined = joinedEvents.includes(opp.id);
            return (
              <div key={opp.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group transition-all hover:shadow-md">
                <div className="absolute top-0 right-0 bg-slate-100 px-3 py-1 rounded-bl-xl text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {opp.type}
                </div>
                
                <h4 className="font-bold text-slate-800 text-lg mb-1">{opp.title}</h4>
                <p className="text-sm text-slate-500 mb-4">by {opp.org}</p>

                <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock size={16} className="text-slate-400" />
                    <span>{opp.hours}h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <UserPlus size={16} className="text-slate-400" />
                    <span>{opp.spots} spots left</span>
                  </div>
                </div>

                <button 
                  onClick={() => !isJoined && handleJoin(opp.id)}
                  disabled={isJoined || joining === opp.id}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2
                    ${isJoined 
                      ? 'bg-green-100 text-green-700 cursor-default' 
                      : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98]'}`}
                >
                  {joining === opp.id ? (
                    <span className="animate-pulse">Joining...</span>
                  ) : isJoined ? (
                    <>
                      <CheckCircle size={16} />
                      Joined
                    </>
                  ) : (
                    'Join Event'
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VolunteerRegistry;
