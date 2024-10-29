
import express from 'express';
import corsMiddleware from './middleware/cors.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import bodyParser from 'body-parser';
import spotifyRoutes from './routes/spotify.js';
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Apply middlewares
app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount the routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/spotify', spotifyRoutes);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🏃‍♂️🏃‍♂️🏃‍♂️🏃‍♂️`));
