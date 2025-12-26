import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/Database';

interface ISpecialities {
    speciality_id: number;
    speciality_name: string;
    description: string;
    updatedAt: Date;
}

interface ISpecialitiesCreationAttributes extends Optional<ISpecialities, 'speciality_id' | 'updatedAt'> {}

class Specialities extends Model<ISpecialities, ISpecialitiesCreationAttributes> implements ISpecialities {
    public speciality_id!: number;
    public speciality_name!: string ;
    public description!: string ;
    public updated_at!: Date;

    public readonly updatedAt!: Date;
}

Specialities.init(
    {
        speciality_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        speciality_name: {
            type: DataTypes.TEXT, 
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT, 
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'specialities',
        modelName: 'Specialities',
    }
);

export default Specialities;