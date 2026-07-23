import { Language } from '../../types';

export interface SynonymMapping {
  standard: string;
  categoryType: 'color' | 'category' | 'material' | 'occasion' | 'gender' | 'price' | 'regionalColor';
  regionalName?: Record<Language, string>;
  matches: string[];
}

export const COLOR_MAPPINGS: SynonymMapping[] = [
  {
    standard: 'Red',
    categoryType: 'color',
    regionalName: { en: 'Red', te: 'ఎరుపు', hi: 'लाल', ta: 'சிவப்பு' },
    matches: [
      'red', 'lal', 'laal', 'sivappu', 'sevappu', 'erupu', 'erupugala', 'temple red', 'kunkum', 'sindoor',
      'எరుపు', 'சிவப்பு', 'लाल', 'ఎరుపు'
    ]
  },
  {
    standard: 'Green',
    categoryType: 'color',
    regionalName: { en: 'Green', te: 'ఆకుపచ్చ', hi: 'हरा', ta: 'பச்சை' },
    matches: [
      'green', 'pacha', 'pachha', 'pachhai', 'hara', 'haara', 'pacchai', 'nilgiri', 'pacha color',
      'ఆకుపచ్చ', 'పచ్చ', 'हरा', 'பச்சை'
    ]
  },
  {
    standard: 'Yellow',
    categoryType: 'color',
    regionalName: { en: 'Yellow', te: 'పసుపు', hi: 'पीला', ta: 'மஞ்சள்' },
    matches: [
      'yellow', 'pasupu', 'haldi', 'peela', 'pila', 'manjal', 'mangal', 'bandhani yellow', 'mustard',
      'పసుపు', 'पीला', 'மஞ்சள்'
    ]
  },
  {
    standard: 'Pink',
    categoryType: 'color',
    regionalName: { en: 'Pink', te: 'గులాబీ', hi: 'गुलाबी', ta: 'ரோஜா' },
    matches: [
      'pink', 'gulabi', 'goolabi', 'pinku', 'roja', 'rose', 'rani pink',
      'గులాబీ', 'गुलाबी', 'ரோஜா'
    ]
  },
  {
    standard: 'Gold',
    categoryType: 'color',
    regionalName: { en: 'Gold', te: 'బంగారు', hi: 'सुनहरा', ta: 'தங்கம்' },
    matches: [
      'gold', 'golden', 'kasavu', 'sona', 'sunhera', 'swarna', 'zari', 'zaripattu',
      'బంగారు', 'सुनहरा', 'தங்கம்'
    ]
  },
  {
    standard: 'Blue',
    categoryType: 'color',
    regionalName: { en: 'Blue', te: 'నీలం', hi: 'नीला', ta: 'நீலம்' },
    matches: [
      'blue', 'neela', 'neelam', 'indigo', 'asmani', 'sky blue',
      'నీలం', 'नीला', 'நீலம்'
    ]
  },
  {
    standard: 'Black',
    categoryType: 'color',
    regionalName: { en: 'Black', te: 'నలుపు', hi: 'काला', ta: 'கருப்பு' },
    matches: [
      'black', 'kala', 'kaala', 'nalupu', 'karuppu', 'blacku',
      'నలుపు', 'काला', 'கருப்பு'
    ]
  },
  {
    standard: 'White',
    categoryType: 'color',
    regionalName: { en: 'White', te: 'తెలుపు', hi: 'सफेद', ta: 'வெள்ளை' },
    matches: [
      'white', 'safed', 'telupu', 'vellai', 'chikan', 'chikankari', 'ivory',
      'తెలుపు', 'सफेद', 'வெள்ளை'
    ]
  }
];

export const CATEGORY_MAPPINGS: SynonymMapping[] = [
  {
    standard: 'Sarees',
    categoryType: 'category',
    regionalName: { en: 'Saree', te: 'చీర', hi: 'साड़ी', ta: 'புடவை' },
    matches: [
      'saree', 'sarees', 'sari', 'saris', 'saaree', 'saare', 'cheera', 'chira', 'cheeralu', 'pudavai', 'podavai', 'drape',
      'చీర', 'చీరలు', 'साड़ी', 'साडी', 'साड़ियां', 'புடவை'
    ]
  },
  {
    standard: 'Kurtas & Suits',
    categoryType: 'category',
    regionalName: { en: 'Kurta & Suit', te: 'కుర్తా & సూట్', hi: 'कुर्ता और सूट', ta: 'குர்தா மற்றும் சூட்' },
    matches: [
      'kurta', 'kurtas', 'kurti', 'kurtis', 'kurtiye', 'kurtha', 'kurthas', 'suit', 'suits', 'salwar', 'chudi', 'chudidhar',
      'కుర్తా', 'కుర్తీ', 'కుర్తీలు', 'कुर्ता', 'कुर्ती', 'குர்தா'
    ]
  },
  {
    standard: 'Dresses',
    categoryType: 'category',
    regionalName: { en: 'Lehenga & Dress', te: 'లెహంగా & డ్రెస్', hi: 'लहंगा और ड्रेस', ta: 'லெஹங்கா மற்றும் ஆடை' },
    matches: [
      'dress', 'dresses', 'dressu', 'lehenga', 'lehnga', 'lehanga', 'langa', 'pattu langa', 'gown', 'anarkali', 'frock',
      'లెహంగా', 'డ్రెస్', 'लहंगा', 'ड्रेस', 'ஆடை', 'லெஹங்கா'
    ]
  },
  {
    standard: 'Men Ethnic',
    categoryType: 'category',
    regionalName: { en: "Men's Ethnic", te: 'పురుషుల సాంప్రదాయ', hi: 'पुरुषों का पारंपरिक', ta: 'ஆண்கள் பாரம்பரியம்' },
    matches: [
      'men ethnic', 'dhoti', 'panche', 'veshti', 'kurta pyjama', 'sherwani', 'jubba', 'kurta for men',
      'ధోతి', 'పంచె', 'धोती', 'शेरवानी', 'வேஷ்டி'
    ]
  }
];

export const MATERIAL_MAPPINGS: SynonymMapping[] = [
  {
    standard: 'Silk',
    categoryType: 'material',
    regionalName: { en: 'Silk / Pattu', te: 'పట్టు', hi: 'रेशम', ta: 'பட்டு' },
    matches: [
      'silk', 'pattu', 'patu', 'reshu', 'resham', 'mangalagiri', 'kanjeevaram', 'banarasi', 'chanderi', 'pattu silk',
      'పట్టు', 'రేశం', 'रेशम', 'पट्टू', 'பட்டு'
    ]
  },
  {
    standard: 'Cotton',
    categoryType: 'material',
    regionalName: { en: 'Cotton', te: 'నూలు / కాటన్', hi: 'सूती / कॉटन', ta: 'பருத்தி' },
    matches: [
      'cotton', 'noolu', 'suthi', 'suthibatti', 'khadi', 'handloom',
      'కాటన్', 'నూలు', 'सूती', 'कॉटन', 'பருத்தி'
    ]
  }
];

export const OCCASION_MAPPINGS: SynonymMapping[] = [
  {
    standard: 'Wedding',
    categoryType: 'occasion',
    regionalName: { en: 'Wedding', te: 'పెళ్లి', hi: 'शादी', ta: 'கல்யாணம்' },
    matches: [
      'wedding', 'marriage', 'pelli', 'pelly', 'pandi', 'shadi', 'shaadi', 'kalyanam', 'sangeet', 'reception',
      'పెళ్లి', 'వివాహం', 'शादी', 'विवाह', 'கல்யாணம்'
    ]
  },
  {
    standard: 'Festival',
    categoryType: 'occasion',
    regionalName: { en: 'Festival', te: 'పండుగ', hi: 'त्योहार', ta: 'பண்டிகை' },
    matches: [
      'festival', 'pandaga', 'pundaga', 'tyohar', 'diwali', 'ugadi', 'pongal', 'sankranti', 'dussehra', 'pooja', 'puja',
      'పండుగ', 'ఉగాది', 'సంక్రాంతి', 'त्योहार', 'दिवाली', 'पूजा', 'பண்டிகை', 'பொங்கல்'
    ]
  }
];

export const GENDER_MAPPINGS: SynonymMapping[] = [
  {
    standard: 'women',
    categoryType: 'gender',
    regionalName: { en: 'Women', te: 'మహిళలు', hi: 'महिलाएं', ta: 'பெண்கள்' },
    matches: [
      'women', 'womens', 'woman', 'ladies', 'female', 'pilla', 'aadavari', 'aurat', 'mahila',
      'మహిళలు', 'స్త్రీలు', 'महिलाएं', 'महिला', 'பெண்கள்'
    ]
  },
  {
    standard: 'men',
    categoryType: 'gender',
    regionalName: { en: 'Men', te: 'పురుషులు', hi: 'पुरुष', ta: 'ஆண்கள்' },
    matches: [
      'men', 'mens', 'man', 'gents', 'gent', 'maga', 'purusha', 'ladka',
      'పురుషులు', 'మగ', 'पुरुष', 'ஆண்கள்'
    ]
  },
  {
    standard: 'kids',
    categoryType: 'gender',
    regionalName: { en: 'Kids', te: 'పిల్లలు', hi: 'बच्चे', ta: 'குழந்தைகள்' },
    matches: [
      'kids', 'children', 'pillalu', 'pappa', 'bacche', 'pulla', 'baby',
      'పిల్లలు', 'बच्चे', 'குழந்தைகள்'
    ]
  }
];

export const REGIONAL_COLOR_PALETTES = [
  { key: 'Bandhani Yellow', name: { en: 'Bandhani Yellow', te: 'బంధాని పసుపు', hi: 'बंधेज पीला', ta: 'பந்தானி மஞ்சள்' }, hex: '#EAB308' },
  { key: 'Kasavu Gold', name: { en: 'Kasavu Gold', te: 'కసవు గోల్డ్', hi: 'कसवु गोल्ड', ta: 'கசவு தங்கம்' }, hex: '#D97706' },
  { key: 'Gulabi Pink', name: { en: 'Gulabi Pink', te: 'గులాబీ పింక్', hi: 'गुलाबी पिंक', ta: 'ரோஜா பிங்க்' }, hex: '#EC4899' },
  { key: 'Nilgiri Teal', name: { en: 'Nilgiri Teal', te: 'నీలగిరి టియల్', hi: 'नीलगिरी टील', ta: 'நீலகிரி டீல்' }, hex: '#0D9488' },
  { key: 'Temple Red', name: { en: 'Temple Red', te: 'టెంపుల్ రెడ్', hi: 'टेम्पल रेड', ta: 'கோவில் சிவப்பு' }, hex: '#DC2626' },
  { key: 'Kanjeevaram Silk', name: { en: 'Kanjeevaram Magenta', te: 'కాంచీపురం మెజెంటా', hi: 'कांजीवरम मजेंटा', ta: 'காஞ்சீபுரம் மெஜந்தா' }, hex: '#9333EA' },
  { key: 'Chikankari White', name: { en: 'Chikankari White', te: 'చికంకారీ వైట్', hi: 'चिकनकारी सफेद', ta: 'சிகன்காரி வெள்ளை' }, hex: '#F8FAFC' },
  { key: 'Indigo Blue', name: { en: 'Indigo Blue', te: 'ఇండిగో బ్లూ', hi: 'इंडिगो ब्लू', ta: 'இண்டிகோ நீலம்' }, hex: '#1D4ED8' },
];
