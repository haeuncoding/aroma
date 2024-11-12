<script lang="ts">
    // Svelte
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store'
    import { navigating } from '$app/stores';
	import './app.css'

    // Panels
    import IntroText from '$lib/ui/IntroText.svelte';
    import ParameterPanel from '$lib/ui/ParameterPanel.svelte';
	import GenresArtistsPanel from '$lib/ui/GenresArtistsPanel.svelte';
	
    // UI
    import LogoutButton from './../lib/ui/LogoutButton.svelte';
    import LoadingSpinner from '$lib/ui/LoadingSpinner.svelte';
    import CalculatingSpinner from '$lib/ui/CalculatingSpinner.svelte';
	import Chart from '$lib/ui/Chart.svelte';
    
    // Types
    import { Track } from '$lib/types/Track.js';

    // Util Functions
    import { createGenreObj, convertToChordDataArtists } from '$lib/util/utilFunctions.js';
    
    // User profile info:
    let accessToken = sessionStorage.getItem('access_token');
	let userProfile = writable({});
    
    // Track data:
    let topData = writable([]);
    let trackArr = writable([]);

    // Genre data:
    let genreObj = writable({});
    let genreObjKeys: String[];

    // Set loading boolean:
    let loading = writable(false);

    // Set chart data
    let data = writable({})

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
        loading.set(true);
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
        let obj = createGenreObj(tracks);
        console.log(obj)
        genreObj.set(obj);
        let res = convertToChordDataArtists($genreObj);
        console.log({res})
        data.set(res)
        loading.set(false);
    };

	// On mount, check for an access token in localStorage
	onMount(async () => {
		if (accessToken !== null) {
            // Fetch the user's Spotify profile using the access token
            userProfile.set(await getUser());
            userProfile = userProfile;
		}
	});

    // $: console.log({genreObj: $genreObj})

    $: if ($trackArr) {
        console.log($trackArr)
        populateGenreObj($trackArr);
    }

</script>
{#if $navigating || !userProfile || Object.keys($userProfile).length === 0}
    <LoadingSpinner />
{/if}
{#if !$navigating && userProfile}
    <div class="main-container">
        <div class="top-div">
            <IntroText {userProfile} />
            <LogoutButton />
        </div>
        {#if $loading === false}
        <div class="mid-div">
            <ParameterPanel on:topData={handleTopData} accessToken={accessToken} />
            <Chart data={$data} />
            <GenresArtistsPanel bind:genreObj={$genreObj} />
        </div>
        {:else if ($loading === true)}
            <div class="mid-div-calculating">
                <CalculatingSpinner />
            </div>
        {/if}
        <div class="bottom-div">
            <p class="poppins">
                Designed by 
                <a
                    class="poppins website-link"
                    href="https://liucatherine.com/" 
                    target="_blank"
                    >
                        Catherine Liu
                </a> 
                and Developed by 
                <a
                    class="poppins website-link"
                    href="https://haeuncreative.com/" 
                    target="_blank"
                    >
                        Nathan Kwon
                </a>
                </p>
                <p>
                    <a href="/about" class="poppins nav-link">
                        About
                    </a>
                </p>
            
            <!-- <div class="deco-line"/> -->
        </div>
    </div>
{/if}

<style>
    .main-container {
        padding-left: 1em;
        padding-right: 1em;
    }

    .top-div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .mid-div {
        display: flex;
        flex-direction: row;
    }

    .mid-div-calculating {
        display: flex;
        flex-direction: row;
    }
    
    .bottom-div {
        display: flex;
        flex-direction: row;
        bottom: 2vh;
        font-size: 0.75em;
        justify-content: space-between;
    }

    .website-link {
        /* text-decoration: none; */
        color: var(--dove-gray);
        transition: 0.2s;
    }

    .website-link:hover {
        text-decoration: none;
        color: #a7a7a7;
        transition: 0.2s;
    }

    .deco-line {
        width: 75vw;
        border-bottom: 1px solid #eaeaea;
        bottom: 1vh;
    }
</style>
