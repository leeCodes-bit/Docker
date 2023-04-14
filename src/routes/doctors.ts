import express from 'express';
const router = express.Router();
import { Signup, Login, getUserAndReport, Logout} from '../controller/doctorsController';


router.post('/signup', Signup);
router.post('/login', Login);
router.get('/get-report', getUserAndReport);
router.get('/logout', Logout);

export default router