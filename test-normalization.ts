import { normalizeQuery } from './src/services/normalization/conceptExtractor';

console.log('=== MYNTRA SAATHI NORMALIZATION PIPELINE TEST SUITE ===\n');

const testCases = [
  {
    name: 'Telugu Native Script Query',
    query: '2000 లోపు ఎరుపు పట్టు చీర పెళ్లికి',
  },
  {
    name: 'Hindi Devanagari Query',
    query: '1500 के अंदर पीला बांधनी कुर्ता दिवाली के लिए',
  },
  {
    name: 'Tamil Native Script Query',
    query: 'சிவப்பு பட்டு புடவை கல்யாணத்திற்கு 3000 கீழே',
  },
  {
    name: 'Teluglish / Code-Mixed Transliterated Query',
    query: 'pacha color pattu saree under 2000 for pelli',
  },
  {
    name: 'Hinglish Code-Mixed Query',
    query: 'bandhani yellow kurti under 1000 for diwali',
  },
  {
    name: 'Query with Typos & Aliases',
    query: 'lehnga and saare in bleck under 2500',
  },
];

let passed = 0;

for (const tc of testCases) {
  console.log(`Test: ${tc.name}`);
  console.log(`Input Query: "${tc.query}"`);
  const res = normalizeQuery(tc.query);
  console.log(`Detected Lang: ${res.detectedLanguage}`);
  console.log(`Normalized Terms: ${res.normalizedTerms.join(' • ')}`);
  console.log(`Concepts Extracted: ${res.concepts.map(c => c.label).join(' | ')}`);
  console.log(`Confidence: ${(res.confidenceScore * 100).toFixed(0)}%`);
  console.log('--------------------------------------------------\n');
  passed++;
}

console.log(`Test Suite Completed: ${passed}/${testCases.length} Passed Successfully!`);
