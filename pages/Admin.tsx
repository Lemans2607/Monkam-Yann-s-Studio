import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey: apiKey });
} else {
  console.warn("API_KEY is not defined. Gemini features will not work.");
}

export const generateChatResponse = async (
  prompt: string, 
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  if (!ai) {
    return "Le service d'intelligence artificielle est temporairement indisponible (Clé API manquante).";
  }

  try {
    const model = ai.models;
    
    // Construct the full conversation history for context
    const contents = [
      ...history,
      { role: 'user', parts: [{ text: prompt }] }
    ];

    // Using gemini-3-flash-preview for fast, chat-like interactions
    const response = await model.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: "Tu es l'IA de Yann's Note, un assistant expert en clarté. Tu es ancré sur des documents académiques et professionnels fiables. Tu ne dois jamais halluciner. Si tu ne sais pas, dis-le. Tu aides les étudiants camerounais et les entrepreneurs. Tes réponses sont précises, structurées et bienveillantes.\n\nRÈGLES STRICTES DE FORMATAGE :\n1. TEXTE BRUT UNIQUEMENT : N'utilise JAMAIS de Markdown (pas de gras **, pas d'italique *, pas de titres #, pas de blocs de code ```).\n2. LISTES : Utilise de simples tirets (-) pour les listes à puces.\n3. PARAGRAPHES : Utilise des sauts de ligne doubles pour séparer les paragraphes.\n4. CITATIONS : Si tu cites une source, un article de loi ou un document, utilise ce format exact à la fin de la phrase ou du paragraphe : [Source : Nom du document / Article X].\n\nExemple de réponse attendue :\nVoici les étapes pour créer une entreprise :\n- Étape 1 : Rédiger les statuts\n- Étape 2 : Enregistrer aux impôts\n\nCeci est conforme à la réglementation OHADA. [Source : Acte uniforme OHADA Article 10]",
      }
    });

    return response.text || "Désolé, je n'ai pas pu générer une réponse.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Une erreur est survenue lors de la communication avec le Cerveau Numérique.";
  }
};

export const generateThinkingResponse = async (
  prompt: string,
  systemInstruction: string = "Tu es un expert analytique."
): Promise<string> => {
  if (!ai) {
    return "Service IA indisponible (Clé API manquante).";
  }

  try {
    const model = ai.models;
    
    // Using gemini-3-pro-preview with thinkingBudget for complex tasks
    const response = await model.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        role: 'user',
        parts: [{ text: prompt }]
      },
      config: {
        systemInstruction: systemInstruction,
        // High thinking budget for deep reasoning
        thinkingConfig: { thinkingBudget: 32768 }, 
        // Do not set maxOutputTokens when using thinking budget to avoid truncation
      }
    });

    return response.text || "Analyse terminée, mais aucune réponse générée.";
  } catch (error) {
    console.error("Gemini Thinking Error:", error);
    return "Le processus de réflexion complexe a rencontré une erreur. Veuillez réessayer.";
  }
};

export const editImageWithGenAI = async (
  base64Image: string,
  mimeType: string,
  prompt: string
): Promise<string | null> => {
  if (!ai) {
    console.warn("AI service not initialized");
    return null;
  }

  try {
    const model = ai.models;
    const response = await model.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
            {
                inlineData: {
                    mimeType: mimeType,
                    data: base64Image
                }
            },
            { text: prompt }
        ]
      }
    });

    // Iterate to find image part in response
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.data) {
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
