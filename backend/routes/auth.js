import express from 'express';
import axios from 'axios';
import { URLSearchParams } from 'url';
import dotenv from 'dotenv';

dotenv.config()
const router = express.Router();

console.log('Auth routes loaded')

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const STATE_KEY = 'spotify_auth_state';

// Generate random string for the state parameter
const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
};

// Redirect to Spotify for authorization
router.get('/spotify', (req, res) => {
    const state = generateRandomString(64);
    res.cookie(
    STATE_KEY, state, 
        { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            path: '/' 
        });

    const params = new URLSearchParams({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: 'user-read-private user-read-email user-library-read user-library-modify user-top-read user-read-recently-played user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-private',
        redirect_uri: REDIRECT_URI,
        state
    });

    res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
});

// OAuth callback to handle the code and retrieve tokens
router.get('/callback', async (req, res) => {
    const { code, state } = req.query;
    const storedState = req.cookies.spotify_auth_state;
    const stateMatch = state === storedState;

    console.log({
        'stateMatch?': state === storedState
    })

    if (state === null) {
        return res.json({
            message: 'State mismatch',
            status: 400,
            ok: false,
        }).send();
    }

    if (stateMatch === false) {
        return res.json({
            message: 'State does not match. Possible CSRF attack. >:( Or Nathan just messed up again. Whoops!',
            status: 403,
            ok: false,
        }).send()
    }

    
    try {
        res.clearCookie('spotify_auth_state', { path: '/' });
    
        const params = new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        });

        const response = await axios.post('https://accounts.spotify.com/api/token', params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const { access_token, refresh_token, expires_in } = response.data;
        return res.json({ 
            access_token, 
            refresh_token, 
            expires_in,
            status: 200,
            ok: true,
        });
    } catch (error) {
        console.error('Token exchange failed:', error.response.data);
        res.status(400).send('Token exchange failed');    
    }
});

// Step 4: Refresh token
router.post('/refresh_token', async (req, res) => {
    const { refresh_token } = req.body;

    try {
        const params = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
        });

        const response = await axios.post('https://accounts.spotify.com/api/token', params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        res.json({ access_token: response.data.access_token });
    } catch (error) {
        res.status(400).json({ error: 'Failed to refresh token' });
    }
});

// Logout route
router.get('/logout', (req, res) => {
    res.clearCookie('spotify_auth_state');
    res.json({
        ok: true,
        status: 200,
    });
});

export default router;
