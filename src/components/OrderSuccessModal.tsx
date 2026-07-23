import React from 'react';
import { CheckCircle2, Sparkles, PackageCheck, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 text-center space-y-5">
        
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-black text-gray-900 tracking-tight">
            {t('orderSuccessful')}
          </h3>
          <p className="text-xs text-gray-600 font-medium max-w-xs mx-auto">
            {t('orderThankYou')} Your regional handloom items are being packed with care.
          </p>
        </div>

        <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center justify-center gap-2">
          <PackageCheck className="w-4 h-4 text-emerald-600" />
          <span>Expected Delivery in 2 - 4 Business Days</span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm transition-all shadow-md cursor-pointer"
          id="continue-shopping-btn"
        >
          {t('continueShopping')}
        </button>

      </div>
    </div>
  );
};
