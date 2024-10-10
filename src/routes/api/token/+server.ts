import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const { code, code_verifier, redirect_uri } = await request.json();

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'authorization_code',
    code,
    redirect_uri,
    code_verifier,
  });

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  const data = await response.json();
  return json(data);
}