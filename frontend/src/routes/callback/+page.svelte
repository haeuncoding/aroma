<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
    import { navigating } from '$app/stores';
    import { SpinLine } from 'svelte-loading-spinners'
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
					const accessToken = data.access_token;
					const refreshToken = data.refresh_token;

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

    function goToLogin() {
        goto('/login')
    }
</script>

{#if !error}
    <div class="mlr-auto text-center logging-in-div">
        <div class="spin-container">
            <SpinLine size="70" color="#eaeaea" unit="px" duration="4s"/>
        </div>
        <div class="logging-in-text-div">
            <h1 class="logging-in-text red-rose">Logging you in...</h1>
        </div>
    </div>
{/if}

{#if error}
    <div class="mlr-auto text-center error-logging-in-div">

        <h2 class="red-rose">Error: {errorStatus} - {errorMsg}</h2>
        
        <h2 class="poppins error-text"> Please try logging in again.</h2>
        <button class="session-button" on:click={goToLogin}>
            <h3 class="poppins">
                Back to Login
            </h3>
        </button>
    </div>
{/if}
    
<style>
    .logging-in-div {
        text-align: center;
        align-items: center;
        margin-top: 45vh
    }

    .logging-in-text-div {
        margin-top: 5vh;
    }

    .logging-in-text {
        font-size: 1.5em;
    }
    

    .spin-container {
        margin-left: auto;
        margin-right: auto;
        width: fit-content;
        min-height: max-content;
    }

    .error-logging-in-div {
        text-align: center;
        align-items: center;
        margin-top: 35vh
    }

    .error-text {
        font-size: 1rem;
    }
</style>