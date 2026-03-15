import { Request, Response } from 'express';
import { StudyPlan, StudyPlanEnrollment, Problem } from '../models';
import { AppError } from '../middleware/errorHandler';
import logger from '../utils/logger';

// Get all study plans
export const getStudyPlans = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, difficulty, company, page = 1, limit = 20 } = req.query;

    const query: Record<string, unknown> = { isPublic: true };

    if (type) query.type = type;
    if (difficulty) query.difficulty = difficulty;
    if (company) query.targetCompany = company;

    const skip = (Number(page) - 1) * Number(limit);

    const [plans, total] = await Promise.all([
      StudyPlan.find(query)
        .populate('problems.problemId', 'name slug difficulty category')
        .sort({ enrolledCount: -1 })
        .skip(skip)
        .limit(Number(limit)),
      StudyPlan.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: {
        plans,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    logger.error('Error fetching study plans:', error);
    throw new AppError('Failed to fetch study plans', 500);
  }
};

// Get study plan by ID or slug
export const getStudyPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const plan = await StudyPlan.findOne({
      $or: [{ _id: id }, { slug: id }],
    }).populate('problems.problemId');

    if (!plan) {
      throw new AppError('Study plan not found', 404);
    }

    res.json({
      success: true,
      data: plan,
    });
  } catch (error) {
    logger.error('Error fetching study plan:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to fetch study plan', 500);
  }
};

// Enroll in a study plan
export const enrollInPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const sessionId = req.user!.id;
    const { planId } = req.params;

    const plan = await StudyPlan.findById(planId);
    if (!plan) {
      throw new AppError('Study plan not found', 404);
    }

    // Check if already enrolled
    const existingEnrollment = await StudyPlanEnrollment.findOne({
      sessionId,
      studyPlanId: planId,
    });

    if (existingEnrollment) {
      throw new AppError('Already enrolled in this plan', 400);
    }

    const enrollment = await StudyPlanEnrollment.create({
      sessionId,
      studyPlanId: planId,
      startDate: new Date(),
    });

    // Increment enrolled count
    await StudyPlan.findByIdAndUpdate(planId, {
      $inc: { enrolledCount: 1 },
    });

    res.status(201).json({
      success: true,
      data: enrollment,
    });
  } catch (error) {
    logger.error('Error enrolling in plan:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to enroll in plan', 500);
  }
};

// Get user's enrolled plans
export const getMyEnrollments = async (req: Request, res: Response): Promise<void> => {
  try {
    const sessionId = req.user!.id;

    const enrollments = await StudyPlanEnrollment.find({ sessionId })
      .populate('studyPlanId')
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      data: enrollments,
    });
  } catch (error) {
    logger.error('Error fetching enrollments:', error);
    throw new AppError('Failed to fetch enrollments', 500);
  }
};

// Update enrollment progress
export const updateEnrollmentProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    const sessionId = req.user!.id;
    const { enrollmentId } = req.params;
    const { completedProblemId, status } = req.body;

    const enrollment = await StudyPlanEnrollment.findOne({
      _id: enrollmentId,
      sessionId,
    });

    if (!enrollment) {
      throw new AppError('Enrollment not found', 404);
    }

    if (completedProblemId) {
      if (!enrollment.completedProblems.includes(completedProblemId)) {
        enrollment.completedProblems.push(completedProblemId);
      }
    }

    if (status) {
      enrollment.status = status;
    }

    // Calculate completion percentage
    const plan = await StudyPlan.findById(enrollment.studyPlanId);
    if (plan) {
      enrollment.completionPercentage = Math.round(
        (enrollment.completedProblems.length / plan.problems.length) * 100
      );

      // Update current day based on completed problems
      const completedDays = new Set(
        plan.problems
          .filter((p) => enrollment.completedProblems.some((cp) => cp.equals(p.problemId)))
          .map((p) => p.day)
      );
      enrollment.currentDay = Math.max(...Array.from(completedDays), 1);

      // Check if completed
      if (enrollment.completionPercentage >= 100) {
        enrollment.status = 'completed';
      }
    }

    await enrollment.save();

    res.json({
      success: true,
      data: enrollment,
    });
  } catch (error) {
    logger.error('Error updating enrollment:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to update enrollment', 500);
  }
};

// Get today's problems for an enrollment
export const getTodayProblems = async (req: Request, res: Response): Promise<void> => {
  try {
    const sessionId = req.user!.id;
    const { enrollmentId } = req.params;

    const enrollment = await StudyPlanEnrollment.findOne({
      _id: enrollmentId,
      sessionId,
    }).populate({
      path: 'studyPlanId',
      populate: {
        path: 'problems.problemId',
      },
    });

    if (!enrollment) {
      throw new AppError('Enrollment not found', 404);
    }

    const plan = enrollment.studyPlanId as unknown as InstanceType<typeof StudyPlan>;
    const todayProblems = plan.problems
      .filter((p: { day: number }) => p.day === enrollment.currentDay)
      .map((p: { problemId: unknown }) => p.problemId);

    res.json({
      success: true,
      data: {
        day: enrollment.currentDay,
        problems: todayProblems,
        completedProblems: enrollment.completedProblems,
      },
    });
  } catch (error) {
    logger.error('Error fetching today problems:', error);
    throw new AppError('Failed to fetch today problems', 500);
  }
};

// Create custom study plan
export const createCustomPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const sessionId = req.user!.id;
    const { name, description, durationDays, problemIds, difficulty } = req.body;

    // Validate problems exist
    const problems = await Problem.find({ _id: { $in: problemIds } });
    if (problems.length !== problemIds.length) {
      throw new AppError('Some problems not found', 400);
    }

    // Create plan structure
    const problemsPerDay = Math.ceil(problemIds.length / durationDays);
    const planProblems = problemIds.map((pid: string, index: number) => ({
      problemId: pid,
      day: Math.floor(index / problemsPerDay) + 1,
      order: (index % problemsPerDay) + 1,
      isOptional: false,
    }));

    const slug = `custom-${sessionId}-${Date.now()}`;

    const plan = await StudyPlan.create({
      name,
      description: description || `Custom study plan with ${problemIds.length} problems`,
      slug,
      type: 'custom',
      durationDays,
      difficulty: difficulty || 'mixed',
      problems: planProblems,
      createdBy: sessionId,
      isPublic: false,
    });

    res.status(201).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    logger.error('Error creating custom plan:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to create custom plan', 500);
  }
};
