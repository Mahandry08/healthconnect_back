import { Consultation } from "../models/Consultation";

class ConsultationService {
    async searchByUserID(userId: string) {
        return await Consultation.find({
            $or: [{ patientId: userId }, { doctorId: userId }],
        });
    }

    async scheduleConsultation(data: any) {
        const newConsultation = new Consultation(data);
        return await newConsultation.save();
    }

    async searchConsultationByID(id: string) {
        return await Consultation.findById(id);
    }
}

export default new ConsultationService();