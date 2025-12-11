import React, { useState } from 'react';
import { ArrowLeft, Heart, MapPin, Phone, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StrayAnimals: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  const animals = [
    { id: 1, name: 'Luna', type: 'Dog', breed: 'Mixed', age: '2 years', location: 'City Shelter', status: 'Adoptable', img: 'https://images.unsplash.com/photo-1544175287-e4672344233c?auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'Milo', type: 'Cat', breed: 'Tabby', age: '6 months', location: 'North District', status: 'Found', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'Max', type: 'Dog', breed: 'Labrador', age: '4 years', location: 'City Shelter', status: 'Adoptable', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=400&q=80' },
    { id: 4, name: 'Bella', type: 'Cat', breed: 'Siamese', age: '1 year', location: 'South Park', status: 'Found', img: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <div className="flex flex-col min-h-full bg-slate-50 relative">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-slate-600">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold text-slate-800">Stray Animals</h1>
          </div>
          <button className="bg-red-50 text-red-500 p-2 rounded-full hover:bg-red-100 transition-colors">
             <Heart size={20} />
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {['All', 'Dogs', 'Cats', 'Adoptable', 'Found'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${filter === f ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 gap-6 pb-20">
        {animals.map((animal) => (
          <div key={animal.id} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex gap-4 group">
             <div className="w-28 h-28 rounded-2xl bg-slate-200 overflow-hidden relative flex-shrink-0">
               <img src={animal.img} alt={animal.name} className="w-full h-full object-cover" />
               <div className={`absolute top-2 left-2 px-2 py-1 rounded-lg text-[10px] font-bold text-white ${animal.status === 'Adoptable' ? 'bg-green-500' : 'bg-orange-500'}`}>
                 {animal.status}
               </div>
             </div>
             
             <div className="flex-1 py-1 flex flex-col justify-between">
               <div>
                 <div className="flex justify-between items-start">
                   <h3 className="font-bold text-lg text-slate-800">{animal.name}</h3>
                   <button className="text-slate-300 hover:text-rose-500 transition-colors">
                     <Heart size={18} />
                   </button>
                 </div>
                 <p className="text-sm text-slate-500">{animal.breed} • {animal.age}</p>
               </div>

               <div className="flex items-center gap-1 text-xs text-slate-400 mb-3">
                 <MapPin size={12} />
                 <span>{animal.location}</span>
               </div>

               <div className="flex gap-2">
                 <button 
                   onClick={() => navigate(`/animals/adopt/${animal.id}`)}
                   disabled={animal.status !== 'Adoptable'}
                   className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${animal.status === 'Adoptable' ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' : 'bg-slate-50 text-slate-400 cursor-not-allowed'}`}
                 >
                   {animal.status === 'Adoptable' ? 'Adopt' : 'Report Found'}
                 </button>
                 <button className="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600">
                   <Share2 size={14} />
                 </button>
               </div>
             </div>
          </div>
        ))}
      </div>
      
      {/* Report Button FAB */}
      <button 
        onClick={() => navigate('/requests')}
        className="absolute bottom-20 right-4 bg-slate-900 text-white px-5 py-3 rounded-full shadow-2xl font-bold flex items-center gap-2 active:scale-95 transition-transform z-20"
      >
        <Phone size={18} />
        Report Stray
      </button>
    </div>
  );
};

export default StrayAnimals;
