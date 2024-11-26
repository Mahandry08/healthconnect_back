import express from 'express';
import Prescription from '../models/Prescription';
import PrescriptionController from '../controllers/PrescriptionController';

const router = express.Router();

router.post('/save', PrescriptionController.newPrescription);
router.get('/:consultationId', PrescriptionController.searchByConsultId);
router.put('/update/:id', PrescriptionController.updatePrescription);
router.delete('/delete/:id', PrescriptionController.deletePrescription);


/*router.get('/prescription/:id', async (req : any, res : any) => {
    try {
        const prescription = await Prescription.findById(req.params.id);
        if (!prescription) return res.status(404).json({ error: 'Prescription not found.' });
        res.json(prescription);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching prescription.' });
    }
});*/


export default router;