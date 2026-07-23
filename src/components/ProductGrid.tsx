import React from 'react';
import { Product, FilterState } from '../types';
import { ProductCard } from './ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, SlidersHorizontal, PackageSearch } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  totalResults: number;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onOpenQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistedIds: Set<string>;
  onAddToCart: (product: Product) => void;
  onResetFilters: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  totalResults,
  filters,
  setFilters,
  onOpenQuickView,
  onToggleWishlist,
  wishlistedIds,
  onAddToCart,
  onResetFilters,
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      
      {/* Grid Top Toolbar: Counter & Sorting */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div>
          <h2 className="text-sm font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <span>Product Catalog</span>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              {totalResults} Items
            </span>
          </h2>
        </div>

        {/* Sort By Selector */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('sortBy')}:</span>
          <select
            value={filters.sortBy}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                sortBy: e.target.value as FilterState['sortBy'],
              }))
            }
            className="text-xs font-bold text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-rose-500/30 cursor-pointer"
            id="sort-by-select"
          >
            <option value="recommended">{t('sortRecommended')}</option>
            <option value="price-low">{t('sortPriceLowHigh')}</option>
            <option value="price-high">{t('sortPriceHighLow')}</option>
            <option value="rating">{t('sortRating')}</option>
            <option value="discount">{t('sortDiscount')}</option>
          </select>
        </div>
      </div>

      {/* Grid Listing */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenQuickView={onOpenQuickView}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistedIds.has(product.id)}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center space-y-4 shadow-sm my-6">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <PackageSearch className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No matching products found</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Try adjusting your search query, clearing price limits, or exploring our traditional regional color palettes.
          </p>
          <button
            onClick={onResetFilters}
            className="px-6 py-2.5 rounded-full bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-all cursor-pointer shadow-md"
            id="reset-filters-empty-btn"
          >
            Reset All Filters & Search
          </button>
        </div>
      )}

    </div>
  );
};
