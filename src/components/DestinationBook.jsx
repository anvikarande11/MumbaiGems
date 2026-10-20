import { useEffect, useMemo, useRef, useState } from 'react';
import './destination-book.css';

const fallbackImage = 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=1400&q=85';

function usePlaceImage(place) {
  const [image, setImage] = useState(null);
  useEffect(() => {
    let cancelled = false;
    setImage(null);
    const title = encodeURIComponent(`${place.name} Mumbai`);
    fetch(`https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${title}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1200&format=json&origin=*`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const page = data?.query?.pages ? Object.values(data.query.pages)[0] : null;
        setImage(page?.imageinfo?.[0]?.thumburl || page?.imageinfo?.[0]?.url || fallbackImage);
      })
      .catch(() => { if (!cancelled) setImage(fallbackImage); });
    return () => { cancelled = true; };
  }, [place]);
  return image || fallbackImage;
}

export default function DestinationBook({ place, landmarks, onClose, onSelect }) {
  const closeRef = useRef(null);
  const [page, setPage] = useState(0);
  const [saved, setSaved] = useState(() => Boolean(place && JSON.parse(localStorage.getItem('mumbai-gems-saved') || '[]').includes(place.id)));
  const image = usePlaceImage(place);
  const nearby = useMemo(() => landmarks.filter((item) => item.id !== place.id && item.category === place.category).slice(0, 3), [landmarks, place]);

  useEffect(() => { closeRef.current?.focus(); }, []);
  useEffect(() => { const onKey = (event) => event.key === 'Escape' && onClose(); window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, [onClose]);
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);
  const toggleSaved = () => { const current = JSON.parse(localStorage.getItem('mumbai-gems-saved') || '[]'); const next = saved ? current.filter((id) => id !== place.id) : [...new Set([...current, place.id])]; localStorage.setItem('mumbai-gems-saved', JSON.stringify(next)); setSaved(!saved); };
  const share = async () => { const text = `Explore ${place.name} in Mumbai`; if (navigator.share) await navigator.share({ title: place.name, text }).catch(() => {}); else await navigator.clipboard?.writeText(`${text} · ${window.location.href}`); };

  return (
    <div className="destination-book-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="destination-book" role="dialog" aria-modal="true" aria-labelledby="destination-book-title">
        <button ref={closeRef} className="book-close" onClick={onClose} aria-label="Close destination book">×</button>
        <div className="book-page book-visual-page">
          <img src={image} alt={`${place.name} in Mumbai`} />
          <div className="book-image-wash" />
          <div className="book-visual-copy"><span>{place.category} · field note {String(place.id).replace('gem-', '#')}</span><h2 id="destination-book-title">{place.name}</h2><p>{place.area}</p></div>
          <small className="book-page-number">MUMBAI GEMS / {String(Number(place.id.replace('gem-', '')) || 1).padStart(2, '0')}</small>
        </div>
        <div className="book-page book-notes-page">
          <div className="book-toolbar"><span>Traveller&apos;s field notes</span><div><button onClick={toggleSaved} className="book-action" aria-pressed={saved}>{saved ? 'Saved' : 'Save'}</button><button onClick={share} className="book-action">Share</button></div></div>
          <div className="book-scroll">
            {page === 0 && <><p className="book-kicker">At a glance</p><div className="book-facts"><span><b>Neighbourhood</b>{place.area}</span><span><b>Atmosphere</b>{place.vibeTag || 'Local and layered'}</span><span><b>Budget</b>{place.priceRange || 'Check before visiting'}</span><span><b>Coordinates</b>{place.lat.toFixed(3)}° N · {place.lng.toFixed(3)}° E</span></div><h3>Why this place matters</h3><p className="book-lead">{place.desc}</p><h3>What you will experience</h3><p>Come with curiosity: look closely at the architecture, listen to the neighbourhood, and give the place enough time to reveal its everyday rhythm.</p><div className="book-tip"><b>A thoughtful tip</b><span>{place.studentHack || 'Check current access and timings before travelling.'}</span></div></>}
            {page === 1 && <><p className="book-kicker">Plan your visit</p><h3>Make it work for your day</h3><p>Plan for daylight unless the destination is clearly suited to evenings. Opening hours, access rules and prices can change, so verify them before setting out.</p><div className="book-planner"><span><b>Suggested time</b>45–90 minutes</span><span><b>Visit style</b>{place.category === 'viewpoint' ? 'Walk, pause, photograph' : 'Explore, observe, learn'}</span><span><b>Getting there</b>Use the coordinates below for current directions</span></div><a className="book-map" href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`} target="_blank" rel="noreferrer">View on map ↗</a><h3>Before you go</h3><p>Be respectful in residential, religious and working spaces. Wear comfortable shoes and avoid photographing people without permission.</p></>}
            {page === 2 && <><p className="book-kicker">Continue the walk</p><h3>Nearby discoveries</h3><p>Keep the same neighbourhood thread going with another place from this field guide.</p><div className="nearby-list">{nearby.map((item) => <button key={item.id} onClick={() => { setPage(0); onSelect(item); }}><span>{item.name}</span><small>{item.area} · {item.category}</small></button>)}</div></>}
          </div>
          <div className="book-pagination"><button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}>Previous</button><span>{String(page + 1).padStart(2, '0')} / 03</span><button onClick={() => setPage(Math.min(2, page + 1))} disabled={page === 2}>Next</button></div>
        </div>
      </section>
    </div>
  );
}
