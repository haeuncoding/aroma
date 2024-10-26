import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
    const response = await fetch('http://localhost:3000/user', {
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
