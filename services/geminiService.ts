
import { GoogleGenAI, Type } from "@google/genai";
import { HabitEntry, AIInsight } from "../types";

export const getAIInsights = async (entries: HabitEntry[]): Promise<AIInsight> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  const recentEntries = entries.slice(-7); // Analyze last 7 days
  const prompt = `
    Analyze the following habit journal entries from the last 7 days and provide:
    1. A short, supportive summary of the user's current mental state and habits.
    2. Three actionable suggestions for improvement based on their 'things to improve' and 'new learnings'.
    3. A personalized daily affirmation.

    Entries:
    ${recentEntries.map(e => `
      Date: ${e.date}
      Mood Score: ${e.moodScore}/10
      Happy: ${e.happyReason}
      Anger: ${e.angerReason}
      Improvement Focus: ${e.thingsToImprove}
      Screen Time: ${e.screenTime}h
      Learnings: ${e.newLearnings}
    `).join('\n')}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            affirmation: { type: Type.STRING }
          },
          required: ["summary", "suggestions", "affirmation"]
        }
      }
    });

    return JSON.parse(response.text || "{}") as AIInsight;
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      summary: "I'm having trouble analyzing your entries right now, but keep up the great work of journaling!",
      suggestions: ["Stay consistent with your daily log", "Reflect on your small wins", "Ensure you get enough rest"],
      affirmation: "You are making progress every single day."
    };
  }
};
