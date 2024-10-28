import type { RequestHandler } from '@sveltejs/kit';
import { VITE_DEV_BACKEND } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
    let body = request.body;
    const response = await fetch(`${VITE_DEV_BACKEND}/user/top`, {
        method: 'POST',
        headers: {
            'Authorization': request.headers.get('Authorization') || '',
            'Content-Type': 'application/json',
        },
        body,
    });
    console.log(response)
    
    if (!response.ok) {
        return {
            status: response.status,
            body: await response.json(),
        };
    }

    const topData = await response.json();
    return {
        status: 200,
        body: topData,
    };
};
