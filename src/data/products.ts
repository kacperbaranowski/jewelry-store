import type { Product, Category } from '../types';

export const categoryNames: Record<Category, string> = {
  rings: 'Pierścionki',
  necklaces: 'Naszyjniki',
  earrings: 'Kolczyki',
  bracelets: 'Bransoletki',
  watches: 'Zegarki',
  wedding: 'Obrączki Ślubne',
};

export const materialNames: Record<string, string> = {
  gold: 'Złoto',
  silver: 'Srebro',
  platinum: 'Platyna',
  'rose-gold': 'Różowe Złoto',
};

export const products: Product[] = [
  // Pierścionki
  {
    id: 'ring-001',
    name: 'Pierścionek Zaręczynowy Diana',
    slug: 'pierscionek-zareczynowy-diana',
    description:
      'Elegancki pierścionek zaręczynowy z białego złota 585 z brylantem 0.5 ct. Klasyczny design, który nigdy nie wychodzi z mody. Idealny na wyjątkowe chwile.',
    price: 8999,
    category: 'rings',
    material: 'gold',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800',
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'ring-002',
    name: 'Pierścionek Srebrny Aurora',
    slug: 'pierscionek-srebrny-aurora',
    description:
      'Delikatny pierścionek ze srebra 925 z cyrkoniami. Nowoczesny design inspirowany naturą. Doskonały na co dzień.',
    price: 349,
    category: 'rings',
    material: 'silver',
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800',
    ],
    inStock: true,
    featured: false,
  },
  {
    id: 'ring-003',
    name: 'Sygnet Platynowy Classic',
    slug: 'sygnet-platynowy-classic',
    description:
      'Męski sygnet z platyny 950. Solidna konstrukcja, ponadczasowy design. Symbol elegancji i prestiżu.',
    price: 12500,
    category: 'rings',
    material: 'platinum',
    images: [
      'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=800',
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'ring-004',
    name: 'Pierścionek Różowe Złoto Blossom',
    slug: 'pierscionek-rozowe-zloto-blossom',
    description:
      'Romantyczny pierścionek z różowego złota 585 z motywem kwiatowym. Ozdobiony drobnymi brylantami.',
    price: 3299,
    oldPrice: 3999,
    category: 'rings',
    material: 'rose-gold',
    images: [
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=800',
    ],
    inStock: true,
    featured: true,
  },

  // Naszyjniki
  {
    id: 'necklace-001',
    name: 'Naszyjnik Złoty Infinity',
    slug: 'naszyjnik-zloty-infinity',
    description:
      'Elegancki naszyjnik ze złota 585 z symbolem nieskończoności. Długość łańcuszka 45 cm. Idealny prezent dla ukochanej osoby.',
    price: 1899,
    category: 'necklaces',
    material: 'gold',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'necklace-002',
    name: 'Choker Srebrny Minimalist',
    slug: 'choker-srebrny-minimalist',
    description:
      'Minimalistyczny choker ze srebra 925. Regulowana długość 35-40 cm. Nowoczesny design dla odważnych.',
    price: 499,
    category: 'necklaces',
    material: 'silver',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
    ],
    inStock: true,
    featured: false,
  },
  {
    id: 'necklace-003',
    name: 'Naszyjnik Perłowy Elegance',
    slug: 'naszyjnik-perlowy-elegance',
    description:
      'Klasyczny naszyjnik z pereł słodkowodnych z zapięciem ze złota. Długość 50 cm. Ponadczasowa elegancja.',
    price: 2499,
    category: 'necklaces',
    material: 'gold',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
    ],
    inStock: true,
    featured: true,
  },

  // Kolczyki
  {
    id: 'earrings-001',
    name: 'Kolczyki Złote Drops',
    slug: 'kolczyki-zlote-drops',
    description:
      'Wiszące kolczyki ze złota 585 w kształcie kropli. Ozdobione drobnymi brylantami. Eleganckie i kobiece.',
    price: 2199,
    category: 'earrings',
    material: 'gold',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'earrings-002',
    name: 'Kolczyki Srebrne Hoops',
    slug: 'kolczyki-srebrne-hoops',
    description:
      'Klasyczne kolczyki koła ze srebra 925. Średnica 3 cm. Ponadczasowy design na każdą okazję.',
    price: 199,
    category: 'earrings',
    material: 'silver',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800',
    ],
    inStock: true,
    featured: false,
  },
  {
    id: 'earrings-003',
    name: 'Kolczyki Platynowe Star',
    slug: 'kolczyki-platynowe-star',
    description:
      'Delikatne kolczyki wkrętki z platyny w kształcie gwiazdek. Ozdobione drobnymi diamentami.',
    price: 4599,
    category: 'earrings',
    material: 'platinum',
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800',
    ],
    inStock: false,
    featured: false,
  },

  // Bransoletki
  {
    id: 'bracelet-001',
    name: 'Bransoletka Złota Chain',
    slug: 'bransoletka-zlota-chain',
    description:
      'Masywna bransoletka łańcuchowa ze złota 585. Długość 19 cm. Symbol luksusu i prestiżu.',
    price: 5999,
    category: 'bracelets',
    material: 'gold',
    images: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800',
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'bracelet-002',
    name: 'Bransoletka Srebrna Tennis',
    slug: 'bransoletka-srebrna-tennis',
    description:
      'Elegancka bransoletka tenisowa ze srebra 925 z cyrkoniami. Długość regulowana 17-20 cm.',
    price: 899,
    oldPrice: 1199,
    category: 'bracelets',
    material: 'silver',
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800',
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'bracelet-003',
    name: 'Bangle Różowe Złoto Love',
    slug: 'bangle-rozowe-zloto-love',
    description:
      'Sztywna bransoletka bangle z różowego złota 585 z grawerem "Love". Średnica 6 cm.',
    price: 3499,
    category: 'bracelets',
    material: 'rose-gold',
    images: [
      'https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?w=800',
    ],
    inStock: true,
    featured: false,
  },

  // Zegarki
  {
    id: 'watch-001',
    name: 'Zegarek Złoty Classic',
    slug: 'zegarek-zloty-classic',
    description:
      'Elegancki zegarek damski ze złotą kopertą i bransoletą. Mechanizm kwarcowy Swiss. Wodoodporność 50m.',
    price: 8999,
    category: 'watches',
    material: 'gold',
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800',
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'watch-002',
    name: 'Zegarek Srebrny Modern',
    slug: 'zegarek-srebrny-modern',
    description:
      'Nowoczesny zegarek unisex ze stalową kopertą. Minimalistyczna tarcza. Mechanizm automatyczny.',
    price: 2499,
    category: 'watches',
    material: 'silver',
    images: [
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800',
    ],
    inStock: true,
    featured: false,
  },

  // Obrączki ślubne
  {
    id: 'wedding-001',
    name: 'Obrączki Klasyczne Złote',
    slug: 'obraczki-klasyczne-zlote',
    description:
      'Klasyczne obrączki ślubne z żółtego złota 585. Szerokość 4 mm. Cena za parę. Możliwość grawerunku.',
    price: 2999,
    category: 'wedding',
    material: 'gold',
    images: [
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800',
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'wedding-002',
    name: 'Obrączki Platynowe Premium',
    slug: 'obraczki-platynowe-premium',
    description:
      'Ekskluzywne obrączki z platyny 950 z rzędem diamentów. Szerokość 5 mm. Cena za parę.',
    price: 15999,
    category: 'wedding',
    material: 'platinum',
    images: [
      'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800',
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'wedding-003',
    name: 'Obrączki Różowe Złoto Romance',
    slug: 'obraczki-rozowe-zloto-romance',
    description:
      'Romantyczne obrączki z różowego złota 585 z satynowym wykończeniem. Szerokość 3 mm. Cena za parę.',
    price: 3499,
    category: 'wedding',
    material: 'rose-gold',
    images: [
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800',
    ],
    inStock: true,
    featured: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}
