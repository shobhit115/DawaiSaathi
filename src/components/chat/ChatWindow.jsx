import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Stethoscope } from 'lucide-react';
import MessageBubble from './MessageBubble';

const ChatWindow = ({ isOpen, onClose, initialQuery }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  // Trigger when a new search/scan happens
  useEffect(() => {
    if (initialQuery && isOpen) {
      setMessages([
        { text: initialQuery, isBot: false },
        { text: "Hello! I am My Saathi. I'm analyzing the details for you. Please wait...", isBot: true }
      ]);
    }
  }, [initialQuery, isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { text: input, isBot: false }]);
    setInput('');
    // Mock bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "This is a simulated response. Connect your backend here!", isBot: true }]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-[400px] h-[80vh] md:h-[600px] bg-slate-50 md:rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-slate-200">
      {/* Chat Header */}
      <div className="bg-teal-600 text-white p-4 flex justify-between items-center shadow-md z-10">
        <div className="flex items-center gap-2">
          <Stethoscope size={20} />
          <h3 className="font-semibold">My Saathi</h3>
        </div>
        <button onClick={onClose} className="hover:bg-teal-700 p-1 rounded-full transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <Bot size={48} className="mb-2 opacity-50" />
            <p>How can I help with your medicines today?</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <MessageBubble key={idx} text={msg.text} isBot={msg.isBot} />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="bg-white p-3 border-t border-slate-200 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a follow-up question..."
          className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button type="submit" className="bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 transition-colors shrink-0">
          <Send size={18} className="ml-0.5" />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;