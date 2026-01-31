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

const router = Router();

// GET /api/study-plans - Get all study plans
router.get('/', getStudyPlans);

// GET /api/study-plans/enrollments - Get user's enrollments
router.get('/enrollments', getMyEnrollments);

// POST /api/study-plans/custom - Create custom study plan
router.post('/custom', createCustomPlan);

// GET /api/study-plans/:id - Get study plan by ID
router.get('/:id', getStudyPlan);

// POST /api/study-plans/:planId/enroll - Enroll in a plan
router.post('/:planId/enroll', enrollInPlan);

// GET /api/study-plans/enrollments/:enrollmentId/today - Get today's problems
router.get('/enrollments/:enrollmentId/today', getTodayProblems);

// PUT /api/study-plans/enrollments/:enrollmentId - Update enrollment progress
router.put('/enrollments/:enrollmentId', updateEnrollmentProgress);

export default router;
