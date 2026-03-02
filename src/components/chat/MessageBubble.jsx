import React from 'react';
import { Pill, User } from 'lucide-react';

const MessageBubble = ({ text, image, isBot, time = "Just now" }) => {
  return (
    <div className={`flex gap-3 mb-6 w-full ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
      
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
        isBot ? 'bg-gradient-to-br from-teal-100 to-teal-200 text-teal-700' : 'bg-slate-200 text-slate-600'
      }`}>
        {isBot ? <Pill size={22} /> : <User size={22} />}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col max-w-[85%] md:max-w-[70%] ${isBot ? 'items-start' : 'items-end'}`}>
        
        {/* Image Attachment (if any) */}
        {image && (
          <div className="mb-2 p-1 bg-white rounded-2xl shadow-sm border border-slate-100">
            <img 
              src={image} 
              alt="Uploaded prescription" 
              className="w-48 md:w-64 rounded-xl object-cover"
            />
          </div>
        )}

        {/* Text Bubble */}
        {text && (
          <div className={`px-5 py-3.5 text-[15px] leading-relaxed shadow-sm relative ${
            isBot 
              ? 'bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-tl-none' 
              : 'bg-teal-600 text-white rounded-2xl rounded-tr-none'
          }`}>
            {text}
          </div>
        )}

        {/* Timestamp */}
        <span className="text-[11px] text-slate-400 mt-1.5 px-1 font-medium">
          {time}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;