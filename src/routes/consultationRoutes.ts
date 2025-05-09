import express from 'express';
import ConsultationController from '../controllers/ConsultationController';

const router = express.Router();

router.post('/scheduleConsultation', ConsultationController.scheduleConsultation);
router.post('/patientConsultations', ConsultationController.consultationsByPatientId);
router.post('/doctorConsultations', ConsultationController.consultationsByDoctorId);
router.post('/avalaibleDoctors', ConsultationController.getAvailableDoctors);
router.post('/validate', ConsultationController.validateConsultation);


export default router;