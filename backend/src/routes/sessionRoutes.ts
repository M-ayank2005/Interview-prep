import { Router } from 'express';
import {
  getSession,
  updateSession,
  updateSettings,
  setTarget,
  getDashboard,
  exportData,
  resetProgress,
} from '../controllers/sessionController';

const router = Router();

// GET /api/session - Get session data
router.get('/', getSession);

// GET /api/session/dashboard - Get dashboard data
router.get('/dashboard', getDashboard);

// PUT /api/session - Update session data
router.put('/', updateSession);

// PUT /api/session/settings - Update settings
router.put('/settings', updateSettings);

// PUT /api/session/target - Set interview target
router.put('/target', setTarget);

// GET /api/session/export - Export all user data
router.get('/export', exportData);

// POST /api/session/reset - Reset all progress
router.post('/reset', resetProgress);

export default router;
