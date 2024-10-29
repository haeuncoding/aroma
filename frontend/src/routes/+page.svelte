<script lang="ts">
	import LogoutButton from './../lib/ui/LogoutButton.svelte';
    /** @type {import('./$types').PageData} */
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store'
    import { navigating } from '$app/stores';
	import './app.css'
    import { goto } from '$app/navigation';
    import IntroText from '$lib/ui/IntroText.svelte';
    import ParameterPanel from '$lib/ui/ParameterPanel.svelte';
    import LoadingSpinner from '$lib/ui/LoadingSpinner.svelte';
    // User profile info:

    let accessToken = sessionStorage.getItem('access_token');
	let userProfile = writable({});
    
    let topData = writable({});
    
    async function getUser() {
        const response = await fetch('/api/user/profile', {
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

    function handleTopData(event) {
        let data = event.detail;
        console.log('Top Data: ', data)
    }

	// On mount, check for an access token in localStorage
	onMount(async () => {
		if (accessToken !== null) {
            // Fetch the user's Spotify profile using the access token
            const userData = await getUser();
            userProfile.set(userData);
		}
	});

$: console.log({userProfile: $userProfile})
</script>
{#if $navigating || !userProfile}
    <LoadingSpinner />
{/if}
{#if !$navigating && userProfile}
    <IntroText {userProfile} />
    <ParameterPanel on:topData={handleTopData} accessToken={accessToken} />
    <LogoutButton />
{/if}

<style lang="postcss">
    
</style>
