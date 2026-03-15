import { Router } from 'express';
import {
  getStudyPlans,
  getStudyPlan,
  enrollInPlan,
  getMyEnrollments,
  updateEnrollmentProgress,
  getTodayProblems,
  createCustomPlan,
} from '../controllers/studyPlanController';

import { protect } from '../middleware/auth';

const router = Router();

// GET /api/study-plans - Get all study plans
router.get('/', getStudyPlans);

// GET /api/study-plans/enrollments - Get user's enrollments
router.get('/enrollments', protect, getMyEnrollments);

// POST /api/study-plans/custom - Create custom study plan
router.post('/custom', protect, createCustomPlan);

// GET /api/study-plans/:id - Get study plan by ID
router.get('/:id', getStudyPlan);

// POST /api/study-plans/:planId/enroll - Enroll in a plan
router.post('/:planId/enroll', protect, enrollInPlan);

// GET /api/study-plans/enrollments/:enrollmentId/today - Get today's problems
router.get('/enrollments/:enrollmentId/today', protect, getTodayProblems);

// PUT /api/study-plans/enrollments/:enrollmentId - Update enrollment progress
router.put('/enrollments/:enrollmentId', protect, updateEnrollmentProgress);

export default router;
