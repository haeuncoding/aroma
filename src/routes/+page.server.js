import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	// Check if the session data exists

	let aToken = cookies.get('access_token');
	let rToken = cookies.get('refresh_token');

	// If access token is not present, redirect to login
	if (!aToken || !rToken) {
		throw redirect(303, '/login'); // Redirect to login page
	}

	// If the token is present, you can return additional data as needed
	return {
		// Additional data to be sent to the main page component can be returned here
		accessToken: aToken,
		refreshToken: rToken
	};
}
