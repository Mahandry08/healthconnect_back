import PrescriptionService from "../services/PrescriptionService";

const newPrescription = async (req : any, res: any) => {
    const { consultation_id, prescription_date, instructions } = req.body;

    try {
        const newPrescription = PrescriptionService.savePrescription(consultation_id, prescription_date, instructions);
        res.status(201).json({ message: 'Prescription created successfully!', prescription: newPrescription });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create prescription.' });
    }
};

const searchByConsultId = async (req : any, res: any) => {
    try {
        const prescriptions = PrescriptionService.searchByConsultId(req.params.consultationId);
        res.json(prescriptions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching prescriptions.' });
    }
}; 

const updatePrescription = async (req : any, res : any) => {
    try {
        const updatedPrescription = PrescriptionService.updatePrescription(req.params.id, req.body);
        if (!updatedPrescription) return res.status(404).json({ error: 'Prescription not found.' });
        res.json({ message: 'Prescription updated successfully!', prescription: updatedPrescription });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update prescription.' });
    }
};

const deletePrescription = async (req : any, res : any) => {
    try {
        const deletedPrescription = await PrescriptionService.deletePrescription(req.params.id);
        if (!deletedPrescription) return res.status(404).json({ error: 'Prescription not found.' });
        res.json({ message: 'Prescription deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete prescription.' });
    }
};

export default {
    newPrescription,
    searchByConsultId,
    updatePrescription,
    deletePrescription
};