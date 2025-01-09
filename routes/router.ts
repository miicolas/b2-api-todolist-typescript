import { Router} from 'express';
import Router_Auth from "./auth/router.js";
import Router_Todo from "./todo/router.js";

const router = Router();

router.use("/auth", Router_Auth);
router.use("/manage", Router_Todo);


export default router;