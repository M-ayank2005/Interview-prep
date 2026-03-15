import { Request, Response } from 'express';
import { MockInterview, Problem } from '../models';
import { AppError } from '../middleware/errorHandler';
import logger from '../utils/logger';

// Get all mock interviews
export const getMockInterviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const sessionId = req.user!.id;
    const { status, type, page = 1, limit = 20 } = req.query;

    const query: Record<string, unknown> = { sessionId };

    if (status) query.status = status;
    if (type) query.type = type;

    const skip = (Number(page) - 1) * Number(limit);

    const [interviews, total] = await Promise.all([
      MockInterview.find(query)
        .populate('problems.problemId', 'name slug difficulty category')
        .sort({ scheduledDate: -1 })
        .skip(skip)
        .limit(Number(limit)),
      MockInterview.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: {
        interviews,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    logger.error('Error fetching mock interviews:', error);
    throw new AppError('Failed to fetch mock interviews', 500);
  }
};

// Get mock interview by ID
export const getMockInterview = async (req: Request, res: Response): Promise<void> => {
  try {
    const sessionId = req.user!.id;
    const { id } = req.params;

    const interview = await MockInterview.findOne({ _id: id, sessionId })
      .populate('problems.problemId');

    if (!interview) {
      throw new AppError('Mock interview not found', 404);
    }

    res.json({
      success: true,
      data: interview,
    });
  } catch (error) {
    logger.error('Error fetching mock interview:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to fetch mock interview', 500);
  }
};

// Create a new mock interview
export const createMockInterview = async (req: Request, res: Response): Promise<void> => {
  try {
    const sessionId = req.user!.id;
    const {
      title,
      scheduledDate,
      duration,
      type,
      difficulty,
      company,
      problemIds,
      notes,
    } = req.body;

    let problems: { problemId: string; timeLimit: number; completed: boolean }[] = [];

    if (problemIds && problemIds.length > 0) {
      // Use specified problems
      const foundProblems = await Problem.find({ _id: { $in: problemIds } });
      problems = foundProblems.map((p) => ({
        problemId: p._id.toString(),
        timeLimit: duration ? Math.floor(duration / foundProblems.length) : 30,
        completed: false,
      }));
    } else {
      // Auto-generate problems based on difficulty and type
      const query: Record<string, unknown> = {};
      if (difficulty) query.difficulty = difficulty;
      
      const count = type === 'coding' ? 2 : 3;
      const randomProblems = await Problem.aggregate([
        { $match: query },
        { $sample: { size: count } },
      ]);

      problems = randomProblems.map((p) => ({
        problemId: p._id.toString(),
        timeLimit: duration ? Math.floor(duration / count) : 30,
        completed: false,
      }));
    }

    const interview = await MockInterview.create({
      sessionId,
      title: title || `Mock Interview - ${new Date(scheduledDate).toLocaleDateString()}`,
      scheduledDate: new Date(scheduledDate),
      duration: duration || 60,
      type: type || 'coding',
      difficulty: difficulty || 'Medium',
      company,
      problems,
      notes: notes || '',
    });

    res.status(201).json({
      success: true,
      data: interview,
    });
  } catch (error) {
    logger.error('Error creating mock interview:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to create mock interview', 500);
  }
};

// Update mock interview
export const updateMockInterview = async (req: Request, res: Response): Promise<void> => {
  try {
    const sessionId = req.user!.id;
    const { id } = req.params;
    const updates = req.body;

    const interview = await MockInterview.findOneAndUpdate(
      { _id: id, sessionId },
      updates,
      { new: true, runValidators: true }
    );

    if (!interview) {
      throw new AppError('Mock interview not found', 404);
    }

    res.json({
      success: true,
      data: interview,
    });
  } catch (error) {
    logger.error('Error updating mock interview:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to update mock interview', 500);
  }
};

// Delete mock interview
export const deleteMockInterview = async (req: Request, res: Response): Promise<void> => {
  try {
    const sessionId = req.user!.id;
    const { id } = req.params;

    const interview = await MockInterview.findOneAndDelete({ _id: id, sessionId });

    if (!interview) {
      throw new AppError('Mock interview not found', 404);
    }

    res.json({
      success: true,
      message: 'Mock interview deleted successfully',
    });
  } catch (error) {
    logger.error('Error deleting mock interview:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to delete mock interview', 500);
  }
};

// Start a mock interview session
export const startMockInterview = async (req: Request, res: Response): Promise<void> => {
  try {
    const sessionId = req.user!.id;
    const { id } = req.params;

    const interview = await MockInterview.findOneAndUpdate(
      { _id: id, sessionId, status: 'scheduled' },
      { status: 'in-progress' },
      { new: true }
    ).populate('problems.problemId');

    if (!interview) {
      throw new AppError('Mock interview not found or already started', 404);
    }

    res.json({
      success: true,
      data: interview,
    });
  } catch (error) {
    logger.error('Error starting mock interview:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to start mock interview', 500);
  }
};

// Complete a problem in mock interview
export const completeProblem = async (req: Request, res: Response): Promise<void> => {
  try {
    const sessionId = req.user!.id;
    const { id, problemIndex } = req.params;
    const { timeTaken, score } = req.body;

    const interview = await MockInterview.findOne({ _id: id, sessionId });

    if (!interview) {
      throw new AppError('Mock interview not found', 404);
    }

    const index = parseInt(problemIndex, 10);
    if (index < 0 || index >= interview.problems.length) {
      throw new AppError('Invalid problem index', 400);
    }

    interview.problems[index].completed = true;
    interview.problems[index].timeTaken = timeTaken;
    interview.problems[index].score = score;

    await interview.save();

    res.json({
      success: true,
      data: interview,
    });
  } catch (error) {
    logger.error('Error completing problem:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to complete problem', 500);
  }
};

// Finish mock interview and submit feedback
export const finishMockInterview = async (req: Request, res: Response): Promise<void> => {
  try {
    const sessionId = req.user!.id;
    const { id } = req.params;
    const { feedback, performance } = req.body;

    const interview = await MockInterview.findOne({ _id: id, sessionId });

    if (!interview) {
      throw new AppError('Mock interview not found', 404);
    }

    interview.status = 'completed';
    interview.feedback = feedback;
    
    if (performance) {
      interview.performance = performance;
    }

    // Calculate total score
    const completedProblems = interview.problems.filter((p) => p.completed);
    if (completedProblems.length > 0) {
      const totalScore = completedProblems.reduce((sum, p) => sum + (p.score || 0), 0);
      interview.totalScore = Math.round(totalScore / completedProblems.length);
    }

    await interview.save();

    res.json({
      success: true,
      data: interview,
    });
  } catch (error) {
    logger.error('Error finishing mock interview:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to finish mock interview', 500);
  }
};

// Get mock interview statistics
export const getMockInterviewStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const sessionId = req.user!.id;

    const stats = await MockInterview.aggregate([
      { $match: { sessionId, status: 'completed' } },
      {
        $group: {
          _id: null,
          totalInterviews: { $sum: 1 },
          avgScore: { $avg: '$totalScore' },
          avgProblemSolving: { $avg: '$performance.problemSolving' },
          avgCodeQuality: { $avg: '$performance.codeQuality' },
          avgCommunication: { $avg: '$performance.communication' },
          avgTimeManagement: { $avg: '$performance.timeManagement' },
          avgOverall: { $avg: '$performance.overall' },
          totalDuration: { $sum: '$duration' },
        },
      },
    ]);

    // Get performance over time
    const performanceOverTime = await MockInterview.find({
      sessionId,
      status: 'completed',
    })
      .select('scheduledDate totalScore performance')
      .sort({ scheduledDate: 1 })
      .limit(20);

    res.json({
      success: true,
      data: {
        summary: stats[0] || {
          totalInterviews: 0,
          avgScore: 0,
          avgOverall: 0,
        },
        performanceOverTime,
      },
    });
  } catch (error) {
    logger.error('Error fetching mock interview stats:', error);
    throw new AppError('Failed to fetch mock interview stats', 500);
  }
};
