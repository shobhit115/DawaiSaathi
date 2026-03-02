import React from 'react';
import { ArrowRight } from 'lucide-react';

const RecommendationCard = ({ title, onClick }) => {
  return (
    <div 
      onClick={() => onClick(title)}
      className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm cursor-pointer hover:border-teal-300 hover:shadow-md transition-all group flex justify-between items-center"
    >
      <span className="text-slate-700 font-medium">{title}</span>
      <ArrowRight size={18} className="text-teal-400 group-hover:text-teal-600" />
    </div>
  );
};

export default RecommendationCard;