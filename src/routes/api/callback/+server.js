import { REDIRECT_URI, CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';

export async function GET({ url, locals, cookies }) {
	const code = url.searchParams.get('code');
	console.log({
		url,
		locals
	});
	console.log({ code });

	if (!code) {
		throw error(400, 'Authorization code not found');
	}

	// Exchange the authorization code for an access token
	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
		},
		body: new URLSearchParams({
			grant_type: 'authorization_code',
			code,
			redirect_uri: REDIRECT_URI
		})
	});

	const data = await response.json();

	if (!response.ok) {
		throw error(500, 'Failed to get access token');
	}

	const { access_token, refresh_token, expires_in } = data;

	console.log({
		access_token,
		refresh_token
	});
	const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds since the epoch
	const expirationDate = currentTime + 2700; // Add 45 minutes (2700 seconds)

	cookies.set('access_token', access_token, { expirationDate: expirationDate, path: '/' });
	cookies.set('refresh_token', refresh_token, { expirationDate: expirationDate, path: '/' });

	console.log({
		data,
		'locals before': locals.session.data
	});
	// Store tokens in session
	locals.session.set({
		access_token,
		refresh_token,
		expires_in,
		token_time: Date.now() // Store current time to track expiration
	});

	console.log({
		data,
		'locals after': locals.session.data
	});

	// Redirect to the home page.
	throw redirect(303, '/');
}
