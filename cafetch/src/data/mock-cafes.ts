export type Cafe = {
  id: string;
  name: string;
  area: string;
  rating: number;
  reviewCount: number;
  priceLevel: 1 | 2 | 3;
  distanceKm: number;
  tags: string[];
  parkingAvailable: boolean;
  openingHours: { opensAt: string; closesAt: string };
  imagePlaceholder: string;
};

// Parking and daily opening hours are illustrative filter-demo values, not verified business details.
export const mockCafes: Cafe[] = [
  {
    id: 'morrow-coffee',
    name: 'Morrow Coffee',
    area: 'Adyar',
    rating: 4.7,
    reviewCount: 193,
    priceLevel: 3,
    distanceKm: 0.8,
    tags: ['Single-origin', 'Quiet corners'],
    parkingAvailable: false,
    openingHours: { opensAt: '07:00', closesAt: '20:00' },
    imagePlaceholder: 'A slow morning, poured well',
  },
  {
    id: 'roast-and-ritual',
    name: 'Roast & Ritual',
    area: 'Besant Nagar',
    rating: 4.6,
    reviewCount: 351,
    priceLevel: 2,
    distanceKm: 1.1,
    tags: ['Pour-over', 'Outdoor seating'],
    parkingAvailable: true,
    openingHours: { opensAt: '08:00', closesAt: '22:00' },
    imagePlaceholder: 'Fresh brews by the coast',
  },
  {
    id: 'common-grounds',
    name: 'Common Grounds',
    area: 'Nungambakkam',
    rating: 4.5,
    reviewCount: 227,
    priceLevel: 3,
    distanceKm: 2.4,
    tags: ['Work-friendly', 'All-day breakfast'],
    parkingAvailable: false,
    openingHours: { opensAt: '08:00', closesAt: '19:00' },
    imagePlaceholder: 'A bright table for your next idea',
  },
  {
    id: 'sunday-coffee-club',
    name: 'Sunday Coffee Club',
    area: 'Anna Nagar',
    rating: 4.4,
    reviewCount: 148,
    priceLevel: 2,
    distanceKm: 1.8,
    tags: ['Brunch', 'Cozy seats'],
    parkingAvailable: true,
    openingHours: { opensAt: '07:00', closesAt: '22:00' },
    imagePlaceholder: 'Brunch that takes its time',
  },
  {
    id: 'kapi-and-co',
    name: 'Kapi & Co.',
    area: 'Adyar',
    rating: 4.5,
    reviewCount: 286,
    priceLevel: 1,
    distanceKm: 2.1,
    tags: ['South Indian coffee', 'Breakfast'],
    parkingAvailable: true,
    openingHours: { opensAt: '06:00', closesAt: '18:00' },
    imagePlaceholder: 'A familiar filter-coffee ritual',
  },
];
