import { Language } from '../../types';

export function detectLanguage(text: string): Language | 'code-mixed' {
  const teluguRegex = /[\u0C00-\u0C7F]/;
  const devanagariRegex = /[\u0900-\u097F]/;
  const tamilRegex = /[\u0B80-\u0BFF]/;

  const hasTelugu = teluguRegex.test(text);
  const hasHindi = devanagariRegex.test(text);
  const hasTamil = tamilRegex.test(text);

  if (hasTelugu) return 'te';
  if (hasHindi) return 'hi';
  if (hasTamil) return 'ta';

  // Check for Romanized regional keywords (Teluglish / Hinglish / Tamlish)
  const regionalKeywords = [
    'pacha', 'pasupu', 'pattu', 'pelli', 'pandaga', 'chira', 'cheera', 'lopu', 'erupu',
    'lal', 'peela', 'gulabi', 'shaadi', 'tyohar', 'saste', 'kam', 'chahiye',
    'sivappu', 'pudavai', 'kalyanam', 'pongal', 'manjal', 'vellai', 'pudava',
    'under', 'below', 'less'
  ];

  const lower = text.toLowerCase();
  const wordCount = lower.split(/\s+/).length;
  let matches = 0;

  for (const kw of regionalKeywords) {
    if (lower.includes(kw)) {
      matches++;
    }
  }

  if (matches > 0 && wordCount >= 2) {
    return 'code-mixed';
  }

  return 'en';
}

export function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          )
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

export function cleanQueryString(rawQuery: string): string {
  return rawQuery
    .toLowerCase()
    .replace(/[^\w\s\u0C00-\u0C7F\u0900-\u097F\u0B80-\u0BFF]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
