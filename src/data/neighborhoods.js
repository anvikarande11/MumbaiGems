// Hand-drawn, simplified neighbourhood outlines for Mumbai.
// GeoJSON order is [lng, lat]; rings are closed. These are cartographic
// approximations for display, not survey-grade boundaries.
const hood = (id, name, short, areas, ink, center, label, ring) => ({
  type: 'Feature',
  properties: { id, name, short, areas, ink, center, label }, // center/label = [lat, lng]
  geometry: { type: 'Polygon', coordinates: [ring] },
});

export const NEIGHBORHOODS = {
  type: 'FeatureCollection',
  features: [
    hood('south', 'South Mumbai', 'SoBo', 'Colaba · Fort · Churchgate · Marine Drive · Malabar Hill', '#9c2f2f',
      [18.938, 72.826], [18.944, 72.821],
      [[72.806, 18.896], [72.826, 18.897], [72.843, 18.915], [72.850, 18.940], [72.846, 18.968],
       [72.830, 18.984], [72.810, 18.975], [72.792, 18.958], [72.796, 18.930], [72.806, 18.896]]),
    hood('bandra', 'Bandra & Khar', 'Bandra', 'Bandstand · Pali Hill · Carter Road', '#1f6f8b',
      [19.060, 72.834], [19.061, 72.833],
      [[72.814, 19.036], [72.846, 19.040], [72.852, 19.078], [72.838, 19.084], [72.818, 19.072], [72.814, 19.036]]),
    hood('dadar', 'Dadar & Matunga', 'Dadar', 'Shivaji Park · Hindu Colony', '#5b6b2f',
      [19.018, 72.842], [19.018, 72.842],
      [[72.822, 18.999], [72.856, 18.999], [72.862, 19.030], [72.844, 19.036], [72.826, 19.034], [72.822, 18.999]]),
    hood('western', 'Western Suburbs', 'Western', 'Juhu · Andheri · Versova · Goregaon · Borivali', '#7a4a8c',
      [19.170, 72.846], [19.172, 72.848],
      [[72.806, 19.085], [72.840, 19.085], [72.872, 19.130], [72.880, 19.200], [72.875, 19.250],
       [72.845, 19.260], [72.822, 19.205], [72.806, 19.135], [72.806, 19.085]]),
    hood('eastern', 'Eastern Suburbs', 'Eastern', 'Powai · Chembur · Ghatkopar · Kurla', '#b4601f',
      [19.092, 72.905], [19.093, 72.906],
      [[72.872, 19.040], [72.925, 19.040], [72.945, 19.090], [72.935, 19.140], [72.892, 19.146], [72.872, 19.100], [72.872, 19.040]]),
  ],
};

export const NEIGHBORHOOD_LIST = NEIGHBORHOODS.features.map((f) => ({
  ...f.properties,
  ring: f.geometry.coordinates[0],
}));

export const HOOD_BY_ID = Object.fromEntries(NEIGHBORHOOD_LIST.map((h) => [h.id, h]));

// Ray-casting point-in-polygon on [lng, lat] rings.
function inRing(lng, lat, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

export function getNeighborhoodId(lat, lng) {
  const hit = NEIGHBORHOOD_LIST.find((h) => inRing(lng, lat, h.ring));
  return hit ? hit.id : null;
}