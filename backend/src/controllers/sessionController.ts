import { Request, Response } from 'express';
import { UserSession } from '../models';
import { AppError } from '../middleware/errorHandler';
import logger from '../utils/logger';

// Get user session data
export const getSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req;

    const session = await UserSession.findOne({ sessionId });

    if (!session) {
      throw new AppError('Session not found', 404);
    }

    res.json({
      success: true,
      data: session,
    });
  } catch (error) {
    logger.error('Error fetching session:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to fetch session', 500);
  }
};

// Update user session settings
export const updateSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req;
    const updates = req.body;

    // Prevent updating sensitive fields
    delete updates.sessionId;
    delete updates.totalSolvedCount;
    delete updates.easyCount;
    delete updates.mediumCount;
    delete updates.hardCount;

    const session = await UserSession.findOneAndUpdate(
      { sessionId },
      updates,
      { new: true, runValidators: true }
    );

    if (!session) {
      throw new AppError('Session not found', 404);
    }

    res.json({
      success: true,
      data: session,
    });
  } catch (error) {
    logger.error('Error updating session:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to update session', 500);
  }
};

// Update settings
export const updateSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req;
    const { settings } = req.body;

    const session = await UserSession.findOneAndUpdate(
      { sessionId },
      { settings },
      { new: true }
    );

    if (!session) {
      throw new AppError('Session not found', 404);
    }

    res.json({
      success: true,
      data: session.settings,
    });
  } catch (error) {
    logger.error('Error updating settings:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to update settings', 500);
  }
};

// Set interview target
export const setTarget = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req;
    const { targetCompany, targetRole, interviewDate, dailyGoal } = req.body;

    const updates: Record<string, unknown> = {};
    if (targetCompany) updates.targetCompany = targetCompany;
    if (targetRole) updates.targetRole = targetRole;
    if (interviewDate) updates.interviewDate = new Date(interviewDate);
    if (dailyGoal) updates.dailyGoal = dailyGoal;

    const session = await UserSession.findOneAndUpdate(
      { sessionId },
      updates,
      { new: true }
    );

    if (!session) {
      throw new AppError('Session not found', 404);
    }

    // Calculate days until interview
    let daysUntilInterview = null;
    if (session.interviewDate) {
      const today = new Date();
      const diff = session.interviewDate.getTime() - today.getTime();
      daysUntilInterview = Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    res.json({
      success: true,
      data: {
        targetCompany: session.targetCompany,
        targetRole: session.targetRole,
        interviewDate: session.interviewDate,
        dailyGoal: session.dailyGoal,
        daysUntilInterview,
      },
    });
  } catch (error) {
    logger.error('Error setting target:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to set target', 500);
  }
};

// Get dashboard data
export const getDashboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req;

    const session = await UserSession.findOne({ sessionId });

    if (!session) {
      throw new AppError('Session not found', 404);
    }

    // Calculate days until interview
    let daysUntilInterview = null;
    if (session.interviewDate) {
      const today = new Date();
      const diff = session.interviewDate.getTime() - today.getTime();
      daysUntilInterview = Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    res.json({
      success: true,
      data: {
        nickname: session.nickname,
        targetCompany: session.targetCompany,
        targetRole: session.targetRole,
        interviewDate: session.interviewDate,
        daysUntilInterview,
        dailyGoal: session.dailyGoal,
        streakCount: session.streakCount,
        longestStreak: session.longestStreak,
        totalSolvedCount: session.totalSolvedCount,
        easyCount: session.easyCount,
        mediumCount: session.mediumCount,
        hardCount: session.hardCount,
        totalStudyTime: session.totalStudyTime,
        lastActiveDate: session.lastActiveDate,
      },
    });
  } catch (error) {
    logger.error('Error fetching dashboard:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to fetch dashboard', 500);
  }
};

// Export user data
export const exportData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req;

    // Import models dynamically to avoid circular dependencies
    const { ProblemProgress, StudyPlanEnrollment, MockInterview, DailyActivity, CodeSnippet } = await import('../models');

    const [session, progress, enrollments, interviews, activities, snippets] = await Promise.all([
      UserSession.findOne({ sessionId }),
      ProblemProgress.find({ sessionId }).populate('problemId', 'name slug'),
      StudyPlanEnrollment.find({ sessionId }).populate('studyPlanId', 'name'),
      MockInterview.find({ sessionId }),
      DailyActivity.find({ sessionId }),
      CodeSnippet.find({ sessionId }),
    ]);

    const exportData = {
      exportDate: new Date(),
      session,
      progress,
      enrollments,
      interviews,
      activities,
      snippets,
    };

    res.json({
      success: true,
      data: exportData,
    });
  } catch (error) {
    logger.error('Error exporting data:', error);
    throw new AppError('Failed to export data', 500);
  }
};

// Reset progress (dangerous action)
export const resetProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req;
    const { confirm } = req.body;

    if (confirm !== 'RESET_ALL_PROGRESS') {
      throw new AppError('Please confirm reset by sending confirm: "RESET_ALL_PROGRESS"', 400);
    }

    const { ProblemProgress, StudyPlanEnrollment, DailyActivity } = await import('../models');

    await Promise.all([
      ProblemProgress.deleteMany({ sessionId }),
      StudyPlanEnrollment.deleteMany({ sessionId }),
      DailyActivity.deleteMany({ sessionId }),
      UserSession.findOneAndUpdate(
        { sessionId },
        {
          streakCount: 0,
          totalSolvedCount: 0,
          easyCount: 0,
          mediumCount: 0,
          hardCount: 0,
          totalStudyTime: 0,
        }
      ),
    ]);

    res.json({
      success: true,
      message: 'All progress has been reset',
    });
  } catch (error) {
    logger.error('Error resetting progress:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to reset progress', 500);
  }
};
