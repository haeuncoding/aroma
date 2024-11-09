<script lang="ts">
	import LogoutButton from './../lib/ui/LogoutButton.svelte';
    /** @type {import('./$types').PageData} */
    import { onMount } from 'svelte';
    import { writable, derived } from 'svelte/store'
    import { navigating } from '$app/stores';
	import './app.css'
    import { goto } from '$app/navigation';
    import IntroText from '$lib/ui/IntroText.svelte';
    import ParameterPanel from '$lib/ui/ParameterPanel.svelte';
    import LoadingSpinner from '$lib/ui/LoadingSpinner.svelte';
    import { Track } from '$lib/types/Track.js';
    import TrackComponent from '$lib/objects/TrackComponent.svelte';
    import { Artist } from '$lib/types/Artist.js';
	import GenresArtistsPanel from '$lib/ui/GenresArtistsPanel.svelte';

    // User profile info:
    let accessToken = sessionStorage.getItem('access_token');
	let userProfile = writable({});
    
    // Track data:
    let topData = writable([]);
    let trackArr = writable([]);

    // Artist data:


    // Genre data:
    let genreObj = writable({});
    let genreObjKeys: String[];

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

    const handleTopData = async (event: Event) => {
        let data = event.detail;
        console.log('Top Data: ', data)
        topData.set(data.items);
        createTrackArr($topData);
    }

    const createTrackArr = async (tracks: any[]) => {
        let arr: Track[] = [];
        for (let i = 0; i < tracks.length; i++) {
            let track = tracks[i]
            let name = track.name;
            let url = track.href;
            let artist = track.artists[0].name;
            let artistId = track.artists[0].id;
            let trackObj = await createTrack(name, url, artist, artistId);
            // trackObj.getArtist();
            arr.push(trackObj)
        }
        trackArr.set(arr);
    }

    const createTrack = async (name: string, url: string, artist: string, artistId: string) => {
        const artistInfo = await getArtistInfo(artistId);
        const genres = artistInfo.genres;
        return new Track(name, url, artist, artistId, genres, artistInfo);
    }

    const getArtistInfo = async (artistId: string) => {
        let res;
        let queryURL = new URL(`/api/spotify/artists`, window.location.origin);
        queryURL.searchParams.append('id', artistId);
        const response = await fetch(queryURL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        let data = await response.json();
        res = data;
        return res;
    }


    export const populateGenreObj = (tracks: Track[]) => {
        let obj = {};
        tracks.forEach((track: Track) => {
            let arr = track.genres;
            console.log({
                track, 
                genres: track.genres,
                name: track.name
            })
            for (let i = 0; i < arr.length; i++) {
                let genre = arr[i];
                if (!obj[genre]) {
                    obj[genre] = [track.artist]
                }
                if (obj[genre]) {
                    if (!obj[genre].includes(track.artist)) {
                        obj[genre].push(track.artist);
                    }
                }
            }
        })
        console.log(obj)
        genreObj.set(obj);
    };

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
    $: console.log({trackArr: $trackArr})
    $: console.log({genreObj: $genreObj})
    $: if ($trackArr) {
        console.log($trackArr)
        populateGenreObj($trackArr);
    }

</script>
{#if $navigating || !userProfile || Object.keys($userProfile).length === 0}
    <LoadingSpinner />
{/if}
{#if !$navigating && userProfile}
    <div class="top-div">
        <IntroText {userProfile} />
        <LogoutButton />
    </div>
    <div class="mid-div">
        <ParameterPanel on:topData={handleTopData} accessToken={accessToken} />
        <div class="chart-div">

        </div>
        <GenresArtistsPanel genreObj={$genreObj} />
    </div>




    <div>
        {#each $trackArr as track}
            <TrackComponent {track}/>
        {/each}
    </div>
{/if}

<style lang="postcss">
    .top-div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .mid-div {

    }
</style>
