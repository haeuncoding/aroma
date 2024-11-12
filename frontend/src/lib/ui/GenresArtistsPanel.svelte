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

<div id="genres-artists">
    {#each genreObjKeys as genre}
        <GenreListComponent genre={genre} artists={genreObj[genre]['artists']} color={genreObj[genre]['color']}/>
    {/each}
</div>

<style>
    #genres-artists {
        /* border: 1px solid #eaeaea6a; */
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        width: 30vw;
        text-align: center;
        transition: 0.25s;
        min-height: 20vh;
        margin-right: 0;
        padding: 0;
    }
</style>
