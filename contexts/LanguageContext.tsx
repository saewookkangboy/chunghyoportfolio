import React, { createContext, useState, useContext, ReactNode } from 'react';
import { PortfolioData, UILabels, Language } from '../types';
import { RESUME_DATA_KO, RESUME_DATA_EN, RESUME_DATA_JA, UI_LABELS } from '../constants';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  data: PortfolioData;
  labels: UILabels;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ko');

  const data = 
    language === 'en' ? RESUME_DATA_EN : 
    language === 'ja' ? RESUME_DATA_JA : 
    RESUME_DATA_KO;

  const labels = UI_LABELS[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, data, labels }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};