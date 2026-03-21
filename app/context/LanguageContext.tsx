"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (en: string, id: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  toggleLang: () => {},
  t: (en: string) => en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'en' ? 'id' : 'en');
  }, []);

  const t = useCallback((en: string, id: string) => {
    return lang === 'en' ? en : id;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
