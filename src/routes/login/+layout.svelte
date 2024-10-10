<script>
  async function loginWithSpotifyClick() {
    window.location.href = '/auth/spotify'; // Trigger the server-side redirect
  }

  async function logoutClick() {
    localStorage.clear();
    window.location.href = '/';
  }
</script>

<button on:click={loginWithSpotifyClick}>Login with Spotify</button>
<button on:click={logoutClick}>Logout</button>

<slot></slot>