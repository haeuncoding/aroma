<script lang="ts">
	import type { Track } from "$lib/types/Track.js";
	import { afterUpdate, onMount } from "svelte";
    import { writable } from "svelte/store";
    import GenreListComponent from "./GenreListComponent.svelte";
    export let genreObj;
    let genreObjKeys;

    $: genreObj;   
    $: genreObjKeys = Object.keys(genreObj);
    console.log({
        genreObj
    })
    console.log({genreObjKeys})

    afterUpdate(() => {

    })
    
</script>

<div id="genres-artists" class="tw-rounded-lg tw-flex tw-flex-col tw-w-[30vw] tw-text-center tw-transition-all tw-duration-200 tw-min-h-[20vh] tw-mr-0 tw-p-0">
    {#each genreObjKeys as genre}
        <GenreListComponent genre={genre} artists={genreObj[genre]['artists']} color={genreObj[genre]['color']}/>
    {/each}
</div>

