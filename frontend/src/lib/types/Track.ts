let accessToken = sessionStorage.getItem("access_token")

export class Track {
    name: string;
    url: string;
    artist: string;
    artistId: string;
    genres: string[];
    artistInfo: {};

    constructor(name: string, url: string, artist: string, artistId: string) {
        this.name = name;
        this.url = url;
        this.artist = artist;
        this.artistId = artistId;
        this.genres = [];
        this.artistInfo = {};
    }

    async getArtist() {
        let queryURL = new URL(`/api/spotify/artists`, window.location.origin);
        queryURL.searchParams.append('id', this.artistId);
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
        this.artistInfo = (data);
    }
}

// <script lang="ts">
// 	import { onMount } from "svelte";
// 	import { writable } from "svelte/store";

//     export let track;
//     export let name;
//     export let url;
//     export let artist;
//     export let artistId;
//     export let artistURL;
//     export let genres;
//     export let data;
//     export let artistInfo = writable();

//     const accessToken = sessionStorage.getItem("access_token");
    
//     console.log({track})
//     name = track.name;
//     url = track.href;
//     artist = track.artists[0].name;
//     artistId = track.artists[0].id;
//     async function getArtist() {
//         let queryURL = new URL(`/api/spotify/artists`, window.location.origin);
//         queryURL.searchParams.append('id', artistId);
//         const response = await fetch(queryURL, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`
//             }
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch user data');
//         }
//         data = await response.json();
//         artistInfo.set(data);
//     }
// </script>