import React, { useState, useEffect } from 'react';
// 🔥 Added Volume2 (Play) and Square (Stop) icons
import { Pill, User, Volume2, Square } from 'lucide-react'; 
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Formats text for Markdown rendering
const formatMessage = (text) => {
  if (!text) return "";
  return text
    .replace(/\s(\*\*(What it is used for|How it works|Common side effects|Important warnings)\*\*)/g, '\n\n$1\n')
    .replace(/(\s\*\s)/g, '\n* ')
    .replace(/(This information is for educational purposes)/i, '\n\n---\n\n*$1*');
};

const MessageBubble = ({ text, image, isBot, time = "Just now" }) => {
  const cleanedText = formatMessage(text);
  
  // 🔥 State to track if THIS specific bubble is currently speaking
  const [isPlaying, setIsPlaying] = useState(false);

  // Cleanup: Stop audio if the user navigates away while it's playing
  useEffect(() => {
    return () => {
      if (isPlaying) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying]);

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert("Sorry, your browser does not support text-to-speech.");
      return;
    }

    // If currently playing, stop it
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    // Stop any OTHER messages that might be playing
    window.speechSynthesis.cancel();

    // 1. Strip Markdown characters so it reads naturally
    const speakableText = text.replace(/[*#_`~>]/g, '');

    const utterance = new SpeechSynthesisUtterance(speakableText);

    // 2. Auto-detect if the text contains Hindi characters
    const isHindi = /[\u0900-\u097F]/.test(speakableText);
    utterance.lang = isHindi ? 'hi-IN' : 'en-IN';
    
    // Slightly slow down the rate for better medical comprehension
    utterance.rate = 0.95; 

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className={`flex gap-3 mb-6 w-full ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
      
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm mt-1 ${
        isBot ? 'bg-gradient-to-br from-teal-100 to-teal-200 text-teal-700' : 'bg-slate-200 text-slate-600'
      }`}>
        {isBot ? <Pill size={22} /> : <User size={22} />}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col max-w-[85%] md:max-w-[75%] ${isBot ? 'items-start' : 'items-end'}`}>
        
        {image && (
          <div className="mb-2 p-1 bg-white rounded-2xl shadow-sm border border-slate-100">
            <img src={image} alt="Uploaded prescription" className="w-48 md:w-64 rounded-xl object-cover" />
          </div>
        )}

        {text && (
          <div className={`px-5 py-4 text-[15px] leading-relaxed shadow-sm relative group ${
            isBot 
              ? 'bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-tl-none' 
              : 'bg-teal-600 text-white rounded-2xl rounded-tr-none'
          }`}>
            <div className={`
              [&>p]:mb-3 last:[&>p]:mb-0 
              [&>p>strong]:text-slate-900 [&>p>strong]:font-bold 
              [&>ul]:list-none [&>ul]:pl-1 [&>ul]:mb-4 [&>ul]:mt-2
              [&>ul>li]:relative [&>ul>li]:pl-5 [&>ul>li]:mb-2
              [&>ul>li::before]:content-['•'] [&>ul>li::before]:absolute [&>ul>li::before]:left-0 [&>ul>li::before]:text-teal-500 [&>ul>li::before]:font-bold [&>ul>li::before]:text-lg [&>ul>li::before]:leading-[20px]
              [&>hr]:my-4 [&>hr]:border-slate-100
              [&>p>em]:text-[12px] [&>p>em]:text-slate-400 [&>p>em]:leading-snug [&>p>em]:block
              ${!isBot && '[&>p>strong]:text-white [&>ul>li::before]:text-teal-200'}
            `}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {cleanedText}
              </ReactMarkdown>
            </div>

            {/* 🔥 Text-to-Speech Button (Only shows for Bot messages) */}
            {isBot && (
              <button 
                onClick={toggleSpeech}
                className={`absolute -bottom-3 -right-2 p-2 rounded-full shadow-sm border transition-all ${
                  isPlaying 
                    ? 'bg-red-50 border-red-100 text-red-500 animate-pulse' 
                    : 'bg-white border-slate-100 text-slate-400 hover:text-teal-600 hover:bg-teal-50'
                }`}
                aria-label={isPlaying ? "Stop speaking" : "Read aloud"}
              >
                {isPlaying ? <Square size={14} className="fill-current" /> : <Volume2 size={16} />}
              </button>
            )}

          </div>
        )}

        {/* Timestamp */}
        <span className="text-[11px] text-slate-400 mt-2 px-1 font-medium">
          {time}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;