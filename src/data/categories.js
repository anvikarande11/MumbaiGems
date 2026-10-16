// Shared category styling. Matching is fuzzy so it works with whatever
// category strings exist in gemsData.js ("culture", "cafe", "street food"...).
const RULES = [
  { key: 'culture', test: /cultur|heritage|museum|temple|history/, label: 'Culture', icon: '🏛️', color: '#e8a54b' },
  { key: 'cafe', test: /caf[eé]|coffee/, label: 'Cafés', icon: '☕', color: '#d08a5e' },
  { key: 'study', test: /study|library|work|cowork/, label: 'Study spots', icon: '📚', color: '#6da8ff' },
  { key: 'food', test: /food|eat|street|snack|restaurant/, label: 'Street food', icon: '🍜', color: '#ff7b54' },
  { key: 'sunset', test: /sunset|view|sea|beach|promenade/, label: 'Sunset views', icon: '🌅', color: '#ff9fc2' },
  { key: 'budget', test: /budget|hangout|market|thrift|shop/, label: 'Budget hangouts', icon: '🎒', color: '#58d6a0' },
];

export function getCategoryMeta(category = '') {
  const c = String(category).toLowerCase();
  const hit = RULES.find((r) => r.test.test(c));
  if (hit) return hit;
  const label = c ? c[0].toUpperCase() + c.slice(1) : 'Spot';
  return { key: c || 'other', label, icon: '📍', color: '#a5aefc' };
}