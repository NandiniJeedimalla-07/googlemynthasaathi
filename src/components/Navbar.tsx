import React, { useState } from 'react';
import { Search, Mic, Heart, ShoppingBag, User, Sparkles, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../types';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenVoiceSearch: () => void;
  onOpenSaathiAssistant: () => void;
  wishlistCount: number;
  cartCount: number;
  onOpenWishlist: () => void;
  onOpenBag: () => void;
  selectedCategory: string | null;
  onSelectCategory: (cat: string | null) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  onOpenVoiceSearch,
  onOpenSaathiAssistant,
  wishlistCount,
  cartCount,
  onOpenWishlist,
  onOpenBag,
  selectedCategory,
  onSelectCategory
}) => {
  const { language, setLanguage, t, supportedLanguages } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const categories = [
    { key: 'women', label: t('navWomen') },
    { key: 'men', label: t('navMen') },
    { key: 'kids', label: t('navKids') },
    { key: 'regional', label: t('navRegionalColors') },
    { key: 'studio', label: t('navStudio') }
  ];

  const currentLangObj = supportedLanguages.find((l) => l.code === language);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                onSelectCategory(null);
                setSearchQuery('');
              }}
              className="flex items-center gap-2 text-left cursor-pointer group"
              id="myntra-brand-logo"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-600 to-amber-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-tr from-rose-600 to-amber-600 text-xl tracking-tighter">
                  M
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-gray-900 tracking-tight text-lg">
                    {t('appName')}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200/80">
                    <Sparkles className="w-2.5 h-2.5" />
                    Saathi
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 font-medium">Multilingual Regional Store</p>
              </div>
            </button>

            {/* Navigation Category Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => onSelectCategory(selectedCategory === cat.key ? null : cat.key)}
                  className={`px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-lg ${
                    selectedCategory === cat.key
                      ? 'text-rose-600 bg-rose-50/80'
                      : 'text-gray-700 hover:text-rose-600 hover:bg-gray-50'
                  }`}
                  id={`nav-link-${cat.key}`}
                >
                  {cat.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Search Bar with Saathi Multilingual Mic */}
          <div className="flex-1 max-w-xl relative">
            <div className="relative flex items-center w-full bg-gray-50 hover:bg-gray-100/80 focus-within:bg-white focus-within:ring-2 focus-within:ring-rose-500/30 focus-within:border-rose-500 rounded-full border border-gray-200 transition-all shadow-inner">
              <Search className="w-4 h-4 ml-4 text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full py-2.5 px-3 text-xs sm:text-sm text-gray-900 bg-transparent focus:outline-none placeholder-gray-400 font-medium"
                id="search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-2 text-xs text-gray-400 hover:text-gray-600 font-bold"
                >
                  ✕
                </button>
              )}
              
              {/* Voice Mic Trigger Button */}
              <button
                onClick={onOpenVoiceSearch}
                title={t('searchVoiceTooltip')}
                className="mr-1.5 p-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700 transition-all shadow-sm flex items-center justify-center gap-1 group/mic cursor-pointer"
                id="voice-search-btn"
              >
                <Mic className="w-3.5 h-3.5 animate-pulse" />
                <span className="hidden md:inline text-[10px] font-bold pr-1">Voice</span>
              </button>
            </div>
          </div>

          {/* Actions & Language Selector */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-gray-200 bg-gray-50/80 hover:bg-gray-100 text-gray-800 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                id="language-switcher-btn"
              >
                <Globe className="w-3.5 h-3.5 text-rose-600" />
                <span>{currentLangObj?.nativeName}</span>
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Select Language / భాష / भाषा / மொழி
                  </div>
                  {supportedLanguages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code as Language);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-rose-50/60 transition-colors ${
                        language === l.code ? 'font-black text-rose-600 bg-rose-50/40' : 'text-gray-700'
                      }`}
                      id={`lang-option-${l.code}`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{l.flag}</span>
                        <span>{l.nativeName} ({l.name})</span>
                      </span>
                      {language === l.code && <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Ask Saathi AI Assistant Button */}
            <button
              onClick={onOpenSaathiAssistant}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              id="saathi-ai-assistant-btn"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
              <span>Ask Saathi</span>
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-gray-700 hover:text-rose-600 transition-colors cursor-pointer"
              title={t('wishlist')}
              id="wishlist-btn"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Bag / Cart Icon */}
            <button
              onClick={onOpenBag}
              className="relative p-2 text-gray-700 hover:text-rose-600 transition-colors cursor-pointer"
              title={t('bag')}
              id="bag-btn"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile */}
            <div className="hidden sm:block p-2 text-gray-700 hover:text-rose-600 cursor-pointer">
              <User className="w-5 h-5" />
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
