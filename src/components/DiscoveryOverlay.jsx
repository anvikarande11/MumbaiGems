import { useMemo, useState } from 'react';
import { ROUNDS, ROUND_SECONDS, rankFor } from '../hooks/useDiscovery';
import JournalModal from './JournalModal';

const glass =
  'pointer-events-auto rounded-2xl border border-slate-300/50 bg-white/75 shadow-[0_8px_28px_rgba(51,65,85,0.14)] backdrop-blur-xl';
const primary =
  'rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white transition hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500';
const ghost =
  'rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 text-xs font-medium text-slate-600 transition hover:border-slate-500 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400';

const CSS = `
@keyframes mg-miss{0%{opacity:0;transform:translateY(4px)}15%,70%{opacity:1;transform:none}100%{opacity:0}}
.mg-miss{animation:mg-miss 1.4s ease forwards}
@keyframes mg-toast{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}
.mg-toast{animation:mg-toast .3s ease both}
@media (prefers-reduced-motion:reduce){.mg-miss,.mg-toast{animation:none}}
`;

export default function DiscoveryOverlay({ discovery, landmarks = [], personalizationActive, visitedIds, globeRef, profile, onOpenDiscovery, resultCount, onShowAll, layerVisibility = {}, onLayerVisibilityChange }) {
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const matches = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return landmarks
      .filter((place) => `${place.name} ${place.area ?? ''} ${place.category ?? ''}`.toLowerCase().includes(term))
      .slice(0, 6);
  }, [landmarks, query]);
  const flyToDestination = (place) => {
    setQuery(place.name);
    setSearchOpen(false);
    globeRef?.current?.focus(place.id);
  };
  const { game, target, clue, toast, startGame, quitGame, nextRound } = discovery;
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  

  const playing = game.phase === 'playing';
  const result = game.phase === 'result';
  const done = game.phase === 'done';
  const rounds = game.order?.length ?? ROUNDS;
  const low = playing && game.timeLeft <= 10;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 mg-overlay-controls">
      <style>{CSS}</style>

      {/* Controls sit below the dedicated search row on desktop. */}
      <div className="pointer-events-auto absolute left-6 top-24 flex max-w-[min(20rem,calc(100%-3rem))] flex-wrap items-center gap-2 mg-top-actions">
        {game.phase === 'off' && <button type="button" onClick={startGame} className={`${primary} px-5 py-2.5 text-sm shadow-md`}>Spin &amp; Find</button>}
        <button type="button" onClick={onOpenDiscovery} className="rounded-full border border-slate-300 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-800 shadow-md backdrop-blur hover:bg-white">Personalise my globe</button>
        {personalizationActive && <button type="button" onClick={onShowAll} className="rounded-full border border-slate-300 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-700 shadow-md backdrop-blur hover:bg-white">Show all landmarks</button>}
      </div>
      <div className="pointer-events-auto absolute left-1/2 top-24 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/60 bg-white/80 p-1 shadow-md backdrop-blur md:flex" aria-label="Atlas layers">
        {[['labels', 'Names'], ['neighborhoods', 'Boundaries'], ['roads', 'Roads'], ['water', 'Water']].map(([key, label]) => <button key={key} type="button" onClick={() => onLayerVisibilityChange?.(key)} aria-pressed={layerVisibility[key] !== false} className={`rounded-full px-3 py-1.5 text-[10px] font-semibold transition ${layerVisibility[key] !== false ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-white'}`}>{label}</button>)}
      </div>
      <div className="pointer-events-auto absolute right-6 top-24 mg-journal-action">
        <button type="button" onClick={() => setIsJournalOpen(true)} className="flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-800 shadow-md backdrop-blur transition hover:bg-white">Travel Journalism</button>
      </div>

      <div className="pointer-events-auto absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/85 px-4 py-2 text-xs font-medium text-slate-700 shadow-md backdrop-blur mg-result-count">{personalizationActive ? `Personalised discovery · ${resultCount} matching places` : `All Mumbai landmarks · ${resultCount} places`}</div>

      {/* Destination search */}
      <div className="pointer-events-auto absolute left-1/2 top-4 w-[min(25rem,calc(100%-2rem))] -translate-x-1/2 mg-search">
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-[#101b2d]/80 px-4 py-2 shadow-[0_12px_40px_rgba(0,0,0,.28)] backdrop-blur-xl">
          <span aria-hidden="true" className="text-sm text-cyan-200">⌕</span>
          <input
            value={query}
            onChange={(event) => { setQuery(event.target.value); setSearchOpen(true); }}
            onFocus={() => setSearchOpen(true)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && matches[0]) flyToDestination(matches[0]);
              if (event.key === 'Escape') setSearchOpen(false);
            }}
            aria-label="Search Mumbai destinations"
            placeholder="Search a neighbourhood or gem"
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
          />
          <span className="text-[10px] uppercase tracking-[.18em] text-slate-500">Atlas</span>
        </div>
        {searchOpen && matches.length > 0 && (
          <div className="mt-2 overflow-hidden rounded-2xl border border-white/15 bg-[#101b2d]/95 p-1 shadow-2xl backdrop-blur-xl">
            {matches.map((place) => (
              <button key={place.id} type="button" onClick={() => flyToDestination(place)} className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition hover:bg-white/10">
                <span className="min-w-0"><strong className="block truncate text-sm font-medium text-white">{place.name}</strong><span className="block truncate text-[11px] text-slate-400">{place.area} · {place.category}</span></span>
                <span className="ml-3 text-xs text-cyan-200">Fly there</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Traveller profile */}
      <div className="pointer-events-auto absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/60 bg-white/85 px-3 py-2 shadow-md backdrop-blur-xl mg-profile">
        <span className="grid size-7 place-items-center rounded-full bg-slate-900 text-[11px] font-semibold text-white">{(profile?.name || 'T').slice(0, 1).toUpperCase()}</span>
        <span className="max-w-32 truncate text-xs font-semibold text-slate-800">{profile?.name || 'Traveller'}</span>
      </div>

      {/* Game HUD */}
      {playing && (
        <div className={`${glass} absolute left-1/2 top-16 w-[min(28rem,calc(100%-2rem))] -translate-x-1/2 p-4 mg-game-hud`}>
          <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">
            <span>
              Round {game.round + 1}/{rounds}
            </span>
            <span className="flex items-center gap-3">
              <span>{game.score} pts</span>
              <button type="button" onClick={quitGame} aria-label="Close game" title="Close game" className="text-base leading-none text-slate-400 hover:text-slate-700">
                ×
              </button>
            </span>
          </div>
          <p className="mt-2 text-[15px] font-semibold leading-snug text-slate-900">{clue}</p>
          <div className="mt-1.5 min-h-[1rem] space-x-3 text-[11px] text-slate-500">
            {game.timeLeft <= 20 && <span>Vibe: {target?.vibeTag}</span>}
            {game.timeLeft <= 10 && <span>Budget: {target?.priceRange}</span>}
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200/80">
              <div
                className={`h-full rounded-full transition-[width] duration-1000 ease-linear ${low ? 'bg-rose-500' : 'bg-slate-700'}`}
                style={{ width: `${(game.timeLeft / ROUND_SECONDS) * 100}%` }}
              />
            </div>
            <span className={`w-8 text-right font-mono text-xs ${low ? 'text-rose-600' : 'text-slate-600'}`}>{game.timeLeft}s</span>
          </div>
          {game.wrong > 0 && (
            <div key={game.wrong} className="mg-miss mt-2 text-[11px] font-medium text-rose-600">
              Not that one. −5s
            </div>
          )}
        </div>
      )}

      {result && (
        <div className={`${glass} absolute left-1/2 top-16 w-[min(28rem,calc(100%-2rem))] -translate-x-1/2 p-4 mg-game-hud`}>
          <div className={`text-[11px] font-medium uppercase tracking-[0.12em] ${game.outcome === 'found' ? 'text-emerald-700' : 'text-slate-500'}`}>
            {game.outcome === 'found' ? `Found it · +${game.gained} pts` : "Time's up"}
          </div>
          <div className="mt-1 text-[15px] font-semibold text-slate-900">{target?.name}</div>
          <div className="text-xs text-slate-500">{target?.area}</div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-slate-500">{game.score} pts total</span>
            <button type="button" onClick={nextRound} className={primary}>
              {game.round + 1 >= rounds ? 'See results' : 'Next spot'}
            </button>
          </div>
        </div>
      )}

      {done && (
        <div className={`${glass} absolute left-1/2 top-16 w-[min(24rem,calc(100%-2rem))] -translate-x-1/2 p-5 text-center`}>
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">Your rank</div>
          <div className="mt-1 text-xl font-semibold text-slate-900">{rankFor(game.found, rounds)}</div>
          <div className="mt-1 text-xs text-slate-500">
            {game.found}/{rounds} gems found · {game.score} pts
          </div>
          <div className="mt-4 flex justify-center gap-2">
            <button type="button" onClick={startGame} className={primary}>
              Play again
            </button>
            <button type="button" onClick={quitGame} className={ghost}>
              Back to map
            </button>
          </div>
        </div>
      )}

      {personalizationActive && resultCount === 0 && (
        <div className="pointer-events-auto absolute left-1/2 top-40 w-[min(24rem,calc(100%-2rem))] -translate-x-1/2 rounded-2xl border border-white/60 bg-white/90 p-4 text-center text-xs text-slate-700 shadow-xl backdrop-blur mg-empty-state">
          No landmarks match these preferences. Edit your globe preferences or show all landmarks to keep exploring.
        </div>
      )}

      {toast && (
        <div
          key={toast.key}
          className="mg-toast absolute bottom-20 left-1/2 rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-lg"
        >
          {toast.text}
        </div>
      )}

      {/* Travel Journal Modal */}
      <JournalModal
        isOpen={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
        landmarks={landmarks}
        visitedIds={visitedIds}
      />
    </div>
  );
}
