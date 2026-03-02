import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// 🔥 Imported 'Plus' icon
import { Send, ArrowLeft, Pill, MoreVertical, Languages, ChevronDown, Plus } from "lucide-react"; 
import MessageBubble from "../components/chat/MessageBubble";
import CameraModal from "../components/scanner/CameraModal"; // 🔥 Imported CameraModal
import { useChat } from "../hooks/useChat";

const Chat = () => {
  const navigate = useNavigate();
  const bottomRef = useRef(null);

  const { messages, input, setInput, isTyping, sendMessage, language, setLanguage } = useChat();

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  // 🔥 State to handle the Camera/Upload Modal
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
  };

  // 🔥 Handler to catch the image from the modal and send it to the chat
  const handleCameraAction = (query, image) => {
    setIsCameraModalOpen(false);
    // Send to hook: (directQuery, base64Image, apiType)
    sendMessage(query, image, 'image'); 
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-slate-50/50">
      
      {/* -------- HEADER -------- */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm h-16 flex items-center justify-between px-4 sticky top-0 z-20 shrink-0 border-b border-slate-100">
        {/* ... (Header code remains exactly the same) ... */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft size={22} />
          </button>

          <div className="flex items-center gap-2 text-teal-600">
            <Pill size={22} className="text-teal-500" />
            <h1 className="text-lg font-semibold tracking-tight">DawaiSaathi</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full text-xs font-semibold text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition-colors border border-slate-200"
            >
              <Languages size={14} />
              {language === "en" ? "English" : "हिंदी"}
              <ChevronDown size={14} className={`transition-transform duration-200 ${isLangMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {isLangMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsLangMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-28 bg-white border border-slate-100 rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <button onClick={() => handleLanguageSelect("en")} className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${language === "en" ? "bg-teal-50 text-teal-700 font-semibold" : "text-slate-600 hover:bg-slate-50"}`}>English</button>
                  <button onClick={() => handleLanguageSelect("hi")} className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${language === "hi" ? "bg-teal-50 text-teal-700 font-semibold" : "text-slate-600 hover:bg-slate-50"}`}>हिंदी</button>
                </div>
              </>
            )}
          </div>
          {/* <button className="text-slate-400 hover:text-slate-600 p-2"><MoreVertical size={20} /></button> */}
        </div>
      </header>

      {/* -------- CHAT BODY -------- */}
      <main className="flex-1 overflow-y-auto w-full relative">
        <div className="max-w-3xl mx-auto p-4 md:p-6 pb-20">
          <div className="flex justify-center mb-6">
            <span className="bg-slate-200/60 text-slate-500 text-xs font-medium px-3 py-1 rounded-full">Today</span>
          </div>

          {messages?.map((msg, index) => (
            <MessageBubble key={index} {...msg} />
          ))}

          {isTyping && (
            <div className="flex gap-3 mb-4 w-full flex-row">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-teal-100 text-teal-600">
                <Pill size={20} />
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-5 py-4 shadow-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </main>

      {/* -------- INPUT AREA -------- */}
      <footer className="bg-white border-t border-slate-200 p-3 sm:p-4 shrink-0">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 items-end bg-slate-100 p-1.5 rounded-3xl border border-slate-200 focus-within:border-teal-400 transition-all"
          >
            
            {/* 🔥 Added Plus Button to Open Camera Modal */}
            <button
              type="button"
              onClick={() => setIsCameraModalOpen(true)}
              disabled={isTyping}
              className="h-[44px] w-[44px] flex items-center justify-center rounded-full bg-slate-200 text-slate-600 shrink-0 hover:bg-teal-100 hover:text-teal-700 disabled:opacity-50 transition-colors"
            >
              <Plus size={22} />
            </button>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about medications..."
              className="flex-1 bg-transparent max-h-32 min-h-[44px] resize-none px-2 py-2.5 text-[15px] focus:outline-none"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input); 
                }
              }}
            />

            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="h-[44px] w-[44px] flex items-center justify-center rounded-full bg-teal-600 text-white shrink-0 hover:bg-teal-700 disabled:opacity-30 transition-all shadow-sm"
            >
              <Send size={18} />
            </button>
          </form>

          <p className="text-center text-[10px] text-slate-400 mt-2">
            DawaiSaathi can make mistakes. Always verify with a doctor.
          </p>
        </div>
      </footer>

      {/* 🔥 Render Camera Modal here */}
      <CameraModal 
        isOpen={isCameraModalOpen} 
        onClose={() => setIsCameraModalOpen(false)}
        onAction={handleCameraAction}
      />

    </div>
  );
};

export default Chat;