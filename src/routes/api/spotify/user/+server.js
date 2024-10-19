import { error } from 'console';

const url = 'https://api.spotify.com/v1/me';
const headers = {
	'Content-Type': 'application/json'
	// "Authorization": `Bearer ${accessToken}`
};

export async function GET() {
	const res = await fetch(url, {
		headers: headers
	});

	if (!res.ok) {
		const err = await res.json();
		error(500, err.error.message);
	}

	return new Response(res.body);
}
