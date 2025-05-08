import express, {Request, Response} from 'express';
import UserController from '../controllers/UserController';
import EmailController from '../controllers/EmailController';

const router = express.Router();

router.post('/signup', UserController.register);
router.get('/users', UserController.users);
router.post('/login', UserController.login);
router.post('/addmedicalprofile', UserController.addMedicalprofile);
router.get('/notactivated', UserController.usersNotActivated);
router.get('/doctors', UserController.doctors);
router.get('/patients', UserController.patients);
router.post('/patientProfile', UserController.patientProfile);
router.post('/medicalProfile', UserController.medicalProfileById);
router.post('/sendEmail', EmailController.sendEmailController);

export default router;