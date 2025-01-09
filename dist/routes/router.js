// Imports
import { Router } from 'express';
import Router_Auth from "./auth/router.js";
import Router_Todo from "./todo/router.js";
// Appel du Router
const router = Router();
// Routes
router.use("/auth", Router_Auth);
router.use("/manage", Router_Todo);
export default router;
//# sourceMappingURL=router.js.map