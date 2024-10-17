import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "$env/static/private";
import axios from "axios";

function addQueryParams(url, params) {
    const urlObj = new URL(url);
    const searchParams = new URLSearchParams(urlObj.search);

    for (const [key, value] of Object.entries(params)) {
        searchParams.append(key, value);
    }

    urlObj.search = searchParams.toString();
    return urlObj.toString();
}

export async function GET() {
    const authEndpoint = new URL('https://accounts.spotify.com/authorize');
    const searchParams = new URLSearchParams(authEndpoint.search)
    const scope = 'user-read-private user-read-email';

    const params = {
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: encodeURIComponent(REDIRECT_URI),
        scope: encodeURIComponent(scope)
    }

    try {
        // let loginURL = addQueryParams(authEndpoint, params)
        let loginURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${scope}`
        return new Response(loginURL)
    } catch (err) {
        return new Response(err, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(err)
    }
}
