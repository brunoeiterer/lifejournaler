'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import enTranslations from '../../../messages/en-US.json';

// Type for the context
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translations: Record<string, string>;
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Hook to use the LanguageContext
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// The provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const initialTranslations = enTranslations;

  const [language, setLanguage] = useState<string>(navigator.language);
  const [translations, setTranslations] = useState<Record<string, string>>(initialTranslations);

  const switchLanguage = (lang: string) => {
    setLanguage(lang);
    loadTranslations(lang);
    localStorage.setItem('language', lang); // Store in localStorage for persistence
  };

  const loadTranslations = (lang: string) => {
    import(`../../../messages/${lang}.json`) // Dynamically load language files
      .then((module) => {
        setTranslations(module.default);
      })
      .catch((error) => console.error('Error loading language file:', error));
  };

  useEffect(() => {
    switchLanguage(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};
