// API Client for Interview Prep Backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const getAuthToken = (): string => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('authToken') || '';
};

// Get or create session ID
const getSessionId = (): string => {
  if (typeof window === 'undefined') return '';
  
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

// Generic fetch wrapper
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const sessionId = getSessionId();
  const authToken = getAuthToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'X-Session-Id': sessionId,
    ...options.headers,
  };

  if (authToken) {
    (headers as Record<string, string>).Authorization = `Bearer ${authToken}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include', // Important to send cookies
    headers,
  });

  const contentType = response.headers.get('content-type') || '';
  const isJsonResponse = contentType.includes('application/json');

  let data: any = null;
  if (isJsonResponse) {
    data = await response.json();
  } else {
    const text = await response.text();
    data = { raw: text };
  }

  if (!response.ok) {
    const htmlError = !isJsonResponse && typeof data.raw === 'string' && data.raw.trim().startsWith('<');
    const errorMsg =
      data.message ||
      data.error?.message ||
      (htmlError
        ? `Server returned an HTML error page (${response.status}). Check backend logs and API URL.`
        : 'API request failed');
    throw new Error(errorMsg);
  }

  if (!isJsonResponse) {
    throw new Error(`Expected JSON response but received '${contentType || 'unknown'}'`);
  }

  return data;
}

// Auth API
export const authAPI = {
  getMe: () => fetchAPI<{ success: boolean; data: User }>('/auth/me'),
  login: (data: LoginData) => fetchAPI<{ success: boolean; data: User }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  register: (data: RegisterData) => fetchAPI<{ success: boolean; data: User }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  logout: () => fetchAPI<{ success: boolean }>('/auth/logout'),
};

// Problems API
export const problemsAPI = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchAPI<{ success: boolean; data: { problems: Problem[]; pagination: Pagination } }>(`/problems${query}`);
  },
  getById: (id: string) => fetchAPI<{ success: boolean; data: Problem }>(`/problems/${id}`),
  getCategories: () => fetchAPI<{ success: boolean; data: Category[] }>('/problems/categories'),
  getTopics: () => fetchAPI<{ success: boolean; data: Topic[] }>('/problems/topics'),
  getDaily: () => fetchAPI<{ success: boolean; data: Problem }>('/problems/daily'),
  getRandom: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchAPI<{ success: boolean; data: Problem }>(`/problems/random${query}`);
  },
};

// Progress API
export const progressAPI = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchAPI<{ success: boolean; data: ProblemProgress[] }>(`/progress${query}`);
  },
  update: (problemId: string, data: Partial<ProblemProgress>) =>
    fetchAPI<{ success: boolean; data: ProblemProgress }>(`/progress/${problemId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  getReviewDue: (limit?: number) =>
    fetchAPI<{ success: boolean; data: ProblemProgress[] }>(`/progress/review?limit=${limit || 10}`),
  getAnalytics: (days?: number) =>
    fetchAPI<{ success: boolean; data: Analytics }>(`/progress/analytics?days=${days || 30}`),
  getStreak: () => fetchAPI<{ success: boolean; data: StreakData }>('/progress/streak'),
  logActivity: (data: ActivityLog) =>
    fetchAPI<{ success: boolean; data: DailyActivity }>('/progress/activity', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Study Plans API
export const studyPlansAPI = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchAPI<{ success: boolean; data: { plans: StudyPlan[]; pagination: Pagination } }>(`/study-plans${query}`);
  },
  getById: (id: string) => fetchAPI<{ success: boolean; data: StudyPlan }>(`/study-plans/${id}`),
  enroll: (planId: string) =>
    fetchAPI<{ success: boolean; data: StudyPlanEnrollment }>(`/study-plans/${planId}/enroll`, {
      method: 'POST',
    }),
  getEnrollments: () =>
    fetchAPI<{ success: boolean; data: StudyPlanEnrollment[] }>('/study-plans/enrollments'),
  createCustom: (data: CreateStudyPlanData) =>
    fetchAPI<{ success: boolean; data: StudyPlan }>('/study-plans/custom', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Mock Interviews API
export const mockInterviewsAPI = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchAPI<{ success: boolean; data: { interviews: MockInterview[]; pagination: Pagination } }>(`/mock-interviews${query}`);
  },
  getById: (id: string) => fetchAPI<{ success: boolean; data: MockInterview }>(`/mock-interviews/${id}`),
  create: (data: CreateMockInterviewData) =>
    fetchAPI<{ success: boolean; data: MockInterview }>('/mock-interviews', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<MockInterview>) =>
    fetchAPI<{ success: boolean; data: MockInterview }>(`/mock-interviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchAPI<{ success: boolean; message: string }>(`/mock-interviews/${id}`, {
      method: 'DELETE',
    }),
  start: (id: string) =>
    fetchAPI<{ success: boolean; data: MockInterview }>(`/mock-interviews/${id}/start`, {
      method: 'POST',
    }),
  finish: (id: string, data: FinishInterviewData) =>
    fetchAPI<{ success: boolean; data: MockInterview }>(`/mock-interviews/${id}/finish`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getStats: () => fetchAPI<{ success: boolean; data: MockInterviewStats }>('/mock-interviews/stats'),
};

// Companies API
export const companiesAPI = {
  getAll: () => fetchAPI<{ success: boolean; data: Company[] }>('/companies'),
  getBySlug: (slug: string) => fetchAPI<{ success: boolean; data: Company }>(`/companies/${slug}`),
  getProblems: (slug: string, params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchAPI<{ success: boolean; data: { company: string; problems: Problem[]; pagination: Pagination } }>(`/companies/${slug}/problems${query}`);
  },
  getProcess: (slug: string) => fetchAPI<{ success: boolean; data: InterviewProcess }>(`/companies/${slug}/process`),
  compare: (slugs: string[]) =>
    fetchAPI<{ success: boolean; data: Company[] }>(`/companies/compare?slugs=${slugs.join(',')}`),
};

// Session API
export const sessionAPI = {
  get: () => fetchAPI<{ success: boolean; data: UserSession }>('/session'),
  update: (data: Partial<UserSession>) =>
    fetchAPI<{ success: boolean; data: UserSession }>('/session', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  getDashboard: () => fetchAPI<{ success: boolean; data: DashboardData }>('/session/dashboard'),
  setTarget: (data: TargetData) =>
    fetchAPI<{ success: boolean; data: TargetResponse }>('/session/target', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  export: () => fetchAPI<{ success: boolean; data: ExportData }>('/session/export'),
};

// Snippets API
export const snippetsAPI = {
  getAll: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchAPI<{ success: boolean; data: { snippets: CodeSnippet[]; pagination: Pagination } }>(`/snippets${query}`);
  },
  getTemplates: () => fetchAPI<{ success: boolean; data: CodeSnippet[] }>('/snippets/templates'),
  getDefaults: () => fetchAPI<{ success: boolean; data: DefaultTemplates }>('/snippets/defaults'),
  create: (data: CreateSnippetData) =>
    fetchAPI<{ success: boolean; data: CodeSnippet }>('/snippets', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<CodeSnippet>) =>
    fetchAPI<{ success: boolean; data: CodeSnippet }>(`/snippets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchAPI<{ success: boolean; message: string }>(`/snippets/${id}`, {
      method: 'DELETE',
    }),
};

// Types
export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  targetCompany?: string;
  targetRole?: string;
  interviewDate?: string;
  dailyGoal: number;
  isAdmin: boolean;
}

export interface Problem {
  _id: string;
  leetcodeId?: number;
  name: string;
  slug: string;
  category: string;
  url: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  companies: string[];
  frequency: number;
  isPremium: boolean;
  hints: string[];
  patterns: string[];
  solution?: {
    approach: string;
    timeComplexity: string;
    spaceComplexity: string;
    cppCode?: string;
    pythonCode?: string;
    explanation: string;
  };
}

export interface ProblemProgress {
  _id: string;
  problemId: string | Problem;
  status: 'not_started' | 'attempted' | 'solved' | 'revisit' | 'mastered';
  attempts: number;
  timeSpent: number;
  notes: string;
  confidence: 1 | 2 | 3 | 4 | 5;
  nextReviewDate: string;
  lastAttemptDate?: string;
}

export interface Category {
  name: string;
  count: number;
  easy: number;
  medium: number;
  hard: number;
}

export interface Topic {
  name: string;
  count: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface StudyPlan {
  _id: string;
  name: string;
  slug: string;
  description: string;
  type: 'curated' | 'company' | 'topic' | 'custom';
  durationDays: number;
  difficulty: string;
  problems: { problemId: Problem; day: number; order: number }[];
  enrolledCount: number;
  rating: number;
}

export interface StudyPlanEnrollment {
  _id: string;
  studyPlanId: StudyPlan;
  startDate: string;
  currentDay: number;
  completedProblems: string[];
  status: 'active' | 'paused' | 'completed' | 'abandoned';
  completionPercentage: number;
}

export interface MockInterview {
  _id: string;
  title: string;
  scheduledDate: string;
  duration: number;
  type: 'coding' | 'system-design' | 'behavioral' | 'mixed';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  problems: { problemId: Problem; timeLimit: number; completed: boolean }[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  totalScore?: number;
  performance?: {
    problemSolving: number;
    codeQuality: number;
    communication: number;
    timeManagement: number;
    overall: number;
  };
}

export interface Company {
  _id: string;
  name: string;
  slug: string;
  description: string;
  difficultyDistribution: { easy: number; medium: number; hard: number };
  avgDifficulty: number;
  frequentTopics: { topic: string; frequency: number }[];
  interviewProcess?: InterviewRound[];
  tips?: string[];
}

export interface InterviewRound {
  round: number;
  name: string;
  type: string;
  duration: number;
  description: string;
  tips: string[];
}

export interface InterviewProcess {
  name: string;
  slug: string;
  interviewProcess: InterviewRound[];
  tips: string[];
}

export interface UserSession {
  sessionId: string;
  nickname?: string;
  targetCompany?: string;
  targetRole?: string;
  interviewDate?: string;
  dailyGoal: number;
  streakCount: number;
  longestStreak: number;
  totalSolvedCount: number;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
}

export interface DashboardData {
  nickname?: string;
  targetCompany?: string;
  targetRole?: string;
  interviewDate?: string;
  daysUntilInterview?: number;
  dailyGoal: number;
  streakCount: number;
  longestStreak: number;
  totalSolvedCount: number;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  totalStudyTime: number;
}

export interface Analytics {
  overview: {
    totalAttempted: number;
    totalSolved: number;
    totalMastered: number;
    avgConfidence: number;
    totalTimeSpent: number;
    streakCount: number;
    longestStreak: number;
    dailyGoal: number;
  };
  dailyActivity: DailyActivity[];
  categoryBreakdown: { _id: string; total: number; solved: number }[];
  difficultyBreakdown: { _id: string; total: number; solved: number; avgTime: number }[];
}

export interface DailyActivity {
  date: string;
  problemsSolved: number;
  problemsAttempted: number;
  totalStudyTime: number;
  goalMet: boolean;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  recentActivity: DailyActivity[];
}

export interface CodeSnippet {
  _id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  category: string;
  tags: string[];
}

export interface DefaultTemplates {
  [pattern: string]: {
    cpp: string;
    python: string;
  };
}

export interface MockInterviewStats {
  summary: {
    totalInterviews: number;
    avgScore: number;
    avgOverall: number;
  };
  performanceOverTime: { scheduledDate: string; totalScore: number }[];
}

// Additional types for API calls
export interface CreateStudyPlanData {
  name: string;
  description?: string;
  durationDays: number;
  problemIds: string[];
  difficulty?: string;
}

export interface CreateMockInterviewData {
  title?: string;
  scheduledDate: string;
  duration?: number;
  type?: string;
  difficulty?: string;
  company?: string;
  problemIds?: string[];
}

export interface FinishInterviewData {
  feedback?: string;
  performance?: {
    problemSolving: number;
    codeQuality: number;
    communication: number;
    timeManagement: number;
    overall: number;
  };
}

export interface TargetData {
  targetCompany?: string;
  targetRole?: string;
  interviewDate?: string;
  dailyGoal?: number;
}

export interface TargetResponse {
  targetCompany?: string;
  targetRole?: string;
  interviewDate?: string;
  dailyGoal: number;
  daysUntilInterview?: number;
}

export interface ActivityLog {
  problemsSolved?: number;
  studyTime?: number;
  mood?: string;
  notes?: string;
}

export interface ExportData {
  exportDate: string;
  session: UserSession;
  progress: ProblemProgress[];
  enrollments: StudyPlanEnrollment[];
  interviews: MockInterview[];
  activities: DailyActivity[];
  snippets: CodeSnippet[];
}

export interface CreateSnippetData {
  title: string;
  description?: string;
  language: string;
  code: string;
  category?: string;
  tags?: string[];
  isTemplate?: boolean;
  isPublic?: boolean;
}

export interface LoginData {
  email: string;
  password?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password?: string;
}
