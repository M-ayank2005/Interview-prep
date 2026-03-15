import { Router } from 'express';
import {
  getMockInterviews,
  getMockInterview,
  createMockInterview,
  updateMockInterview,
  deleteMockInterview,
  startMockInterview,
  completeProblem,
  finishMockInterview,
  getMockInterviewStats,
} from '../controllers/mockInterviewController';
import { protect } from '../middleware/auth';

const router = Router();

// Apply protect middleware to all mock interview routes
router.use(protect);

// GET /api/mock-interviews - Get all mock interviews
router.get('/', getMockInterviews);

// GET /api/mock-interviews/stats - Get interview statistics
router.get('/stats', getMockInterviewStats);

// POST /api/mock-interviews - Create a new mock interview
router.post('/', createMockInterview);

// GET /api/mock-interviews/:id - Get mock interview by ID
router.get('/:id', getMockInterview);

// PUT /api/mock-interviews/:id - Update mock interview
router.put('/:id', updateMockInterview);

// DELETE /api/mock-interviews/:id - Delete mock interview
router.delete('/:id', deleteMockInterview);

// POST /api/mock-interviews/:id/start - Start mock interview
router.post('/:id/start', startMockInterview);

// POST /api/mock-interviews/:id/problems/:problemIndex/complete - Complete a problem
router.post('/:id/problems/:problemIndex/complete', completeProblem);

// POST /api/mock-interviews/:id/finish - Finish mock interview
router.post('/:id/finish', finishMockInterview);

export default router;
