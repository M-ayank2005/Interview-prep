import mongoose, { Document, Schema } from 'mongoose';

// Company Interview Pattern Data
export interface ICompanyPattern extends Document {
  name: string;
  slug: string;
  logo?: string;
  description: string;
  interviewProcess: {
    round: number;
    name: string;
    type: string;
    duration: number;
    description: string;
    tips: string[];
  }[];
  topProblems: mongoose.Types.ObjectId[];
  frequentTopics: { topic: string; frequency: number }[];
  difficultyDistribution: {
    easy: number;
    medium: number;
    hard: number;
  };
  avgDifficulty: number;
  interviewExperiences: {
    role: string;
    experience: string;
    date: Date;
    result: 'accepted' | 'rejected' | 'pending';
    rating: number;
  }[];
  tips: string[];
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const CompanyPatternSchema = new Schema<ICompanyPattern>(
  {
    name: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true },
    logo: { type: String },
    description: { type: String },
    interviewProcess: [{
      round: { type: Number },
      name: { type: String },
      type: { type: String },
      duration: { type: Number },
      description: { type: String },
      tips: [{ type: String }],
    }],
    topProblems: [{ type: Schema.Types.ObjectId, ref: 'Problem' }],
    frequentTopics: [{
      topic: { type: String },
      frequency: { type: Number },
    }],
    difficultyDistribution: {
      easy: { type: Number, default: 20 },
      medium: { type: Number, default: 60 },
      hard: { type: Number, default: 20 },
    },
    avgDifficulty: { type: Number, default: 5 },
    interviewExperiences: [{
      role: { type: String },
      experience: { type: String },
      date: { type: Date },
      result: { type: String, enum: ['accepted', 'rejected', 'pending'] },
      rating: { type: Number, min: 1, max: 5 },
    }],
    tips: [{ type: String }],
    salaryRange: {
      min: { type: Number },
      max: { type: Number },
      currency: { type: String, default: 'USD' },
    },
  },
  {
    timestamps: true,
  }
);

export const CompanyPattern = mongoose.model<ICompanyPattern>('CompanyPattern', CompanyPatternSchema);
