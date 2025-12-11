import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Heart, X, Send, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const ReusePlatform: React.FC = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [messageText, setMessageText] = useState('');

  const items = [
    { id: 1, title: 'Wooden Bookshelf', dist: '1.2km', user: 'Maria K.', image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Kids Bicycle', dist: '0.8km', user: 'John D.', image: 'https://images.unsplash.com/photo-1507035895480-08acdf9b8533?auto=format&fit=crop&w=800&q=80' },
    { id: 3, title: 'Office Chair', dist: '2.5km', user: 'Eleni P.', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=800&q=80' },
    { id: 4, title: 'Plant Pots', dist: '0.5km', user: 'Kostas M.', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80' },
  ];

  const handleContact = (item: any) => {
    setSelectedChat(item);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-slate-600">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold text-slate-800">Reuse & Exchange</h1>
          </div>
          <button 
            onClick={() => navigate('/waste/reuse/post')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg shadow-green-600/20 active:scale-95 transition-transform"
          >
            + Post Item
          </button>
        </div>
        
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {['All', 'Furniture', 'Electronics', 'Clothing', 'Kids'].map((cat, idx) => (
             <button key={cat} className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${idx === 0 ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'}`}>
               {cat}
             </button>
          ))}
        </div>
      </div>

      <div className="p-4 grid grid-cols-2 gap-4 pb-20">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group">
            <div className="aspect-square bg-slate-200 relative">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <button className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                <Heart size={16} />
              </button>
            </div>
            <div className="p-3">
              <h3 className="font-bold text-slate-800 text-sm mb-1 truncate">{item.title}</h3>
              <div className="flex justify-between items-center">
                 <span className="text-[10px] text-slate-500">{item.dist} away</span>
                 <span className="text-[10px] font-medium text-slate-700 truncate max-w-[60px]">by {item.user}</span>
              </div>
              <button 
                onClick={() => handleContact(item)}
                className="w-full mt-3 py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-green-50 hover:text-green-600 transition-colors active:scale-95"
              >
                <MessageCircle size={14} />
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Overlay */}
      <AnimatePresence>
        {selectedChat && (
          <div className="absolute inset-0 z-50 flex items-end justify-center p-4 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
              onClick={() => setSelectedChat(null)}
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl flex flex-col h-[80vh] pointer-events-auto shadow-2xl relative z-10"
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <User size={20} className="text-slate-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{selectedChat.user}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Online regarding {selectedChat.title}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedChat(null)}
                  className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm text-slate-600 shadow-sm">
                    Hi! Is the {selectedChat.title} still available?
                  </div>
                </div>
                <div className="flex justify-center my-4">
                  <span className="text-[10px] text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded-full">Today</span>
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-slate-100 bg-white pb-8 sm:pb-4">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                  />
                  <button className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-600/20 active:scale-95 transition-transform">
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReusePlatform;
