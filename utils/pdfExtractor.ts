import * as pdfjsLib from 'pdfjs-dist';

// PDF.js worker 설정 (CDN 사용)
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
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
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }
    
    return fullText;
  } catch (error) {
    console.error('PDF 추출 오류:', error);
    throw new Error('PDF 파일을 읽는 중 오류가 발생했습니다.');
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

