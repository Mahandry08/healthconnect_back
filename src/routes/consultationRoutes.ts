import express from 'express';
import ConsultationController from '../controllers/ConsultationController';

const router = express.Router();

router.post('/schedule', ConsultationController.scheduleConsultation);
router.post('/patientConsultations', ConsultationController.consultationsByPatientId);
router.post('/doctorConsultations', ConsultationController.consultationsByDoctorId);
router.post('/avalaibleDoctors', ConsultationController.getAvailableDoctors);
//router.get('/:id', ConsultationController.searchConsultationByID);

export default router;