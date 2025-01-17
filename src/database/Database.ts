import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE || 'healthconnect',
    process.env.MYSQL_USER || 'root',
    process.env.MYSQL_PASSWORD || '',
    {
        host: process.env.MYSQL_HOST || 'localhost',
        port: parseInt(process.env.MYSQL_PORT || '3306'),
        dialect: 'mysql',
        logging: false
    }
);

export async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('MySQL Database connected!');
    } catch (err) {
        console.error('MySQL connection error:', err);
        process.exit(1);
    }
}

export const start = async () => {
    try {
        await sequelize.sync();
        console.log('Database synchronized!');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

