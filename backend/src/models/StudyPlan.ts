import mongoose, { Document, Schema } from 'mongoose';

// Study Plan - Custom or pre-defined study plans
export interface IStudyPlan extends Document {
  name: string;
  description: string;
  slug: string;
  type: 'curated' | 'company' | 'topic' | 'custom';
  targetCompany?: string;
  targetRole?: string;
  durationDays: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'mixed';
  problems: {
    problemId: mongoose.Types.ObjectId;
    day: number;
    order: number;
    isOptional: boolean;
  }[];
  tags: string[];
  createdBy?: string;
  isPublic: boolean;
  enrolledCount: number;
  completionRate: number;
  rating: number;
  ratingCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const StudyPlanSchema = new Schema<IStudyPlan>(
  {
    name: { type: String, required: true, index: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: ['curated', 'company', 'topic', 'custom'],
      required: true,
    },
    targetCompany: { type: String },
    targetRole: { type: String },
    durationDays: { type: Number, required: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'mixed'],
      default: 'mixed',
    },
    problems: [{
      problemId: { type: Schema.Types.ObjectId, ref: 'Problem' },
      day: { type: Number, required: true },
      order: { type: Number, required: true },
      isOptional: { type: Boolean, default: false },
    }],
    tags: [{ type: String }],
    createdBy: { type: String },
    isPublic: { type: Boolean, default: true },
    enrolledCount: { type: Number, default: 0 },
    completionRate: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const StudyPlan = mongoose.model<IStudyPlan>('StudyPlan', StudyPlanSchema);

// User's enrollment in a study plan
export interface IStudyPlanEnrollment extends Document {
  sessionId: string;
  studyPlanId: mongoose.Types.ObjectId;
  startDate: Date;
  currentDay: number;
  completedProblems: mongoose.Types.ObjectId[];
  status: 'active' | 'paused' | 'completed' | 'abandoned';
  completionPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

const StudyPlanEnrollmentSchema = new Schema<IStudyPlanEnrollment>(
  {
    sessionId: { type: String, required: true, index: true },
    studyPlanId: { type: Schema.Types.ObjectId, ref: 'StudyPlan', required: true },
    startDate: { type: Date, default: Date.now },
    currentDay: { type: Number, default: 1 },
    completedProblems: [{ type: Schema.Types.ObjectId, ref: 'Problem' }],
    status: {
      type: String,
      enum: ['active', 'paused', 'completed', 'abandoned'],
      default: 'active',
    },
    completionPercentage: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

StudyPlanEnrollmentSchema.index({ sessionId: 1, studyPlanId: 1 }, { unique: true });

export const StudyPlanEnrollment = mongoose.model<IStudyPlanEnrollment>('StudyPlanEnrollment', StudyPlanEnrollmentSchema);
