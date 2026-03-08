'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import enTranslations from '../../../messages/en-US.json';
import { useAuth } from './AuthContext';
import { supabase } from '@/services/supabaseClient';
import { updateUserLanguage } from '@/services/backendApiService';

// Type for the context
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translations: Record<string, string>;
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const supportedLanguages = new Set<string>(['en-US', 'pt-BR']);

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

  const [language, setLanguage] = useState<string>(supportedLanguages.has(navigator.language) ? navigator.language : "en-US");
  const [translations, setTranslations] = useState<Record<string, string>>(initialTranslations);

  const { isSignedIn } = useAuth();

  const loadTranslations = (lang: string) => {
    import(`../../../messages/${lang}.json`) // Dynamically load language files
      .then((module) => {
        setTranslations(module.default);
      })
      .catch((error) => console.error('Error loading language file:', error));
  };

  useEffect(() => {
    if (isSignedIn) {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session?.user.user_metadata?.language) {
          setLanguage(data.session.user.user_metadata.language);
        }
      });
    }
  }, [isSignedIn]);

  const handleSetLanguage = async (newLang: string) => {
    setLanguage(newLang);
    if (isSignedIn) {
      await updateUserLanguage(newLang);
    }
  };

  useEffect(() => {
    loadTranslations(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};
