// routes/spotify.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

// Spotify Top Artists or Tracks route
router.get('/top/:type', async (req, res) => {
    const { type } = req.params; // 'artists' or 'tracks'
    const { time_range = 'medium_term', limit = 20, offset = 0 } = req.query;

    // Validate the 'type' parameter
    if (!['artists', 'tracks'].includes(type)) {
        return res.status(400).json({ error: 'Type must be either "artists" or "tracks".' });
    }

    try {
        const response = await axios.get(`https://api.spotify.com/v1/me/top/${type}`, {
            headers: {
                Authorization: `Bearer ${req.user.accessToken}` // Assuming access token is stored in req.user
            },
            params: { time_range, limit, offset }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

export default router;
