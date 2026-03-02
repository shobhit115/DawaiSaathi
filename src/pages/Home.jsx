import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SearchBar from '../components/search/SearchBar';
import ScanCard from '../components/scanner/ScanCard';
import CameraModal from '../components/scanner/CameraModal';
import RecommendationCard from '../components/recommendation/RecommendationCard';

const Home = () => {
  const [isCameraModalOpen, setCameraModalOpen] = useState(false);
  const navigate = useNavigate();

  const recommendations = [
    "What are the side effects of Dolo 650?",
    "How to take Amoxicillin?",
    "Is it safe to take Vitamin C daily?",
    "Medicines to avoid during pregnancy"
  ];

  // Unified handler to navigate to chat route
  const startChat = (query, image = null) => {
    setCameraModalOpen(false);
    // Navigate to /chat and pass the data in the route state
    navigate('/chat', { state: { query, image } });
  };

  return (
    <div className="flex flex-col min-h-screen">
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

        {/* Trigger startChat on Search */}
        <SearchBar onSearch={(q) => startChat(q)} />
        
        {/* Opens Camera Modal */}
        <ScanCard onOpenScanner={() => setCameraModalOpen(true)} />

        <div className="mt-12 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Trigger startChat on Recommendation click */}
            {recommendations.map((rec, idx) => (
              <RecommendationCard 
                key={idx} 
                title={rec} 
                onClick={(title) => startChat(title)} 
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
        onAction={startChat}
      />
    </div>
  );
};

export default Home;