// routes/spotify.js
import express from 'express';
import axios from 'axios';

const router = express.Router();
console.log('Spotify routes loaded')

// Spotify Top Artists or Tracks route
router.get('/artists', async (req, res) => {
    const { id } = req.query;
    const { authorization } = req.headers;

    try {
        const response = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
        headers: { 
            Authorization: authorization,
            'Content-Type': 'application/json'
        }
        });

        res.json(response.data);
    } catch (error) {
        res.status(error.status).json({ error: 'Failed to fetch top items' });
    }});

export default router;
