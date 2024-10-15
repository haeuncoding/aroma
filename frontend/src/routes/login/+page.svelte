<script>

    import '../../app.css'
    import './login.css'
    import { CLIENT_ID } from '$env/static/private';
    const REDIRECT_URI = "http://localhost:5173"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    async function login() {
        window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`
    }
</script>

<div class="login-div text-center mlr-auto">
	<h1 class="title-text dm-serif-display-regular-italic">
		Let's get started.
	</h1>

	<button class="login-button" on:click={login}>
		<h3 class="montserrat">Click here to login with your Spotify.</h3>
	</button>
</div>