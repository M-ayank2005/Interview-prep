import mongoose, { Document, Schema } from 'mongoose';

// Difficulty Enum
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

// Problem Interface
export interface IProblem extends Document {
  leetcodeId: number;
  name: string;
  slug: string;
  category: string;
  subcategory?: string;
  url: string;
  difficulty: Difficulty;
  topics: string[];
  companies: string[];
  frequency: number; // How often asked in interviews (0-100)
  isPremium: boolean;
  hints: string[];
  patterns: string[];
  similarProblems: mongoose.Types.ObjectId[];
  solution: {
    approach: string;
    timeComplexity: string;
    spaceComplexity: string;
    cppCode?: string;
    pythonCode?: string;
    javaCode?: string;
    explanation: string;
  };
  videoExplanation?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProblemSchema = new Schema<IProblem>(
  {
    leetcodeId: { type: Number, unique: true, sparse: true },
    name: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true, index: true },
    subcategory: { type: String },
    url: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      required: true,
      index: true,
    },
    topics: [{ type: String, index: true }],
    companies: [{ type: String, index: true }],
    frequency: { type: Number, default: 50, min: 0, max: 100 },
    isPremium: { type: Boolean, default: false },
    hints: [{ type: String }],
    patterns: [{ type: String }],
    similarProblems: [{ type: Schema.Types.ObjectId, ref: 'Problem' }],
    solution: {
      approach: { type: String },
      timeComplexity: { type: String },
      spaceComplexity: { type: String },
      cppCode: { type: String },
      pythonCode: { type: String },
      javaCode: { type: String },
      explanation: { type: String },
    },
    videoExplanation: { type: String },
  },
  {
    timestamps: true,
  }
);

// Text search index
ProblemSchema.index({ name: 'text', category: 'text', topics: 'text' });

export const Problem = mongoose.model<IProblem>('Problem', ProblemSchema);
