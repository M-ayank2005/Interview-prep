import { Router } from 'express';
import {
  getSnippets,
  getTemplates,
  getSnippet,
  createSnippet,
  updateSnippet,
  deleteSnippet,
  likeSnippet,
  getDefaultTemplates,
} from '../controllers/snippetController';

const router = Router();

// GET /api/snippets - Get all snippets for user
router.get('/', getSnippets);

// GET /api/snippets/templates - Get public templates
router.get('/templates', getTemplates);

// GET /api/snippets/defaults - Get default code templates
router.get('/defaults', getDefaultTemplates);

// POST /api/snippets - Create a new snippet
router.post('/', createSnippet);

// GET /api/snippets/:id - Get snippet by ID
router.get('/:id', getSnippet);

// PUT /api/snippets/:id - Update snippet
router.put('/:id', updateSnippet);

// DELETE /api/snippets/:id - Delete snippet
router.delete('/:id', deleteSnippet);

// POST /api/snippets/:id/like - Like a public snippet
router.post('/:id/like', likeSnippet);

export default router;
