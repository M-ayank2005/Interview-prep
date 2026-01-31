import mongoose, { Document, Schema } from 'mongoose';

// Mock Interview Session
export interface IMockInterview extends Document {
  sessionId: string;
  title: string;
  scheduledDate: Date;
  duration: number; // in minutes
  type: 'coding' | 'system-design' | 'behavioral' | 'mixed';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  company?: string;
  problems: {
    problemId: mongoose.Types.ObjectId;
    timeLimit: number; // minutes
    completed: boolean;
    timeTaken?: number;
    score?: number;
  }[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  totalScore?: number;
  feedback?: string;
  performance: {
    problemSolving: number; // 1-5
    codeQuality: number;
    communication: number;
    timeManagement: number;
    overall: number;
  };
  notes: string;
  recording?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MockInterviewSchema = new Schema<IMockInterview>(
  {
    sessionId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    scheduledDate: { type: Date, required: true, index: true },
    duration: { type: Number, default: 60 },
    type: {
      type: String,
      enum: ['coding', 'system-design', 'behavioral', 'mixed'],
      default: 'coding',
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    company: { type: String },
    problems: [{
      problemId: { type: Schema.Types.ObjectId, ref: 'Problem' },
      timeLimit: { type: Number, default: 30 },
      completed: { type: Boolean, default: false },
      timeTaken: { type: Number },
      score: { type: Number },
    }],
    status: {
      type: String,
      enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
      default: 'scheduled',
    },
    totalScore: { type: Number },
    feedback: { type: String },
    performance: {
      problemSolving: { type: Number, min: 1, max: 5 },
      codeQuality: { type: Number, min: 1, max: 5 },
      communication: { type: Number, min: 1, max: 5 },
      timeManagement: { type: Number, min: 1, max: 5 },
      overall: { type: Number, min: 1, max: 5 },
    },
    notes: { type: String, default: '' },
    recording: { type: String },
  },
  {
    timestamps: true,
  }
);

export const MockInterview = mongoose.model<IMockInterview>('MockInterview', MockInterviewSchema);
