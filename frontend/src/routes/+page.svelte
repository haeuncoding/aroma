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
    import { Track } from '$lib/types/Track.js';
    import TrackComponent from '$lib/objects/TrackComponent.svelte';

    // User profile info:
    let accessToken = sessionStorage.getItem('access_token');
	let userProfile = writable({});
    
    // Track data:
    let topData = writable([]);
    let trackArr = writable([]);

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
        topData.set(data.items);
        createTrackArr($topData);
    }

    function createTrackArr(tracks) {
        let arr = [];
        for (let i = 0; i < tracks.length - 1; i++) {
            let track = tracks[i]
            let name = track.name;
            let url = track.href;
            let artist = track.artists[0].name;
            let artistId = track.artists[0].id;
            let trackObj = new Track(name, url, artist, artistId);
            trackObj.getArtist();
            arr.push(trackObj)
        }
        trackArr.set(arr);
    }

	// On mount, check for an access token in localStorage
	onMount(async () => {
		if (accessToken !== null) {
            // Fetch the user's Spotify profile using the access token
            // const userData = await getUser();
            userProfile.set(await getUser());
            userProfile = userProfile;
		}
	});

    $: console.log({userProfile: $userProfile})
    $: console.log({topData: $topData})
    $: console.log({trackArr: $trackArr})

</script>
{#if $navigating || !userProfile || Object.keys($userProfile).length === 0}
    <LoadingSpinner />
{/if}
{#if !$navigating && userProfile}
    <IntroText {userProfile} />
    <ParameterPanel on:topData={handleTopData} accessToken={accessToken} />
    <LogoutButton />
{/if}

<div>
    {#each $topData as track}
        <TrackComponent {track}/>
    {/each}
</div>
<style lang="postcss">
    
</style>
