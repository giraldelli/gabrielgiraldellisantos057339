import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePetBio = async (name: string, species: string, breed: string = ''): Promise<string> => {
  try {
    const prompt = `Escreva uma biografia curta, fofa e engraçada (máximo de 2 frases) para um pet.
    Nome: ${name}
    Espécie: ${species}
    Raça: ${breed || 'Indefinida'}
    Idioma: Português do Brasil.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Um pet adorável e cheio de amor para dar!";
  } catch (error) {
    console.error("Erro ao gerar biografia:", error);
    return "Um companheiro fiel pronto para novas aventuras!";
  }
};