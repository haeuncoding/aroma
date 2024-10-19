import { error } from '@sveltejs/kit';

export async function GET({ locals }) {
	const session = locals.session.data;

	if (!session || !session.access_token) {
		throw error(401, 'Not logged in');
	}

	const now = Date.now();
	const tokenExpired = now - session.token_time >= session.expires_in * 1000;

	if (tokenExpired) {
		throw error(401, 'Access token expired');
	}

	try {
		const response = await fetch('https://api.spotify.com/v1/me', {
			headers: {
				Authorization: `Bearer ${session.access_token}`
			}
		});

		if (!response.ok) {
			throw error(response.status, 'Failed to fetch user data');
		}

		const userData = await response.json();
		return new Response(JSON.stringify(userData), { status: 200 });
	} catch (err) {
		console.error('Error fetching Spotify data:', err);
		throw error(500, 'Error fetching Spotify data');
	}
}
