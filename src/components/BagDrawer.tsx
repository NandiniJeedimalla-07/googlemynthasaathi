import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, size: string, qty: number) => void;
  onRemoveItem: (id: string, size: string) => void;
  onPlaceOrder: () => void;
}

export const BagDrawer: React.FC<BagDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
}) => {
  const { language, t } = useLanguage();

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalMRP = cartItems.reduce(
    (sum, item) => sum + item.product.originalPrice * item.quantity,
    0
  );
  const totalDiscount = totalMRP - totalAmount;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-gray-200">
        
        {/* Header */}
        <div className="p-4 bg-gray-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rose-500" />
            <h3 className="font-extrabold text-sm tracking-wide">{t('bag')}</h3>
            <span className="text-xs bg-rose-600 text-white font-bold px-2 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            id="close-bag-drawer-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        {cartItems.length > 0 ? (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.map((item, idx) => {
              const localizedName = item.product.regionalNames[language] || item.product.name;
              return (
                <div
                  key={`${item.product.id}_${item.selectedSize}_${idx}`}
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

                    <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                      <span>Size: <strong className="text-gray-900">{item.selectedSize}</strong></span>
                      <span>Qty: </span>
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          onUpdateQuantity(
                            item.product.id,
                            item.selectedSize,
                            parseInt(e.target.value, 10)
                          )
                        }
                        className="bg-gray-50 border border-gray-200 rounded px-1 text-xs font-bold"
                      >
                        {[1, 2, 3, 4, 5].map((q) => (
                          <option key={q} value={q}>
                            {q}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-sm font-black text-gray-900">
                        ₹{item.product.price * item.quantity}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ₹{item.product.originalPrice * item.quantity}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-rose-600 p-1 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}

            {/* Price Summary */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2 text-xs">
              <h5 className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">
                Order Price Details
              </h5>
              <div className="flex justify-between text-gray-600">
                <span>Total MRP</span>
                <span>₹{totalMRP}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>{t('bagDiscount')}</span>
                <span>-₹{totalDiscount}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{t('deliveryFee')}</span>
                <span className="text-emerald-600 font-bold">{t('FREE')}</span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between font-black text-sm text-gray-900">
                <span>{t('totalAmount')}</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

          </div>
        ) : (
          <div className="flex-1 p-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-gray-900 text-base">{t('emptyBagTitle')}</h4>
            <p className="text-xs text-gray-500 max-w-xs">{t('emptyBagSub')}</p>
          </div>
        )}

        {/* Footer Checkout CTA */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-white border-t border-gray-200 space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t('cashOnDelivery')} & Free Delivery applied</span>
            </div>

            <button
              onClick={onPlaceOrder}
              className="w-full py-3.5 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              id="place-order-btn"
            >
              <span>{t('placeOrder')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
