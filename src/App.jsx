import React, { useState } from 'react';
import MumbaiGlobe from './components/MumbaiGlobe';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <main className="relative w-full h-screen bg-white overflow-hidden font-sans">
      {!hasEntered ? (
        /* Minimalist Intro Screen */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-white z-20 animate-fadeIn">
          <div className="text-center max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Mumbai Gems
            </h1>
            <p className="text-slate-500 text-sm md:text-base font-light mb-8">
              An immersive urban discovery experience mapping the heart and hidden stories of the city.
            </p>
            <button
              onClick={() => setHasEntered(true)}
              className="px-8 py-3 rounded-full bg-slate-900 text-white font-medium text-xs tracking-widest uppercase hover:bg-cyan-600 transition-all shadow-lg hover:shadow-cyan-500/25 transform hover:-translate-y-0.5"
            >
              Enter Experience
            </button>
          </div>
        </div>
      ) : (
        /* Interactive 3D Globe View */
        <div className="absolute inset-0 w-full h-full animate-fadeIn">
          <div className="absolute top-6 left-6 z-10 pointer-events-none">
            <h2 className="text-lg font-bold text-slate-900 tracking-wider">MUMBAI GEMS</h2>
            <p className="text-xs text-slate-500 font-light">Interactive City Grid & Discovery</p>
          </div>
          
          <button
            onClick={() => setHasEntered(false)}
            className="absolute top-6 right-6 z-10 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all border border-slate-200"
          >
            ← Back to Intro
          </button>

          <MumbaiGlobe />
        </div>
      )}
    </main>
  );
}