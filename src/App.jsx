import { useEffect, useRef, useState } from 'react';
import DiscoveryOverlay from './components/DiscoveryOverlay';
import AuthView from './components/AuthView';
import IntroView from './components/IntroView';
import MumbaiGlobe from './components/MumbaiGlobe';
import gemsData, { MUMBAI_GEMS } from './data/gemsData';
import { useDiscovery } from './hooks/useDiscovery';
import neighborhoods from "./data/neighborhoods";

export default function App() {
  const globeRef = useRef(null);
  const [phase, setPhase] = useState('intro'); // intro -> auth -> leaving -> map
  const [profile, setProfile] = useState(null);
  const discovery = useDiscovery(gemsData, globeRef);

  useEffect(() => {
    if (phase !== 'leaving') return undefined;
    const t = setTimeout(() => setPhase('map'), 2900);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#cfeaf3]">
      {/* Mounted from the start so the map is ready when the intro fades. */}
      <MumbaiGlobe
        ref={globeRef}
        landmarks={MUMBAI_GEMS}
          active={phase === 'leaving' || phase === 'map'}
        blind={discovery.blind}
        visitedIds={discovery.visited}
        onLandmarkClick={discovery.handlePick}
      />
      {phase === 'map' && (
        <DiscoveryOverlay
          discovery={discovery}
          landmarks={MUMBAI_GEMS}
          visitedIds={discovery.visited}
          globeRef={globeRef}
          profile={profile}
        />
      )}
      {phase === 'intro' && <IntroView onEnter={() => setPhase('auth')} />}
      {phase === 'auth' && <AuthView onContinue={(nextProfile) => { setProfile(nextProfile); setPhase('leaving'); }} />}
      {phase === 'leaving' && <IntroView leaving onEnter={() => undefined} />}
    </div>
  );
}
