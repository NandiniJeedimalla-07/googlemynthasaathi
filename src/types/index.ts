export type Language = 'en' | 'te' | 'hi' | 'ta';

export interface RegionalName {
  en: string;
  te: string;
  hi: string;
  ta: string;
}

export interface Product {
  id: string;
  name: string;
  regionalNames: RegionalName;
  brand: string;
  category: 'Ethnic Wear' | 'Western Wear' | 'Sarees' | 'Kurtas & Suits' | 'Dresses' | 'Men Ethnic' | 'Kids' | 'Accessories';
  gender: 'men' | 'women' | 'kids' | 'unisex';
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  colors: string[];
  regionalColor: {
    en: string;
    te: string;
    hi: string;
    ta: string;
    hex: string;
  };
  material: string;
  occasion: string;
  images: string[];
  tags: string[];
  inStock: boolean;
  sizes: string[];
  description: RegionalName;
  heritageStory?: RegionalName;
  isNewArrival?: boolean;
  isBestseller?: boolean;
}

export interface ExtractedConcept {
  id: string;
  type: 'category' | 'color' | 'regionalColor' | 'material' | 'occasion' | 'gender' | 'priceMax' | 'priceMin' | 'normalizedTerm';
  label: string;
  value: string | number;
  originalWord?: string;
  language?: Language | 'code-mixed';
}

export interface NormalizedQuery {
  rawQuery: string;
  detectedLanguage: Language | 'code-mixed';
  normalizedTerms: string[];
  cleanQuery: string;
  concepts: ExtractedConcept[];
  category?: string;
  gender?: 'men' | 'women' | 'kids' | 'unisex';
  colors: string[];
  regionalColors: string[];
  material?: string;
  occasion?: string;
  priceMax?: number;
  priceMin?: number;
  confidenceScore: number;
  synonymsApplied: string[];
}

export interface FilterState {
  category: string[];
  gender: string[];
  priceRange: [number, number];
  colors: string[];
  regionalColors: string[];
  materials: string[];
  occasions: string[];
  minRating: number;
  minDiscount: number;
  sortBy: 'recommended' | 'price-low' | 'price-high' | 'rating' | 'discount';
  searchQuery: string;
  normalizedQuery: NormalizedQuery | null;
  activeConceptFilters: ExtractedConcept[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'saathi';
  text: string;
  translatedText?: string;
  language?: Language;
  suggestedProducts?: Product[];
  concepts?: ExtractedConcept[];
  timestamp: Date;
}
