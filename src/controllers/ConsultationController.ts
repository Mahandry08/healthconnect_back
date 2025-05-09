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
    const { patientId, doctorId, consultation_date, diagnostic, speciality_id } = req.body;

    try {
        // Prepare the data for the new consultation
        const newConsultationData = {
            patientId,
            doctorId,
            consultation_date, 
            diagnostic,
            speciality_id
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

const validateConsultation = async (req: any, res: any) => {
    const {consultation_id} = req.body;
    try {
        await ConsultationService.doctorValidateConsultation(consultation_id);
        return res.status(200).json({message: 'Consultation validated successfully!'});
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

const getAvailableDoctors = async (req: any, res: any) => {
    const { date, time , speciality_id} = req.body;
    try {
        
        if (!date || !time) {
            return res.status(400).json({ 
                error: 'Date and time parameters are required' 
            });
        }

        // Validation du format de la date (YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date as string)) {
            return res.status(400).json({ 
                error: 'Invalid date format. Use YYYY-MM-DD' 
            });
        }

        // Validation du format de l'heure (HH:MM)
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(time as string)) {
            return res.status(400).json({ 
                error: 'Invalid time format. Use HH:MM' 
            });
        }

        const doctors = await ConsultationService.getAvailableDoctors(
            date as string, 
            time as string,
            speciality_id as number
        );
        
        return res.status(200).json(doctors);
    } catch (error: any) {
        return res.status(500).json({ 
            error: 'Error fetching available doctors: ' + error.message 
        });
    }
}

export default {
    //searchByUserID,
    getAvailableDoctors,
    searchConsultationByID,
    scheduleConsultation,
    consultationsByDoctorId,
    consultationsByPatientId,
    validateConsultation
};
