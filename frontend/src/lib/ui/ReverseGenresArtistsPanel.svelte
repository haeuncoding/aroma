<script lang="ts">
	import type { Track } from "$lib/types/Track.js";
	import { afterUpdate, onMount } from "svelte";
    import { writable } from "svelte/store";
    import ReverseGenreListComponent from "./ReverseGenreListComponent.svelte";
    export let artistObj;
    let artistObjKeys;

    $: artistObj;   
    $: artistObjKeys = Object.keys(artistObj);
    console.log({
        artistObj
    })
    console.log({artistObjKeys})

    afterUpdate(() => {

    })
    
</script>

<div id="genres-artists">
    {#each artistObjKeys as artist}
        <ReverseGenreListComponent 
            artist={artist} 
            genres={artistObj[artist]['genres']}
            tracks={artistObj[artist]['tracks']} 
            color={artistObj[artist]['color']}
            />
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
