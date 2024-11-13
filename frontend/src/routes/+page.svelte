<script lang="ts">
    // Svelte
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store'
    import { navigating } from '$app/stores';
    import { slide } from 'svelte/transition';
    import { circInOut } from 'svelte/easing';
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
    import { createGenreObj, convertToChordDataArtists, createObjects } from '$lib/util/utilFunctions.js';
	import ReverseGenresArtistsPanel from '$lib/ui/ReverseGenresArtistsPanel.svelte';
    
    // User profile info:
    let accessToken = sessionStorage.getItem('access_token');
	let userProfile = writable({});
    
    // Track data:
    let topData = writable([]);
    let trackArr = writable([]);

    // Genre data:
    let genreObj = writable({});
    let artistObj = writable({});
    let genreObjKeys: String[];

    // Set loading boolean:
    let loading = writable(false);

    // Set genre panel boolean:
    let buttonVisible = writable(false);
    let genreArtist = writable(false);

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

    const handleArtistGenreClick = () => {
        if ($genreArtist === false) {
            genreArtist.set(true);
        } else if ($genreArtist === true) {
            genreArtist.set(false);
        };
    }

    export const populateObjs = (tracks: Track[]) => {
        let objs = createObjects(tracks);
        let genreObjRes = objs.genreObj;
        let artistObjRes = objs.artistObj;
        console.log({
            genreObjRes,
            artistObjRes,
        })
        genreObj.set(genreObjRes);
        artistObj.set(artistObjRes);
        let res = convertToChordDataArtists($genreObj);
        console.log({res})
        buttonVisible.set(true)
        data.set(res)
        loading.set(false);
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

    $: if ($trackArr.length > 0) {
        console.log($trackArr)
        populateGenreObj($trackArr);
        populateObjs($trackArr);
    }

</script>
{#if $navigating || !userProfile || Object.keys($userProfile).length === 0}
    <LoadingSpinner />
{:else if !$navigating && userProfile}

    <div class="main-container">
        <div class="top-div">
            <IntroText {userProfile} />
            <LogoutButton />
        </div>
        <div class="mid-div" transition:slide={{ duration: 500, easing: circInOut }}>
            {#if $loading === false}
                <div class="mid-left-div">
                    <div class="mid-left-upper-div">
                        <ParameterPanel on:topData={handleTopData} accessToken={accessToken} />
                        <Chart data={$data} />
                    </div>
                </div>
                <div class="mid-right-div">
                    {#if $buttonVisible}
                    <button 
                        class="poppins artist-genre-button"
                        on:click={handleArtistGenreClick}
                        >
                        {$genreArtist ? "genres => artist" : "artist => genres"}
                    </button>
                        {#if $genreArtist === true}
                            <GenresArtistsPanel bind:genreObj={$genreObj} />
                        {:else}
                            <ReverseGenresArtistsPanel bind:artistObj={$artistObj} />
                        {/if}
                    {/if}
                </div>
            {:else if ($loading === true)}
                <CalculatingSpinner />
            {/if}
        </div>
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
        min-height: 73 vh;
    }

    .mid-left-upper-div {
        display: flex;
        flex-direction: row;
    }

    .mid-right-div {
        display: flex;
        flex-direction: column;
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

    .artist-genre-button {
        height: 4vh;
        width: 18vw;
        padding-left: 3em;
        padding-right: 3em;
        text-decoration: none;
        cursor: pointer;
        transition: 0.3s;
        font-size: 0.65em;
        color: var(--dove-gray);
        background-color: rgb(16, 41, 84);
        border-radius: 4em;
        border: 1px solid #eaeaea12;
        padding: 1vh;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 2vh;
    }

    .artist-genre-button:hover {
        transition: 0.3s;
        color: var(--dove-gray);
        background-color: rgb(12, 24, 45);
        border-radius: 4.5em;
        border: 1px solid rgb(12, 24, 45);
    }

    /* 3XS devices (phones, 320px and down) */
    @media only screen and (max-width: 320px) {}

    /* XXS devices (phones, between 321px and 480px) */
    @media only screen and (max-width: 480px) {
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
            flex-direction: column;
            min-height: 73 vh;
        }

        .mid-left-upper-div {
            display: flex;
            flex-direction: column;
        }

        .mid-right-div {
            display: flex;
            flex-direction: column;
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

        .artist-genre-button {
            height: 4vh;
            width: 18vw;
            padding-left: 3em;
            padding-right: 3em;
            text-decoration: none;
            cursor: pointer;
            transition: 0.3s;
            font-size: 0.65em;
            color: var(--dove-gray);
            background-color: rgb(16, 41, 84);
            border-radius: 4em;
            border: 1px solid #eaeaea12;
            padding: 1vh;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 2vh;
        }

        .artist-genre-button:hover {
            transition: 0.3s;
            color: var(--dove-gray);
            background-color: rgb(12, 24, 45);
            border-radius: 4.5em;
            border: 1px solid rgb(12, 24, 45);
        }
    }

    /* XS devices (phones, between 481px and 600px) */
    @media only screen and (max-width: 600px) {}

    /* Small devices (portrait tablets and large phones, between 601px and 768) */
    @media only screen and (max-width: 768px) {}

    /* Medium devices (landscape tablets, between 769px and 1024px) */
    @media only screen and (max-width: 1024px) {}

    /* Large devices (laptops/desktops, between 1025px and 1280px) */
    @media only screen and (max-width: 1280px) {}

    /* Extra large devices (large laptops and desktops, between 1281px and 1440px) */
    @media only screen and (max-width: 1440px) {
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
            min-height: 73 vh;
        }

        .mid-left-upper-div {
            display: flex;
            flex-direction: row;
        }

        .mid-right-div {
            display: flex;
            flex-direction: column;
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

        .artist-genre-button {
            height: 4vh;
            width: 18vw;
            padding-left: 3em;
            padding-right: 3em;
            text-decoration: none;
            cursor: pointer;
            transition: 0.3s;
            font-size: 0.65em;
            color: var(--dove-gray);
            background-color: rgb(16, 41, 84);
            border-radius: 4em;
            border: 1px solid #eaeaea12;
            padding: 1vh;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 2vh;
        }

        .artist-genre-button:hover {
            transition: 0.3s;
            color: var(--dove-gray);
            background-color: rgb(12, 24, 45);
            border-radius: 4.5em;
            border: 1px solid rgb(12, 24, 45);
        }
    }

    /* XXL devices (large laptops and desktops, 1200px and up) */
    @media only screen and (min-width: 1440px) {
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
            min-height: 73 vh;
        }

        .mid-left-upper-div {
            display: flex;
            flex-direction: row;
        }

        .mid-right-div {
            display: flex;
            flex-direction: column;
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

        .artist-genre-button {
            height: 4vh;
            width: 18vw;
            padding-left: 3em;
            padding-right: 3em;
            text-decoration: none;
            cursor: pointer;
            transition: 0.3s;
            font-size: 0.65em;
            color: var(--dove-gray);
            background-color: rgb(16, 41, 84);
            border-radius: 4em;
            border: 1px solid #eaeaea12;
            padding: 1vh;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 2vh;
        }

        .artist-genre-button:hover {
            transition: 0.3s;
            color: var(--dove-gray);
            background-color: rgb(12, 24, 45);
            border-radius: 4.5em;
            border: 1px solid rgb(12, 24, 45);
        }
    }

</style>
