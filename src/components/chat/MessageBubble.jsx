import React from 'react';
import { Pill, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// 🔥 HELPER: Cleans up the text and forces line breaks if the backend forgot them
const formatMessage = (text) => {
  if (!text) return "";
  
  return text
    // Ensure double newlines before major bold headers
    .replace(/\s(\*\*(What it is used for|How it works|Common side effects|Important warnings)\*\*)/g, '\n\n$1\n')
    // Ensure newlines before bullet points
    .replace(/(\s\*\s)/g, '\n* ')
    // Add a divider before the disclaimer for a cleaner look
    .replace(/(This information is for educational purposes)/i, '\n\n---\n\n*$1*');
};

const MessageBubble = ({ text, image, isBot, time = "Just now" }) => {
  const cleanedText = formatMessage(text);

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
        
        {/* Image Attachment */}
        {image && (
          <div className="mb-2 p-1 bg-white rounded-2xl shadow-sm border border-slate-100">
            <img 
              src={image} 
              alt="Uploaded prescription" 
              className="w-48 md:w-64 rounded-xl object-cover"
            />
          </div>
        )}

       {/* Text Bubble with Upgraded Markdown Styling */}
        {text && (
          <div className={`px-5 py-4 text-[15px] leading-relaxed shadow-sm relative ${
            isBot 
              ? 'bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-tl-none' 
              : 'bg-teal-600 text-white rounded-2xl rounded-tr-none'
          }`}>
            
            {/* 🔥 FIX: Wrapped ReactMarkdown in a div and moved the className here */}
            <div className={`
              /* Paragraphs */
              [&>p]:mb-3 last:[&>p]:mb-0 
              
              /* Headings / Bold text acting as headings */
              [&>p>strong]:text-slate-900 [&>p>strong]:font-bold 
              
              /* Bullet Lists */
              [&>ul]:list-none [&>ul]:pl-1 [&>ul]:mb-4 [&>ul]:mt-2
              [&>ul>li]:relative [&>ul>li]:pl-5 [&>ul>li]:mb-2
              [&>ul>li::before]:content-['•'] [&>ul>li::before]:absolute [&>ul>li::before]:left-0 [&>ul>li::before]:text-teal-500 [&>ul>li::before]:font-bold [&>ul>li::before]:text-lg [&>ul>li::before]:leading-[20px]
              
              /* Horizontal Rule for Disclaimer */
              [&>hr]:my-4 [&>hr]:border-slate-100
              
              /* Italics (Used for the disclaimer) */
              [&>p>em]:text-[12px] [&>p>em]:text-slate-400 [&>p>em]:leading-snug [&>p>em]:block
              
              ${!isBot && '[&>p>strong]:text-white [&>ul>li::before]:text-teal-200'}
            `}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {cleanedText}
              </ReactMarkdown>
            </div>

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