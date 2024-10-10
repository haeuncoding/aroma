
import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit'

let data;

const redirectUrl = 'eg:http://localhost:8080';        // your redirect URL - must be localhost URL and/or HTTPS
const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope = 'user-read-private user-read-email';

// Data structure that manages the current active token, caching it in localStorage
const currentToken = {
    get access_token() { return localStorage.getItem('access_token') || null; },
    get refresh_token() { return localStorage.getItem('refresh_token') || null; },
    get expires_in() { return localStorage.getItem('refresh_in') || null },
    get expires() { return localStorage.getItem('expires') || null },
};
    
function save (response) {
    const { access_token, refresh_token, expires_in } = response;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('expires_in', expires_in);

    const now = new Date();
    const expiry = new Date(now.getTime() + (expires_in * 1000));
    localStorage.setItem('expires', expiry);
}


    export async function GET(event) {
        
    }
    

    async function handleClick () {
        console.log('hello')

        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const randomValues = crypto.getRandomValues(new Uint8Array(64));
        const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");
        const codeVerifier = randomString;
        const data = new TextEncoder().encode(codeVerifier);
        const hashed = await crypto.subtle.digest('SHA-256', data);
        // console.log({
        //     possible,
        //     randomValues,
        //     randomString,
        //     codeVerifier,
        //     data,
        //     hashed
        // })
        console.log('here')
        const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
        
        window.localStorage.setItem('code_verifier', codeVerifier);
        
        const authUrl = new URL(authorizationEndpoint)
        const params = {
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            code_challenge_method: 'S256',
            code_challenge: code_challenge_base64,
            redirect_uri: redirectUrl,
        };

        // console.log({
        //     authUrl, 
        //     params
        // })

        authUrl.search = new URLSearchParams(params).toString();
            // On page load, try to fetch auth code from current browser search URL
        const args = new URLSearchParams(window.location.search);
        const code = args.get('code');
        // If we find a code, we're in a callback, do a token exchange

        // if (code) {
        //     const token = await getToken(code);
        //     save(token);
            
        //     // Remove code from URL so we can refresh correctly.
        //     const url = new URL(window.location.href);
        //     url.searchParams.delete("code");
            
        //     const updatedUrl = url.search ? url.href : url.href.replace('?', '');
        //     window.history.replaceState({}, document.title, updatedUrl);
        // }
        
        // // If we have a token, we're logged in, so fetch user data and render logged in template
        // if (currentToken.access_token) {
        //     const userData = await getUserData();
        //     // renderTemplate("main", "logged-in-template", userData);
        //     // renderTemplate("oauth", "oauth-template", currentToken);
        // }
    
        // // Otherwise we're not logged in, so render the login template
        // if (!currentToken.access_token) {
        //     // renderTemplate("main", "login");
        // }
    }

    async function redirectToSpotifyAuthorize() {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const randomValues = crypto.getRandomValues(new Uint8Array(64));
        const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");
        
        const code_verifier = randomString;
        const data = new TextEncoder().encode(code_verifier);
        const hashed = await crypto.subtle.digest('SHA-256', data);
        
        const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
        
        window.localStorage.setItem('code_verifier', code_verifier);
        
        const authUrl = new URL(authorizationEndpoint)
        const params = {
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            code_challenge_method: 'S256',
            code_challenge: code_challenge_base64,
            redirect_uri: redirectUrl,
        };

        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
    }

    // Spotify API Calls
    async function getToken(code) {
        const code_verifier = localStorage.getItem('code_verifier');

        const response = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
            client_id: CLIENT_ID,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUrl,
            code_verifier: code_verifier,
            }),
        });

        return await response.json();
    }

    async function refreshToken() {
        const response = await fetch(
            tokenEndpoint, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                client_id: CLIENT_ID,
                grant_type: 'refresh_token',
                refresh_token: currentToken.refresh_token
                }),
            }
    );

    return await response.json();
    }

    async function getUserData() {
        const response = await fetch("https://api.spotify.com/v1/me", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
        });

        return await response.json();
    }

    // Click handlers
    async function loginWithSpotifyClick() {
        await redirectToSpotifyAuthorize();
    }

    async function logoutClick() {
        localStorage.clear();
        window.location.href = redirectUrl;
    }

    async function refreshTokenClick() {
        const token = await refreshToken();
        // currentToken.save(token);
        // renderTemplate("oauth", "oauth-template", currentToken);
        }

</script>


<slot></slot>
