import { generateFinalPrompt } from "../utils/generatePrompt";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY );

export async function runPrompt(formData){
  const prompt = generateFinalPrompt(formData);
  if (!prompt) {
    throw new Error("Incomplete form data");
  }

  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([prompt]);
    

    let text = await result.response.text(); // ✅ This is valid
    text = text.trim()
      .replace(/^```json/, '')
      .replace(/^```/, '')
      .replace(/```$/, '');
    console.log("Gemini response text:", text);
    return text;
  } catch (error) {
    console.error("Error in runPrompt:", error);
    throw error;
  }
}