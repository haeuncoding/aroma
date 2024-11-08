<script lang="ts">
	import { onMount } from "svelte";
	import { writable } from "svelte/store";

    export let track;
    export let name;
    export let url;
    export let artist;
    export let artistId;

    
    // const accessToken = sessionStorage.getItem("access_token");
    
    name = track.name;
    url = track.url;
    artist = track.artist;
    artistId = track.artistId;


    onMount(() => {

    })
</script>

<div>
    <p class="poppins">{name} - {artist}</p>
</div>