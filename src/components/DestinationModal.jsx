import React from 'react';

export default function DestinationModal({ gem, onClose }) {
  if (!gem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#0b1329] border border-cyan-500/40 rounded-2xl p-6 text-slate-200 shadow-[0_0_40px_rgba(56,189,248,0.2)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
        >
          ✕
        </button>

        <div className="inline-block px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider bg-cyan-950 text-cyan-400 border border-cyan-800 mb-3 font-semibold">
          {gem.area} • {gem.category}
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">{gem.name}</h2>
        <p className="text-slate-300 text-sm mb-4 leading-relaxed">{gem.description}</p>

        <div className="flex justify-between items-center border-t border-slate-800 pt-4 text-xs text-slate-400">
          <div>Price: <span className="text-amber-400 font-semibold">{gem.price}</span></div>
          <div>Rating: <span className="text-amber-400 font-semibold">★ {gem.rating}</span></div>
        </div>
      </div>
    </div>
  );
}