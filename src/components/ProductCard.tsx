import React from 'react';
import { Product } from '../types';
import { Heart, Star, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProductCardProps {
  product: Product;
  onOpenQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenQuickView,
  onToggleWishlist,
  isWishlisted,
  onAddToCart,
}) => {
  const { language, t } = useLanguage();

  const localizedName = product.regionalNames[language] || product.name;
  const localizedShade = product.regionalColor[language] || product.regionalColor.en;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100/80 shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between relative">
      
      {/* Product Image Box */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 cursor-pointer" onClick={() => onOpenQuickView(product)}>
        <img
          src={product.images[0]}
          alt={localizedName}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.discountPercentage > 0 && (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase bg-rose-600 text-white shadow-sm tracking-wider">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.isBestseller && (
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-400 text-amber-950 shadow-sm flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Heart Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all cursor-pointer shadow-md ${
            isWishlisted
              ? 'bg-rose-600 text-white'
              : 'bg-white/80 backdrop-blur-md text-gray-700 hover:text-rose-600 hover:bg-white'
          }`}
          title={isWishlisted ? t('inWishlist') : t('wishlist')}
          id={`wishlist-toggle-${product.id}`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Rating Pill */}
        <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-gray-900 text-[11px] font-black flex items-center gap-1 shadow-xs">
          <span>{product.rating}</span>
          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span className="text-gray-400 font-normal">({product.reviewCount})</span>
        </div>

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuickView(product);
            }}
            className="px-4 py-1.5 rounded-full bg-white text-gray-900 font-bold text-xs shadow-md flex items-center gap-1.5 hover:bg-rose-50 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-rose-600" />
            <span>{t('quickView')}</span>
          </button>
        </div>

      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Brand & Regional Shade */}
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
            <span>{product.brand}</span>
            <span className="flex items-center gap-1 text-rose-600 font-extrabold text-[10px]">
              <span
                className="w-2 h-2 rounded-full inline-block border border-black/10"
                style={{ backgroundColor: product.regionalColor.hex }}
              />
              {localizedShade}
            </span>
          </div>

          {/* Product Name (Localized) */}
          <h4
            onClick={() => onOpenQuickView(product)}
            className="text-xs sm:text-sm font-bold text-gray-900 mt-1 line-clamp-2 hover:text-rose-600 cursor-pointer transition-colors leading-snug"
          >
            {localizedName}
          </h4>
        </div>

        {/* Price & Add To Bag */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
          
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-black text-gray-900">
                ₹{product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through font-medium">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-rose-600 text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer shrink-0"
            id={`add-to-bag-${product.id}`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">{t('addToBag')}</span>
          </button>

        </div>

      </div>

    </div>
  );
};
