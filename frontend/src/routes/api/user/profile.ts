import type { RequestHandler } from '@sveltejs/kit';
import { VITE_DEV_BACKEND } from '$env/static/private';
export const GET: RequestHandler = async ({ request }) => {
    const response = await fetch(`${VITE_DEV_BACKEND}/user/profile`, {
        method: 'GET',
        headers: {
            'Authorization': request.headers.get('Authorization') || '',
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        return {
            status: response.status,
            body: await response.json(),
        };
    }

    const userData = await response.json();
    return {
        status: 200,
        body: userData,
    };
};
