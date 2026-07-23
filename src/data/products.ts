import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    name: 'Mangalagiri Pure Silk Pattu Saree with Gold Zari Border',
    regionalNames: {
      en: 'Mangalagiri Pure Silk Pattu Saree with Gold Zari Border',
      te: 'మంగళగిరి ప్యూర్ పట్టు చీర గోల్డ్ జరీ బార్డర్‌తో',
      hi: 'मंगलगिरी शुद्ध सिल्क पट्टू साड़ी गोल्डन जरी बॉर्डर',
      ta: 'மங்களகிரி பியூர் சில்க் பட்டு புடவை தங்க ஜரி பார்டர்'
    },
    brand: 'Anouk Regional Heritage',
    category: 'Sarees',
    gender: 'women',
    price: 2499,
    originalPrice: 4999,
    discountPercentage: 50,
    rating: 4.8,
    reviewCount: 342,
    colors: ['Green', 'Gold'],
    regionalColor: {
      en: 'Kasavu Gold & Pacha Green',
      te: 'కసవు గోల్డ్ & పచ్చ గ్రీన్',
      hi: 'कसवु गोल्ड और हरा',
      ta: 'கசவு தங்கம் மற்றும் பச்சை',
      hex: '#0D9488'
    },
    material: 'Silk',
    occasion: 'Wedding',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['pattu', 'pacha', 'silk', 'saree', 'mangalagiri', 'pelli', 'wedding', 'green saree', 'kasavu gold', 'చేనేత'],
    inStock: true,
    sizes: ['Onesize'],
    description: {
      en: 'Handcrafted Mangalagiri silk saree featuring a rich emerald green body paired with traditional Kasavu gold zari woven border. Ideal for South Indian weddings and festive celebrations.',
      te: 'హ్యాండ్‌క్రాఫ్టెడ్ మంగళగిరి పట్టు చీర. సాంప్రదాయ కసవు జరీ బార్డర్‌తో పెళ్లిళ్లకు మరియు పండుగలకు అత్యంత శ్రేష్ఠమైనది.',
      hi: 'हस्तनिर्मित मंगलगिरी सिल्क साड़ी, गहरे पन्ना हरे रंग और पारंपरिक कसवु जरी बॉर्डर के साथ। शादियों और त्योहारों के लिए बिल्कुल सही।',
      ta: 'பாரம்பரிய கைத்தறி மங்களகிரி சில்க் புடவை, அடர் பச்சை மற்றும் தங்க ஜரி பார்டருடன்.'
    },
    heritageStory: {
      en: 'Woven in Mangalagiri, Andhra Pradesh, this weave is renowned for its tightly spun fine silk count and distinct Nizam border motifs.',
      te: 'ఆంధ్రప్రదేశ్‌లోని మంగళగిరి చేనేత కళాకారులచే నెయ్యబడిన ఈ చీర నైజాం బార్డర్ డిజైన్‌కు ప్రసిద్ధి.',
      hi: 'आंध्र प्रदेश के मंगलगिरी में बुनी गई यह साड़ी अपनी बारीक रेशम बुनाई और पारंपरिक निज़ाम बॉर्डर के लिए प्रसिद्ध है।',
      ta: 'ஆந்திராவின் மங்களகிரியில் நெய்யப்பட்ட இந்த புடவை நுட்பமான நெசவுக்கு பெயர் பெற்றது.'
    },
    isBestseller: true
  },
  {
    id: 'prod_2',
    name: 'Temple Red Kanjeevaram Silk Brocade Saree',
    regionalNames: {
      en: 'Temple Red Kanjeevaram Silk Brocade Saree',
      te: 'టెంపుల్ రెడ్ కాంచీపురం పట్టు బ్రోకేడ్ చీర',
      hi: 'टेम्पल रेड कांजीवरम सिल्क ब्रोकेड साड़ी',
      ta: 'கோவில் சிவப்பு காஞ்சீபுரம் சில்க் புடவை'
    },
    brand: 'Karan Giri Sarees',
    category: 'Sarees',
    gender: 'women',
    price: 3299,
    originalPrice: 7999,
    discountPercentage: 58,
    rating: 4.9,
    reviewCount: 520,
    colors: ['Red', 'Gold'],
    regionalColor: {
      en: 'Temple Red',
      te: 'టెంపుల్ రెడ్',
      hi: 'टेम्पल रेड',
      ta: 'கோவில் சிவப்பு',
      hex: '#DC2626'
    },
    material: 'Silk',
    occasion: 'Wedding',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['temple red', 'kanjeevaram', 'red saree', 'erupu', 'pelli', 'lal saree', 'wedding', 'sivappu'],
    inStock: true,
    sizes: ['Onesize'],
    description: {
      en: 'Opulent Temple Red Kanjeevaram silk saree decorated with intricate temple motif zari pallu and heavy golden brocade motifs.',
      te: 'అద్భుతమైన టెంపుల్ రెడ్ కాంచీపురం పట్టు చీర. గుడి డిజైన్ పల్లు మరియు బంగారు జరీ వర్క్‌తో నిండి ఉంటుంది.',
      hi: 'भव्य टेम्पल रेड कांजीवरम सिल्क साड़ी जिसमें मंदिर की कलाकृतियों वाली जरी पल्लू और भारी सुनहरी ब्रोकेड बुनाई है।',
      ta: 'அற்புதமான கோவில் சிவப்பு காஞ்சீபுரம் பட்டு புடவை, கனமான தங்க ஜரி வேலைப்பாடுகளுடன்.'
    },
    isBestseller: true
  },
  {
    id: 'prod_3',
    name: 'Bandhani Yellow Chiffon Anarkali Kurta Set',
    regionalNames: {
      en: 'Bandhani Yellow Chiffon Anarkali Kurta Set',
      te: 'బంధాని పసుపు చిఫ్ఫాన్ అనార్కలి కుర్తా సెట్',
      hi: 'बंधेज पीला शिफॉन अनारकली कुर्ता सेट',
      ta: 'பந்தானி மஞ்சள் அனார்கலி குர்தா செட்'
    },
    brand: 'Libas Regional',
    category: 'Kurtas & Suits',
    gender: 'women',
    price: 1499,
    originalPrice: 2999,
    discountPercentage: 50,
    rating: 4.6,
    reviewCount: 289,
    colors: ['Yellow'],
    regionalColor: {
      en: 'Bandhani Yellow',
      te: 'బంధాని పసుపు',
      hi: 'बंधेज पीला',
      ta: 'பந்தானி மஞ்சள்',
      hex: '#EAB308'
    },
    material: 'Cotton',
    occasion: 'Festival',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['yellow kurta', 'pasupu', 'peela', 'bandhani', 'anarkali', 'ugadi', 'diwali', 'festival', 'manjal'],
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    description: {
      en: 'Vibrant Bandhani printed yellow Anarkali suit with gold gotta patti embroidery and matching dupatta.',
      te: 'కాంతివంతమైన బంధాని పసుపు రంగు అనార్కలి సూట్. గొటా పట్టీ వర్క్ మరియు దుపట్టాతో వస్తుంది.',
      hi: 'चमकदार बंधेज प्रिंटेड पीला अनारकली सूट जिसमें गोटा पट्टी कढ़ाई और मैचिंग दुपट्टा है।',
      ta: 'துடிப்பான பந்தானி அச்சிடப்பட்ட மஞ்சள் அனார்கலி ஆடை, தங்க வேலைப்பாடுகளுடன்.'
    },
    isNewArrival: true
  },
  {
    id: 'prod_4',
    name: 'Chikankari White Pure Cotton Straight Kurti',
    regionalNames: {
      en: 'Chikankari White Pure Cotton Straight Kurti',
      te: 'చికంకారీ వైట్ ప్యూర్ కాటన్ స్ట్రెయిట్ కుర్తీ',
      hi: 'चिकनकारी सफेद शुद्ध सूती स्ट्रेट कुर्ती',
      ta: 'சிகன்காரி வெள்ளை பருத்தி குர்தி'
    },
    brand: 'Lucknowi Craft',
    category: 'Kurtas & Suits',
    gender: 'women',
    price: 999,
    originalPrice: 1999,
    discountPercentage: 50,
    rating: 4.7,
    reviewCount: 410,
    colors: ['White'],
    regionalColor: {
      en: 'Chikankari White',
      te: 'చికంకారీ వైట్',
      hi: 'चिकनकारी सफेद',
      ta: 'சிகன்காரி வெள்ளை',
      hex: '#F8FAFC'
    },
    material: 'Cotton',
    occasion: 'Festival',
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['white kurti', 'chikankari', 'cotton', 'safed', 'telupu', 'vellai', 'summer wear', 'under 1000'],
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: {
      en: 'Authentic Lucknow hand-embroidered white chikankari cotton kurti featuring delicate Shadow work and paisley motifs.',
      te: 'లక్నో సాంప్రదాయ హ్యాండ్ ఎంబ్రాయిడరీ చికంకారీ వైట్ కాటన్ కుర్తీ.',
      hi: 'प्रामाणिक लखनऊ हाथ से कढ़ाई की हुई सफेद चिकनकारी कॉटन कुर्ती जिसमें नाजुक वर्क है।',
      ta: 'லக்னோ பாரம்பரிய கைவினை வெள்ளை சிகன்காரி பருத்தி குர்தி.'
    },
    isBestseller: true
  },
  {
    id: 'prod_5',
    name: 'Gulabi Pink Banarasi Silk Lehenga Choli',
    regionalNames: {
      en: 'Gulabi Pink Banarasi Silk Lehenga Choli',
      te: 'గులాబీ పింక్ బెనారస్ పట్టు లెహంగా చోళీ',
      hi: 'गुलाबी बनारसी सिल्क लहंगा चोली',
      ta: 'ரோஜா பிங்க் பனாரசி சில்க் லெஹங்கா'
    },
    brand: 'Sangria Regional Royal',
    category: 'Dresses',
    gender: 'women',
    price: 3999,
    originalPrice: 8999,
    discountPercentage: 55,
    rating: 4.9,
    reviewCount: 195,
    colors: ['Pink', 'Gold'],
    regionalColor: {
      en: 'Gulabi Pink',
      te: 'గులాబీ పింక్',
      hi: 'गुलाबी पिंक',
      ta: 'ரோஜா பிங்க்',
      hex: '#EC4899'
    },
    material: 'Silk',
    occasion: 'Wedding',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['gulabi pink', 'lehenga', 'lehnga', 'pink lehenga', 'pattu langa', 'banarasi', 'pelli', 'wedding dress'],
    inStock: true,
    sizes: ['S', 'M', 'L'],
    description: {
      en: 'Royal Banarasi silk woven lehenga set in Gulabi Pink with intricate gold zari kadwa weaving and embroidered net dupatta.',
      te: 'రాచరికమైన బెనారస్ పట్టు లెహంగా సెట్ గులాబీ రంగులో. పెళ్లిళ్లకు మరియు రిసెప్షన్‌కు అనువైనది.',
      hi: 'शाही बनारसी सिल्क लहंगा सेट गुलाबी रंग में, जटिल सुनहरी जरी बुनाई और कढ़ी हुई दुपट्टे के साथ।',
      ta: 'ராஜரீக பனாரசி பட்டு லெஹங்கா ஆடை, ரோஜா பிங்க் நிறத்தில்.'
    }
  },
  {
    id: 'prod_6',
    name: 'Pattu Veshti & Raw Silk Gold Kurta Set for Men',
    regionalNames: {
      en: 'Pattu Veshti & Raw Silk Gold Kurta Set for Men',
      te: 'పట్టు పంచె & రా సిల్క్ గోల్డ్ కుర్తా సెట్ (పురుషులు)',
      hi: 'पट्टू धोती और रॉ सिल्क गोल्डन कुर्ता सेट (पुरुष)',
      ta: 'பட்டு வேஷ்டி & ராவ் சில்க் குர்தா செட்'
    },
    brand: 'Manyavar Heritage',
    category: 'Men Ethnic',
    gender: 'men',
    price: 2799,
    originalPrice: 5999,
    discountPercentage: 53,
    rating: 4.8,
    reviewCount: 312,
    colors: ['Gold', 'White'],
    regionalColor: {
      en: 'Kasavu Gold',
      te: 'కసవు గోల్డ్',
      hi: 'कसवु गोल्ड',
      ta: 'கசவு தங்கம்',
      hex: '#D97706'
    },
    material: 'Silk',
    occasion: 'Wedding',
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['men ethnic', 'dhoti', 'panche', 'veshti', 'pattu', 'gold kurta', 'maga', 'pelli', 'wedding men'],
    inStock: true,
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: {
      en: 'Traditional South Indian wedding attire comprising a cream-gold raw silk Mandarin collar kurta paired with a matching zari border Pattu Veshti / Pancha.',
      te: 'దక్షిణ భారత సాంప్రదాయ పెళ్లి దుస్తులు. రా సిల్క్ కుర్తా మరియు జరీ బార్డర్ పట్టు పంచె సెట్.',
      hi: 'पारंपरिक दक्षिण भारतीय शादी का पहनावा जिसमें क्रीम-गोल्ड रॉ सिल्क कुर्ता और जरी बॉर्डर पट्टू धोती शामिल है।',
      ta: 'பாரம்பரிய தென்னிந்திய திருமண ஆடை, பட்டு வேஷ்டி மற்றும் சில்க் குர்தா உடனுடன்.'
    },
    isBestseller: true
  },
  {
    id: 'prod_7',
    name: 'Nilgiri Teal Handloom Khadi Cotton Saree',
    regionalNames: {
      en: 'Nilgiri Teal Handloom Khadi Cotton Saree',
      te: 'నీలగిరి టియల్ హ్యాండ్‌లూమ్ ఖాదీ కాటన్ చీర',
      hi: 'नीलगिरी टील खादी सूती handloom साड़ी',
      ta: 'நீலகிரி டீல் கைத்தறி பருத்தி புடவை'
    },
    brand: 'Taavi Earth',
    category: 'Sarees',
    gender: 'women',
    price: 1299,
    originalPrice: 2599,
    discountPercentage: 50,
    rating: 4.5,
    reviewCount: 168,
    colors: ['Green', 'Blue'],
    regionalColor: {
      en: 'Nilgiri Teal',
      te: 'నీలగిరి టియల్',
      hi: 'नीलगिरी टील',
      ta: 'நீலகிரி டீல்',
      hex: '#0D9488'
    },
    material: 'Cotton',
    occasion: 'Festival',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['nilgiri teal', 'cotton saree', 'handloom', 'khadi', 'pacha', 'green saree', 'daily wear'],
    inStock: true,
    sizes: ['Onesize'],
    description: {
      en: 'Eco-conscious Nilgiri Teal organic handloom khadi cotton saree with striped temple pallu.',
      te: 'పర్యావరణ హితకరమైన నీలగిరి టియల్ ఖాదీ కాటన్ చీర.',
      hi: 'इको-फ्रेंडली नीलगिरी टील ऑर्गेनिक हैंड loom खादी कॉटन साड़ी।',
      ta: 'இயற்கை நீலகிரி டீல் கைத்தறி பருத்தி புடவை.'
    }
  },
  {
    id: 'prod_8',
    name: 'Indigo Blue Ajrakh Block Printed Cotton Kurta',
    regionalNames: {
      en: 'Indigo Blue Ajrakh Block Printed Cotton Kurta',
      te: 'ఇండిగో బ్లూ అజ్రఖ్ బ్లాక్ ప్రింటెడ్ కాటన్ కుర్తా',
      hi: 'इंडिगो ब्लू अजरख ब्लॉक प्रिंटेड कॉटन कुर्ता',
      ta: 'இண்டிகோ நீலம் அஜ்ரக் காட்டன் குர்தா'
    },
    brand: 'FabIndia Style',
    category: 'Kurtas & Suits',
    gender: 'men',
    price: 1199,
    originalPrice: 2399,
    discountPercentage: 50,
    rating: 4.6,
    reviewCount: 215,
    colors: ['Blue'],
    regionalColor: {
      en: 'Indigo Blue',
      te: 'ఇండిగో బ్లూ',
      hi: 'इंडिगो ब्लू',
      ta: 'இண்டிகோ நீலம்',
      hex: '#1D4ED8'
    },
    material: 'Cotton',
    occasion: 'Festival',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['indigo blue', 'blue kurta', 'men kurta', 'neela', 'cotton', 'ajrakh', 'festive wear'],
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    description: {
      en: 'Natural indigo vegetable dyed Ajrakh geometric hand block printed long cotton kurta for men.',
      te: 'సహజ ఇండిగో రంగులతో ముద్రించిన అజ్రఖ్ డిజైన్ కాటన్ కుర్తా.',
      hi: 'प्राकृतिक इंडिगो रंग से अजरख हैंड ब्लॉक प्रिंटेड लंबा सूती कुर्ता।',
      ta: 'இயற்கை இண்டிகோ அஜ்ரக் அச்சிடப்பட்ட காட்டன் குர்தா.'
    }
  },
  {
    id: 'prod_9',
    name: 'Traditional Girls Pattu Langa Voni Set (Sankranti Edition)',
    regionalNames: {
      en: 'Traditional Girls Pattu Langa Voni Set (Sankranti Edition)',
      te: 'సాంప్రదాయ పట్టు లంగా ఓణి సెట్ (సంక్రాంతి కలెక్షన్)',
      hi: 'पारंपरिक लड़कियों का पट्टू लहंगा वोनी सेट',
      ta: 'பாரம்பரிய சிறுமிகளின் பட்டு பாவாடை தாவணி'
    },
    brand: 'Biba Kids Ethnic',
    category: 'Kids',
    gender: 'kids',
    price: 1899,
    originalPrice: 3799,
    discountPercentage: 50,
    rating: 4.9,
    reviewCount: 140,
    colors: ['Red', 'Yellow', 'Gold'],
    regionalColor: {
      en: 'Bandhani Yellow & Kunkum Red',
      te: 'బంధాని పసుపు & కుంకుమ ఎరుపు',
      hi: 'बंधेज पीला और लाल',
      ta: 'மஞ்சள் மற்றும் சிவப்பு',
      hex: '#DC2626'
    },
    material: 'Silk',
    occasion: 'Festival',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['kids ethnic', 'pattu langa', 'langa voni', 'half saree', 'sankranti', 'pillalu', 'kids dress'],
    inStock: true,
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-12Y'],
    description: {
      en: 'Charming silk blend half saree / pattu langa voni outfit for young girls with rich golden zari borders.',
      te: 'చిన్న పిల్లల కోసం సాంప్రదాయ పట్టు లంగా ఓణి సెట్. పండుగలకు సరైన ఎంపిక.',
      hi: 'छोटे बच्चों के लिए खूबसूरत रेशमी हाफ साड़ी / पट्टू लहंगा सेट।',
      ta: 'சிறுமிகளுக்கான பாரம்பரிய பட்டு பாவாடை தாவணி ஆடை.'
    }
  },
  {
    id: 'prod_10',
    name: 'Kalamkari Hand-Painted Pure Cotton Dupatta',
    regionalNames: {
      en: 'Kalamkari Hand-Painted Pure Cotton Dupatta',
      te: 'కలంకారీ హ్యాండ్ పెయింటెడ్ ప్యూర్ కాటన్ దుపట్టా',
      hi: 'कलमकारी हैंड-पेंटेड प्योर कॉटन दुपट्टा',
      ta: 'கலம்காரி கைவினை பருத்தி துப்பட்டா'
    },
    brand: 'Srikalahasti Weaves',
    category: 'Accessories',
    gender: 'unisex',
    price: 799,
    originalPrice: 1599,
    discountPercentage: 50,
    rating: 4.7,
    reviewCount: 180,
    colors: ['Red', 'Blue', 'Black'],
    regionalColor: {
      en: 'Temple Red & Indigo',
      te: 'టెంపుల్ రెడ్ & ఇండిగో',
      hi: 'टेम्पल रेड और इंडिगो',
      ta: 'கோவில் சிவப்பு',
      hex: '#1D4ED8'
    },
    material: 'Cotton',
    occasion: 'Festival',
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['kalamkari', 'dupatta', 'cotton', 'hand painted', 'accessories', 'andhra heritage', 'under 1000'],
    inStock: true,
    sizes: ['Free Size'],
    description: {
      en: 'Authentic Srikalahasti Pen Kalamkari cotton dupatta featuring mythological motifs drawn with natural dyes.',
      te: 'శ్రీకాళహస్తి సాంప్రదాయ పెన్ కలంకారీ కాటన్ దుపట్టా.',
      hi: 'प्रामाणिक श्रीकालहस्ती पेन कलमकारी सूती दुपट्टा।',
      ta: 'பாரம்பரிய ஸ்ரீகாளஹஸ்தி கலம்ஹாரி துப்பட்டா.'
    }
  }
];
