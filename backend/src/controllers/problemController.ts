import { Request, Response } from 'express';
import { Problem } from '../models';
import { AppError } from '../middleware/errorHandler';
import logger from '../utils/logger';

// Get all problems with filtering and pagination
export const getProblems = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 50,
      category,
      difficulty,
      company,
      topic,
      search,
      sortBy = 'name',
      sortOrder = 'asc',
    } = req.query;

    const query: Record<string, unknown> = {};

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (company) query.companies = company;
    if (topic) query.topics = topic;
    if (search) {
      query.$text = { $search: search as string };
    }

    const sortOptions: Record<string, 1 | -1> = {
      [sortBy as string]: sortOrder === 'desc' ? -1 : 1,
    };

    const skip = (Number(page) - 1) * Number(limit);

    const [problems, total] = await Promise.all([
      Problem.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Problem.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: {
        problems,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    logger.error('Error fetching problems:', error);
    throw new AppError('Failed to fetch problems', 500);
  }
};

// Get problem by ID or slug
export const getProblem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const problem = await Problem.findOne({
      $or: [{ _id: id }, { slug: id }],
    }).populate('similarProblems', 'name slug difficulty');

    if (!problem) {
      throw new AppError('Problem not found', 404);
    }

    res.json({
      success: true,
      data: problem,
    });
  } catch (error) {
    logger.error('Error fetching problem:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to fetch problem', 500);
  }
};

// Get categories with problem counts
export const getCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Problem.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          difficulties: {
            $push: '$difficulty',
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: 1,
          easy: {
            $size: {
              $filter: { input: '$difficulties', cond: { $eq: ['$$this', 'Easy'] } },
            },
          },
          medium: {
            $size: {
              $filter: { input: '$difficulties', cond: { $eq: ['$$this', 'Medium'] } },
            },
          },
          hard: {
            $size: {
              $filter: { input: '$difficulties', cond: { $eq: ['$$this', 'Hard'] } },
            },
          },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    logger.error('Error fetching categories:', error);
    throw new AppError('Failed to fetch categories', 500);
  }
};

// Get all topics
export const getTopics = async (_req: Request, res: Response): Promise<void> => {
  try {
    const topics = await Problem.aggregate([
      { $unwind: '$topics' },
      {
        $group: {
          _id: '$topics',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: 1,
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.json({
      success: true,
      data: topics,
    });
  } catch (error) {
    logger.error('Error fetching topics:', error);
    throw new AppError('Failed to fetch topics', 500);
  }
};

// Get all companies
export const getCompanies = async (_req: Request, res: Response): Promise<void> => {
  try {
    const companies = await Problem.aggregate([
      { $unwind: '$companies' },
      {
        $group: {
          _id: '$companies',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: 1,
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.json({
      success: true,
      data: companies,
    });
  } catch (error) {
    logger.error('Error fetching companies:', error);
    throw new AppError('Failed to fetch companies', 500);
  }
};

// Get daily problem recommendation
export const getDailyProblem = async (req: Request, res: Response): Promise<void> => {
  try {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    const count = await Problem.countDocuments();
    const index = seed % count;
    
    const problem = await Problem.findOne().skip(index);

    res.json({
      success: true,
      data: problem,
    });
  } catch (error) {
    logger.error('Error fetching daily problem:', error);
    throw new AppError('Failed to fetch daily problem', 500);
  }
};

// Get random problem with optional filters
export const getRandomProblem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { difficulty, category, topic } = req.query;
    const query: Record<string, unknown> = {};

    if (difficulty) query.difficulty = difficulty;
    if (category) query.category = category;
    if (topic) query.topics = topic;

    const count = await Problem.countDocuments(query);
    const random = Math.floor(Math.random() * count);
    
    const problem = await Problem.findOne(query).skip(random);

    res.json({
      success: true,
      data: problem,
    });
  } catch (error) {
    logger.error('Error fetching random problem:', error);
    throw new AppError('Failed to fetch random problem', 500);
  }
};
