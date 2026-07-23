import React from 'react';
import { WishlistItem, Product } from '../types';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: WishlistItem[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  const { language, t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-gray-200">
        
        {/* Header */}
        <div className="p-4 bg-rose-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-current" />
            <h3 className="font-extrabold text-sm tracking-wide">{t('wishlist')}</h3>
            <span className="text-xs bg-rose-800 text-white font-bold px-2 py-0.5 rounded-full">
              {wishlistItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            id="close-wishlist-drawer-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        {wishlistItems.length > 0 ? (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {wishlistItems.map((item) => {
              const localizedName = item.product.regionalNames[language] || item.product.name;
              return (
                <div
                  key={item.product.id}
                  className="p-3 bg-white rounded-2xl border border-gray-100 shadow-2xs flex gap-3 relative group"
                >
                  <img
                    src={item.product.images[0]}
                    alt={localizedName}
                    className="w-16 h-20 rounded-xl object-cover object-top shrink-0"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase">
                      {item.product.brand}
                    </span>
                    <h4 className="text-xs font-bold text-gray-900 truncate">
                      {localizedName}
                    </h4>

                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-sm font-black text-gray-900">
                        ₹{item.product.price}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ₹{item.product.originalPrice}
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(item.product)}
                      className="mt-2 px-3 py-1 rounded-xl bg-gray-900 hover:bg-rose-600 text-white text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>{t('addToBag')}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveFromWishlist(item.product)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-rose-600 p-1 cursor-pointer"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex-1 p-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-gray-900 text-base">Your Wishlist is Empty</h4>
            <p className="text-xs text-gray-500 max-w-xs">
              Save your favorite sarees, kurtas, and regional heritage items here.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
