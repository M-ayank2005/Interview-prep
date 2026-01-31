import mongoose, { Document, Schema } from 'mongoose';

// Code Snippet / Solution Template
export interface ICodeSnippet extends Document {
  sessionId: string;
  title: string;
  description: string;
  language: 'cpp' | 'python' | 'java' | 'javascript' | 'typescript' | 'go';
  code: string;
  category: string;
  tags: string[];
  problemId?: mongoose.Types.ObjectId;
  isTemplate: boolean;
  isPublic: boolean;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

const CodeSnippetSchema = new Schema<ICodeSnippet>(
  {
    sessionId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String },
    language: {
      type: String,
      enum: ['cpp', 'python', 'java', 'javascript', 'typescript', 'go'],
      required: true,
    },
    code: { type: String, required: true },
    category: { type: String },
    tags: [{ type: String }],
    problemId: { type: Schema.Types.ObjectId, ref: 'Problem' },
    isTemplate: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

CodeSnippetSchema.index({ sessionId: 1, title: 1 });
CodeSnippetSchema.index({ tags: 1 });

export const CodeSnippet = mongoose.model<ICodeSnippet>('CodeSnippet', CodeSnippetSchema);
