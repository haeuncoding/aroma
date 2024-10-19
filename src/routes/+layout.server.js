/** @type {import('@sveltejs/kit').LayoutServerLoad} */
export function load({ locals, cookies }) {
	const accessToken = cookies.get('access_token');
	const refreshToken = cookies.get('refresh_token');
	return {
		session: locals.session.data,
		accessToken,
		refreshToken
	};
}
