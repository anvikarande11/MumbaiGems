import { UserRound } from 'lucide-react';

export default function TravellerProfile({ traveller, onOpen }) {
  return (
    <button type="button" className="traveller-profile" onClick={onOpen} aria-label="Open traveller profile">
      <span className="traveller-avatar"><UserRound size={15} strokeWidth={1.8} /></span>
      <span className="traveller-meta"><strong>{traveller.name}</strong><small>{traveller.email} · Mumbai</small></span>
      <span className="traveller-chevron">⌄</span>
    </button>
  );
}
