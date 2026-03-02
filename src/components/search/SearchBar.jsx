import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // Keyboard shortcut (CMD/CTRL + K) to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="relative w-full max-w-2xl mx-auto mb-8 group"
    >
      {/* Search Icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors">
        <Search size={20} strokeWidth={2.5} />
      </div>

      <input
        ref={inputRef}
        type="text"
        placeholder="Search for a medicine (e.g., Paracetamol)..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-12 pr-24 py-4 rounded-2xl border border-slate-200 
                   bg-white shadow-sm transition-all duration-200
                   placeholder:text-slate-400 text-slate-700
                   focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500
                   hover:border-slate-300"
      />

      {/* Right Action Area (Clear Button + Shortcut) */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
        
        {/* Desktop Shortcut Badge */}
        <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded border border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-400 select-none">
          <span className="text-xs">⌘</span> K
        </div>
      </div>
    </form>
  );
};

export default SearchBar;