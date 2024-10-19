import { redirect } from '@sveltejs/kit';

export async function POST({ cookies }) {
	cookies.remove({ name: 'access_token' });
	cookies.remove({ name: 'refresh_token' });

	// Redirect to the login page after clearing the cookies
	throw redirect(303, '/login');
}
