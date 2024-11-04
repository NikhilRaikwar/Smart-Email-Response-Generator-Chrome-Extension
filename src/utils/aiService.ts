import { GoogleGenerativeAI } from '@google/generative-ai';
import { ToneType } from '../types';

const genAI = new GoogleGenerativeAI('AIzaSyCqTew14nrNZqmQpfuVZxVAZ55NStL-_9M');

const getPrompt = (text: string, tone: ToneType) => {
  const prompts = {
    professional: `Please rewrite the following text in a professional and polished tone, suitable for business communication: "${text}"`,
    friendly: `Please rewrite the following text in a warm and friendly tone, while maintaining professionalism: "${text}"`,
    casual: `Please rewrite the following text in a casual and conversational tone: "${text}"`,
    formal: `Please rewrite the following text in a formal and respectful tone: "${text}"`
  };
  return prompts[tone];
};

export async function generateEmailResponse(text: string, tone: ToneType): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = getPrompt(text, tone);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error('Failed to generate response. Please try again.');
  }
}

export async function adjustTone(text: string, tone: ToneType): Promise<string> {
  return generateEmailResponse(text, tone);
}