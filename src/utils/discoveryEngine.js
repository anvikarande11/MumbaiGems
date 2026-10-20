export const DEFAULT_PREFERENCES = {
  neighborhoods: [],
  categories: [],
  budget: null,
  includeUnverifiedCosts: true,
  food: [],
  foodMode: 'any',
  mustHave: [],
  niceToHave: [],
  indoorOutdoor: 'any',
};

export const CATEGORY_OPTIONS = [
  ['culture', 'Historic & cultural'], ['viewpoint', 'Scenic viewpoints'], ['streetfood', 'Street food'],
  ['cafe', 'Cafés'], ['study', 'Study-friendly'], ['budget', 'Local hidden gems'],
];
export const INTEREST_OPTIONS = [
  ['peaceful', 'Peaceful'], ['photography', 'Photography'], ['history', 'History & architecture'],
  ['nature', 'Nature & greenery'], ['study', 'Study-friendly'], ['budget', 'Budget-friendly'],
];
export const BUDGET_OPTIONS = [[null, 'Any budget'], [100, 'Under ₹100'], [250, '₹100–₹250'], [500, '₹250–₹500'], [1000, '₹500–₹1,000']];

const normalized = (place) => {
  const tags = [place.category, ...(place.tags || []), place.vibeTag, place.desc].filter(Boolean).join(' ').toLowerCase();
  const price = Number(String(place.priceRange || '').replace(/[^0-9]/g, '')) || (place.priceRange?.includes('Under') ? 200 : null);
  return { ...place, tags, estimatedCost: place.cost?.typical ?? price };
};

export function filterDestinations(destinations, preferences = DEFAULT_PREFERENCES) {
  const reasons = [];
  const matches = destinations.map(normalized).filter((place) => {
    if (preferences.neighborhoods?.length && !preferences.neighborhoods.some((area) => place.area?.toLowerCase().includes(area.toLowerCase()))) return false;
    if (preferences.categories?.length && !preferences.categories.some((category) => place.category === category || place.tags.includes(category))) return false;
    if (preferences.budget != null && place.estimatedCost == null && !preferences.includeUnverifiedCosts) return false;
    if (preferences.budget != null && place.estimatedCost != null && place.estimatedCost > preferences.budget) return false;
    if (preferences.mustHave?.length && !preferences.mustHave.every((interest) => place.tags.includes(interest))) return false;
    if (preferences.food?.length && preferences.categories?.some((category) => ['cafe', 'streetfood', 'budget'].includes(category))) {
      const foodTags = place.foodPreferences || [];
      if (preferences.foodMode === 'all' ? !preferences.food.every((food) => foodTags.includes(food)) : !preferences.food.some((food) => foodTags.includes(food))) return false;
    }
    return true;
  });
  const ranked = [...matches].sort((a, b) => {
    const score = (place) => (preferences.niceToHave || []).reduce((sum, interest) => sum + (place.tags.includes(interest) ? 1 : 0), 0);
    return score(b) - score(a);
  });
  ranked.forEach((place) => reasons.push({ id: place.id, reason: 'Matches your selected Mumbai mood', uncertain: place.estimatedCost == null }));
  return { matches: ranked, reasons, count: ranked.length };
}
