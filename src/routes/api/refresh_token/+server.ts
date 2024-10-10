import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const { refresh_token } = await request.json();

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token,
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
