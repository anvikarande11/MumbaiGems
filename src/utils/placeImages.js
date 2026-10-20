const fallbackImage = 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=1400&q=85';
const imageCache = new Map();

export function getFallbackImage() {
  return fallbackImage;
}

export async function getPlaceImage(place) {
  const key = place?.id || place?.name;
  if (!key) return fallbackImage;
  if (imageCache.has(key)) return imageCache.get(key);

  const title = encodeURIComponent(`${place.name} Mumbai`);
  try {
    const response = await fetch(`https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${title}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1200&format=json&origin=*`);
    const data = await response.json();
    const page = data?.query?.pages ? Object.values(data.query.pages)[0] : null;
    const image = page?.imageinfo?.[0]?.thumburl || page?.imageinfo?.[0]?.url || fallbackImage;
    imageCache.set(key, image);
    return image;
  } catch {
    imageCache.set(key, fallbackImage);
    return fallbackImage;
  }
}
