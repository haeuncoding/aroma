<script lang="ts">
    // Svelte
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store'
    import { navigating } from '$app/stores';
    import { slide } from 'svelte/transition';
    import { circInOut } from 'svelte/easing';
    import './app.css'
    import './main.css'

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
    import { createGenreObj, convertToChordDataArtists, createObjects, createGenreArr } from '$lib/util/utilFunctions.js';
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
        loading.set(false);
    };

    export const populateChartData = (tracks: Track[]) => {
        let arr = createGenreArr(tracks);
        console.log({
            arr,
            msg: 'populate chart data'
        })
        data.set(arr);
        loading.set(false);
    }

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
        populateChartData($trackArr);
    }

</script>
{#if $navigating || !userProfile || Object.keys($userProfile).length === 0}
    <LoadingSpinner />
{:else if !$navigating && userProfile}

    <div class="tw-p-6">
        <div class="tw-relative tw-top-0 tw-flex tw-flex-row tw-justify-between">
            <IntroText {userProfile} />
            <LogoutButton />
        </div>
        <div class="tw-relative tw-top-0 tw-flex tw-flex-row tw-justify-between" transition:slide={{ duration: 500, easing: circInOut }}>
            {#if $loading === false}
                <div class="tw-flex-row">
                    <ParameterPanel on:topData={handleTopData} accessToken={accessToken} />
                </div>
                <div class="tw-flex-row">
                    <Chart data={$data} />
                </div>
                <div class="tw-flex-row">
                    {#if $buttonVisible}
                    <button 
                        class="tw-h-[4vh] tw-w-[18vw] tw-px-1 tw-py-[0.5vh] tw-text-xs tw-text-[var(--dove-gray)] tw-bg-[rgb(16,41,84)] tw-rounded-full tw-border tw-border-[#eaeaea12] tw-cursor-pointer tw-transition-all tw-duration-300 tw-ml-auto tw-mr-auto tw-mb-8 hover:tw-bg-[rgb(12,24,45)] hover:tw-rounded-[4.5em] hover:tw-border-[rgb(12,24,45)]"
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
        <div class="tw-absolute tw-bottom-0 tw-flex tw-flex-row tw-justify-between tw-text-xs">
            <div>
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
            </div>
            <div>
                <p>
                    <a href="/about" class="poppins nav-link">
                        About
                    </a>
                </p>
            </div>
        </div>
        
            <!-- <div class="deco-line"/> -->

    </div>
{/if}
