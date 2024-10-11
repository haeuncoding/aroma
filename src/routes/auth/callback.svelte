
<script>
  import { onMount } from "svelte";

  const clientId = 'YOUR_SPOTIFY_CLIENT_ID';
  const redirectUri = 'YOUR_REDIRECT_URI'; // Example: http://localhost:5000/callback
  const clientSecret = 'YOUR_SPOTIFY_CLIENT_SECRET'; // Optional (for server-side flow)
  
  let error = '';
  let accessToken = '';

  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const codeVerifier = localStorage.getItem('code_verifier');

    if (code) {
      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        code_verifier: codeVerifier
      });

      try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: body.toString(),
        });

        if (response.ok) {
          const data = await response.json();
          accessToken = data.access_token;
          console.log('Access Token:', accessToken);
          // Use this token for making authorized API calls
        } else {
          error = 'Token exchange failed';
        }
      } catch (err) {
        error = 'An error occurred';
      }
    } else {
      error = 'Authorization code not found';
    }
  });
</script>

{#if error}
  <p>Error: {error}</p>
{:else}
  <p>Access Token: {accessToken}</p>
{/if}