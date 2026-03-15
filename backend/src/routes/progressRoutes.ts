import { Router } from 'express';
import {
  getProgress,
  updateProgress,
  getReviewDue,
  getAnalytics,
  logActivity,
  getStreak,
} from '../controllers/progressController';

import { protect } from '../middleware/auth';

const router = Router();

// Apply protect middleware to all progress routes
router.use(protect);

// GET /api/progress - Get all progress for user
router.get('/', getProgress);

// GET /api/progress/review - Get problems due for review
router.get('/review', getReviewDue);

// GET /api/progress/analytics - Get comprehensive analytics
router.get('/analytics', getAnalytics);

// GET /api/progress/streak - Get streak data
router.get('/streak', getStreak);

// POST /api/progress/activity - Log daily activity
router.post('/activity', logActivity);

// PUT /api/progress/:problemId - Update progress for a problem
router.put('/:problemId', updateProgress);

export default router;
