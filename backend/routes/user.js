import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

console.log('User routes loaded')

router.get('/test', (req, res) => res.send('Test successful'))

// Fetch user profile using access token
router.get('/profile', async (req, res) => {
    const authorization = req.headers.authorization;
    console.log({authorization})

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

router.post('/top/:type', async (req, res) => {
    console.log(req)
    const { type } = req.params; // 'artists' or 'tracks'
    const { time_range = 'medium_term', limit = 20, offset = 0 } = req.query;
    const { authorization } = req.headers;

    if (!['artists', 'tracks'].includes(type)) {
        return res.status(400).json({ error: 'Invalid type. Must be "artists" or "tracks".' });
    }

    try {
        const response = await axios.get(`https://api.spotify.com/v1/me/top/${type}`, {
        headers: { Authorization: authorization },
        params: { time_range, limit, offset }
        });
        res.json(response.data);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch top items' });
    }
});

export default router;
