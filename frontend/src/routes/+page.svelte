<script lang="ts">
    /** @type {import('./$types').PageData} */
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store'
	import './app.css'
    import { goto } from '$app/navigation';
	let SpotifyAPI = 'https://api.spotify.com';
	let userProfile = writable({});
    let displayName;
    let age;
    let accessToken = sessionStorage.getItem('access_token');
    
	async function logoutClick() {
        fetch(`http://localhost:3000/logout`)
            .then((response) => {
                return response.json()
            })
            .then ((res) => {
                if (res.status === 200) {
                    sessionStorage.clear();
                    goto('/login')
                }
            })
	}

	async function goToLogin() {
		goto('/login');
	}

    async function getUser() {
        const response = await fetch('/api/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        console.log(response)
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        return await response.json();
    }

	// On mount, check for an access token in localStorage
	onMount(async () => {
		if (accessToken !== null) {
            // Fetch the user's Spotify profile using the access token
            const userData = await getUser();
            userProfile.set(userData);
		}
	});

    $: console.log('userProfile: ', $userProfile)
    $: {display_name: displayName} = $userProfile;
    

</script>

{#if !accessToken}
	<div class="">
		<h2 class="red-rose">Please click the button below to go to the login screen.</h2>
	</div>
	<button class="session-button" on:click={goToLogin}>
		<h4 class="montserrat">Go to Login</h4>
	</button>
{/if}

{#if accessToken}
    <div class="">
        {#if display_name}
        <div>
            <h1 class="red-rose">What's {userProfile.display_name} listening to?</h1>
        </div>
        {/if}
        {#if !display_name}
        <div>
            <h1 class="red-rose">What are they listening to?</h1>
        </div>
        {/if}
        <div>
            <h3 class="montserrat">
                a summary of my newest songs on rotation.
                <a href="/" class="montserrat"> click me </a>
                to listen along
            </h3>
        </div>
    </div>
    <button class="session-button" on:click={logoutClick}>
        <h4 class="montserrat-500">Logout</h4>
    </button>
{/if}

<style lang="postcss">
</style>
