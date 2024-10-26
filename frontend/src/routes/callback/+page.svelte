<script>
	import '../../app.css';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let error = '';
	let errorMsg = '';
	let errorStatus = '';

	$: error;
	$: errorMsg;
	$: errorStatus;
	// When the page is loaded, check the query parameters for the authorization code
	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		const code = params.get('code');
		const state = params.get('state');
		const errorParam = params.get('error');
		if (errorParam) {
			error = errorParam;
		}

		if (code) {
			// Exchange the code for tokens via the Express backend
			fetch(`http://localhost:3000/auth/callback?code=${code}&state=${state}`, {
                credentials: 'include'
            })
				.then((response) => {
                    return response.json();
                })
				.then((data) => {
                    console.log(data)
					const accessToken = data.access_token;
					const refreshToken = data.refresh_token;
					console.log(data);
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
						sessionStorage.setItem('access_token', accessToken);
						sessionStorage.setItem('refresh_token', refreshToken);

						// Redirect to the main page (home)
						goto('/');
					}
				})
				.catch((err) => {
					error = 'Error during authentication';
					console.error(err);
				});
		}
	});
</script>

<div class="mlr-auto text-center">
	{#if !error}
		<h1 class="red-rose">Logging you in...</h1>
	{/if}

	{#if error}
		<h2 class="red-rose">Error: {error}</h2>
		<h2 class="red-rose">Error: {errorStatus} - {errorMsg}</h2>
	{/if}
</div>
