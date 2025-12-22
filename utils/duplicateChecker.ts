import { ProjectItem } from '../types';
import { ExtractedProject } from './pdfExtractor';

/**
 * 타임스탬프(period)를 정규화하여 비교
 */
const normalizePeriod = (period: string): string => {
  if (!period) return '';
  
  // YYYY.MM.DD 또는 YYYY.MM 형식으로 정규화
  const parts = period.split(/[.\-\/]/).filter(p => p);
  if (parts.length >= 2) {
    const year = parts[0];
    const month = parts[1].padStart(2, '0');
    return `${year}.${month}`;
  }
  return period.trim();
};

/**
 * 프로젝트명/클라이언트명을 정규화하여 비교 (대소문자 무시, 공백 제거)
 */
const normalizeName = (name: string): string => {
  if (!name) return '';
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
};

/**
 * 두 프로젝트가 중복인지 확인
 * - 타임스탬프(period)가 같거나 유사한 경우
 * - 프로젝트명/클라이언트명이 같거나 유사한 경우
 */
export const isDuplicateProject = (
  extracted: ExtractedProject,
  existing: ProjectItem
): boolean => {
  // 1. 타임스탬프 비교 (년도와 월이 같으면 중복으로 간주)
  const extractedPeriod = normalizePeriod(extracted.period);
  const existingPeriod = normalizePeriod(existing.period);
  
  if (extractedPeriod && existingPeriod && extractedPeriod === existingPeriod) {
    // 2. 프로젝트명/클라이언트명 비교
    const extractedName = normalizeName(extracted.company || extracted.projectName);
    const existingName = normalizeName(existing.client);
    
    // 이름이 완전히 일치하거나 포함 관계인 경우
    if (extractedName === existingName) {
      return true;
    }
    
    // 한쪽이 다른 쪽을 포함하는 경우 (예: "카카오" vs "카카오 코퍼레이션")
    if (extractedName && existingName) {
      if (extractedName.includes(existingName) || existingName.includes(extractedName)) {
        // 이름이 유사하고 타임스탬프가 같으면 중복
        return true;
      }
    }
  }
  
  return false;
};

/**
 * 추출된 프로젝트 목록에서 중복 항목 찾기
 */
export const findDuplicates = (
  extractedProjects: ExtractedProject[],
  existingProjects: ProjectItem[]
): {
  duplicates: number[]; // 중복된 추출 프로젝트의 인덱스
  duplicateInfo: Map<number, ProjectItem>; // 인덱스 -> 기존 프로젝트 매핑
} => {
  const duplicates: number[] = [];
  const duplicateInfo = new Map<number, ProjectItem>();
  
  extractedProjects.forEach((extracted, index) => {
    const duplicate = existingProjects.find(existing => 
      isDuplicateProject(extracted, existing)
    );
    
    if (duplicate) {
      duplicates.push(index);
      duplicateInfo.set(index, duplicate);
    }
  });
  
  return { duplicates, duplicateInfo };
};

/**
 * 중복되지 않은 프로젝트만 필터링
 */
export const filterDuplicates = (
  extractedProjects: ExtractedProject[],
  existingProjects: ProjectItem[]
): ExtractedProject[] => {
  return extractedProjects.filter(extracted => 
    !existingProjects.some(existing => isDuplicateProject(extracted, existing))
  );
};

