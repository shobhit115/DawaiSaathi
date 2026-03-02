import React from 'react';
import { Pill, UserCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-teal-600">
          <Pill size={28} className="text-teal-500" />
          <h1 className="text-xl font-bold tracking-tight">DawaiSaathi</h1>
        </div>
        <button className="text-slate-400 hover:text-teal-600 transition-colors">
          <UserCircle size={28} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;