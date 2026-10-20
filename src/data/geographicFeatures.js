// Curated, named geographic features for the Mumbai atlas layer.
// Coordinates are WGS84 and intentionally limited to verified, high-signal features.
// The data shape is extensible for a future OSM/official GIS import pipeline.
export const MUMBAI_GEOGRAPHIC_FEATURES = [
  { id: 'geo-mumbai', name: 'Mumbai', type: 'city', lat: 19.076, lng: 72.8777, major: true, description: 'Capital city of Maharashtra on India’s west coast.' },
  { id: 'geo-navi-mumbai', name: 'Navi Mumbai', type: 'city', lat: 19.033, lng: 73.0297, major: true, description: 'Planned satellite city across Mumbai Harbour.' },
  { id: 'geo-thane', name: 'Thane', type: 'city', lat: 19.2183, lng: 72.9781, major: true, description: 'City north-east of Mumbai, at the head of Thane Creek.' },
  { id: 'geo-colaba', name: 'Colaba', type: 'neighbourhood', lat: 18.9067, lng: 72.8147, major: true },
  { id: 'geo-fort', name: 'Fort', type: 'neighbourhood', lat: 18.9322, lng: 72.8356, major: true },
  { id: 'geo-bandra', name: 'Bandra', type: 'suburb', lat: 19.0544, lng: 72.8406, major: true },
  { id: 'geo-andheri', name: 'Andheri', type: 'suburb', lat: 19.1197, lng: 72.8468, major: true },
  { id: 'geo-powai', name: 'Powai', type: 'neighbourhood', lat: 19.1176, lng: 72.906, major: true },
  { id: 'geo-borivali', name: 'Borivali', type: 'suburb', lat: 19.2307, lng: 72.8567, major: true },
  { id: 'geo-arabian-sea', name: 'Arabian Sea', type: 'water', lat: 19.05, lng: 72.72, major: true, maxAlt: 1.4 },
  { id: 'geo-mumbai-harbour', name: 'Mumbai Harbour', type: 'water', lat: 18.97, lng: 72.91, major: true, maxAlt: 1.4 },
  { id: 'geo-thane-creek', name: 'Thane Creek', type: 'water', lat: 19.03, lng: 72.98, major: true, maxAlt: 1.1 },
  { id: 'geo-sanjay-gandhi', name: 'Sanjay Gandhi National Park', type: 'natural area', lat: 19.2147, lng: 72.9106, major: true },
  { id: 'geo-western-express', name: 'Western Express Highway', type: 'highway', lat: 19.13, lng: 72.856, major: true },
  { id: 'geo-eastern-express', name: 'Eastern Express Highway', type: 'highway', lat: 19.12, lng: 72.95, major: true },
  { id: 'geo-cst', name: 'Chhatrapati Shivaji Maharaj Terminus', type: 'railway station', lat: 18.9402, lng: 72.8356, major: true },
  { id: 'geo-airport', name: 'Chhatrapati Shivaji Maharaj International Airport', type: 'airport', lat: 19.0896, lng: 72.8656, major: true },
  { id: 'geo-marine-drive', name: 'Marine Drive', type: 'coastal road', lat: 18.9431, lng: 72.8236, major: true },
];

export const GEOGRAPHIC_SEARCH_INDEX = MUMBAI_GEOGRAPHIC_FEATURES;
export const geographicLabelData = MUMBAI_GEOGRAPHIC_FEATURES.filter((feature) => feature.type !== 'highway' && feature.type !== 'railway station' && feature.type !== 'airport').map((feature) => ({ ...feature, id: feature.id }));
export const geographicWaterLabels = MUMBAI_GEOGRAPHIC_FEATURES.filter((feature) => feature.type === 'water');
