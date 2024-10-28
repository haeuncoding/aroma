import cors from 'cors';
import dotenv from 'dotenv';

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
};

export default cors(corsOptions);
