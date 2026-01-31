import { Router } from 'express';
import {
  getCompanies,
  getCompany,
  getCompanyProblems,
  getInterviewProcess,
  getFrequentTopics,
  submitExperience,
  getExperiences,
  compareCompanies,
} from '../controllers/companyController';

const router = Router();

// GET /api/companies - Get all companies
router.get('/', getCompanies);

// GET /api/companies/compare - Compare companies
router.get('/compare', compareCompanies);

// GET /api/companies/:slug - Get company by slug
router.get('/:slug', getCompany);

// GET /api/companies/:slug/problems - Get problems for a company
router.get('/:slug/problems', getCompanyProblems);

// GET /api/companies/:slug/process - Get interview process
router.get('/:slug/process', getInterviewProcess);

// GET /api/companies/:slug/topics - Get frequent topics
router.get('/:slug/topics', getFrequentTopics);

// GET /api/companies/:slug/experiences - Get interview experiences
router.get('/:slug/experiences', getExperiences);

// POST /api/companies/:slug/experiences - Submit interview experience
router.post('/:slug/experiences', submitExperience);

export default router;
