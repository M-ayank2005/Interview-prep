import { Router } from 'express';
import {
  getProblems,
  getProblem,
  getCategories,
  getTopics,
  getCompanies,
  getDailyProblem,
  getRandomProblem,
} from '../controllers/problemController';

const router = Router();

// GET /api/problems - Get all problems with filtering
router.get('/', getProblems);

// GET /api/problems/categories - Get all categories with counts
router.get('/categories', getCategories);

// GET /api/problems/topics - Get all topics
router.get('/topics', getTopics);

// GET /api/problems/companies - Get all companies
router.get('/companies', getCompanies);

// GET /api/problems/daily - Get daily problem
router.get('/daily', getDailyProblem);

// GET /api/problems/random - Get random problem
router.get('/random', getRandomProblem);

// GET /api/problems/:id - Get problem by ID or slug
router.get('/:id', getProblem);

export default router;
