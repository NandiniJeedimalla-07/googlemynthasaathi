import React from 'react';
import { Sparkles, Mic, Lightbulb, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SAMPLE_VOICE_PROMPTS } from '../services/voice/speechService';

interface SaathiBannerProps {
  onSelectPrompt: (prompt: string) => void;
  onOpenVoiceModal: () => void;
}

export const SaathiBanner: React.FC<SaathiBannerProps> = ({
  onSelectPrompt,
  onOpenVoiceModal,
}) => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-rose-900 via-pink-900 to-amber-950 text-white shadow-md relative overflow-hidden">
      {/* Decorative SVG motifs */}
      <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-10">
        <div className="w-64 h-64 rounded-full border-8 border-white/30 transform rotate-45" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          
          {/* Saathi Title & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 text-amber-300">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-wide text-amber-300">
                  {t('saathiTitle')}
                </span>
                <span className="text-[10px] bg-rose-500/50 text-rose-100 font-bold px-2 py-0.5 rounded-full border border-rose-400/30">
                  Telugu • Hindi • Tamil • English
                </span>
              </div>
              <p className="text-xs text-rose-100/90 font-medium">
                {t('saathiTagline')} — Try typing or speaking in your native script or code-mixed dialects!
              </p>
            </div>
          </div>

          {/* Quick Voice / Prompt Chips */}
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            <button
              onClick={onOpenVoiceModal}
              className="px-3 py-1.5 rounded-full bg-amber-400 text-amber-950 hover:bg-amber-300 text-xs font-black flex items-center gap-1.5 transition-all shadow-sm cursor-pointer shrink-0"
              id="saathi-banner-voice-btn"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Voice Search</span>
            </button>

            <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto text-xs">
              <Lightbulb className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="text-[11px] text-rose-200 font-medium shrink-0">Try:</span>
              {SAMPLE_VOICE_PROMPTS.slice(0, 3).map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectPrompt(item.prompt)}
                  className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-rose-100 border border-white/15 text-[11px] font-medium transition-colors cursor-pointer truncate max-w-[200px]"
                  id={`sample-prompt-chip-${idx}`}
                >
                  {item.prompt}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
