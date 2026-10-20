import { useEffect, useRef, useState } from 'react';
import WelcomeGate from './components/WelcomeGate';
import TravellerProfile from './components/TravellerProfile';
import DiscoveryOverlay from './components/DiscoveryOverlay';
import IntroView from './components/IntroView';
import MumbaiGlobe from './components/MumbaiGlobe';
import gemsData, { MUMBAI_GEMS } from './data/gemsData';
import { useDiscovery } from './hooks/useDiscovery';
import neighborhoods from "./data/neighborhoods";

export default function App() {
  const globeRef = useRef(null);
  const [phase, setPhase] = useState('intro'); // intro -> auth -> leaving -> map
  const [profileOpen, setProfileOpen] = useState(false);
  const [traveller, setTraveller] = useState({ name: 'Guest explorer', email: 'Not signed in', mode: 'login' });
  const discovery = useDiscovery(gemsData, globeRef);

  useEffect(() => {
    if (phase !== 'leaving') return undefined;
    const t = setTimeout(() => setPhase('map'), 850);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#cfeaf3]">
      {/* Mounted from the start so the map is ready when the intro fades. */}
      <MumbaiGlobe
        ref={globeRef}
        landmarks={MUMBAI_GEMS}
        active={phase !== 'intro'}
        blind={discovery.blind}
        visitedIds={discovery.visited}
        onLandmarkClick={discovery.handlePick}
      />
      {phase === 'map' && (
        <>
          <TravellerProfile traveller={traveller} onOpen={() => setProfileOpen((value) => !value)} />
          {profileOpen && <div className="profile-popover"><strong>{traveller.name}</strong><span>{traveller.email}</span><span>Student explorer · Mumbai</span><span>Curious · budget-aware · local-first</span></div>}
          <DiscoveryOverlay
          discovery={discovery}
          landmarks={MUMBAI_GEMS}
          visitedIds={discovery.visited}
          globeRef={globeRef}
        />
        </>
      )}
      {phase === 'intro' && <IntroView leaving={phase === 'leaving'} onEnter={() => setPhase('auth')} />}
      {phase === 'auth' && <WelcomeGate onContinue={(details) => { setTraveller(details); setPhase('leaving'); }} />}
    </div>
  );
}
