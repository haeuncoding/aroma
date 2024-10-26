<script>
	import { onMount } from 'svelte';
	import '../app.css';
    import { goto } from '$app/navigation';
	let SpotifyAPI = 'https://api.spotify.com';
	let accessToken = '';
	let userProfile = null;

	async function logoutClick() {
        fetch(`http://localhost:3000/logout`)
            .then((response) => {
                return response.json()
            })
            .then ((res) => {
                if (res.status === 200) {
                    sessionStorage.clear();
                    goto('/login')
                }
            })
	}

	async function goToLogin() {
		window.location.href = '/login';
	}

	// On mount, check for an access token in localStorage
	onMount(async () => {
		let accessToken = sessionStorage.getItem('access_token');

		if (accessToken) {
			// Fetch the user's Spotify profile using the access token
			const res = await fetch(`http://localhost:3000/me?access_token=${accessToken}`);
			userProfile = await res.json();
            console.log(userProfile)
		}
	});
</script>

{#if !accessToken}
	<div class="">
		<h2 class="red-rose">Please click the button below to go to the login screen.</h2>
	</div>
	<button class="session-button" on:click={goToLogin}>
		<h4 class="montserrat">Go to Login</h4>
	</button>
{/if}

<!-- {#if tokens} -->
<div class="">
	<div>
		<h1 class="red-rose">What're they listening to?</h1>
	</div>
	<div>
		<h3 class="montserrat">
			a summary of my newest songs on rotation.
			<a href="/" class="montserrat"> click me </a>
			to listen along
		</h3>
	</div>
</div>
<button class="session-button" on:click={logoutClick}>
	<h4 class="montserrat-500">Logout</h4>
</button>

<!-- {/if} -->

<style lang="postcss">
</style>
