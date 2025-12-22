import { PortfolioData } from '../types';
import { RESUME_DATA_KO, RESUME_DATA_EN, RESUME_DATA_JA } from '../constants';

const STORAGE_KEY_PREFIX = 'portfolio_admin_';

export const savePortfolioData = (language: 'ko' | 'en' | 'ja', data: PortfolioData): void => {
  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${language}`, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save portfolio data:', error);
  }
};

export const loadPortfolioData = (language: 'ko' | 'en' | 'ja'): PortfolioData | null => {
  try {
    const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${language}`);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load portfolio data:', error);
  }
  return null;
};

export const getDefaultData = (language: 'ko' | 'en' | 'ja'): PortfolioData => {
  switch (language) {
    case 'ko':
      return RESUME_DATA_KO;
    case 'en':
      return RESUME_DATA_EN;
    case 'ja':
      return RESUME_DATA_JA;
  }
};

export const exportData = (language: 'ko' | 'en' | 'ja'): void => {
  const data = loadPortfolioData(language) || getDefaultData(language);
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `portfolio_${language}_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const importData = (language: 'ko' | 'en' | 'ja', file: File): Promise<PortfolioData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as PortfolioData;
        savePortfolioData(language, data);
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

export const resetToDefault = (language: 'ko' | 'en' | 'ja'): void => {
  localStorage.removeItem(`${STORAGE_KEY_PREFIX}${language}`);
};

