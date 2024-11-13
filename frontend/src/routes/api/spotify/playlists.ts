import type { RequestHandler } from '@sveltejs/kit';
import { VITE_DEV_BACKEND } from '$env/static/private';

export const POST: RequestHandler<{ userId: string }> = async ({ params, request }) => {
    const { userId } = params;
    const response = await fetch(`${VITE_DEV_BACKEND}/artist/${userId}`, {
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

    const playlistData = await response.json();
    return {
        status: 200,
        body: playlistData,
    };
};
