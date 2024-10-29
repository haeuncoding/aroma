import type { RequestHandler } from '@sveltejs/kit';
import { VITE_DEV_BACKEND } from '$env/static/private';

export const POST: RequestHandler<{ dataType: string; timeRange: string; limit: string; }> = async ({ params, request }) => {
    const { dataType, timeRange, limit } = params;
    const response = await fetch(`${VITE_DEV_BACKEND}/user/top/${dataType}?time_range=${timeRange}&limit=${limit}&offset=0`/, {
        method: 'POST',
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

    const topData = await response.json();
    return {
        status: 200,
        body: topData,
    };
};
