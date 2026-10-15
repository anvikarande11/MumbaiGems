import React from 'react';

export default function DiscoveryOverlay({ selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, onResetView }) {
  const categories = [
    { id: 'all', label: 'All Gems' },
    { id: 'cafes', label: '☕ Cafes' },
    { id: 'viewpoints', label: '🌅 Viewpoints' },
    { id: 'study', label: '📚 Quiet Spots' },
    { id: 'bookstores', label: '📖 Bookstores' },
  ];

  return (
    <div className="absolute top-6 left-6 right-6 flex flex-col md:flex-row justify-between items-center gap-4 pointer-events-none z-20">
      <div className="flex items-center gap-3 pointer-events-auto">
        <button 
          onClick={onResetView}
          className="bg-[#050b14]/80 border border-cyan-500/40 text-cyan-400 px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-md hover:bg-cyan-500/20 transition-all"
        >
          🌐 Back to Globe
        </button>
        <input
          type="text"
          placeholder="Search hidden spots..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-[#050b14]/80 border border-slate-700 text-slate-200 px-4 py-2 rounded-full text-xs backdrop-blur-md focus:outline-none focus:border-cyan-400 w-48 md:w-64"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 pointer-events-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-md transition-all ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                : 'bg-[#050b14]/80 border border-slate-800 text-slate-300 hover:border-slate-600'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}