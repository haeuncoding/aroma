import { CLIENT_ID, REDIRECT_URI } from '$env/static/private';

// function addQueryParams(url, params) {
//     const urlObj = new URL(url);
//     const searchParams = new URLSearchParams(urlObj.search);

//     for (const [key, value] of Object.entries(params)) {
//         searchParams.append(key, value);
//     }

//     urlObj.search = searchParams.toString();
//     return urlObj.toString();
// }

export async function GET() {
	const scope = 'user-read-private user-read-email';
	const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(scope)}`;

	try {
		let response = new Response(null, {
			status: 302, // HTTP status code for redirect
			headers: {
				Location: authUrl // Spotify authorization URL
			}
		});
		console.log(response);

		return response;
	} catch (err) {
		console.log(err);
		return new Response(err, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}
