import React, { useState } from 'react';
import { X, Send, Sparkles, Bot, User, Mic, ShoppingBag, ArrowRight } from 'lucide-react';
import { ChatMessage, Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { normalizeQuery } from '../services/normalization/conceptExtractor';
import { PRODUCTS } from '../data/products';

interface SaathiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (p: Product) => void;
  onOpenVoiceModal: () => void;
}

export const SaathiAssistantDrawer: React.FC<SaathiAssistantDrawerProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onOpenVoiceModal,
}) => {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm_init',
      sender: 'saathi',
      text: 'Namaste! I am Myntra Saathi. You can speak or type in Telugu, Hindi, Tamil, or English. How can I assist your regional shopping today?',
      translatedText: language === 'te'
        ? 'నమస్కారం! నేను మింత్రా సాథీ. మీరు తెలుగు, హిందీ, తమిళం లేదా ఇంగ్లీష్‌లలో మాట్లాడవచ్చు లేదా టైప్ చేయవచ్చు.'
        : language === 'hi'
        ? 'नमस्ते! मैं मिंत्रा साथी हूँ। आप हिंदी, तेलुगु, तमिल या अंग्रेजी में पूछ सकते हैं।'
        : language === 'ta'
        ? 'வணக்கம்! நான் மிந்த்ரா சாதி. தமிழ், தெலுங்கு, இந்தி அல்லது ஆங்கிலத்தில் கேளுங்கள்.'
        : undefined,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Process with normalization engine
    const normalized = normalizeQuery(text);

    // Search matching products
    const matches = PRODUCTS.filter((p) => {
      if (normalized.priceMax && p.price > normalized.priceMax) return false;
      if (normalized.colors.length > 0 && !normalized.colors.some(c => p.colors.map(col => col.toLowerCase()).includes(c.toLowerCase()))) {
        return false;
      }
      if (normalized.category && !p.category.toLowerCase().includes(normalized.category.toLowerCase())) {
        return false;
      }
      return true;
    }).slice(0, 3);

    // Construct Saathi response
    let saathiReply = '';
    if (normalized.detectedLanguage === 'te') {
      saathiReply = `నేను మీ శోధనను అర్థం చేసుకున్నాను (${normalized.normalizedTerms.join(', ')}). ఇక్కడ కొన్ని అత్యుత్తమ ఎంపికలు ఉన్నాయి:`;
    } else if (normalized.detectedLanguage === 'hi') {
      saathiReply = `मैंने आपकी खोज (${normalized.normalizedTerms.join(', ')}) को समझ लिया है। आपके लिए कुछ बेहतरीन विकल्प:`;
    } else if (normalized.detectedLanguage === 'ta') {
      saathiReply = `உங்கள் தேடலை புரிந்து கொண்டேன் (${normalized.normalizedTerms.join(', ')}). உங்களுக்கான சிறந்த தேர்வுகள்:`;
    } else {
      saathiReply = `I understood your query for ${normalized.normalizedTerms.join(' • ')} (Confidence: ${(normalized.confidenceScore * 100).toFixed(0)}%). Here are top recommendations:`;
    }

    setTimeout(() => {
      const saathiMsg: ChatMessage = {
        id: `s_${Date.now()}`,
        sender: 'saathi',
        text: saathiReply,
        suggestedProducts: matches.length > 0 ? matches : PRODUCTS.slice(0, 2),
        concepts: normalized.concepts,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, saathiMsg]);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-gray-200">
        
        {/* Drawer Header */}
        <div className="p-4 bg-gradient-to-r from-rose-900 via-pink-900 to-amber-950 text-white flex items-center justify-between border-b border-rose-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm tracking-wide text-amber-300">
                {t('saathiAssistantHeader')}
              </h3>
              <p className="text-[10px] text-rose-200">{t('saathiAssistantSub')}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            id="close-assistant-drawer-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-2xs space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-rose-600 text-white rounded-br-none font-medium'
                    : 'bg-white border border-gray-200/80 text-gray-900 rounded-bl-none'
                }`}
              >
                <p>{msg.text}</p>
                {msg.translatedText && (
                  <p className="text-[11px] text-rose-700 italic bg-rose-50 p-2 rounded-xl border border-rose-100">
                    "{msg.translatedText}"
                  </p>
                )}

                {/* Concept breakdown tags inside chat */}
                {msg.concepts && msg.concepts.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {msg.concepts.map((c) => (
                      <span
                        key={c.id}
                        className="text-[9px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full border border-amber-200"
                      >
                        {c.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Product recommendation cards inside chat */}
              {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                <div className="mt-2 w-full space-y-2">
                  <span className="text-[10px] uppercase font-black text-gray-400 block px-1">
                    Recommended Products:
                  </span>
                  {msg.suggestedProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onSelectProduct(p);
                        onClose();
                      }}
                      className="p-2.5 rounded-2xl bg-white border border-gray-200 hover:border-rose-300 shadow-2xs flex items-center gap-3 cursor-pointer transition-all hover:bg-rose-50/30 group"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-12 h-16 rounded-xl object-cover object-top shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-extrabold text-rose-600 uppercase block">
                          {p.brand}
                        </span>
                        <h5 className="text-xs font-bold text-gray-900 truncate">
                          {p.regionalNames[language] || p.name}
                        </h5>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-black text-gray-900">₹{p.price}</span>
                          <span className="text-[10px] text-gray-400 line-through">₹{p.originalPrice}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-rose-600 transition-colors shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => handleSendMessage('Suggest Ugadi / Festival Outfits')}
            className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 font-bold shrink-0 text-[11px] cursor-pointer"
          >
            🌸 Festival Outfits
          </button>
          <button
            onClick={() => handleSendMessage('2000 lopu pattu saree')}
            className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-900 border border-rose-200 hover:bg-rose-100 font-bold shrink-0 text-[11px] cursor-pointer"
          >
            ✨ 2000 లోపు పట్టు చీర
          </button>
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 bg-white border-t border-gray-200 flex items-center gap-2">
          <button
            onClick={onOpenVoiceModal}
            className="p-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-rose-100 hover:text-rose-600 transition-colors cursor-pointer"
            title="Voice Input"
          >
            <Mic className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t('typeYourMessage')}
            className="flex-1 py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/30"
            id="saathi-chat-input"
          />

          <button
            onClick={() => handleSendMessage()}
            className="p-2.5 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition-colors shadow-xs cursor-pointer"
            id="send-saathi-chat-btn"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
