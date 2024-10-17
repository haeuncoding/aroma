<script>

    import '../../app.css'
    import './login.css'

    async function login() {
        const response = await fetch('/login');
        let spotifyURL = await response.text();
        let url = new URL(spotifyURL)
        console.log({spotifyURL})
        let spotifyLoginModal = window.open(url)
        console.log(spotifyLoginModal)
    }

    async function callback() {
        const response = await fetch('/callback');
        let tokens = await response.json();
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