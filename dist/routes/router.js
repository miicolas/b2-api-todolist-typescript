import { Router } from 'express';
import Router_Auth from "./auth/router.js";
const router = Router();
router.use("/auth", Router_Auth);
export default router;
//# sourceMappingURL=router.js.map