// Imports
import { Router } from 'express';
import AuthMiddleware from '../../middlewares/auth.js';
import Route_Create_Todo from './create.js';
import Route_getAll_Todos from './get-all.js';

// Appel du Router
const router = Router();

// Routes
router.post('/todo', AuthMiddleware, Route_Create_Todo);
router.get('/todos',  AuthMiddleware, Route_getAll_Todos);

export default router;