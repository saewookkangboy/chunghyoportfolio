import { GoogleGenAI } from "@google/genai";
import { ExtractedProject } from "../utils/pdfExtractor";
import { ProjectItem } from "../types";

export const extractProjectsFromPDF = async (
  pdfText: string
): Promise<ExtractedProject[]> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing");
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
다음은 이력서 PDF에서 추출한 텍스트입니다. 이 텍스트에서 프로젝트 정보를 추출해주세요.

요구사항:
1. 타임스탬프(연도 YYYY, 월 MM, 일 DD)를 기준으로 프로젝트를 구분합니다
2. 각 프로젝트에서 다음 정보를 추출합니다:
   - 기업명/클라이언트명
   - 프로젝트명/프로젝트 내용
   - 주요 업무 (배열로)
   - 기간 (YYYY.MM.DD 형식 또는 YYYY.MM 형식)

출력 형식은 반드시 다음 JSON 형식을 따라야 합니다:
[
  {
    "period": "2025.04.01",
    "company": "기업명",
    "projectName": "프로젝트명 또는 프로젝트 내용",
    "description": "프로젝트 설명",
    "tasks": ["주요 업무 1", "주요 업무 2", "주요 업무 3"]
  }
]

중요:
- period는 YYYY.MM.DD 또는 YYYY.MM 형식으로 작성
- 날짜 정보가 없으면 가장 가까운 날짜를 추정하거나 "YYYY.01" 형식 사용
- tasks는 최소 2개 이상 추출
- JSON 형식만 반환하고 다른 설명은 포함하지 마세요

PDF 텍스트:
${pdfText.substring(0, 50000)} ${pdfText.length > 50000 ? '...(텍스트가 길어 일부만 표시)' : ''}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
      config: {
        responseMimeType: 'application/json',
      }
    });

    const responseText = response.text || '[]';
    
    // JSON 파싱 시도
    try {
      const extracted = JSON.parse(responseText) as ExtractedProject[];
      
      // 유효성 검사 및 정리
      return extracted
        .filter((item) => item.period && item.company && item.projectName)
        .map((item) => ({
          ...item,
          tasks: item.tasks || [],
          description: item.description || item.projectName,
        }));
    } catch (parseError) {
      console.error('JSON 파싱 오류:', parseError);
      console.error('응답 텍스트:', responseText);
      
      // JSON 파싱 실패 시 텍스트에서 수동 추출 시도
      return extractProjectsFromText(pdfText);
    }
  } catch (error) {
    console.error("PDF 추출 서비스 오류:", error);
    throw new Error("프로젝트 정보 추출 중 오류가 발생했습니다: " + (error as Error).message);
  }
};

// JSON 파싱 실패 시 대체 방법: 텍스트 기반 추출
const extractProjectsFromText = (text: string): ExtractedProject[] => {
  const projects: ExtractedProject[] = [];
  
  // 날짜 패턴으로 섹션 찾기
  const datePattern = /(\d{4})[.\-\/](\d{1,2})([.\-\/](\d{1,2}))?/g;
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  
  let currentProject: Partial<ExtractedProject> | null = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const dateMatch = line.match(datePattern);
    
    if (dateMatch) {
      // 이전 프로젝트 저장
      if (currentProject && currentProject.company) {
        projects.push(currentProject as ExtractedProject);
      }
      
      // 새 프로젝트 시작
      const dateStr = dateMatch[0].replace(/[-\/]/g, '.');
      currentProject = {
        period: dateStr,
        company: '',
        projectName: '',
        description: '',
        tasks: [],
      };
    } else if (currentProject) {
      // 회사명 추출 (일반적으로 날짜 다음 줄)
      if (!currentProject.company && line.length < 50) {
        currentProject.company = line.trim();
      } else if (!currentProject.projectName && line.length < 100) {
        currentProject.projectName = line.trim();
      } else if (line.includes('업무') || line.includes('담당') || line.includes('역할')) {
        currentProject.tasks = currentProject.tasks || [];
        currentProject.tasks.push(line.trim());
      }
    }
  }
  
  // 마지막 프로젝트 저장
  if (currentProject && currentProject.company) {
    projects.push(currentProject as ExtractedProject);
  }
  
  return projects.filter(p => p.company && p.projectName);
};

