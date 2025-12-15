import { GoogleGenAI } from "@google/genai";
import { RESUME_DATA } from "../constants";

export const generateResumeAnswer = async (userQuestion: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Prepare the resume context
    const context = JSON.stringify(RESUME_DATA, null, 2);
    
    const systemInstruction = `
      You are an AI Assistant representing Park Chunghyo (박충효).
      Your goal is to answer questions about his career, skills, and projects based strictly on the provided resume data.
      
      Resume Data:
      ${context}

      Guidelines:
      1. Answer in Korean (unless asked in English).
      2. Be professional, concise, and polite.
      3. If the answer is not in the data, state that you don't have that specific information.
      4. Highlight key achievements (numbers, KPIs) when relevant.
      5. Adopt a tone that is confident yet humble, matching his summary "Specialist to Expert".
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