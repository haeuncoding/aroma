const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const SCOPE = 'user-read-private user-read-email';

app.get('/test', (req, res) => {
    res.send('you did it!')
})

// Step 2: Handle the callback from Spotify with the authorization code
app.get('/callback', async (req, res) => {
    const code = req.query.code;

    if (!code) {
        res.status(400).send('Authorization code missing');
        return;
    }

    try {
        const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        // Extract access and refresh tokens from response
        const { access_token, refresh_token } = tokenResponse.data;

        console.log({
            access_token,
            refresh_token
        })
        // Redirect to frontend with tokens in query parameters
        res.status(200).send({
            access_token,
            refresh_token,
        });
        // res.json({ access_token, refresh_token });
    } catch (error) {
        res.status(500).send('Failed to exchange code for token');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
