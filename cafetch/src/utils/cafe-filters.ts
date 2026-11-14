import type { Cafe } from '@/data/mock-cafes';

export type CafeFilters = {
  minRating: number | null;
  maxPriceLevel: Cafe['priceLevel'] | null;
  maxDistanceKm: number | null;
  aestheticTags: string[];
  parkingOnly: boolean;
  openNow: boolean;
};

export function createDefaultCafeFilters(): CafeFilters {
  return {
    minRating: null,
    maxPriceLevel: null,
    maxDistanceKm: null,
    aestheticTags: [],
    parkingOnly: false,
    openNow: false,
  };
}

export function countActiveCafeFilters(filters: CafeFilters) {
  return (
    Number(filters.minRating !== null) +
    Number(filters.maxPriceLevel !== null) +
    Number(filters.maxDistanceKm !== null) +
    Number(filters.aestheticTags.length > 0) +
    Number(filters.parkingOnly) +
    Number(filters.openNow)
  );
}

export function filterCafes(cafes: Cafe[], filters: CafeFilters, query = '', now = new Date()) {
  const normalizedQuery = query.trim().toLowerCase();

  return cafes.filter((cafe) => {
    const matchesQuery =
      !normalizedQuery ||
      [cafe.name, cafe.area].some((value) => value.toLowerCase().includes(normalizedQuery));
    const matchesRating = filters.minRating === null || cafe.rating >= filters.minRating;
    const matchesBudget = filters.maxPriceLevel === null || cafe.priceLevel <= filters.maxPriceLevel;
    const matchesDistance = filters.maxDistanceKm === null || cafe.distanceKm <= filters.maxDistanceKm;
    const matchesAesthetic =
      filters.aestheticTags.length === 0 ||
      filters.aestheticTags.some((tag) => cafe.tags.includes(tag));
    const matchesParking = !filters.parkingOnly || cafe.parkingAvailable;
    const matchesHours = !filters.openNow || isCafeOpenNow(cafe, now);

    return (
      matchesQuery &&
      matchesRating &&
      matchesBudget &&
      matchesDistance &&
      matchesAesthetic &&
      matchesParking &&
      matchesHours
    );
  });
}

function isCafeOpenNow(cafe: Cafe, now: Date) {
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openingMinutes = minutesAfterMidnight(cafe.openingHours.opensAt);
  const closingMinutes = minutesAfterMidnight(cafe.openingHours.closesAt);

  return openingMinutes <= closingMinutes
    ? currentMinutes >= openingMinutes && currentMinutes < closingMinutes
    : currentMinutes >= openingMinutes || currentMinutes < closingMinutes;
}

function minutesAfterMidnight(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}
