import { PortfolioData } from '../types';
import { translatePortfolioData } from '../services/translationService';
import { savePortfolioData, loadPortfolioData, getDefaultData } from './adminStorage';

/**
 * 한국어 데이터 저장 시 영어와 일본어로 자동 번역하여 저장
 */
export const saveWithAutoTranslation = async (
  koreanData: PortfolioData,
  onProgress?: (message: string) => void
): Promise<void> => {
  // 한국어 데이터 저장
  savePortfolioData('ko', koreanData);
  onProgress?.('한국어 데이터 저장 완료');

  // 영어 번역
  try {
    onProgress?.('영어 번역 중...');
    const englishData = await translatePortfolioData(koreanData, 'en');
    savePortfolioData('en', englishData);
    onProgress?.('영어 번역 완료');
  } catch (error) {
    console.error('영어 번역 오류:', error);
    onProgress?.('영어 번역 실패 (기존 데이터 유지)');
  }

  // 일본어 번역
  try {
    onProgress?.('일본어 번역 중...');
    const japaneseData = await translatePortfolioData(koreanData, 'ja');
    savePortfolioData('ja', japaneseData);
    onProgress?.('일본어 번역 완료');
  } catch (error) {
    console.error('일본어 번역 오류:', error);
    onProgress?.('일본어 번역 실패 (기존 데이터 유지)');
  }
};

/**
 * 특정 섹션만 업데이트하고 번역
 */
export const updateSectionWithTranslation = async (
  section: keyof PortfolioData,
  koreanValue: any,
  onProgress?: (message: string) => void
): Promise<void> => {
  // 한국어 데이터 로드
  const koData = loadPortfolioData('ko') || getDefaultData('ko');
  const updatedKoData = {
    ...koData,
    [section]: koreanValue,
  };

  // 전체 데이터 저장 및 번역
  await saveWithAutoTranslation(updatedKoData, onProgress);
};

