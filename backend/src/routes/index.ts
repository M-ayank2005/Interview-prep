import { Router } from 'express';
import problemRoutes from './problemRoutes';
import progressRoutes from './progressRoutes';
import studyPlanRoutes from './studyPlanRoutes';
import mockInterviewRoutes from './mockInterviewRoutes';
import companyRoutes from './companyRoutes';
import sessionRoutes from './sessionRoutes';
import snippetRoutes from './snippetRoutes';

const router = Router();

// Health check
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Interview Prep API is running',
    timestamp: new Date().toISOString(),
  });
});

// Mount routes
router.use('/problems', problemRoutes);
router.use('/progress', progressRoutes);
router.use('/study-plans', studyPlanRoutes);
router.use('/mock-interviews', mockInterviewRoutes);
router.use('/companies', companyRoutes);
router.use('/session', sessionRoutes);
router.use('/snippets', snippetRoutes);

export default router;
