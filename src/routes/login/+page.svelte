<script>
    import '../../app.css'
    import './login.css'
    async function login() {
        await fetch('/auth/spotify',{
            method: 'GET',
        }); // Trigger the server-side redirect
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