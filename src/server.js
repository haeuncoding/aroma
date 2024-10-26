import express from 'express';
import { handler } from '../build/handler.js'; // This is the SvelteKit handler after build
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session'

import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '$env/static/private';
const app = express();

// Use middleware like cookieParser to handle cookies
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
const SPOTIFY_AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_ENDPOINT = 'https://api.spotify.com/v1';
const SCOPES = 'user-read-private user-read-email';

// Route to start Spotify login
app.get('/api/login', (req, res) => {
    const authUrl = `${SPOTIFY_AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;
    res.redirect(authUrl);
});

// Route to handle Spotify's redirect after authorization (getting the token)
app.get('/api/callback', async (req, res) => {
    const { code } = req.query;

    try {
        const response = await axios.post(SPOTIFY_TOKEN_ENDPOINT, new URLSearchParams({
            code,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const { access_token, refresh_token, expires_in } = response.data;

        // Set tokens in cookies (for session handling)
        res.cookie('access_token', access_token, { httpOnly: true, secure: true });
        res.cookie('refresh_token', refresh_token, { httpOnly: true, secure: true });
        res.cookie('expires_in', expires_in, { httpOnly: true, secure: true });

        // Redirect to the front-end app after successful login
        res.redirect('/');
    } catch (error) {
        console.error('Error during Spotify token exchange:', error);
        res.status(500).send('Authentication failed');
    }
});

// Applying session middleware
app.use(session({
    secret: CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

// Now session data is accessible in both Express and SvelteKit
app.get('/api/protected', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json({ message: 'You are authenticated', user: req.session.user });
});

// Route to make Spotify API calls
app.get('/api/spotify/me', async (req, res) => {
    const access_token = req.cookies.access_token;

    if (!access_token) {
        return res.status(401).json({ error: 'No access token provided' });
    }

    try {
        const response = await axios.get(`${SPOTIFY_API_ENDPOINT}/me`, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error during Spotify API call:', error);
        res.status(500).json({ error: 'Failed to fetch data from Spotify' });
    }
});

// Route to refresh the access token
app.get('/api/spotify/refresh', async (req, res) => {
    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token) {
        return res.status(401).json({ error: 'No refresh token provided' });
    }

    try {
        const response = await axios.post(SPOTIFY_TOKEN_ENDPOINT, new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const { access_token, expires_in } = response.data;

        // Update the access token and expiration time
        res.cookie('access_token', access_token, { httpOnly: true, secure: true });
        res.cookie('expires_in', expires_in, { httpOnly: true, secure: true });

        res.json({ message: 'Token refreshed' });
    } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(500).json({ error: 'Failed to refresh token' });
    }
});

app.get('/api/logout', (req, res) => {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.json({ message: 'Logged out' });
});

// Everything else (static files, SSR) is handled by SvelteKit
app.use(handler);

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
