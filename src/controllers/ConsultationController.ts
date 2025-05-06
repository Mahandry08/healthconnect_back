import ConsultationService from "../services/ConsultationService";

/*const searchByUserID = async (req: any, res: any) => {
    try {
        const consultations = await ConsultationService.searchByUserID(req.params.userId);
        res.json(consultations);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error fetching consultations.' });
    }
};*/

const scheduleConsultation = async (req: any, res: any) => {
    const { patientId, doctorId, consultationDate, consultationTime, consultationType } = req.body;

    try {
        // Prepare the data for the new consultation
        const newConsultationData = {
            patientId,
            doctorId,
            scheduledTime: new Date(`${consultationDate} ${consultationTime}`), // Combining date and time
            consultationType,
        };

        // Call the service to schedule a consultation
        const newConsultation = await ConsultationService.scheduleConsultation(newConsultationData);

        res.status(201).json({
            message: 'Consultation scheduled successfully!',
            consultation: newConsultation,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to schedule consultation.' });
    }
};

const searchConsultationByID = async (req: any, res: any) => {
    try {
        const consultation = await ConsultationService.searchConsultationByID(req.params.id);

        if (!consultation) {
            return res.status(404).json({ error: 'Consultation not found.' });
        }

        res.json(consultation);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error fetching consultation.' });
    }
};

const consultationsByPatientId = async (req: any, res: any) => {
    const {patient_id} = req.body;

    try {
        const consultationsP = await ConsultationService.allConsultationsByPatientId(patient_id);

        if(consultationsP.length > 0){
            res.status(200).json(consultationsP);
        }else{
            res.status(404).json({error: 'No consultations found.'});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving patient consultations', error });
    }
};


const consultationsByDoctorId = async (req: any, res: any) => {
    const {doctor_id} = req.body;

    try {
        const consultationsD = await ConsultationService.allConsultationsByDoctorId(doctor_id);

        if(consultationsD.length > 0){
            res.status(200).json(consultationsD);
        }else{
            res.status(404).json({error: 'No consultations found.'});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving doctor consultations', error });
    }
};

export default {
    //searchByUserID,
    searchConsultationByID,
    scheduleConsultation,
    consultationsByDoctorId,
    consultationsByPatientId
};
