import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Bot, Sparkles, Mic, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI City Assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Quick action suggestions
  const quickActions = [
    { label: 'Report Issue', query: 'I want to report an issue' },
    { label: 'Waste Schedule', query: 'When is waste collection?' },
    { label: 'Get Certificate', query: 'How do I get a certificate?' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = useCallback(() => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response with context-aware replies
    setTimeout(() => {
      const query = inputText.toLowerCase();
      let response = '';
      
      if (query.includes('report') || query.includes('issue') || query.includes('problem')) {
        response = "I can help you report an issue. Would you like to report a problem with roads, lighting, waste, or something else? You can also go directly to the Requests section.";
      } else if (query.includes('waste') || query.includes('garbage') || query.includes('collection')) {
        response = "Waste collection in your area is scheduled for Monday and Thursday mornings. Would you like me to show you the full schedule or set up a reminder?";
      } else if (query.includes('certificate') || query.includes('document')) {
        response = "I can help you request certificates. We offer birth, marriage, death, and family status certificates. Which one do you need?";
      } else if (query.includes('parking')) {
        response = "For parking services, you can check real-time availability, start a parking session, or pay fines. What would you like to do?";
      } else if (query.includes('transport') || query.includes('bus')) {
        response = "I can show you real-time bus arrivals, help plan a route, or provide schedule information. What do you need?";
      } else {
        const responses = [
          "I understand. Let me help you with that. Could you tell me more about what you need?",
          "I can assist with permits, waste schedules, certificates, parking, and many other city services. What specifically are you looking for?",
          "That's a great question! Let me find the right information for you."
        ];
        response = responses[Math.floor(Math.random() * responses.length)];
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  }, [inputText]);

  const handleQuickAction = (query: string) => {
    setInputText(query);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <div className="flex flex-col h-full bg-zinc-100 dark:bg-background-dark">
      {/* Header */}
      <header className="bg-white dark:bg-surface-dark px-4 pt-12 pb-4 shadow-sm flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center text-white shadow-md">
            <Bot size={24} />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
              City Assistant 
              <Sparkles size={14} className="text-amber-400 fill-amber-400" aria-hidden="true" />
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span>
              <span>AI-Powered • Always Available</span>
            </p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 active:scale-95 transition-all"
          aria-label="Close chat"
        >
          <X size={22} />
        </button>
      </header>

      {/* Chat Area */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-100 dark:bg-background-dark momentum-scroll"
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {/* Quick Actions - Show only at start */}
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickAction(action.query)}
                className="px-3 py-2 bg-white dark:bg-surface-dark rounded-full text-xs font-semibold text-accent border border-accent/20 hover:bg-accent/5 active:scale-95 transition-all"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex flex-col gap-1 max-w-[85%]">
                <div className={`
                  p-3.5 rounded-2xl text-sm leading-relaxed
                  ${msg.sender === 'user' 
                    ? 'bg-accent text-white rounded-br-sm shadow-md shadow-accent/20' 
                    : 'bg-white dark:bg-surface-dark text-slate-900 dark:text-white rounded-bl-sm border border-zinc-200 dark:border-zinc-700 shadow-sm'}
                `}>
                  {msg.text}
                </div>
                <span className={`text-[10px] text-zinc-400 ${msg.sender === 'user' ? 'text-right' : 'text-left'} px-1`}>
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl rounded-bl-sm border border-zinc-200 dark:border-zinc-700 shadow-sm flex gap-1.5">
                <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-surface-dark border-t border-zinc-200 dark:border-zinc-800 safe-area-bottom">
        <div className="flex items-center gap-2">
          {/* Attachment Button */}
          <button 
            className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 active:scale-95 transition-all"
            aria-label="Attach file"
          >
            <Paperclip size={20} />
          </button>
          
          {/* Input */}
          <div className="flex-1 relative">
            <label htmlFor="chat-input" className="sr-only">Type your message</label>
            <input
              ref={inputRef}
              id="chat-input"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="input pr-12"
              autoComplete="off"
            />
            {/* Voice Button */}
            <button 
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              aria-label="Voice input"
            >
              <Mic size={18} />
            </button>
          </div>
          
          {/* Send Button */}
          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="w-11 h-11 bg-accent rounded-xl flex items-center justify-center text-white shadow-md shadow-accent/30 active:scale-95 transition-all disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
