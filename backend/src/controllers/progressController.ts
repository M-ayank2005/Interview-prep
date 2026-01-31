import { Request, Response } from 'express';
import { PipelineStage } from 'mongoose';
import { ProblemProgress, UserSession, DailyActivity, Problem } from '../models';
import { AppError } from '../middleware/errorHandler';
import logger from '../utils/logger';

// SM-2 Spaced Repetition Algorithm implementation
const calculateNextReview = (
  quality: number, // 0-5, where 5 is perfect recall
  easeFactor: number,
  interval: number,
  repetitions: number
): { easeFactor: number; interval: number; repetitions: number; nextReviewDate: Date } => {
  let newEaseFactor = easeFactor;
  let newInterval = interval;
  let newRepetitions = repetitions;

  if (quality >= 3) {
    // Correct response
    if (repetitions === 0) {
      newInterval = 1;
    } else if (repetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * easeFactor);
    }
    newRepetitions = repetitions + 1;
  } else {
    // Incorrect response - reset
    newRepetitions = 0;
    newInterval = 1;
  }

  // Update ease factor (minimum 1.3)
  newEaseFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);

  return {
    easeFactor: newEaseFactor,
    interval: newInterval,
    repetitions: newRepetitions,
    nextReviewDate,
  };
};

// Get user's progress on all problems
export const getProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req;
    const { status, category, difficulty } = req.query;

    const pipeline: PipelineStage[] = [
      { $match: { sessionId } },
      {
        $lookup: {
          from: 'problems',
          localField: 'problemId',
          foreignField: '_id',
          as: 'problem',
        },
      },
      { $unwind: '$problem' },
    ];

    if (status) {
      pipeline.push({ $match: { status } });
    }
    if (category) {
      pipeline.push({ $match: { 'problem.category': category } });
    }
    if (difficulty) {
      pipeline.push({ $match: { 'problem.difficulty': difficulty } });
    }

    const progress = await ProblemProgress.aggregate(pipeline);

    res.json({
      success: true,
      data: progress,
    });
  } catch (error) {
    logger.error('Error fetching progress:', error);
    throw new AppError('Failed to fetch progress', 500);
  }
};

// Update progress for a specific problem
export const updateProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req;
    const { problemId } = req.params;
    const {
      status,
      notes,
      confidence,
      timeTaken,
      hintsUsed,
      codeSubmission,
      language,
      quality, // For spaced repetition (0-5)
    } = req.body;

    const problem = await Problem.findById(problemId);
    if (!problem) {
      throw new AppError('Problem not found', 404);
    }

    let progress = await ProblemProgress.findOne({ sessionId, problemId });

    if (!progress) {
      progress = new ProblemProgress({
        sessionId,
        problemId,
        status: 'not_started',
        nextReviewDate: new Date(),
      });
    }

    // Update basic fields
    if (status) progress.status = status;
    if (notes !== undefined) progress.notes = notes;
    if (confidence) progress.confidence = confidence;
    if (codeSubmission) progress.codeSubmission = codeSubmission;
    if (language) progress.language = language;

    // Track attempt
    if (timeTaken !== undefined) {
      progress.attempts += 1;
      progress.timeSpent += timeTaken;
      progress.lastAttemptDate = new Date();

      progress.solveHistory.push({
        date: new Date(),
        timeTaken,
        hintsUsed: hintsUsed || 0,
        successful: status === 'solved' || status === 'mastered',
      });

      // First time solved
      if ((status === 'solved' || status === 'mastered') && !progress.firstSolvedDate) {
        progress.firstSolvedDate = new Date();
      }
    }

    // Update spaced repetition if quality provided
    if (quality !== undefined) {
      const srResult = calculateNextReview(
        quality,
        progress.easeFactor,
        progress.interval,
        progress.repetitions
      );
      progress.easeFactor = srResult.easeFactor;
      progress.interval = srResult.interval;
      progress.repetitions = srResult.repetitions;
      progress.nextReviewDate = srResult.nextReviewDate;
    }

    await progress.save();

    // Update user session stats
    if (status === 'solved' || status === 'mastered') {
      await updateUserStats(sessionId, problem.difficulty);
    }

    res.json({
      success: true,
      data: progress,
    });
  } catch (error) {
    logger.error('Error updating progress:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to update progress', 500);
  }
};

// Helper to update user stats
const updateUserStats = async (sessionId: string, difficulty: string): Promise<void> => {
  const update: Record<string, unknown> = {
    $inc: { totalSolvedCount: 1 },
  };

  if (difficulty === 'Easy') update.$inc = { ...update.$inc as object, easyCount: 1 };
  if (difficulty === 'Medium') update.$inc = { ...update.$inc as object, mediumCount: 1 };
  if (difficulty === 'Hard') update.$inc = { ...update.$inc as object, hardCount: 1 };

  await UserSession.findOneAndUpdate({ sessionId }, update);
};

// Get problems due for review (spaced repetition)
export const getReviewDue = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req;
    const { limit = 10 } = req.query;

    const dueProblems = await ProblemProgress.find({
      sessionId,
      nextReviewDate: { $lte: new Date() },
      status: { $in: ['solved', 'mastered'] },
    })
      .populate('problemId')
      .sort({ nextReviewDate: 1 })
      .limit(Number(limit));

    res.json({
      success: true,
      data: dueProblems,
    });
  } catch (error) {
    logger.error('Error fetching review due:', error);
    throw new AppError('Failed to fetch review due problems', 500);
  }
};

// Get comprehensive analytics
export const getAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req;
    const { days = 30 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Number(days));

    // Get daily activity
    const dailyActivity = await DailyActivity.find({
      sessionId,
      date: { $gte: startDate },
    }).sort({ date: 1 });

    // Get overall stats
    const [stats] = await ProblemProgress.aggregate([
      { $match: { sessionId } },
      {
        $group: {
          _id: null,
          totalAttempted: { $sum: 1 },
          totalSolved: {
            $sum: { $cond: [{ $in: ['$status', ['solved', 'mastered']] }, 1, 0] },
          },
          totalMastered: {
            $sum: { $cond: [{ $eq: ['$status', 'mastered'] }, 1, 0] },
          },
          avgConfidence: { $avg: '$confidence' },
          totalTimeSpent: { $sum: '$timeSpent' },
          avgAttempts: { $avg: '$attempts' },
        },
      },
    ]);

    // Get category breakdown
    const categoryBreakdown = await ProblemProgress.aggregate([
      { $match: { sessionId } },
      {
        $lookup: {
          from: 'problems',
          localField: 'problemId',
          foreignField: '_id',
          as: 'problem',
        },
      },
      { $unwind: '$problem' },
      {
        $group: {
          _id: '$problem.category',
          total: { $sum: 1 },
          solved: {
            $sum: { $cond: [{ $in: ['$status', ['solved', 'mastered']] }, 1, 0] },
          },
        },
      },
    ]);

    // Get difficulty breakdown
    const difficultyBreakdown = await ProblemProgress.aggregate([
      { $match: { sessionId } },
      {
        $lookup: {
          from: 'problems',
          localField: 'problemId',
          foreignField: '_id',
          as: 'problem',
        },
      },
      { $unwind: '$problem' },
      {
        $group: {
          _id: '$problem.difficulty',
          total: { $sum: 1 },
          solved: {
            $sum: { $cond: [{ $in: ['$status', ['solved', 'mastered']] }, 1, 0] },
          },
          avgTime: { $avg: '$timeSpent' },
        },
      },
    ]);

    // Get user session data
    const userSession = await UserSession.findOne({ sessionId });

    res.json({
      success: true,
      data: {
        overview: {
          ...stats,
          streakCount: userSession?.streakCount || 0,
          longestStreak: userSession?.longestStreak || 0,
          dailyGoal: userSession?.dailyGoal || 5,
        },
        dailyActivity,
        categoryBreakdown,
        difficultyBreakdown,
      },
    });
  } catch (error) {
    logger.error('Error fetching analytics:', error);
    throw new AppError('Failed to fetch analytics', 500);
  }
};

// Log daily activity
export const logActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req;
    const { problemsSolved, studyTime, mood, notes } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let activity = await DailyActivity.findOne({
      sessionId,
      date: today,
    });

    if (!activity) {
      activity = new DailyActivity({
        sessionId,
        date: today,
      });
    }

    if (problemsSolved) activity.problemsSolved += problemsSolved;
    if (studyTime) activity.totalStudyTime += studyTime;
    if (mood) activity.mood = mood;
    if (notes) activity.notes = notes;

    // Check if daily goal is met
    const userSession = await UserSession.findOne({ sessionId });
    if (userSession && activity.problemsSolved >= userSession.dailyGoal) {
      activity.goalMet = true;
    }

    await activity.save();

    res.json({
      success: true,
      data: activity,
    });
  } catch (error) {
    logger.error('Error logging activity:', error);
    throw new AppError('Failed to log activity', 500);
  }
};

// Get streak data
export const getStreak = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req;

    const userSession = await UserSession.findOne({ sessionId });
    
    // Get last 30 days of activity
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activities = await DailyActivity.find({
      sessionId,
      date: { $gte: thirtyDaysAgo },
      goalMet: true,
    }).sort({ date: -1 });

    res.json({
      success: true,
      data: {
        currentStreak: userSession?.streakCount || 0,
        longestStreak: userSession?.longestStreak || 0,
        recentActivity: activities,
      },
    });
  } catch (error) {
    logger.error('Error fetching streak:', error);
    throw new AppError('Failed to fetch streak data', 500);
  }
};
