<script>

	import '../app.css';

    let SpotifyAPI = 'https://api.spotify.com'
    async function logoutClick() {
        localStorage.clear();
        window.location.href = '/';
    }
</script>

<div class="">
    <div>
        <h1>
            What're they listening to?
        </h1>
    </div>
    <div>
        <h3 class="montserrat">
            a summary of my newest songs on rotation. 
                <a href="/"class="montserrat">
                    click me
                </a> 
            to listen along
        </h3>
    </div>
</div>
<button on:click={logoutClick}>Logout</button>

<style lang="postcss">

</style>