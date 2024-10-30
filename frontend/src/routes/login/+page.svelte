<script lang="ts">
	import '../app.css';
	import './login.css';

	const backendURL = import.meta.env.VITE_DEV_BACKEND;

	async function login() {
		let loginURL = `${backendURL}/auth/spotify`;
		window.location.href = loginURL;
	}
</script>

<div class="login-div mlr-auto text-center">
	<h1 class="title-text red-rose">Let's get started.</h1>

	<button class="login-button" on:click={login}>
		<h3 class="poppins">Click here to login with your Spotify.</h3>
	</button>
</div>
