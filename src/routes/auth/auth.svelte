<!-- src/routes/Auth.svelte -->
<script>
    import { onMount } from "svelte";
    import { generateCodeVerifier, generateCodeChallenge } from "../../lib/pkce";
    import { CLIENT_ID, CLIENT_SECRET } from "$env/static/private";
    const clientId = CLIENT_ID;
    const redirectUri = 'YOUR_REDIRECT_URI'; // Example: http://localhost:5000/callback
    let codeVerifier = '';

    onMount(async () => {
        codeVerifier = generateCodeVerifier();
        const codeChallenge = await generateCodeChallenge(codeVerifier);
        
        const scope = 'user-read-private user-read-email'; // Add more scopes as needed
        const state = 'some_random_state_string'; 

        const authUrl = `https://accounts.spotify.com/authorize?`
        authUrl.concat(`response_type=code`);
        authUrl.concat(`&client_id=${clientId}`);
        authUrl.concat(`&scope=${encodeURIComponent(scope)}`);
        authUrl.concat(`&redirect_uri=${encodeURIComponent(redirectUri)}`);
        authUrl.concat(`&state=${state}`);
        authUrl.concat(`&code_challenge_method=S256`);
        authUrl.concat(`&code_challenge=${codeChallenge}`);

        localStorage.setItem('code_verifier', codeVerifier); // Save it for token exchange

        window.location.href = authUrl;
      });
</script>

<h1>Redirecting to Spotify for authorization...</h1>
