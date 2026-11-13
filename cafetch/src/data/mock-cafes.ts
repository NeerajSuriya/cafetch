export type Cafe = {
  id: string;
  name: string;
  area: string;
  rating: number;
  reviewCount: number;
  priceLevel: 1 | 2 | 3;
  distance: string;
  tags: string[];
  imagePlaceholder: string;
};

export const mockCafes: Cafe[] = [
  {
    id: 'morrow-coffee',
    name: 'Morrow Coffee',
    area: 'Adyar',
    rating: 4.7,
    reviewCount: 193,
    priceLevel: 3,
    distance: '0.8 km',
    tags: ['Single-origin', 'Quiet corners'],
    imagePlaceholder: 'A slow morning, poured well',
  },
  {
    id: 'roast-and-ritual',
    name: 'Roast & Ritual',
    area: 'Besant Nagar',
    rating: 4.6,
    reviewCount: 351,
    priceLevel: 2,
    distance: '1.1 km',
    tags: ['Pour-over', 'Outdoor seating'],
    imagePlaceholder: 'Fresh brews by the coast',
  },
  {
    id: 'common-grounds',
    name: 'Common Grounds',
    area: 'Nungambakkam',
    rating: 4.5,
    reviewCount: 227,
    priceLevel: 3,
    distance: '2.4 km',
    tags: ['Work-friendly', 'All-day breakfast'],
    imagePlaceholder: 'A bright table for your next idea',
  },
  {
    id: 'sunday-coffee-club',
    name: 'Sunday Coffee Club',
    area: 'Anna Nagar',
    rating: 4.4,
    reviewCount: 148,
    priceLevel: 2,
    distance: '1.8 km',
    tags: ['Brunch', 'Cozy seats'],
    imagePlaceholder: 'Brunch that takes its time',
  },
  {
    id: 'kapi-and-co',
    name: 'Kapi & Co.',
    area: 'Adyar',
    rating: 4.5,
    reviewCount: 286,
    priceLevel: 1,
    distance: '2.1 km',
    tags: ['South Indian coffee', 'Breakfast'],
    imagePlaceholder: 'A familiar filter-coffee ritual',
  },
];
