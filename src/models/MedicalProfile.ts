import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/Database';

interface IMedicalProfile {
    profile_id: number;
    user_id: number;
    medical_history: string; 
    allergies: string; 
    updatedAt: Date;
}

interface IMedicalProfileCreationAttributes extends Optional<IMedicalProfile, 'profile_id' | 'updatedAt'> {}

class MedicalProfile extends Model<IMedicalProfile, IMedicalProfileCreationAttributes> implements IMedicalProfile {
    public profile_id!: number;
    public user_id!: number;
    public medical_history!: string ;
    public allergies!: string;
    public updated_at!: Date;

    public readonly updatedAt!: Date;
}

MedicalProfile.init(
    {
        profile_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true, 
            references: {
                model: 'user',
                key: 'user_id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        medical_history: {
            type: DataTypes.TEXT, 
            allowNull: true,
        },
        allergies: {
            type: DataTypes.TEXT, 
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'medical_profile',
        modelName: 'MedicalProfile',
    }
);

export default MedicalProfile;