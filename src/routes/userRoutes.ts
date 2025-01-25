import express, {Request, Response} from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

router.post('/signup', UserController.register);
router.get('/users', UserController.users);
router.post('/login', UserController.login);


export default router;