/** @type {import('@sveltejs/kit').LayoutServerLoad} */
export function load({ request }) {
	console.log(request);
	return {
		request
	};
}
