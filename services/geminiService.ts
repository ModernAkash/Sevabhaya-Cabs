import { GoogleGenAI, Type } from "@google/genai";
import { ItinerarySuggestion } from '../types';

// Initialize Gemini
// Note: process.env.API_KEY is assumed to be available as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTripItinerary = async (
  destination: string, 
  days: string,
  mood: string
): Promise<ItinerarySuggestion> => {
  
  if (!destination) throw new Error("Destination is required");

  try {
    const prompt = `Plan a short trip itinerary starting from Pune to ${destination} for ${days}. 
    The traveler is interested in: ${mood || 'general sightseeing'}.
    Provide a catchy title, a brief engaging description, estimated travel duration from Pune by car, and a list of 3-4 bullet point highlights.
    Keep it concise and suitable for a car rental website.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            duration: { type: Type.STRING },
            highlights: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as ItinerarySuggestion;

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback data in case of error
    return {
      title: `Trip to ${destination}`,
      description: "Experience a wonderful journey with Sevabhaya Cabs. Enjoy the scenic drive and local attractions.",
      duration: "Variable",
      highlights: ["Scenic Drive", "Local Food", "Relaxation"]
    };
  }
};
