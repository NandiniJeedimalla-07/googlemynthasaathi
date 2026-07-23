import React from 'react';
import { REGIONAL_COLOR_PALETTES } from '../services/normalization/dictionary';
import { useLanguage } from '../context/LanguageContext';
import { Palette, Sparkles, ChevronRight } from 'lucide-react';

interface RegionalColorPaletteProps {
  selectedColors: string[];
  onSelectColor: (key: string) => void;
}

export const RegionalColorPalette: React.FC<RegionalColorPaletteProps> = ({
  selectedColors,
  onSelectColor,
}) => {
  const { language, t } = useLanguage();

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-purple-500/10 rounded-3xl p-6 border border-amber-200/60 my-6 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 text-white flex items-center justify-center shadow-xs">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-gray-900 tracking-tight flex items-center gap-2">
              <span>{t('navRegionalColors')}</span>
              <span className="text-[10px] font-bold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
                8 Traditional Palettes
              </span>
            </h3>
            <p className="text-xs text-gray-600 font-medium">
              Explore authentic Indian textile hues named in regional languages
            </p>
          </div>
        </div>
      </div>

      {/* Swatches Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {REGIONAL_COLOR_PALETTES.map((p) => {
          const isSel = selectedColors.includes(p.key);
          const localizedName = p.name[language] || p.name.en;

          return (
            <button
              key={p.key}
              onClick={() => onSelectColor(p.key)}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 group ${
                isSel
                  ? 'bg-white border-rose-500 shadow-md ring-2 ring-rose-500/30 scale-105'
                  : 'bg-white/80 border-gray-200/80 hover:bg-white hover:border-gray-300 hover:shadow-2xs'
              }`}
              id={`palette-card-${p.key.replace(/\s+/g, '-')}`}
            >
              <div
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm transition-transform group-hover:scale-110"
                style={{ backgroundColor: p.hex }}
              />
              <div>
                <span className="block text-xs font-black text-gray-900 line-clamp-1">
                  {localizedName}
                </span>
                <span className="text-[10px] text-gray-400 font-medium line-clamp-1">
                  {p.key}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
