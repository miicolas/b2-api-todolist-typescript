import { Router } from 'express';
import AuthMiddleware from '@/middlewares/auth.js';
import Route_Create_Todo from './create.js';


const router = Router();

router.post('/todo', AuthMiddleware, Route_Create_Todo);

export default router;