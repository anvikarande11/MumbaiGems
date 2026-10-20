const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=1400&q=85';

const imageCache = new Map();

function isPeopleImage(page) {
  const text = `${page?.title || ''} ${(page?.categories || []).map((item) => item.title).join(' ')}`.toLowerCase();
  return /portrait|people|person|human|selfie|actor|actress|politician|cricketer|singer|bollywood|wedding|crowd/.test(text);
}

export async function getPlaceImage(place) {
  const key = place?.id || place?.name;
  if (!key) return FALLBACK_IMAGE;
  if (imageCache.has(key)) return imageCache.get(key);

  const query = `${place.name} Mumbai landmark architecture place`;
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo|categories&iiprop=url|mime&iiurlwidth=1400&cllimit=20&format=json&origin=*`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('image search failed');
    const data = await response.json();
    const pages = Object.values(data?.query?.pages || {});
    const match = pages.find((page) => !isPeopleImage(page) && /^image\//.test(page?.imageinfo?.[0]?.mime || ''));
    const image = match?.imageinfo?.[0]?.thumburl || match?.imageinfo?.[0]?.url || FALLBACK_IMAGE;
    imageCache.set(key, image);
    return image;
  } catch {
    imageCache.set(key, FALLBACK_IMAGE);
    return FALLBACK_IMAGE;
  }
}

export { FALLBACK_IMAGE };
