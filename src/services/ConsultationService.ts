import { Op } from "sequelize";
import Consultation  from "../models/Consultation";

class ConsultationService {
    // Search for consultations by userId (either patient or doctor)
    /*async searchByUserID(userId: string) {
        return await Consultation.findAll({
            where: {
                [Op.or]: [{ patientId: String(userId) }, { doctorId: String(userId) }],
            },
        });
    }*/

    // Schedule a new consultation (save data into the DB)
    async scheduleConsultation(data: any) {
        return await Consultation.create(data);
    }

    // Search for a consultation by its ID
    async searchConsultationByID(id: number) {
        return await Consultation.findByPk(id);
    }
}

export default new ConsultationService();