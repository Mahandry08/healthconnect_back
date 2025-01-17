import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/Database";
import Consultation from "./Consultation";

interface IPrescription {
    prescription_id: number;
    consultation_id: number;
    prescription_date: Date;
    instructions: string;
}

interface IPrescriptionCreationAttributes extends Optional<IPrescription, 'prescription_id'> {}

class Prescription extends Model<IPrescription, IPrescriptionCreationAttributes> implements IPrescription {
    public prescription_id!: number;
    public consultation_id!: number;
    public prescription_date!: Date;
    public instructions!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Prescription.init(
    {
        prescription_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        consultation_id: {
            type: DataTypes.INTEGER,
            references:{
                model: Consultation,
                key:'consultation_id'
            }
        },
        prescription_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        instructions: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'prescriptions',
        modelName: 'Prescription',
    }
);

export default Prescription;
