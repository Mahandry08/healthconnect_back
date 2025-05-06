import express, {Request, Response} from 'express';
import UserController from '../controllers/UserController';
import EmailController from '../controllers/EmailController';

const router = express.Router();

router.post('/signup', UserController.register);
router.get('/users', UserController.users);
router.post('/login', UserController.login);
router.post('/addmedicalprofile', UserController.addMedicalprofile);
router.post('/notactivated', UserController.usersNotActivated);
router.post('/doctors', UserController.doctors);
router.post('/patients', UserController.patients);
router.post('/patientProfile', UserController.patientProfile);
router.post('/sendemail', EmailController.sendEmailController);

export default router;