import express, {Request, Response} from 'express';
import {User} from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserController from '../controllers/UserController';

const router = express.Router();

router.post('/register', UserController.register);

//router.post('/login', UserController.login);


/*router.get('/:id', async (req : any, res : any) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User  not found.' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user profile.' });
    }
});*/


export default router;