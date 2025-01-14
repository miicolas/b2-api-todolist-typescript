// Imports
import { Router } from 'express';
import AuthMiddleware from '../../middlewares/auth.js';
import Route_Create_Todo from './create.js';
import Route_getAll_Todos from './get-all.js';
import Route_complete_Todo from './complete.js';
import Route_delete_Todo from './delete.js';
import Route_edit_Todo from './edit.js';
// Appel du Router
const router = Router();
// Routes
router.post('/todo', AuthMiddleware, Route_Create_Todo);
router.get('/todos', AuthMiddleware, Route_getAll_Todos);
router.put('/todo', AuthMiddleware, Route_complete_Todo);
router.delete('/todo', AuthMiddleware, Route_delete_Todo);
router.put('/todo/edit', AuthMiddleware, Route_edit_Todo);
export default router;
//# sourceMappingURL=router.js.map