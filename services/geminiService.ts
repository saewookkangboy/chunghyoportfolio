import { GoogleGenAI } from "@google/genai";
import { PortfolioData } from "../types";

export const generateResumeAnswer = async (userQuestion: string, contextData: PortfolioData, language: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Prepare the resume context
    const context = JSON.stringify(contextData, null, 2);
    
    let langInstruction = "Answer in Korean.";
    if (language === 'en') langInstruction = "Answer in English.";
    if (language === 'ja') langInstruction = "Answer in Japanese.";

    const systemInstruction = `
      You are an AI Assistant representing Park Chunghyo (박충효).
      Your goal is to answer questions about his career, skills, and projects based strictly on the provided resume data.
      
      Current Language Setting: ${language}
      ${langInstruction}
      
      Resume Data:
      ${context}

      Guidelines:
      1. Be professional, concise, and polite.
      2. If the answer is not in the data, state that you don't have that specific information.
      3. Highlight key achievements (numbers, KPIs) when relevant.
      4. Adopt a tone that is confident yet humble.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: userQuestion }]
        }
      ],
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "죄송합니다. 답변을 생성하는데 문제가 발생했습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "현재 AI 서비스 연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.";
  }
};