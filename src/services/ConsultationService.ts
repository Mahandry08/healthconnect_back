import { Op, QueryTypes } from "sequelize";
import Consultation  from "../models/Consultation";
import { sequelize } from '../database/Database';

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

    async allConsultationsByPatientId(patient_id: number) {
        try {
            const consultations = await sequelize.query('SELECT * FROM patient_consultations_view WHERE patient_id = :id', {
              replacements: { id: patient_id }, 
              type: QueryTypes.SELECT,
            });
            return await consultations;
        } catch (error: any) {
            throw new Error('Error fetching patient consultations : ' + error.message );
        }
    }


    async allConsultationsByDoctorId(doctor_id: number) {
        try {
            const consultations = await sequelize.query('SELECT * FROM doctor_consultations_view WHERE doctor_id = :id', {
              replacements: { id: doctor_id }, 
              type: QueryTypes.SELECT,
            });
            return await consultations;
        } catch (error: any) {
            throw new Error('Error fetching doctor consultations : ' + error.message );
        }
    }
}

export default new ConsultationService();