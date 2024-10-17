import axios from "axios";

import { REDIRECT_URI, CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import { getContext } from "svelte";

export async function GET() {

    const code = getContext('authorizationCode')
    
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
        const response = tokenResponse;
        
        console.log({
            response
        })
        
        // console.log({
        //     access_token,
        //     refresh_token,
        //     msg: "POINTER"
        // })
        // Redirect to frontend with tokens in query parameters
        return new Response("200", {
            headers: {
                'Content-Type': 'application/json'
            }
        })        
        // return new Response(tokenResponse.data, {
        //     headers: {
        //         'Content-Type': "application/json",
        //     }
        // })
        // res.json({ access_token, refresh_token });
    } catch (error) {
        // res.status(500).send('Failed to exchange code for token');
    }

}
