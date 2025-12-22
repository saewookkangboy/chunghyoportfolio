import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import { PortfolioData, UILabels, Language } from '../types';
import { RESUME_DATA_KO, RESUME_DATA_EN, RESUME_DATA_JA, UI_LABELS } from '../constants';
import { loadPortfolioData, getDefaultData } from '../utils/adminStorage';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  data: PortfolioData;
  labels: UILabels;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ko');

  const data = useMemo(() => {
    // 저장된 데이터가 있으면 우선 사용, 없으면 기본값 사용
    const saved = loadPortfolioData(language);
    return saved || getDefaultData(language);
  }, [language]);

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