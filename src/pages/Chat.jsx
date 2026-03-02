import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Send, ArrowLeft, Pill, MoreVertical } from 'lucide-react';
import MessageBubble from '../components/chat/MessageBubble';

const Chat = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const bottomRef = useRef(null);
    const hasInitialized = useRef(false); // Prevents double initialization in StrictMode

    // Helper to format time
    const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add Message Helper
    const addMessage = (text, isBot, image = null) => {
        setMessages(prev => [...prev, { text, isBot, image, time: getTime() }]);
    };

    // Simulated Bot Response
    const triggerBotReply = (text) => {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            addMessage(text, true);
        }, 1500);
    };

    // Handle Initial Load
    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        const initialQuery = location.state?.query;
        const initialImage = location.state?.image;

        if (initialQuery || initialImage) {
            // Add user's message/image from home
            addMessage(initialQuery || "Please analyze this prescription.", false, initialImage);
            // Trigger reply
            triggerBotReply("Hello! I am My Saathi. I am analyzing your request. Give me a moment...");
        } else {
            // Default greeting
            addMessage("Hi there! I am My Saathi. How can I help you with your medications today?", true);
        }
    }, [location.state]);

    // Auto-scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userQuery = input.trim();
        setInput('');
        addMessage(userQuery, false);

        // Logic for bot reply based on user input
        triggerBotReply("This is a simulated response. Connect your AI backend here!");
    };

    return (
        <div className="flex flex-col h-[100dvh] bg-slate-50/50">

            {/* --- HEADER --- */}
            <header className="bg-white/80 backdrop-blur-md shadow-sm h-16 flex items-center justify-between px-4 sticky top-0 z-20 shrink-0 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/')}
                        className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
                    >
                        <ArrowLeft size={22} />
                    </button>
                    <div className="flex items-center gap-2">

                        <div>
                            <div className="flex items-center gap-2 text-teal-600">
                                {/* <Pill size={28} className="text-teal-500" /> */}
                                <h1 className="text-xl font-bold tracking-tight">DawaiSaathi</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600 p-2">
                    <MoreVertical size={20} />
                </button>
            </header>

            {/* --- CHAT HISTORY --- */}
            <main className="flex-1 overflow-y-auto w-full">
                <div className="max-w-3xl mx-auto p-4 md:p-6">
                    <div className="flex justify-center mb-6">
                        <span className="bg-slate-200/60 text-slate-500 text-xs font-medium px-3 py-1 rounded-full">
                            Today
                        </span>
                    </div>

                    {messages.map((msg, idx) => (
                        <MessageBubble
                            key={idx}
                            {...msg}
                        />
                    ))}

                    {/* Updated Typing Indicator with Pill Icon */}
                    {isTyping && (
                        <div className="flex gap-3 mb-4 w-full flex-row">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-teal-100 text-teal-600">
                                <Pill size={20} />
                            </div>
                            <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-5 py-4 shadow-sm flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef} className="h-2" />
                </div>
            </main>

            {/* --- INPUT AREA --- */}
            <footer className="bg-white border-t border-slate-200 p-3 sm:p-4 shrink-0">
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSend} className="flex gap-2 items-end bg-slate-100 p-1.5 rounded-3xl border border-slate-200 focus-within:border-teal-400 transition-all">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about medications..."
                            className="flex-1 bg-transparent max-h-32 min-h-[44px] resize-none pl-4 pr-2 py-2.5 text-[15px] focus:outline-none"
                            rows={1}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend(e);
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
                        My Saathi can make mistakes. Always verify with a doctor.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Chat;