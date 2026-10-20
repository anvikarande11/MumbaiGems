import { useEffect, useMemo, useRef, useState } from 'react';
import DiscoveryOverlay from './components/DiscoveryOverlay';
import DiscoveryConsole from './components/DiscoveryConsole';
import { filterDestinations } from './utils/discoveryEngine';
import AuthView from './components/AuthView';
import IntroView from './components/IntroView';
import MumbaiGlobe from './components/MumbaiGlobe';
import DestinationBook from './components/DestinationBook';
import { MUMBAI_GEMS } from './data/gemsData';
import { useDiscovery } from './hooks/useDiscovery';

export default function App() {
  const globeRef = useRef(null);
  const [phase, setPhase] = useState('intro'); // intro -> auth -> leaving -> map
  const [profile, setProfile] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [discoveryOpen, setDiscoveryOpen] = useState(false);
  const [preferences, setPreferences] = useState(null);
  const filtered = useMemo(() => filterDestinations(MUMBAI_GEMS, preferences || {}).matches, [preferences]);
  const discovery = useDiscovery(filtered, globeRef);

  useEffect(() => {
    if (phase !== 'leaving') return undefined;
    const t = setTimeout(() => setPhase('map'), 4500);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#cfeaf3]">
      {/* Mounted from the start so the map is ready when the intro fades. */}
      <MumbaiGlobe
        ref={globeRef}
        landmarks={filtered}
          active={phase === 'leaving' || phase === 'map'}
        blind={discovery.blind}
        visitedIds={discovery.visited}
        onLandmarkClick={(place) => { discovery.handlePick(place); setSelectedPlace(place); }}
      />
      {phase === 'map' && (
        <DiscoveryOverlay
          discovery={discovery}
          landmarks={filtered}
          personalizationActive={Boolean(preferences)}
          visitedIds={discovery.visited}
          globeRef={globeRef}
          profile={profile}
          onOpenDiscovery={() => setDiscoveryOpen(true)}
          resultCount={filtered.length}
          onShowAll={() => { setPreferences(null); setSelectedPlace(null); }}
        />
      )}
      {selectedPlace && phase === 'map' && (
        <DestinationBook
          place={selectedPlace}
          landmarks={MUMBAI_GEMS}
          onClose={() => setSelectedPlace(null)}
          onSelect={setSelectedPlace}
        />
      )}
      {discoveryOpen && phase === 'map' && <DiscoveryConsole landmarks={MUMBAI_GEMS} initialPreferences={preferences} onClose={() => setDiscoveryOpen(false)} onDiscover={(next) => { setPreferences(next); setDiscoveryOpen(false); setSelectedPlace(null); }} />}
      {phase === 'intro' && <IntroView onEnter={() => setPhase('auth')} />}
      {phase === 'auth' && <AuthView onContinue={(nextProfile) => { setProfile(nextProfile); setPhase('leaving'); }} />}
      {phase === 'leaving' && <IntroView leaving onEnter={() => undefined} />}
    </div>
  );
}
