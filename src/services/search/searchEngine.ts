import { Product, FilterState, NormalizedQuery, Language } from '../../types';
import { PRODUCTS } from '../../data/products';
import { normalizeQuery } from '../normalization/conceptExtractor';

export function filterAndSearchProducts(
  products: Product[],
  filters: FilterState,
  currentLanguage: Language
): { products: Product[]; normalizedQuery: NormalizedQuery | null } {
  const queryText = filters.searchQuery.trim();
  let normalized: NormalizedQuery | null = null;

  if (queryText) {
    normalized = normalizeQuery(queryText);
  }

  let result = products.filter((p) => {
    // 1. Text Search / Normalized Search Matching
    if (normalized && normalized.cleanQuery.length > 0) {
      let matchScore = 0;

      const lowerQuery = normalized.cleanQuery;
      const lowerName = p.name.toLowerCase();
      const lowerNameReg = p.regionalNames[currentLanguage]?.toLowerCase() || '';
      const lowerDesc = p.description[currentLanguage]?.toLowerCase() || '';

      // Direct string matches in current or regional name
      if (lowerName.includes(lowerQuery) || lowerNameReg.includes(lowerQuery)) {
        matchScore += 10;
      }

      // Check tags
      for (const tag of p.tags) {
        if (lowerQuery.includes(tag.toLowerCase()) || tag.toLowerCase().includes(lowerQuery)) {
          matchScore += 5;
        }
      }

      // Check extracted normalized terms
      for (const term of normalized.normalizedTerms) {
        const lowerTerm = term.toLowerCase();
        if (
          lowerName.includes(lowerTerm) ||
          lowerNameReg.includes(lowerTerm) ||
          p.tags.some((t) => t.toLowerCase().includes(lowerTerm)) ||
          p.brand.toLowerCase().includes(lowerTerm) ||
          p.material.toLowerCase().includes(lowerTerm) ||
          p.occasion.toLowerCase().includes(lowerTerm)
        ) {
          matchScore += 4;
        }
      }

      // Check normalized concepts (Color, Category, Material, Occasion)
      if (normalized.colors.length > 0) {
        const hasColor = normalized.colors.some((c) =>
          p.colors.some((pc) => pc.toLowerCase() === c.toLowerCase()) ||
          p.regionalColor.en.toLowerCase().includes(c.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(c.toLowerCase()))
        );
        if (hasColor) matchScore += 6;
      }

      if (normalized.regionalColors.length > 0) {
        const hasRegionalColor = normalized.regionalColors.some((rc) =>
          p.regionalColor.en.toLowerCase().includes(rc.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(rc.toLowerCase()))
        );
        if (hasRegionalColor) matchScore += 7;
      }

      if (normalized.category) {
        if (
          p.category.toLowerCase().includes(normalized.category.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(normalized.category!.toLowerCase()))
        ) {
          matchScore += 8;
        }
      }

      if (normalized.gender) {
        if (p.gender === normalized.gender || p.gender === 'unisex') {
          matchScore += 5;
        }
      }

      if (normalized.material) {
        if (
          p.material.toLowerCase().includes(normalized.material.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(normalized.material!.toLowerCase()))
        ) {
          matchScore += 5;
        }
      }

      if (normalized.occasion) {
        if (
          p.occasion.toLowerCase().includes(normalized.occasion.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(normalized.occasion!.toLowerCase()))
        ) {
          matchScore += 5;
        }
      }

      // Query Price Max constraint extracted from natural language
      if (normalized.priceMax && p.price > normalized.priceMax) {
        return false;
      }

      if (matchScore === 0) {
        return false;
      }
    }

    // 2. Explicit Sidebar Filter Constraints

    // Category
    if (filters.category.length > 0) {
      if (!filters.category.includes(p.category)) return false;
    }

    // Gender
    if (filters.gender.length > 0) {
      if (!filters.gender.includes(p.gender) && p.gender !== 'unisex') return false;
    }

    // Price Range
    if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) {
      return false;
    }

    // Colors
    if (filters.colors.length > 0) {
      const colorMatch = filters.colors.some((c) =>
        p.colors.some((pc) => pc.toLowerCase() === c.toLowerCase())
      );
      if (!colorMatch) return false;
    }

    // Regional Shades
    if (filters.regionalColors.length > 0) {
      const regMatch = filters.regionalColors.some((rc) =>
        p.regionalColor.en.toLowerCase().includes(rc.toLowerCase())
      );
      if (!regMatch) return false;
    }

    // Material
    if (filters.materials.length > 0) {
      if (!filters.materials.some((m) => p.material.toLowerCase().includes(m.toLowerCase()))) {
        return false;
      }
    }

    // Occasion
    if (filters.occasions.length > 0) {
      if (!filters.occasions.some((o) => p.occasion.toLowerCase().includes(o.toLowerCase()))) {
        return false;
      }
    }

    // Rating
    if (filters.minRating > 0 && p.rating < filters.minRating) {
      return false;
    }

    // Discount
    if (filters.minDiscount > 0 && p.discountPercentage < filters.minDiscount) {
      return false;
    }

    return true;
  });

  // 3. Sorting
  result = [...result].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'discount':
        return b.discountPercentage - a.discountPercentage;
      case 'recommended':
      default:
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    }
  });

  return { products: result, normalizedQuery: normalized };
}
