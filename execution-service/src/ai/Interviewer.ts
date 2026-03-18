import { GoogleGenAI } from '@google/genai';

const SYSTEM_PROMPT = `You are an expert technical interviewer at a top technology company (FAANG-level).
You are conducting a live coding interview with a candidate.

RULES:
1. Start by introducing yourself and the problem. Give the candidate a coding problem appropriate for their chosen difficulty level.
2. After presenting the problem, let the candidate think and code. Periodically check in.
3. When you receive code snapshots, analyze them silently. Only comment if:
   - The candidate seems stuck for a while
   - There is a fundamental logical error
   - The candidate explicitly asks for help
4. Ask follow-up questions about time/space complexity after the candidate finishes.
5. Be encouraging but honest. Provide hints when asked, not full solutions.
6. Keep responses concise (2-4 sentences max) since this is a live conversation.
7. At the end, provide a structured evaluation with scores out of 10 for:
   - Problem Solving Approach
   - Code Quality & Correctness
   - Communication
   - Time/Space Complexity Analysis
   - Overall Rating

IMPORTANT: You are having a real-time conversation. Keep answers short and conversational.
Do NOT write large blocks of code. Guide the candidate instead.`;

export interface InterviewState {
  sessionId: string;
  difficulty: string;
  topic: string;
  history: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>;
  codeSnapshots: string[];
  startTime: number;
}

const sessions = new Map<string, InterviewState>();

// Model can be configured via env var so users can switch between available models
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('[AI] GEMINI_API_KEY not set. AI features disabled.');
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

export async function startInterview(sessionId: string, difficulty: string, topic: string): Promise<string> {
  const genai = getGenAI();
  if (!genai) {
    return "AI Interviewer is currently unavailable. Please set GEMINI_API_KEY in the execution-service .env file.";
  }

  const state: InterviewState = {
    sessionId,
    difficulty,
    topic,
    history: [],
    codeSnapshots: [],
    startTime: Date.now(),
  };

  const userMessage = `The candidate wants a ${difficulty} level interview on the topic: ${topic}. Please introduce yourself and present a coding problem.`;

  state.history.push({ role: 'user', parts: [{ text: userMessage }] });

  try {
    const response = await genai.models.generateContent({
      model: GEMINI_MODEL,
      contents: state.history,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const aiText = response.text ?? 'I encountered an issue. Let me try again.';
    state.history.push({ role: 'model', parts: [{ text: aiText }] });
    sessions.set(sessionId, state);
    return aiText;
  } catch (error: any) {
    console.error('[AI] Gemini start error:', error.message);
    // Still save the session so user can retry messages
    sessions.set(sessionId, state);
    const shortMsg = error.message?.length > 200 ? error.message.substring(0, 200) + '...' : error.message;
    return `⚠️ AI Interviewer error (model: ${GEMINI_MODEL}): ${shortMsg}\n\nTip: If rate-limited, wait a minute and try again. You can also change the model in the .env file (GEMINI_MODEL=<model-name>).`;
  }
}

export async function sendMessage(sessionId: string, message: string, codeSnapshot?: string): Promise<string> {
  const genai = getGenAI();
  if (!genai) return "AI unavailable.";

  const state = sessions.get(sessionId);
  if (!state) return "Session not found. Please start a new interview.";

  let fullMessage = message;
  if (codeSnapshot) {
    state.codeSnapshots.push(codeSnapshot);
    fullMessage += `\n\n[CANDIDATE'S CURRENT CODE]:\n\`\`\`\n${codeSnapshot}\n\`\`\``;
  }

  state.history.push({ role: 'user', parts: [{ text: fullMessage }] });

  try {
    const response = await genai.models.generateContent({
      model: GEMINI_MODEL,
      contents: state.history,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const aiText = response.text ?? 'Could you repeat that?';
    state.history.push({ role: 'model', parts: [{ text: aiText }] });
    return aiText;
  } catch (error: any) {
    console.error('[AI] Gemini chat error:', error.message);
    return `⚠️ AI had a brief issue. Please try again in a moment.`;
  }
}

export async function endInterview(sessionId: string): Promise<string> {
  const genai = getGenAI();
  if (!genai) return "AI unavailable.";

  const state = sessions.get(sessionId);
  if (!state) return "Session not found.";

  const durationMins = Math.round((Date.now() - state.startTime) / 60000);

  const evalPrompt = `The interview is now over. It lasted ${durationMins} minutes.
Please provide your final evaluation of the candidate. Include:
1. Problem Solving Approach (score/10)
2. Code Quality & Correctness (score/10)
3. Communication (score/10)
4. Time/Space Complexity Analysis (score/10)
5. Overall Rating (score/10)
6. Key Strengths
7. Areas for Improvement
8. Final Verdict (Strong Hire / Hire / Lean Hire / No Hire)

Base your evaluation on the entire conversation and code you've seen.`;

  state.history.push({ role: 'user', parts: [{ text: evalPrompt }] });

  try {
    const response = await genai.models.generateContent({
      model: GEMINI_MODEL,
      contents: state.history,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 1500,
        temperature: 0.5,
      },
    });

    const aiText = response.text ?? 'Evaluation unavailable.';
    sessions.delete(sessionId);
    return aiText;
  } catch (error: any) {
    console.error('[AI] Gemini eval error:', error.message);
    sessions.delete(sessionId);
    return `⚠️ Evaluation failed. This is likely due to API rate limits. Your interview data has been recorded, but the AI evaluation couldn't be generated. Please try again later.`;
  }
}
