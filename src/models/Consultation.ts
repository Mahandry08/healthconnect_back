import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/Database';

// Consultation Model
interface IConsultation {
    consultation_id: number;
    patient_id: number;
    doctor_id: number;
    consultation_date: Date;
    diagnostic: string;
    videocall_id: number | null;
}

interface IConsultationCreationAttributes extends Optional<IConsultation, 'consultation_id' | 'videocall_id'> {}

class Consultation extends Model<IConsultation, IConsultationCreationAttributes> implements IConsultation {
    public consultation_id!: number;
    public patient_id!: number;
    public doctor_id!: number;
    public consultation_date!: Date;
    public diagnostic!: string;
    public videocall_id!: number | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Consultation.init(
    {
        consultation_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        patient_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        doctor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        consultation_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        diagnostic: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        videocall_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'consultations',
        modelName: 'Consultation',
    }
);
export default Consultation;
