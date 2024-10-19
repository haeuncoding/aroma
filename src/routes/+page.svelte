<script context="module" lang="ts">
	// You can import the load function defined above
	// export { load } from './+page.server.js';
</script>

<script lang="ts">
	import '../app.css';
	export let tokens;

	// let SpotifyAPI = 'https://api.spotify.com'

	async function goToLogin() {
		window.location.href = '/login';
	}

	async function logout() {
		// Call the logout API
		const response = await fetch('/api/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			window.location.href = '/login'; // Redirect to the login page
		} else {
			console.error('Logout failed');
		}
	}
</script>

{#if !tokens}
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
<button class="session-button" on:click={logout}>
	<h4 class="montserrat-500">Logout</h4>
</button>

<!-- {/if} -->

<style lang="postcss">
</style>
