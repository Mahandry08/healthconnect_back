import ConsultationService from "../services/ConsultationService";

const searchByUserID = async (req: any, res: any) => {
    try {
        const consultations = await ConsultationService.searchByUserID(req.params.userId);
        res.json(consultations);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching consultations.' });
    }
};

const scheduleConsultation = async (req : any, res: any) => {
    const { patientId, doctorId, consultationDate, consultationTime, consultationType } = req.body;

    try {
        const newConsultation = ConsultationService.scheduleConsultation;
        res.status(201).json({ message: 'Consultation scheduled successfully!', consultation: newConsultation });
    } catch (error) {
        res.status(500).json({ error: 'Failed to schedule consultation.' });
    }
};

const searchConsultationByID = async (req : any, res : any) => {
    try {
        const consultation = ConsultationService.searchConsultationByID(req.params.id);
        if (!consultation) return res.status(404).json({ error: 'Consultation not found.' });
        res.json(consultation);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching consultation.' });
    }
};

export default {
    searchByUserID,
    searchConsultationByID,
    scheduleConsultation
};

