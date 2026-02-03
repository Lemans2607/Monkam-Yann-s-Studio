import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
} else {
  console.warn("API_KEY is not defined. Gemini features will not work.");
}

export const generateChatResponse = async (
  prompt: string, 
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  if (!genAI) {
    return "Le service d'intelligence artificielle est temporairement indisponible (Clé API manquante).";
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "Tu es l'IA de Yann's Note, un assistant expert en clarté. Tu es ancré sur des documents académiques et professionnels fiables. Tu ne dois jamais halluciner. Si tu ne sais pas, dis-le. Tu aides les étudiants camerounais et les entrepreneurs. Tes réponses sont précises, structurées et bienveillantes.\n\nRÈGLES STRICTES DE FORMATAGE :\n1. TEXTE BRUT UNIQUEMENT : N'utilise JAMAIS de Markdown (pas de gras **, pas d'italique *, pas de titres #, pas de blocs de code ```).\n2. LISTES : Utilise de simples tirets (-) pour les listes à puces.\n3. PARAGRAPHES : Utilise des sauts de ligne doubles pour séparer les paragraphes.\n4. CITATIONS : Si tu cites une source, un article de loi ou un document, utilise ce format exact à la fin de la phrase ou du paragraphe : [Source : Nom du document / Article X]."
    });
    
    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    
    return response.text() || "Désolé, je n'ai pas pu générer une réponse.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Une erreur est survenue lors de la communication avec le Cerveau Numérique. Détails : " + (error as Error).message;
  }
};

export const generateThinkingResponse = async (
  prompt: string,
  systemInstruction: string = "Tu es un expert analytique."
): Promise<string> => {
  if (!genAI) {
    return "Service IA indisponible (Clé API manquante).";
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      systemInstruction: systemInstruction
    });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return response.text() || "Analyse terminée, mais aucune réponse générée.";
  } catch (error) {
    console.error("Gemini Thinking Error:", error);
    return "Le processus de réflexion complexe a rencontré une erreur. Veuillez réessayer. Détails : " + (error as Error).message;
  }
};

export const editImageWithGenAI = async (
  base64Image: string,
  mimeType: string,
  prompt: string
): Promise<string | null> => {
  if (!genAI) {
    console.warn("AI service not initialized");
    return null;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: mimeType,
          data: base64Image
        }
      },
      { text: prompt }
    ]);

    const response = await result.response;
    
    // Cherche les données d'image dans la réponse
    if (response.candidates && response.candidates[0].content) {
      const parts = response.candidates[0].content.parts;
      for (const part of parts) {
        if ('inlineData' in part && part.inlineData?.data) {
          return part.inlineData.data;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Edit Error:", error);
    return null;
  }
};
