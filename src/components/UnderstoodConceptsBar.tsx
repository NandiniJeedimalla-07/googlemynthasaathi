import React from 'react';
import { NormalizedQuery, ExtractedConcept } from '../types';
import { Sparkles, CheckCircle2, Tag, ArrowRight, RefreshCw, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface UnderstoodConceptsBarProps {
  normalizedQuery: NormalizedQuery;
  onRemoveConcept: (conceptId: string) => void;
  onClearQuery: () => void;
}

export const UnderstoodConceptsBar: React.FC<UnderstoodConceptsBarProps> = ({
  normalizedQuery,
  onRemoveConcept,
  onClearQuery,
}) => {
  const { t } = useLanguage();

  if (!normalizedQuery || !normalizedQuery.rawQuery) {
    return null;
  }

  const langBadgeColors: Record<string, string> = {
    te: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    hi: 'bg-amber-100 text-amber-800 border-amber-300',
    ta: 'bg-purple-100 text-purple-800 border-purple-300',
    'code-mixed': 'bg-rose-100 text-rose-800 border-rose-300',
    en: 'bg-blue-100 text-blue-800 border-blue-300',
  };

  const langNames: Record<string, string> = {
    te: 'Telugu Script (తెలుగు)',
    hi: 'Hindi / Devanagari (हिंदी)',
    ta: 'Tamil Script (தமிழ்)',
    'code-mixed': 'Regional Code-Mixed / Transliterated',
    en: 'English Query',
  };

  return (
    <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-4 my-4 animate-in fade-in slide-in-from-top-1 duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-gray-100">
        
        {/* Understood Header & Detected Language */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-gray-900">
            {t('understoodConcepts')}
          </span>
          
          {/* Language Badge */}
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${langBadgeColors[normalizedQuery.detectedLanguage] || langBadgeColors.en}`}>
            {langNames[normalizedQuery.detectedLanguage] || 'Code-mixed'}
          </span>

          {/* Confidence Score */}
          <span className="text-[11px] font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-200 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Confidence: {(normalizedQuery.confidenceScore * 100).toFixed(0)}%</span>
          </span>
        </div>

        {/* Clear Search */}
        <button
          onClick={onClearQuery}
          className="text-xs font-bold text-gray-500 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer self-end md:self-auto"
          id="clear-concepts-btn"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset Search</span>
        </button>

      </div>

      {/* Concept Tags Pipeline */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        
        {/* Original Query Tag */}
        <div className="px-3 py-1.5 rounded-xl bg-gray-100 text-gray-800 text-xs font-semibold flex items-center gap-1.5 border border-gray-200">
          <span className="text-[10px] uppercase font-extrabold text-gray-400">Raw:</span>
          <span className="italic">"{normalizedQuery.rawQuery}"</span>
        </div>

        <ArrowRight className="w-3.5 h-3.5 text-rose-400 shrink-0 hidden sm:block" />

        {/* Normalized Terms Tag */}
        {normalizedQuery.normalizedTerms.length > 0 && (
          <div className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-900 text-xs font-bold border border-rose-200 flex items-center gap-1.5 shadow-2xs">
            <Tag className="w-3 h-3 text-rose-600" />
            <span className="text-[10px] uppercase font-extrabold text-rose-400">Normalized:</span>
            <span>{normalizedQuery.normalizedTerms.join(' • ')}</span>
          </div>
        )}

        {/* Individual Extracted Concepts Chips */}
        {normalizedQuery.concepts.map((concept) => (
          <div
            key={concept.id}
            className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200/80 flex items-center gap-1.5 transition-all hover:bg-amber-100"
            id={`concept-chip-${concept.id}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>{concept.label}</span>
            {concept.originalWord && (
              <span className="text-[10px] text-amber-700 font-normal italic">
                (from "{concept.originalWord}")
              </span>
            )}
            <button
              onClick={() => onRemoveConcept(concept.id)}
              className="ml-1 text-amber-600 hover:text-rose-600 font-bold p-0.5 rounded-full hover:bg-amber-200/50 cursor-pointer"
              title="Remove filter"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

      </div>

      {/* Applied Synonyms / Regional Translation Details */}
      {normalizedQuery.synonymsApplied.length > 0 && (
        <div className="mt-2.5 pt-2 border-t border-gray-100/80 flex items-center gap-2 text-[11px] text-gray-500">
          <span className="font-bold text-gray-700">Saathi Dictionary Translations:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {normalizedQuery.synonymsApplied.map((syn, idx) => (
              <span key={idx} className="bg-gray-50 border border-gray-200 px-2 py-0.5 rounded text-[10px] font-mono text-gray-700">
                {syn}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
