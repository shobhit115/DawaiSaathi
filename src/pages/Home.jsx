import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SearchBar from '../components/search/SearchBar';
import ScanCard from '../components/scanner/ScanCard';
import CameraModal from '../components/scanner/CameraModal';
import RecommendationCard from '../components/recommendation/RecommendationCard';
import FloatingChatButton from '../components/layout/FloatingChatButton';

const Home = () => {
  const [isCameraModalOpen, setCameraModalOpen] = useState(false);
  const navigate = useNavigate();

  // 🔥 1. Medicines List -> Triggers 'search' (Direct API)
  const popularMedicines = [
    "Dolo 650",
    "Aciloc 300",
    "Paracetamol 500mg",
    "FORACORT",
    "THYRONORM 25MCG",
    "Diclofenac",
    "Spasril Tablet",
    "Nozia Tablet",
    "AUGMENTIN 625",
    "GLYCOMETGP",
    "AZITHRAL 500",
    "Duphalac"
  ];

  // 🔥 2. Real Questions List -> Triggers 'chat' (LLM API)
  const faqQuestions = [
    "Can I take painkillers on an empty stomach?",
    "What are the common side effects of antibiotics?",
    "How to properly store liquid medicines?",
    "Which medicines should I avoid during pregnancy?"
  ];

  const startChat = (query, image = null, type = 'chat') => {
    setCameraModalOpen(false);
    navigate('/chat', { state: { query, image, type } });
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 pt-10 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Know Your Medicine Inside Out
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Search for a medicine or scan your prescription slip to instantly get details, side-effects, and usage guidelines from My Saathi.
          </p>
        </div>

        <SearchBar onSearch={(q) => startChat(q, null, 'search')} />
        
        <ScanCard onOpenScanner={() => setCameraModalOpen(true)} />

        {/* -------- NEW SECTION: Popular Medicines (Direct Search) -------- */}
        <div className="mt-14 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-700">Trending Medicines</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {popularMedicines.map((med, idx) => (
              <button
                key={idx}
                onClick={() => startChat(med, null, 'search')} // 🔥 type = 'search'
                className="flex items-center justify-center px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-700 text-sm font-medium hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 transition-all text-center"
              >
                {med}
              </button>
            ))}
          </div>
        </div>

        {/* -------- UPDATED SECTION: Frequently Asked Questions (LLM) -------- */}
        <div className="mt-12 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">Frequently Asked Questions (Available in a future update)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqQuestions.map((question, idx) => (
              <RecommendationCard 
                key={idx} 
                title={question} 
                onClick={(title) => startChat(title, null, 'chat')} // 🔥 type = 'chat'
              />
            ))}
          </div>
        </div>

        <section className="mt-20 text-center max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-3">About DawaiSaathi</h3>
          <p className="text-slate-600 leading-relaxed">
            DawaiSaathi is your personal AI medical assistant. We aim to make healthcare information accessible and easy to understand. Just snap a picture of your slip, and let AI do the reading for you.
          </p>
        </section>
      </main>

      <Footer />

      <CameraModal 
        isOpen={isCameraModalOpen} 
        onClose={() => setCameraModalOpen(false)}
        onAction={(query, image) => startChat(query, image, 'image')}
      />
      <FloatingChatButton/>
    </div>
  );
};

export default Home;