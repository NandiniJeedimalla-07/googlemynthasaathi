import React from 'react';
import { FilterState } from '../types';
import { REGIONAL_COLOR_PALETTES } from '../services/normalization/dictionary';
import { useLanguage } from '../context/LanguageContext';
import { SlidersHorizontal, RotateCcw, Check, Sparkles } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onClearFilters: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  onClearFilters,
}) => {
  const { t, language } = useLanguage();

  const categories = ['Sarees', 'Kurtas & Suits', 'Dresses', 'Men Ethnic', 'Kids', 'Accessories'];
  const genders = [
    { key: 'women', label: t('navWomen') },
    { key: 'men', label: t('navMen') },
    { key: 'kids', label: t('navKids') },
  ];
  const standardColors = ['Red', 'Green', 'Yellow', 'Pink', 'Gold', 'Blue', 'Black', 'White'];
  const materials = ['Silk', 'Cotton'];
  const occasions = ['Wedding', 'Festival'];

  const toggleCategory = (cat: string) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category.includes(cat)
        ? prev.category.filter((c) => c !== cat)
        : [...prev.category, cat],
    }));
  };

  const toggleGender = (g: string) => {
    setFilters((prev) => ({
      ...prev,
      gender: prev.gender.includes(g)
        ? prev.gender.filter((item) => item !== g)
        : [...prev.gender, g],
    }));
  };

  const toggleColor = (col: string) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(col)
        ? prev.colors.filter((c) => c !== col)
        : [...prev.colors, col],
    }));
  };

  const toggleRegionalColor = (regKey: string) => {
    setFilters((prev) => ({
      ...prev,
      regionalColors: prev.regionalColors.includes(regKey)
        ? prev.regionalColors.filter((r) => r !== regKey)
        : [...prev.regionalColors, regKey],
    }));
  };

  const toggleMaterial = (mat: string) => {
    setFilters((prev) => ({
      ...prev,
      materials: prev.materials.includes(mat)
        ? prev.materials.filter((m) => m !== mat)
        : [...prev.materials, mat],
    }));
  };

  const toggleOccasion = (occ: string) => {
    setFilters((prev) => ({
      ...prev,
      occasions: prev.occasions.includes(occ)
        ? prev.occasions.filter((o) => o !== occ)
        : [...prev.occasions, occ],
    }));
  };

  return (
    <aside className="w-full bg-white rounded-2xl border border-gray-100 shadow-2xs p-5 space-y-6">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-rose-600" />
          <h3 className="font-extrabold text-sm tracking-wide text-gray-900 uppercase">
            {t('filters')}
          </h3>
        </div>
        <button
          onClick={onClearFilters}
          className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition-colors cursor-pointer"
          id="clear-filters-btn"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{t('clearAll')}</span>
        </button>
      </div>

      {/* Regional Shades Palette Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            {t('regionalShade')}
          </h4>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {REGIONAL_COLOR_PALETTES.map((p) => {
            const isSelected = filters.regionalColors.includes(p.key);
            const localizedName = p.name[language] || p.name.en;
            return (
              <button
                key={p.key}
                onClick={() => toggleRegionalColor(p.key)}
                className={`p-2 rounded-xl text-left border text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'border-rose-500 bg-rose-50/70 text-rose-900 font-bold ring-1 ring-rose-500/30'
                    : 'border-gray-200 bg-gray-50/60 hover:bg-gray-100 text-gray-800'
                }`}
                id={`regional-color-filter-${p.key.replace(/\s+/g, '-')}`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0 shadow-2xs"
                  style={{ backgroundColor: p.hex }}
                />
                <span className="truncate text-[11px]">{localizedName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Gender Filter */}
      <div className="space-y-2 pt-3 border-t border-gray-100">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          {t('gender')}
        </h4>
        <div className="flex flex-wrap gap-2">
          {genders.map((g) => {
            const active = filters.gender.includes(g.key);
            return (
              <button
                key={g.key}
                onClick={() => toggleGender(g.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  active
                    ? 'bg-rose-600 text-white shadow-2xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {g.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Checkboxes */}
      <div className="space-y-2 pt-3 border-t border-gray-100">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          {t('categories')}
        </h4>
        <div className="space-y-1.5">
          {categories.map((cat) => {
            const checked = filters.category.includes(cat);
            return (
              <label
                key={cat}
                className="flex items-center gap-2.5 text-xs text-gray-700 font-medium hover:text-gray-900 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCategory(cat)}
                  className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-gray-300"
                />
                <span>{cat}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            {t('priceRange')}
          </h4>
          <span className="text-xs font-black text-rose-600">
            Up to ₹{filters.priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min={500}
          max={10000}
          step={500}
          value={filters.priceRange[1]}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              priceRange: [prev.priceRange[0], parseInt(e.target.value, 10)],
            }))
          }
          className="w-full accent-rose-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 font-bold">
          <span>₹500</span>
          <span>₹10,000</span>
        </div>
      </div>

      {/* Standard Color Filter Swatches */}
      <div className="space-y-2 pt-3 border-t border-gray-100">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          {t('color')}
        </h4>
        <div className="flex flex-wrap gap-2">
          {standardColors.map((col) => {
            const isSel = filters.colors.includes(col);
            return (
              <button
                key={col}
                onClick={() => toggleColor(col)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                  isSel
                    ? 'bg-gray-900 text-white border-gray-900 shadow-2xs'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {col}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fabric / Material Filter */}
      <div className="space-y-2 pt-3 border-t border-gray-100">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          {t('material')}
        </h4>
        <div className="flex gap-2">
          {materials.map((m) => {
            const active = filters.materials.includes(m);
            return (
              <button
                key={m}
                onClick={() => toggleMaterial(m)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  active
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>

      {/* Occasion & Festival */}
      <div className="space-y-2 pt-3 border-t border-gray-100">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          {t('occasion')}
        </h4>
        <div className="flex gap-2">
          {occasions.map((o) => {
            const active = filters.occasions.includes(o);
            return (
              <button
                key={o}
                onClick={() => toggleOccasion(o)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  active
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {o}
              </button>
            );
          })}
        </div>
      </div>

    </aside>
  );
};
