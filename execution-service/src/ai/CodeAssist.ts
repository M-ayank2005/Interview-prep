import { GoogleGenAI } from '@google/genai';

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

const CODE_ASSIST_PROMPT = `You are an expert coding assistant integrated into an IDE.
Provide concise, helpful suggestions when asked about code.
- If asked for a hint, give a small nudge, not the full solution.
- If asked to explain an error, be clear and brief.
- If asked to optimize, suggest improvements with brief reasoning.
Keep responses under 200 words. Use code formatting when showing code.`;

export async function getCodeSuggestion(code: string, language: string, query: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return "AI Code Assist is unavailable. Set GEMINI_API_KEY.";

  const genai = new GoogleGenAI({ apiKey });

  const prompt = `Language: ${language}\n\nCode:\n\`\`\`${language}\n${code}\n\`\`\`\n\nUser question: ${query}`;

  try {
    const response = await genai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: CODE_ASSIST_PROMPT,
        maxOutputTokens: 400,
        temperature: 0.3,
      },
    });

    return response.text ?? 'No suggestion available.';
  } catch (error: any) {
    console.error('[CodeAssist] Error:', error.message);
    return `Error generating suggestion: ${error.message}`;
  }
}
