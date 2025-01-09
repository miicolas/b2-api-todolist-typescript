import { Router } from 'express';
import AuthMiddleware from '../../middlewares/auth.js';
import Route_Create_Todo from './create.js';
import Route_getAll_Todos from './get-all.js';

const router = Router();

router.post('/todo', AuthMiddleware, Route_Create_Todo);
router.get('/todos',  AuthMiddleware, Route_getAll_Todos);

export default router;