import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connectToDatabase, start } from './src/database/Database';
import consultationRoutes from './src/routes/consultationRoutes';
import prescriptionRoutes from './src/routes/prescriptionRoutes';
import userRoutes from './src/routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//mysql database connection
connectToDatabase();
start();

// Middleware for routes
app.use('/api/consultations', consultationRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the HealthConnect API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
