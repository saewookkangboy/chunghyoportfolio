import * as pdfjsLib from 'pdfjs-dist';

// PDF.js worker 설정
// 개발/프로덕션 모두 CDN 사용 (가장 안정적)
if (typeof window !== 'undefined') {
  // 모든 환경에서 CDN 사용 (로컬 파일 로드 문제 방지)
  const version = '4.0.379'; // 안정적인 버전
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;
  console.log('PDF.js Worker 설정 (CDN):', pdfjsLib.GlobalWorkerOptions.workerSrc);
}

export interface ExtractedProject {
  period: string; // YYYY.MM.DD 형식
  company: string;
  projectName: string;
  description: string;
  tasks: string[];
  rawText?: string; // 원본 텍스트 (디버깅용)
}

export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    // 파일 크기 체크 (50MB 제한)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      throw new Error(`파일 크기가 너무 큽니다. (최대 50MB, 현재: ${(file.size / 1024 / 1024).toFixed(2)}MB)`);
    }

    console.log('PDF 파일 읽기 시작:', file.name, `(${(file.size / 1024).toFixed(2)}KB)`);
    
    const arrayBuffer = await file.arrayBuffer();
    console.log('ArrayBuffer 생성 완료');
    
    const pdf = await pdfjsLib.getDocument({ 
      data: arrayBuffer,
      verbosity: 0 // 경고 메시지 최소화
    }).promise;
    
    console.log(`PDF 로드 완료: ${pdf.numPages}페이지`);
    
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      try {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
        console.log(`페이지 ${i}/${pdf.numPages} 추출 완료`);
      } catch (pageError) {
        console.warn(`페이지 ${i} 추출 실패:`, pageError);
        // 개별 페이지 실패해도 계속 진행
      }
    }
    
    if (!fullText || fullText.trim().length === 0) {
      throw new Error('PDF에서 텍스트를 추출할 수 없습니다. 이미지로만 구성된 PDF이거나 텍스트가 포함되지 않은 파일일 수 있습니다.');
    }
    
    console.log(`텍스트 추출 완료: ${fullText.length}자`);
    return fullText;
  } catch (error) {
    console.error('PDF 추출 오류 상세:', error);
    
    if (error instanceof Error) {
      // 이미 상세한 에러 메시지가 있으면 그대로 사용
      if (error.message.includes('파일 크기') || error.message.includes('텍스트를 추출할 수 없습니다')) {
        throw error;
      }
      throw new Error(`PDF 파일을 읽는 중 오류가 발생했습니다: ${error.message}`);
    }
    throw new Error('PDF 파일을 읽는 중 알 수 없는 오류가 발생했습니다.');
  }
};

export const parseDate = (text: string): { year?: string; month?: string; day?: string } | null => {
  // 다양한 날짜 형식 매칭
  const patterns = [
    /(\d{4})[.\-\/](\d{1,2})[.\-\/](\d{1,2})/, // YYYY.MM.DD, YYYY-MM-DD, YYYY/MM/DD
    /(\d{4})[.\-\/](\d{1,2})/, // YYYY.MM, YYYY-MM
    /(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/, // YYYY년 MM월 DD일
    /(\d{4})년\s*(\d{1,2})월/, // YYYY년 MM월
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const year = match[1];
      const month = match[2]?.padStart(2, '0');
      const day = match[3]?.padStart(2, '0');
      return { year, month, day };
    }
  }
  return null;
};

