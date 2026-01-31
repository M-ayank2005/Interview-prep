import mongoose, { Document, Schema } from 'mongoose';

// Daily Activity Log
export interface IDailyActivity extends Document {
  sessionId: string;
  date: Date;
  problemsSolved: number;
  problemsAttempted: number;
  totalStudyTime: number; // in minutes
  easyCount: number;
  mediumCount: number;
  hardCount: number;
  categories: { name: string; count: number }[];
  goalMet: boolean;
  streakDay: number;
  mood?: 'great' | 'good' | 'okay' | 'struggling';
  notes?: string;
}

const DailyActivitySchema = new Schema<IDailyActivity>(
  {
    sessionId: { type: String, required: true, index: true },
    date: { type: Date, required: true, index: true },
    problemsSolved: { type: Number, default: 0 },
    problemsAttempted: { type: Number, default: 0 },
    totalStudyTime: { type: Number, default: 0 },
    easyCount: { type: Number, default: 0 },
    mediumCount: { type: Number, default: 0 },
    hardCount: { type: Number, default: 0 },
    categories: [{
      name: { type: String },
      count: { type: Number },
    }],
    goalMet: { type: Boolean, default: false },
    streakDay: { type: Number, default: 0 },
    mood: {
      type: String,
      enum: ['great', 'good', 'okay', 'struggling'],
    },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

DailyActivitySchema.index({ sessionId: 1, date: 1 }, { unique: true });

export const DailyActivity = mongoose.model<IDailyActivity>('DailyActivity', DailyActivitySchema);
