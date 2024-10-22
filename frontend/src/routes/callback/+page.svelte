<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

    let error = '';
    let errorMsg  = ''
    let errorStatus = ''
  // When the page is loaded, check the query parameters for the authorization code
  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state')
    const errorParam = params.get('error');
    if (errorParam) {
      error = errorParam;
    }

    if (code) {
      // Exchange the code for tokens via the Express backend
      fetch(`http://localhost:3000/auth/callback?code=${code}&state=${state}`)
        .then((response) => {})
        .then(data => {
            const accessToken = data.access_token;
            const refreshToken = data.refresh_token;
            console.log(data)
            if (data.status !== 200 || data.ok !== true) {
                errorStatus = data.status.toString();
                errorMsg = data.message;
            }
            if (!accessToken || !refreshToken) {
                errorStatus = data.status.toString();
                errorMsg = data.message;
            }

            if (accessToken && refreshToken && data.status === 200 && data.ok === true) {
                // Only if response is okay
                // Store tokens in localStorage (or use another method as needed)
                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('refresh_token', refreshToken);

                // Redirect to the main page (home)
                goto('/');
            }
        })
        .catch(err => {
          error = 'Error during authentication';
          console.error(err);
        });
    }
  });
</script>

{#if error}
  <p>Error: {error}</p>  

{/if}

{#if errorMsg}
  <p>Error: {error}</p>  
  <p>Error: {errorStatus} - {errorMsg}</p>
{/if}


<p>Logging you in...</p>