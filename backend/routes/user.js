import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();
const router = express.Router();

console.log('User routes loaded')

router.get('/test', (req, res) => res.send('Test successful'))

// Fetch user profile using access token
router.get('/profile', async (req, res) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: { Authorization: authorization }
        });
        return res.json(response.data);
    } catch (error) {
        console.error('Error fetching user profile:', error.response.data);
        res.status(400).send('Error fetching user profile');  }
});
// Fetch user's top tracks or artists

router.post('/top', async (req, res) => {
    const { dataType, timeRange, limit, offset } = req.query;
    const { authorization } = req.headers;

    if (!['artists', 'tracks'].includes(dataType)) {
        return res.status(400).json({ error: 'Invalid type. Must be "artists" or "tracks".' });
    }

    try {
        const response = await axios.get(`https://api.spotify.com/v1/me/top/${dataType}?time_range=${timeRange}&limit=${limit}&offset=0`, {
        headers: { 
            Authorization: authorization,
            'Content-Type': 'application/json'
        }
        });

        res.json(response.data);
    } catch (error) {
        res.status(error.status).json({ error: 'Failed to fetch top items' });
    }
});

export default router;
