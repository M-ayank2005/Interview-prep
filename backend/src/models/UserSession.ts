import mongoose, { Document, Schema } from 'mongoose';

// Session User (anonymous or identified by session ID)
export interface IUserSession extends Document {
  sessionId: string;
  nickname?: string;
  targetCompany?: string;
  targetRole?: string;
  interviewDate?: Date;
  dailyGoal: number; // Problems per day
  preferredDifficulty: string[];
  preferredCategories: string[];
  timezone?: string;
  streakCount: number;
  longestStreak: number;
  lastActiveDate: Date;
  totalSolvedCount: number;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  totalStudyTime: number; // in minutes
  settings: {
    enableReminders: boolean;
    reminderTime?: string;
    darkMode: boolean;
    showHints: boolean;
    autoPlayVideo: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSessionSchema = new Schema<IUserSession>(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    nickname: { type: String },
    targetCompany: { type: String },
    targetRole: { type: String, default: 'SDE' },
    interviewDate: { type: Date },
    dailyGoal: { type: Number, default: 5, min: 1, max: 50 },
    preferredDifficulty: [{ type: String, enum: ['Easy', 'Medium', 'Hard'] }],
    preferredCategories: [{ type: String }],
    timezone: { type: String, default: 'UTC' },
    streakCount: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastActiveDate: { type: Date },
    totalSolvedCount: { type: Number, default: 0 },
    easyCount: { type: Number, default: 0 },
    mediumCount: { type: Number, default: 0 },
    hardCount: { type: Number, default: 0 },
    totalStudyTime: { type: Number, default: 0 },
    settings: {
      enableReminders: { type: Boolean, default: false },
      reminderTime: { type: String },
      darkMode: { type: Boolean, default: true },
      showHints: { type: Boolean, default: true },
      autoPlayVideo: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

export const UserSession = mongoose.model<IUserSession>('UserSession', UserSessionSchema);
