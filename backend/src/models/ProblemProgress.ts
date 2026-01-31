import mongoose, { Document, Schema } from 'mongoose';

// Problem Progress - tracks user's progress on each problem
export interface IProblemProgress extends Document {
  sessionId: string;
  problemId: mongoose.Types.ObjectId;
  status: 'not_started' | 'attempted' | 'solved' | 'revisit' | 'mastered';
  attempts: number;
  timeSpent: number; // in seconds
  lastAttemptDate: Date;
  firstSolvedDate?: Date;
  notes: string;
  confidence: 1 | 2 | 3 | 4 | 5; // Self-rated confidence level
  codeSubmission?: string;
  language?: string;
  
  // Spaced Repetition fields
  easeFactor: number; // SM-2 algorithm ease factor (2.5 default)
  interval: number; // Days until next review
  repetitions: number; // Number of successful reviews
  nextReviewDate: Date;
  
  // Performance tracking
  solveHistory: {
    date: Date;
    timeTaken: number;
    hintsUsed: number;
    successful: boolean;
  }[];
  
  createdAt: Date;
  updatedAt: Date;
}

const ProblemProgressSchema = new Schema<IProblemProgress>(
  {
    sessionId: { type: String, required: true, index: true },
    problemId: { type: Schema.Types.ObjectId, ref: 'Problem', required: true, index: true },
    status: {
      type: String,
      enum: ['not_started', 'attempted', 'solved', 'revisit', 'mastered'],
      default: 'not_started',
    },
    attempts: { type: Number, default: 0 },
    timeSpent: { type: Number, default: 0 },
    lastAttemptDate: { type: Date },
    firstSolvedDate: { type: Date },
    notes: { type: String, default: '' },
    confidence: { type: Number, min: 1, max: 5, default: 1 },
    codeSubmission: { type: String },
    language: { type: String },
    
    // Spaced Repetition (SM-2 Algorithm)
    easeFactor: { type: Number, default: 2.5 },
    interval: { type: Number, default: 1 },
    repetitions: { type: Number, default: 0 },
    nextReviewDate: { type: Date, default: Date.now },
    
    solveHistory: [{
      date: { type: Date },
      timeTaken: { type: Number },
      hintsUsed: { type: Number, default: 0 },
      successful: { type: Boolean },
    }],
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries
ProblemProgressSchema.index({ sessionId: 1, problemId: 1 }, { unique: true });
ProblemProgressSchema.index({ sessionId: 1, nextReviewDate: 1 });
ProblemProgressSchema.index({ sessionId: 1, status: 1 });

export const ProblemProgress = mongoose.model<IProblemProgress>('ProblemProgress', ProblemProgressSchema);
