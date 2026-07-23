import { NormalizedQuery, ExtractedConcept, Language } from '../../types';
import {
  COLOR_MAPPINGS,
  CATEGORY_MAPPINGS,
  MATERIAL_MAPPINGS,
  OCCASION_MAPPINGS,
  GENDER_MAPPINGS,
  REGIONAL_COLOR_PALETTES,
  SynonymMapping
} from './dictionary';
import { detectLanguage, cleanQueryString, levenshteinDistance } from './transliteration';

export function normalizeQuery(rawQuery: string): NormalizedQuery {
  const clean = cleanQueryString(rawQuery);
  const detectedLang = detectLanguage(rawQuery);
  const concepts: ExtractedConcept[] = [];
  const normalizedTerms: string[] = [];
  const synonymsApplied: string[] = [];

  let remainingText = clean;
  let priceMax: number | undefined = undefined;

  // 1. Extract Price Max (e.g. "under 2000", "2000 lopu", "1500 ki kam", "2000 లోపు", "2000 से कम")
  const priceRegexes = [
    /(?:under|below|less than|within|under ₹|rs\.?|₹)\s*(\d{3,6})/i,
    /(\d{3,6})\s*(?:lopu|ki|kulla|kizh|ke andar|se kam|की कम|लोपु|के नीचे|कम|₹|rs)/i,
    /(\d{3,6})/
  ];

  for (const regex of priceRegexes) {
    const match = remainingText.match(regex);
    if (match) {
      const num = parseInt(match[1] || match[0], 10);
      if (!isNaN(num) && num >= 300 && num <= 50000) {
        priceMax = num;
        concepts.push({
          id: 'price_max',
          type: 'priceMax',
          label: `Max Price: ₹${num}`,
          value: num,
          originalWord: match[0],
          language: detectedLang
        });
        normalizedTerms.push(`Under ₹${num}`);
        remainingText = remainingText.replace(match[0], ' ');
        break;
      }
    }
  }

  // Helper matcher
  const matchCategory = (
    mappings: SynonymMapping[],
    type: ExtractedConcept['type'],
    prefixLabel: string
  ) => {
    for (const item of mappings) {
      for (const keyword of item.matches) {
        const lowerKw = keyword.toLowerCase();
        if (remainingText.includes(lowerKw)) {
          concepts.push({
            id: `${type}_${item.standard}`,
            type,
            label: `${prefixLabel}: ${item.standard}`,
            value: item.standard,
            originalWord: keyword,
            language: detectedLang
          });
          normalizedTerms.push(item.standard);
          synonymsApplied.push(`${keyword} ➔ ${item.standard}`);
          // Remove matched word to prevent multi-matching
          remainingText = remainingText.replace(lowerKw, ' ');
          return item.standard;
        }
      }
    }
    return undefined;
  };

  // Fuzzy match fallback for typos
  const fuzzyMatchCategory = (
    mappings: SynonymMapping[],
    type: ExtractedConcept['type'],
    prefixLabel: string
  ) => {
    const words = remainingText.split(/\s+/).filter(w => w.length >= 3);
    for (const word of words) {
      for (const item of mappings) {
        for (const keyword of item.matches) {
          if (keyword.length >= 4 && Math.abs(word.length - keyword.length) <= 2) {
            const dist = levenshteinDistance(word, keyword.toLowerCase());
            if (dist <= 1) { // 1 typo allowed
              concepts.push({
                id: `${type}_${item.standard}`,
                type,
                label: `${prefixLabel}: ${item.standard}`,
                value: item.standard,
                originalWord: word,
                language: detectedLang
              });
              normalizedTerms.push(item.standard);
              synonymsApplied.push(`${word} (typo fix) ➔ ${item.standard}`);
              remainingText = remainingText.replace(word, ' ');
              return item.standard;
            }
          }
        }
      }
    }
    return undefined;
  };

  // 2. Extract Color
  const matchedColor = matchCategory(COLOR_MAPPINGS, 'color', 'Color') ||
                       fuzzyMatchCategory(COLOR_MAPPINGS, 'color', 'Color');

  // 3. Extract Regional Shades Palette
  const regionalColorsExtracted: string[] = [];
  for (const palette of REGIONAL_COLOR_PALETTES) {
    const pKey = palette.key.toLowerCase();
    const pTe = palette.name.te.toLowerCase();
    const pHi = palette.name.hi.toLowerCase();
    const pTa = palette.name.ta.toLowerCase();

    if (
      remainingText.includes(pKey) ||
      remainingText.includes(pTe) ||
      remainingText.includes(pHi) ||
      remainingText.includes(pTa)
    ) {
      regionalColorsExtracted.push(palette.key);
      concepts.push({
        id: `regionalColor_${palette.key}`,
        type: 'regionalColor',
        label: `Shade: ${palette.key}`,
        value: palette.key,
        language: detectedLang
      });
      normalizedTerms.push(palette.key);
    }
  }

  // 4. Extract Category
  const matchedCategory = matchCategory(CATEGORY_MAPPINGS, 'category', 'Category') ||
                          fuzzyMatchCategory(CATEGORY_MAPPINGS, 'category', 'Category');

  // 5. Extract Material
  const matchedMaterial = matchCategory(MATERIAL_MAPPINGS, 'material', 'Material') ||
                          fuzzyMatchCategory(MATERIAL_MAPPINGS, 'material', 'Material');

  // 6. Extract Occasion
  const matchedOccasion = matchCategory(OCCASION_MAPPINGS, 'occasion', 'Occasion') ||
                          fuzzyMatchCategory(OCCASION_MAPPINGS, 'occasion', 'Occasion');

  // 7. Extract Gender
  const matchedGender = matchCategory(GENDER_MAPPINGS, 'gender', 'Target') as 'women' | 'men' | 'kids' | undefined;

  // Add remaining keywords as general terms if non-empty
  const remainingTokens = remainingText.split(/\s+/).filter(t => t.length > 2);
  for (const token of remainingTokens) {
    if (!['color', 'under', 'for', 'the', 'and', 'with', 'in', 'collection'].includes(token)) {
      normalizedTerms.push(token);
    }
  }

  // Compute confidence score
  let score = 0.5;
  if (concepts.length > 0) score += Math.min(concepts.length * 0.15, 0.45);
  if (synonymsApplied.length > 0) score += 0.05;

  const confidenceScore = Math.min(Math.round(score * 100) / 100, 0.99);

  return {
    rawQuery,
    detectedLanguage: detectedLang,
    normalizedTerms: Array.from(new Set(normalizedTerms)),
    cleanQuery: clean,
    concepts,
    category: matchedCategory,
    gender: matchedGender,
    colors: matchedColor ? [matchedColor] : [],
    regionalColors: regionalColorsExtracted,
    material: matchedMaterial,
    occasion: matchedOccasion,
    priceMax,
    confidenceScore,
    synonymsApplied
  };
}
