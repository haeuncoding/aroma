import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function GET({ url, cookies }) {
  const code = url.searchParams.get('code');
  const codeVerifier = cookies.get('code_verifier'); // Retrieve from cookies

  if (!code) {
    return json({ error: 'Authorization code not provided' }, { status: 400 });
  }

  const tokenEndpoint = 'https://accounts.spotify.com/api/token';
  const redirectUri = 'http://localhost:8080/auth/spotify/callback'; // Ensure this matches the redirect URI

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  });

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  const tokenData = await response.json();

  if (tokenData.error) {
    return json({ error: tokenData.error_description }, { status: 400 });
  }

  // You can now store the token data in secure cookies or session
  // Optionally send the token back to the client if needed

  return json(tokenData);
}
