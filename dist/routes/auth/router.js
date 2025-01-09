// Imports
import { Router } from 'express';
import Route_Signup from './signup.js';
import Route_Signin from './signin.js';
import Route_Me from './me.js';
// Appel de Router
const router = Router();
// Routes
router.get('/', (req, res) => { res.send('Hello World! Auth'); });
router.post('/signup', Route_Signup);
router.post('/signin', Route_Signin);
router.get('/me', Route_Me);
export default router;
//# sourceMappingURL=router.js.map