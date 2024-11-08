let accessToken = sessionStorage.getItem("access_token")
import { Image } from "./Image.js";
export class Artist {
    name: string;
    id: string;
    genres: string[];
    images: Image[]
    constructor(name: string, id: string, genres: string[], images: Image[]) {
        this.name = name;
        this.id = id;
        this.genres = genres;
        this.images = images;
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