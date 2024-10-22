// express setup
const express = require('express');
const cors = require('cors'); // Enable CORS for SvelteKit to communicate
const axios = require('axios');
const cookieParser = require('cookie-parser')
const querystring = require('querystring');
require('dotenv').config();

const app = express();
app.use(cookieParser()); // To handle cookie parsing
app.use(cors()); // Enable CORS
app.use(express.json()); // To handle JSON requests from frontend
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const STATE_KEY = 'spotify_auth_state';

console.log({
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
})
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
        secure: true, 
        path: '/',
        sameSite: true,
    });
        
    console.log({state})


  const scope = 'user-read-private user-read-email';
  const authUrl = 'https://accounts.spotify.com/authorize?' + 
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state,
    });

  res.redirect(authUrl);
});

// Step 2: Spotify redirects back with code (OAuth callback)
app.get('/auth/callback', async (req, res) => {

    const { code, state } = req.query;

    // Retrieving the state from the cookie.
    console.log({
        req,
        cookies: req.cookies
    })
    const storedState = req.cookies.spotify_auth_state;
    console.log({
        state,
        storedState
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

  console.log({code, state})
  try {
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // Send tokens to the frontend (you could also store these in a database)
    res.json({ 
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
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
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

// Start the Express server on port 3000
app.listen(3000, () => {
  console.log('Express backend listening on http://localhost:3000');
});
