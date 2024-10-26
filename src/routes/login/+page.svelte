<script>
	import '../../app.css';
	import './login.css';

	async function login() {
		window.location.href = '/api/login';
	}
</script>

<div class="login-div mlr-auto text-center">
	<h1 class="title-text red-rose">Let's get started.</h1>

	<button class="login-button" on:click={login}>
		<h3 class="montserrat">Click here to login with your Spotify.</h3>
	</button>
</div>
