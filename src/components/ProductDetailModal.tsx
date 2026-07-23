import React, { useState } from 'react';
import { Product } from '../types';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, Sparkles, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const { language, t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>('');

  if (!product) return null;

  const localizedName = product.regionalNames[language] || product.name;
  const localizedDesc = product.description[language] || product.description.en;
  const localizedHeritage = product.heritageStory
    ? product.heritageStory[language] || product.heritageStory.en
    : null;
  const localizedShade = product.regionalColor[language] || product.regionalColor.en;

  const handleAdd = () => {
    const sizeToUse = selectedSize || product.sizes[0] || 'Free Size';
    onAddToCart(product, sizeToUse);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 transition-colors cursor-pointer shadow-md"
          id="close-product-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Product Image Gallery */}
          <div className="p-6 bg-gray-50 flex flex-col justify-between">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-white shadow-inner mb-4 relative">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={localizedName}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-3 left-3 bg-rose-600 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {product.discountPercentage}% OFF
              </div>
            </div>

            {/* Thumbnail Selectors */}
            {product.images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-14 h-18 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImage === idx ? 'border-rose-600 shadow-sm scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info & Actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              {/* Brand & Category */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  {product.brand}
                </span>
                
                {/* Regional Shade Tag */}
                <div className="flex items-center gap-1.5 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  <span
                    className="w-3 h-3 rounded-full border border-black/10 shadow-2xs"
                    style={{ backgroundColor: product.regionalColor.hex }}
                  />
                  <span className="text-xs font-extrabold text-rose-800">
                    {localizedShade}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 leading-snug">
                {localizedName}
              </h2>

              {/* Rating Pill */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-black border border-emerald-200">
                  <span>{product.rating}</span>
                  <Star className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  {product.reviewCount} Verified Ratings
                </span>
              </div>

              {/* Price Breakdown */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-2xl font-black text-gray-900">₹{product.price}</span>
                <span className="text-sm text-gray-400 line-through font-medium">
                  MRP ₹{product.originalPrice}
                </span>
                <span className="text-xs font-extrabold text-rose-600">
                  Save ₹{product.originalPrice - product.price}
                </span>
              </div>

              {/* Size Selector */}
              {product.sizes.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                    <span>{t('selectSize')}</span>
                    <span className="text-rose-600 cursor-pointer hover:underline">Size Chart</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => {
                      const isSel = selectedSize === size || (!selectedSize && size === product.sizes[0]);
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-10 h-10 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                            isSel
                              ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                              : 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="text-xs text-gray-600 leading-relaxed pt-2">
                <p>{localizedDesc}</p>
              </div>

              {/* Regional Heritage Story Box */}
              {localizedHeritage && (
                <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{t('regionalHeritage')}</span>
                  </div>
                  <p className="text-[11px] text-amber-800/90 leading-relaxed italic">
                    "{localizedHeritage}"
                  </p>
                </div>
              )}

              {/* Delivery & Trust Features */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-gray-600 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-rose-600" />
                  <span>{t('freeDelivery')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{t('cashOnDelivery')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-blue-600" />
                  <span>{t('easy30DaysReturn')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>100% Authentic Handlooms</span>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={handleAdd}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                id="modal-add-to-bag-btn"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t('addToBag')}</span>
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer shadow-xs ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-300 text-rose-600'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
                title="Wishlist"
                id="modal-wishlist-toggle-btn"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
