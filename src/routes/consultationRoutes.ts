import express from 'express';
import ConsultationController from '../controllers/ConsultationController';

const router = express.Router();

router.post('/schedule', ConsultationController.scheduleConsultation);
router.post('/patientConsultations', ConsultationController.consultationsByPatientId);
//router.get('/:userId', ConsultationController.searchByUserID);
router.get('/:id', ConsultationController.searchConsultationByID);

export default router;