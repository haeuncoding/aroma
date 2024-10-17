import axios from "axios";
import { json } from "@sveltejs/kit";
import { REDIRECT_URI, CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import { getContext } from "svelte";

export async function GET({ url }) {
// /** @type {import('./$types').RequestHandler} */


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
        const accessToken = response.access_token;
        const tokenType = response.token_type;
        const refreshToken = response.refresh_token;

        console.log({resData})

        if (tokenResponse.ok) {
            // sessionStorage.setItem("accessToken", accessToken)
            // sessionStorage.setItem("tokenType", tokenType)
            // sessionStorage.setItem("refreshToken", refreshToken)
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

