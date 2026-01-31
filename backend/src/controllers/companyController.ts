import { Request, Response } from 'express';
import { CompanyPattern, Problem } from '../models';
import { AppError } from '../middleware/errorHandler';
import logger from '../utils/logger';

// Get all companies
export const getCompanies = async (req: Request, res: Response): Promise<void> => {
  try {
    const companies = await CompanyPattern.find()
      .select('name slug logo description difficultyDistribution avgDifficulty')
      .sort({ name: 1 });

    res.json({
      success: true,
      data: companies,
    });
  } catch (error) {
    logger.error('Error fetching companies:', error);
    throw new AppError('Failed to fetch companies', 500);
  }
};

// Get company by slug
export const getCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const company = await CompanyPattern.findOne({ slug })
      .populate('topProblems', 'name slug difficulty category url');

    if (!company) {
      throw new AppError('Company not found', 404);
    }

    res.json({
      success: true,
      data: company,
    });
  } catch (error) {
    logger.error('Error fetching company:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to fetch company', 500);
  }
};

// Get problems for a company
export const getCompanyProblems = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const { difficulty, topic, page = 1, limit = 50 } = req.query;

    const company = await CompanyPattern.findOne({ slug });
    if (!company) {
      throw new AppError('Company not found', 404);
    }

    const query: Record<string, unknown> = {
      companies: company.name,
    };

    if (difficulty) query.difficulty = difficulty;
    if (topic) query.topics = topic;

    const skip = (Number(page) - 1) * Number(limit);

    const [problems, total] = await Promise.all([
      Problem.find(query)
        .sort({ frequency: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Problem.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: {
        company: company.name,
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
    logger.error('Error fetching company problems:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to fetch company problems', 500);
  }
};

// Get company interview process
export const getInterviewProcess = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const company = await CompanyPattern.findOne({ slug })
      .select('name slug interviewProcess tips');

    if (!company) {
      throw new AppError('Company not found', 404);
    }

    res.json({
      success: true,
      data: company,
    });
  } catch (error) {
    logger.error('Error fetching interview process:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to fetch interview process', 500);
  }
};

// Get frequent topics for a company
export const getFrequentTopics = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const company = await CompanyPattern.findOne({ slug })
      .select('name frequentTopics');

    if (!company) {
      throw new AppError('Company not found', 404);
    }

    res.json({
      success: true,
      data: company.frequentTopics,
    });
  } catch (error) {
    logger.error('Error fetching frequent topics:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to fetch frequent topics', 500);
  }
};

// Submit interview experience
export const submitExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const { role, experience, result, rating } = req.body;

    const company = await CompanyPattern.findOne({ slug });
    if (!company) {
      throw new AppError('Company not found', 404);
    }

    company.interviewExperiences.push({
      role,
      experience,
      date: new Date(),
      result,
      rating,
    });

    await company.save();

    res.status(201).json({
      success: true,
      message: 'Experience submitted successfully',
    });
  } catch (error) {
    logger.error('Error submitting experience:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to submit experience', 500);
  }
};

// Get interview experiences for a company
export const getExperiences = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const { role, result, page = 1, limit = 10 } = req.query;

    const company = await CompanyPattern.findOne({ slug })
      .select('interviewExperiences');

    if (!company) {
      throw new AppError('Company not found', 404);
    }

    let experiences = company.interviewExperiences;

    // Filter
    if (role) {
      experiences = experiences.filter((e) => e.role === role);
    }
    if (result) {
      experiences = experiences.filter((e) => e.result === result);
    }

    // Sort by date (newest first)
    experiences.sort((a, b) => b.date.getTime() - a.date.getTime());

    // Paginate
    const skip = (Number(page) - 1) * Number(limit);
    const paginatedExperiences = experiences.slice(skip, skip + Number(limit));

    res.json({
      success: true,
      data: {
        experiences: paginatedExperiences,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: experiences.length,
          pages: Math.ceil(experiences.length / Number(limit)),
        },
      },
    });
  } catch (error) {
    logger.error('Error fetching experiences:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to fetch experiences', 500);
  }
};

// Compare companies
export const compareCompanies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slugs } = req.query;

    if (!slugs || typeof slugs !== 'string') {
      throw new AppError('Please provide company slugs to compare', 400);
    }

    const slugList = slugs.split(',').map((s) => s.trim());

    const companies = await CompanyPattern.find({ slug: { $in: slugList } })
      .select('name slug difficultyDistribution avgDifficulty frequentTopics interviewProcess')
      .populate('topProblems', 'name slug difficulty');

    res.json({
      success: true,
      data: companies,
    });
  } catch (error) {
    logger.error('Error comparing companies:', error);
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to compare companies', 500);
  }
};
