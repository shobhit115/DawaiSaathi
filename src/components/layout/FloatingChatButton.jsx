import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FloatingChatButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/chat')}
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40 flex items-center justify-center w-14 h-14 bg-teal-600 text-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-teal-700 hover:scale-105 active:scale-95 transition-all duration-300"
      aria-label="Open Chat Assistant"
    >
      <MessageCircle size={28} />
      
      {/* Optional: A small notification dot to grab attention */}
      <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
    </button>
  );
};

export default FloatingChatButton;