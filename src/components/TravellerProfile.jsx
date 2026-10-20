import { UserRound } from 'lucide-react';

export default function TravellerProfile({ onOpen }) {
  return (
    <button type="button" className="traveller-profile" onClick={onOpen} aria-label="Open traveller profile">
      <span className="traveller-avatar"><UserRound size={15} strokeWidth={1.8} /></span>
      <span className="traveller-meta"><strong>Traveller profile</strong><small>Student explorer · Mumbai</small></span>
      <span className="traveller-chevron">⌄</span>
    </button>
  );
}
