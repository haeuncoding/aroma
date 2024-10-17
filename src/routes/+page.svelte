<script lang="ts">
	import { redirect } from '@sveltejs/kit';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
	import '../app.css';

    let SpotifyAPI = 'https://api.spotify.com'
    async function logoutClick() {
        sessionStorage.clear();
        window.location.href = '/login';
    }

    const checkForTokens = () => {
        let aToken = sessionStorage.getItem('accessToken')
        let rToken = sessionStorage.getItem('refreshToken')
        if (!aToken || !rToken) return false;
        if (aToken && rToken) return true;
    }


</script>

{#if checkForTokens() === false}
    <div class="">
        <h2>
            Please click the button below to go to the login screen.
        </h2>
    </div>
    <a class="session-button" href="/login">
        Go to Login
    </a>
{/if}

{#if checkForTokens() === true}
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
    <button class="session-button" on:click={logoutClick}>Logout</button>
{/if}

<style lang="postcss">

</style>