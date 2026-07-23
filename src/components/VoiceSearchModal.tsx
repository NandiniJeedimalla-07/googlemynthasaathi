import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, X, Sparkles, Check, Play, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { speechService, SAMPLE_VOICE_PROMPTS } from '../services/voice/speechService';
import { Language } from '../types';

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyVoiceQuery: (query: string) => void;
}

export const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({
  isOpen,
  onClose,
  onApplyVoiceQuery,
}) => {
  const { language, t, supportedLanguages } = useLanguage();
  const [voiceLang, setVoiceLang] = useState<Language>(language);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setVoiceLang(language);
  }, [language]);

  if (!isOpen) return null;

  const handleStartListening = () => {
    setErrorMessage('');
    setTranscript('');

    if (!speechService.isSupported()) {
      setErrorMessage('Web Speech API is not supported on this browser version. Please try one of the simulated voice sample prompts below!');
      return;
    }

    speechService.startListening(voiceLang, {
      onStart: () => setIsListening(true),
      onResult: (text, isFinal) => {
        setTranscript(text);
        if (isFinal) {
          setIsListening(false);
        }
      },
      onError: (err) => {
        setIsListening(false);
        setErrorMessage(err || 'Could not access microphone.');
      },
      onEnd: () => setIsListening(false),
    });
  };

  const handleStopListening = () => {
    speechService.stopListening();
    setIsListening(false);
  };

  const handleConfirmTranscript = (textToApply: string) => {
    if (textToApply.trim()) {
      onApplyVoiceQuery(textToApply.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 p-6 text-white text-center relative">
          <button
            onClick={() => {
              handleStopListening();
              onClose();
            }}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            id="close-voice-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-2 border border-white/30">
            <Mic className="w-6 h-6 text-white animate-pulse" />
          </div>

          <h3 className="text-xl font-black tracking-tight">{t('voiceSearchTitle')}</h3>
          <p className="text-xs text-rose-100 mt-1 font-medium">{t('voiceListening')}</p>
        </div>

        {/* Modal Body */}
        <div className="p-6 text-center">
          
          {/* Language Selection Bar for Voice */}
          <div className="flex items-center justify-center gap-1.5 mb-6 flex-wrap">
            <span className="text-xs font-bold text-gray-500 mr-1 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" /> Language:
            </span>
            {supportedLanguages.map((l) => (
              <button
                key={l.code}
                onClick={() => setVoiceLang(l.code as Language)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  voiceLang === l.code
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                id={`voice-lang-${l.code}`}
              >
                {l.flag} {l.nativeName}
              </button>
            ))}
          </div>

          {/* Animated Waveform Microphone Visualizer */}
          <div className="my-6 flex flex-col items-center justify-center min-h-[120px]">
            {isListening ? (
              <div className="flex items-center justify-center gap-1.5 h-16 my-2">
                {[40, 70, 100, 60, 90, 50, 80, 45, 95, 65].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-gradient-to-t from-rose-500 to-amber-500 rounded-full animate-pulse"
                    style={{
                      height: `${h}%`,
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: '0.8s',
                    }}
                  />
                ))}
              </div>
            ) : (
              <button
                onClick={handleStartListening}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer group"
                id="start-mic-btn"
              >
                <Mic className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </button>
            )}

            <p className="text-xs text-gray-500 font-medium mt-3">
              {isListening ? t('voiceListening') : t('voiceClickToSpeak')}
            </p>
          </div>

          {/* Real-time Transcript Box */}
          {transcript && (
            <div className="my-4 p-4 bg-rose-50/80 rounded-2xl border border-rose-200 text-left">
              <span className="text-[10px] uppercase font-extrabold text-rose-500 tracking-wider block mb-1">
                Transcript Detected:
              </span>
              <p className="text-sm font-bold text-gray-900 italic">"{transcript}"</p>
              
              <div className="mt-3 flex justify-end gap-2">
                <button
                  onClick={() => handleConfirmTranscript(transcript)}
                  className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-xs cursor-pointer"
                  id="confirm-transcript-btn"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Search Products</span>
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="my-3 p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {/* Sample Regional Voice Triggers */}
          <div className="mt-6 pt-4 border-t border-gray-100 text-left">
            <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-gray-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('voiceTryExamples')}</span>
            </div>

            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {SAMPLE_VOICE_PROMPTS.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTranscript(sample.prompt);
                    handleConfirmTranscript(sample.prompt);
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-gray-50 hover:bg-rose-50 hover:border-rose-200 border border-gray-200 text-xs font-medium text-gray-800 flex items-center justify-between transition-colors group cursor-pointer"
                  id={`simulated-voice-prompt-${idx}`}
                >
                  <span className="truncate pr-2 font-semibold">{sample.label}</span>
                  <Play className="w-3 h-3 text-rose-500 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
