import { GoogleGenAI } from "@google/genai";
import { PortfolioData } from "../types";

const translateText = async (
  text: string,
  targetLanguage: 'en' | 'ja',
  context?: string
): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing");
    }

    if (!text || text.trim().length === 0) {
      return text;
    }

    const ai = new GoogleGenAI({ apiKey });

    const languageInstructions = {
      en: `Translate the following Korean text to natural, professional English. 
      Maintain the same tone and style. Use business/professional terminology appropriate for a resume or portfolio.
      Keep technical terms, company names, and proper nouns in their original form if they are commonly used internationally.
      Do not add explanations or notes, only return the translated text.`,
      ja: `次の韓国語テキストを自然でプロフェッショナルな日本語に翻訳してください。
      同じトーンとスタイルを維持してください。履歴書やポートフォリオに適したビジネス/プロフェッショナルな用語を使用してください。
      技術用語、会社名、固有名詞は国際的に一般的に使用されている場合は元の形式のままにしてください。
      説明や注釈を追加せず、翻訳されたテキストのみを返してください。`
    };

    const prompt = `${languageInstructions[targetLanguage]}

${context ? `Context: ${context}\n\n` : ''}Korean text to translate:
${text}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
    });

    return response.text?.trim() || text;
  } catch (error) {
    console.error(`Translation error (${targetLanguage}):`, error);
    return text; // 실패 시 원본 반환
  }
};

const translateArray = async (
  texts: string[],
  targetLanguage: 'en' | 'ja',
  context?: string
): Promise<string[]> => {
  if (texts.length === 0) return [];
  
  // 각 항목을 개별적으로 번역 (정확도 향상)
  // 하지만 너무 많으면 배치로 처리
  if (texts.length <= 5) {
    return Promise.all(
      texts.map(text => translateText(text, targetLanguage, context))
    );
  }
  
  // 많은 항목은 배치로 번역
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return texts; // API 키 없으면 원본 반환
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const languageInstructions = {
      en: `Translate the following Korean list items to natural, professional English. 
      Maintain the same order and format. Each item should be on a separate line.
      Use business/professional terminology appropriate for a resume or portfolio.
      Return only the translated items, one per line, without numbering or bullets.`,
      ja: `次の韓国語リスト項目を自然でプロフェッショナルな日本語に翻訳してください。
      同じ順序と形式を維持してください。各項目は別々の行に配置してください。
      履歴書やポートフォリオに適したビジネス/プロフェッショナルな用語を使用してください。
      番号や箇条書き記号なしで、翻訳された項目のみを1行に1つずつ返してください。`
    };

    const combinedText = texts.join('\n');
    const prompt = `${languageInstructions[targetLanguage]}

${context ? `Context: ${context}\n\n` : ''}Korean items to translate:
${combinedText}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
    });

    const translated = response.text?.trim() || combinedText;
    const lines = translated.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // 원본 개수와 맞추기
    return lines.length >= texts.length 
      ? lines.slice(0, texts.length)
      : [...lines, ...texts.slice(lines.length)];
  } catch (error) {
    console.error('Array translation error:', error);
    return texts; // 실패 시 원본 반환
  }
};

export const translatePortfolioData = async (
  koreanData: PortfolioData,
  targetLanguage: 'en' | 'ja'
): Promise<PortfolioData> => {
  try {
    console.log(`Translating to ${targetLanguage}...`);

    // Profile 번역
    const translatedProfile = {
      ...koreanData.profile,
      summary: await translateText(koreanData.profile.summary, targetLanguage, 'Profile summary'),
      quote: await translateText(koreanData.profile.quote, targetLanguage, 'Profile quote'),
      // name, englishName, email, phone, links는 번역하지 않음
    };

    // Projects 번역
    const translatedProjects = await Promise.all(
      koreanData.projects.map(async (project) => ({
        ...project,
        client: await translateText(project.client, targetLanguage, 'Company/Client name'),
        role: await translateText(project.role, targetLanguage, 'Project role'),
        description: await translateText(project.description, targetLanguage, 'Project description'),
        tasks: await translateArray(project.tasks, targetLanguage, 'Project tasks'),
        results: project.results ? await translateArray(project.results, targetLanguage, 'Project results') : undefined,
        // tags는 번역하지 않음 (기술 용어)
      }))
    );

    // Career History 번역
    const translatedCareer = await Promise.all(
      koreanData.careerHistory.map(async (career) => ({
        ...career,
        company: await translateText(career.company, targetLanguage, 'Company name'),
        role: await translateText(career.role, targetLanguage, 'Job role'),
        description: career.description ? await translateText(career.description, targetLanguage, 'Career description') : undefined,
        details: await translateArray(career.details, targetLanguage, 'Career details'),
      }))
    );

    // Skills 번역
    const translatedSkills = await Promise.all(
      koreanData.skills.map(async (skill) => ({
        name: await translateText(skill.name, targetLanguage, 'Skill category name'),
        items: await translateArray(skill.items, targetLanguage, 'Skill items'),
      }))
    );

    // Certifications 번역
    const translatedCertifications = await Promise.all(
      koreanData.certifications.map(async (cert) => ({
        ...cert,
        name: await translateText(cert.name, targetLanguage, 'Certification name'),
        issuer: cert.issuer ? await translateText(cert.issuer, targetLanguage, 'Certification issuer') : undefined,
        // date는 번역하지 않음
      }))
    );

    // Lectures 번역
    const translatedLectures = await Promise.all(
      koreanData.lectures.map(async (lecture) => ({
        ...lecture,
        title: await translateText(lecture.title, targetLanguage, 'Lecture title'),
        organizer: await translateText(lecture.organizer, targetLanguage, 'Lecture organizer'),
        role: await translateText(lecture.role, targetLanguage, 'Lecture role'),
        description: await translateText(lecture.description, targetLanguage, 'Lecture description'),
        details: await translateArray(lecture.details, targetLanguage, 'Lecture details'),
        // tags는 번역하지 않음 (기술 용어)
      }))
    );

    return {
      profile: translatedProfile,
      projects: translatedProjects,
      careerHistory: translatedCareer,
      skills: translatedSkills,
      certifications: translatedCertifications,
      lectures: translatedLectures,
    };
  } catch (error) {
    console.error('Portfolio translation error:', error);
    throw error;
  }
};

