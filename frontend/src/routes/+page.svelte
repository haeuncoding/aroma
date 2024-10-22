<script>
    
    import { onMount } from 'svelte';
	import '../app.css';

    let SpotifyAPI = 'https://api.spotify.com'
    let accessToken = '';
    let userProfile = null;

    async function logoutClick() {
        localStorage.clear();
        window.location.href = '/';
    }


  // On mount, check for an access token in localStorage
  onMount(async () => {
    accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      // Fetch the user's Spotify profile using the access token
      const res = await fetch(`http://localhost:3001/me?access_token=${accessToken}`);
      userProfile = await res.json();
    }
  }
  );
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