import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { UI_TRANSLATIONS, SUPPORTED_LANGUAGES, LanguageOption } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  supportedLanguages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('myntra_saathi_lang');
      if (saved && ['en', 'te', 'hi', 'ta'].includes(saved)) {
        return saved as Language;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('myntra_saathi_lang', lang);
    } catch {
      // ignore
    }
  };

  const t = (key: string): string => {
    const langDict = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
    return langDict[key] || UI_TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, supportedLanguages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
