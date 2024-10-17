import { REDIRECT_URI, CLIENT_ID, CLIENT_SECRET } from '$env/static/private';

export async function GET({ url }) {
    const code = url.searchParams.get('code').toString()

    if (!code) {
        return new Response('400')
    }

    try {
        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded' 
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET
            }), 
        });

        // Extract access and refresh tokens from response
        const response = await tokenResponse.json();
        const resData = JSON.stringify({
            accessToken: response.access_token,
            tokenType: response.token_type,
            refreshToken: response.refresh_token
        })

        if (tokenResponse.ok) {
            return new Response(resData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                status: 200,
                statusText: 'Code exchanged for tokens successfully'
            })
        } else {
            return new Response(null, {
                status: 500,
                statusText: 'Failed to exchange code for token.'
            })
        }
        
    } catch (error) {
        return new Response(null, {
                status: 500,
                statusText: 'Failed to exchange code for token.'
            })
    }
}

