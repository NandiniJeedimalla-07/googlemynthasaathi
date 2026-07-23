import React, { useState, useMemo } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { FilterState, Product, CartItem, WishlistItem } from './types';
import { PRODUCTS } from './data/products';
import { filterAndSearchProducts } from './services/search/searchEngine';
import { Navbar } from './components/Navbar';
import { SaathiBanner } from './components/SaathiBanner';
import { UnderstoodConceptsBar } from './components/UnderstoodConceptsBar';
import { RegionalColorPalette } from './components/RegionalColorPalette';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { VoiceSearchModal } from './components/VoiceSearchModal';
import { SaathiAssistantDrawer } from './components/SaathiAssistantDrawer';
import { BagDrawer } from './components/BagDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { Download, Sparkles, FileText, CheckCircle2 } from 'lucide-react';

function MainApp() {
  const { language, t } = useLanguage();

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNavCategory, setSelectedNavCategory] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    category: [],
    gender: [],
    priceRange: [500, 10000],
    colors: [],
    regionalColors: [],
    materials: [],
    occasions: [],
    minRating: 0,
    minDiscount: 0,
    sortBy: 'recommended',
    searchQuery: '',
    normalizedQuery: null,
    activeConceptFilters: [],
  });

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // Modals & Drawers State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [saathiDrawerOpen, setSaathiDrawerOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [orderSuccessOpen, setOrderSuccessOpen] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  // Sync Search Query to Filters
  const currentFilters = useMemo(() => {
    let activeCategories = [...filters.category];
    let activeGenders = [...filters.gender];

    if (selectedNavCategory === 'women') activeGenders = ['women'];
    if (selectedNavCategory === 'men') activeGenders = ['men'];
    if (selectedNavCategory === 'kids') activeGenders = ['kids'];

    return {
      ...filters,
      searchQuery,
      category: activeCategories,
      gender: activeGenders,
    };
  }, [filters, searchQuery, selectedNavCategory]);

  // Execute Search & Filter Pipeline
  const { products: filteredProducts, normalizedQuery } = useMemo(() => {
    return filterAndSearchProducts(PRODUCTS, currentFilters, language);
  }, [currentFilters, language]);

  // Handlers
  const handleSelectPrompt = (prompt: string) => {
    setSearchQuery(prompt);
  };

  const handleApplyVoiceQuery = (voiceText: string) => {
    setSearchQuery(voiceText);
  };

  const handleRemoveConcept = (conceptId: string) => {
    // Modify search query or concept filters
    if (normalizedQuery) {
      const remaining = normalizedQuery.concepts.filter((c) => c.id !== conceptId);
      if (remaining.length === 0) {
        setSearchQuery('');
      } else {
        // Remove word from search query
        const conceptToRemove = normalizedQuery.concepts.find((c) => c.id === conceptId);
        if (conceptToRemove?.originalWord) {
          setSearchQuery((prev) =>
            prev.replace(new RegExp(conceptToRemove.originalWord!, 'gi'), '').trim()
          );
        }
      }
    }
  };

  const handleClearQuery = () => {
    setSearchQuery('');
    setFilters({
      category: [],
      gender: [],
      priceRange: [500, 10000],
      colors: [],
      regionalColors: [],
      materials: [],
      occasions: [],
      minRating: 0,
      minDiscount: 0,
      sortBy: 'recommended',
      searchQuery: '',
      normalizedQuery: null,
      activeConceptFilters: [],
    });
    setSelectedNavCategory(null);
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.product.id === product.id);
      if (exists) {
        return prev.filter((item) => item.product.id !== product.id);
      } else {
        return [...prev, { product }];
      }
    });
  };

  const handleAddToCart = (product: Product, size?: string) => {
    const sizeToUse = size || product.sizes[0] || 'Free Size';
    setCartItems((prev) => {
      const index = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === sizeToUse
      );
      if (index >= 0) {
        const copy = [...prev];
        copy[index].quantity += 1;
        return copy;
      } else {
        return [
          ...prev,
          {
            product,
            selectedSize: sizeToUse,
            selectedColor: product.colors[0],
            quantity: 1,
          },
        ];
      }
    });
    setBagOpen(true);
  };

  const handleUpdateCartQty = (id: string, size: string, qty: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === id && item.selectedSize === size ? { ...item, quantity: qty } : item
      )
    );
  };

  const handleRemoveCartItem = (id: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === id && item.selectedSize === size))
    );
  };

  const handlePlaceOrder = () => {
    setCartItems([]);
    setBagOpen(false);
    setOrderSuccessOpen(true);
  };

  const wishlistedIds = new Set(wishlistItems.map((item) => item.product.id));

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900 font-sans flex flex-col justify-between">
      
      {/* Top Main Bar */}
      <div>
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenVoiceSearch={() => setVoiceModalOpen(true)}
          onOpenSaathiAssistant={() => setSaathiDrawerOpen(true)}
          wishlistCount={wishlistItems.length}
          cartCount={cartItems.length}
          onOpenWishlist={() => setWishlistOpen(true)}
          onOpenBag={() => setBagOpen(true)}
          selectedCategory={selectedNavCategory}
          onSelectCategory={(cat) => setSelectedNavCategory(cat)}
        />

        {/* Sticky Saathi Multilingual Bar */}
        <SaathiBanner
          onSelectPrompt={handleSelectPrompt}
          onOpenVoiceModal={() => setVoiceModalOpen(true)}
        />

        {/* Main Content Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* Language-Independent Understood Concepts Bar */}
          {normalizedQuery && normalizedQuery.rawQuery && (
            <UnderstoodConceptsBar
              normalizedQuery={normalizedQuery}
              onRemoveConcept={handleRemoveConcept}
              onClearQuery={handleClearQuery}
            />
          )}

          {/* Regional Heritage Color Palette Showcase */}
          <RegionalColorPalette
            selectedColors={filters.regionalColors}
            onSelectColor={(key) => {
              setFilters((prev) => ({
                ...prev,
                regionalColors: prev.regionalColors.includes(key)
                  ? prev.regionalColors.filter((r) => r !== key)
                  : [...prev.regionalColors, key],
              }));
            }}
          />

          {/* Main Store Layout (Sidebar + Catalog Grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start mt-6">
            
            {/* Multi-facet Filter Sidebar */}
            <div className="lg:col-span-1 sticky top-24">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                onClearFilters={handleClearQuery}
              />
            </div>

            {/* Product Catalog Grid */}
            <div className="lg:col-span-3">
              <ProductGrid
                products={filteredProducts}
                totalResults={filteredProducts.length}
                filters={filters}
                setFilters={setFilters}
                onOpenQuickView={(p) => setQuickViewProduct(p)}
                onToggleWishlist={handleToggleWishlist}
                wishlistedIds={wishlistedIds}
                onAddToCart={(p) => handleAddToCart(p)}
                onResetFilters={handleClearQuery}
              />
            </div>

          </div>

        </main>
      </div>

      {/* Floating Action Buttons: Architecture Report & Saathi Chat */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2 items-end">
        <button
          onClick={() => setShowReportModal(true)}
          className="px-4 py-2.5 rounded-full bg-gray-900 hover:bg-black text-white text-xs font-bold shadow-xl flex items-center gap-2 border border-gray-700 transition-all cursor-pointer"
          id="architecture-report-btn"
        >
          <FileText className="w-4 h-4 text-amber-400" />
          <span>Saathi Report</span>
        </button>

        <button
          onClick={() => setSaathiDrawerOpen(true)}
          className="px-5 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-extrabold text-xs shadow-2xl flex items-center gap-2 transition-all cursor-pointer border border-rose-400/30 group"
          id="ask-saathi-floating-btn"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span>Ask Myntra Saathi</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2 font-bold text-gray-800">
            <span>Myntra Saathi Multilingual AI Layer</span>
            <span className="text-gray-300">•</span>
            <span className="text-rose-600">EN • TE • HI • TA</span>
          </div>
          <p>© 2026 Myntra Clone Regional Colors v2. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, sz) => {
          handleAddToCart(p, sz);
          setQuickViewProduct(null);
        }}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlistedIds.has(quickViewProduct.id) : false}
      />

      <VoiceSearchModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onApplyVoiceQuery={handleApplyVoiceQuery}
      />

      <SaathiAssistantDrawer
        isOpen={saathiDrawerOpen}
        onClose={() => setSaathiDrawerOpen(false)}
        onSelectProduct={(p) => setQuickViewProduct(p)}
        onOpenVoiceModal={() => setVoiceModalOpen(true)}
      />

      <BagDrawer
        isOpen={bagOpen}
        onClose={() => setBagOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onPlaceOrder={handlePlaceOrder}
      />

      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistItems={wishlistItems}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(p) => handleAddToCart(p)}
      />

      <OrderSuccessModal
        isOpen={orderSuccessOpen}
        onClose={() => setOrderSuccessOpen(false)}
      />

      {/* Architecture Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-rose-600" />
                Myntra Saathi Architecture & Report
              </h3>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-700 leading-relaxed font-sans">
              <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200">
                <h4 className="font-bold text-rose-900 text-sm mb-1">1. Centralized Localization</h4>
                <p>
                  Implemented English, Telugu (తెలుగు), Hindi (हिंदी), and Tamil (தமிழ்) with persisted local storage selection across navbar, store categories, filters, checkout, product regional descriptions, and voice triggers.
                </p>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                <h4 className="font-bold text-amber-900 text-sm mb-1">2. Language-Independent Normalization Pipeline</h4>
                <p>
                  Parses regional scripts (Telugu/Hindi/Tamil Unicode), transliterated Romanized queries (Teluglish/Hinglish/Tamlish e.g. "pacha color pattu saree under 2000 for pelli"), code-mixed terms, and handles typos via edit-distance fuzzy matching.
                </p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <h4 className="font-bold text-emerald-900 text-sm mb-1">3. Voice Search Pipeline</h4>
                <p>
                  Integrated Web Speech API with native auto language recognition (te-IN, hi-IN, ta-IN, en-IN), microphone wave visualizers, and instant pipeline execution.
                </p>
              </div>

              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200">
                <h4 className="font-bold text-blue-900 text-sm mb-1">4. Understood Concepts UI</h4>
                <p>
                  Renders real-time concept breakdown chips (Category, Max Price, Regional Shade, Material, Occasion) with confidence scores and individual tag removal.
                </p>
              </div>

              <div className="p-3 bg-gray-100 rounded-2xl font-mono text-[11px]">
                <strong className="block text-gray-900 mb-1">Exact Run & Test Commands:</strong>
                <p className="text-gray-800">npm run dev (Start Development Server on Port 3000)</p>
                <p className="text-gray-800">npm run build (Compile Production Build)</p>
                <p className="text-gray-800">npx tsx test-normalization.ts (Run Pipeline Test Suite)</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowReportModal(false)}
                className="px-5 py-2 rounded-xl bg-gray-900 text-white font-bold text-xs cursor-pointer"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
