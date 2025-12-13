import { GoogleGenAI, Type, FunctionDeclaration, Schema } from "@google/genai";
import { BOOKS } from "../constants";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// System instruction for the concierge
const SYSTEM_INSTRUCTION = `
You are the "Literary Concierge" for Bookera, a premium bookstore. 
Your tone is sophisticated, helpful, and knowledgeable.
You only answer questions about the books currently in our inventory: ${BOOKS.map(b => b.title).join(', ')}.
If a user asks about a book not in stock, politely apologize and suggest a similar one from our inventory.
Keep answers concise (under 50 words unless asked for more).
`;

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    summary: { type: Type.STRING, description: "A concise one-sentence summary of the book." },
    keyTakeaways: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3 distinct key takeaways or lessons.",
    },
    famousQuote: { type: Type.STRING, description: "A famous or impactful quote from the book." },
    targetAudience: { type: Type.STRING, description: "Who this book is best for (e.g., Entrepreneurs, Students)." },
  },
  required: ["summary", "keyTakeaways", "famousQuote", "targetAudience"],
};

export const getBookInsights = async (bookTitle: string, author: string) => {
  try {
    const prompt = `Analyze the book "${bookTitle}" by ${author}. Provide a sophisticated analysis suitable for a potential buyer.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: analysisSchema,
        temperature: 0.7,
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("No data returned");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return null;
  }
};

export const chatWithConcierge = async (history: { role: 'user' | 'model', parts: [{ text: string }] }[], message: string) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "My apologies, I am momentarily distracted. Please ask again.";
  }
};
