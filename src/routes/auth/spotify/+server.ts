import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

const authorizationEndpoint = 'https://accounts.spotify.com/authorize';
const redirectUri = 'http://localhost:8080/auth/spotify/callback'; // Ensure this matches your app's redirect URL
const scope = 'user-read-private user-read-email';

export async function GET() {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomValues = crypto.getRandomValues(new Uint8Array(64));
  const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], '');

  const codeVerifier = randomString;
  const data = new TextEncoder().encode(codeVerifier);
  const hashed = await crypto.subtle.digest('SHA-256', data);

  const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(hashed)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  // Store `code_verifier` securely in session (or cookies)
  // Example using cookies:
  const headers = new Headers();
  headers.append('Set-Cookie', `code_verifier=${codeVerifier}; HttpOnly; Secure; Path=/;`);

  // Construct authorization URL
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  });

  const authorizationUrl = `${authorizationEndpoint}?${params.toString()}`;

  // Redirect user to Spotify authorization page
  throw redirect(302, authorizationUrl, { headers });
}
