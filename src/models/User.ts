import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/Database';

interface IUser {
    user_id: number;
    name: string;
    firstname: string;
    email: string;
    password: string;
    role: 0 | 1 | 2; //0: patient, 1: doctor, 2: admin
    birthday: Date;
    address: string;
    phone_number: string;
}

interface IUserCreationAttributes extends Optional<IUser, 'user_id'> {}

class User extends Model<IUser, IUserCreationAttributes> implements IUser {
    public user_id!: number;
    public name!: string;
    public firstname!: string;
    public email!: string;
    public password!: string;
    public role!: 0 | 1 | 2;
    public birthday!: Date;
    public address!: string;
    public phone_number!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: {
                    args: [[0, 1, 2]],
                    msg: "Role must be 0 (patient), 1 (médecin), or 2 (admin)"
                }
            }
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize, // Pass the sequelize instance
        tableName: 'users', // Table name in the database
        modelName: 'User', // Model name in Sequelize
    }
);

export default User;