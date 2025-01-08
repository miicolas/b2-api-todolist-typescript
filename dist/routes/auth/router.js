import { Router } from 'express';
import Route_Signup from './signup.js';
import Route_Signin from './signin.js';
const router = Router();
router.get('/', (req, res) => { res.send('Hello World! Auth'); });
router.post('/signup', Route_Signup);
router.post('/signin', Route_Signin);
export default router;
//# sourceMappingURL=router.js.map