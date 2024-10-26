// express setup
const express = require('express');
const cors = require('cors'); // Enable CORS for SvelteKit to communicate
const axios = require('axios');
const cookieParser = require('cookie-parser')
const { URLSearchParams } = require('url')
// const { URLSearchParams } = require('url-search-params');
require('dotenv').config();

const app = express();
app.use(cookieParser()); // To handle cookie parsing

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',    // Explicitly allow only SvelteKit origin
    credentials: true,                                              // Allow cookies and other credentials
}
// (corsOptions)

app.use(cors(corsOptions)); // Enable CORS
app.use(express.json()); // To handle JSON requests from frontend
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const STATE_KEY = 'spotify_auth_state';

// Generate random state for security
const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// Step 1: Redirect to Spotify for Authorization
app.get('/auth/spotify', (req, res) => {
    const state = generateRandomString(64);
    res.cookie(STATE_KEY, state, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        path: '/',
        // sameSite: "none",
    });

    const scope = 'user-read-private user-read-email';
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state,
        });
    
    const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`
    res.redirect(authUrl);
});

// Step 2: Spotify redirects back with code (OAuth callback)
app.get('/auth/callback', async (req, res) => {

    const { code, state } = req.query;

    // Retrieving the state from the cookie.
    const storedState = req.cookies.spotify_auth_state;
    
    // Console confirmation that the states match.
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

  if (state !== storedState) {
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
            code: code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        });

    const tokenResponse = await axios.post(
        'https://accounts.spotify.com/api/token',
        params.toString(), // Use toString() to convert params to a query string
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // Send tokens to the frontend (you could also store these in a database)
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

// Step 3: Fetch user profile using access token
app.get('/me', async (req, res) => {
  const accessToken = req.query.access_token;

  try {
    const userProfile = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    res.json(userProfile.data);
  } catch (error) {
    console.error('Error fetching user profile:', error.response.data);
    res.status(400).send('Error fetching user profile');
  }
});

// Step 4: Refresh token endpoint
app.post('/refresh_token', async (req, res) => {
  const refreshToken = req.body.refresh_token;

  try {
    const params = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        });

    const tokenResponse = await axios.post(
        'https://accounts.spotify.com/api/token',
        params.toString(), // Use toString() to convert params to a query string
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );

    const { access_token } = tokenResponse.data;

    res.json({ access_token });
  } catch (error) {
    res.status(400).send('Failed to refresh token');
  }
});

// Logout route to clear the cookie
app.get('/logout', (req, res) => {
  res.clearCookie('spotify_auth_state'); // Replace with your actual cookie name
    res.json({
        ok: true,
        status: 200,
    });
});

// Start the Express server on port 3000
app.listen(3000, () => {
  console.log('Express backend listening on http://localhost:3000');
});
