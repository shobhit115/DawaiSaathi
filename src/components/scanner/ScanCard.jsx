import React from 'react';
import { Camera } from 'lucide-react';

const ScanCard = ({ onOpenScanner }) => {
  return (
    <div 
      onClick={onOpenScanner}
      className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl p-6 text-white text-center cursor-pointer hover:shadow-lg transition-shadow max-w-lg mx-auto mb-8"
    >
      <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <Camera size={32} />
      </div>
      <h2 className="text-xl font-semibold mb-2">Identify Medicine</h2>
      <p className="text-teal-100 text-sm">Tap to click a photo or upload your prescription slip</p>
    </div>
  );
};

export default ScanCard;