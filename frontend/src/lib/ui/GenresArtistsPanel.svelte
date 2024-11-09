<script lang="ts">
	import type { Track } from "$lib/types/Track.js";
	import { afterUpdate, onMount } from "svelte";
    import { writable } from "svelte/store";
    import GenreListComponent from "./GenreListComponent.svelte";
    export let genreObj;

    let genreObjKeys = Object.keys(genreObj);
    console.log({
        genreObj
    })
    console.log({genreObjKeys})

</script>

<div id="genres-artists">
    {#each genreObjKeys as genre}
        <GenreListComponent genre={genre} artists={genreObj[genre]} />
    {/each}
</div>

<style lang="postcss">
    #genres-artists {
        border: 1px solid #eaeaea6a;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        width: 17vw;
        text-align: center;
        transition: 0.25s;
        min-height: 38vh;
    }

    div#genres-artists:hover {
        border: 1px solid #eaeaea00;
        background-color: #2b2b2b;
        filter: drop-shadow(0rem 0.5rem black);
        margin-top: 1em;
        transition: 0.25s;
    }

    .parameter-container {
        text-align: center;
        margin-bottom: 0.5vh;
        display: flex;
        flex-direction: column;
        margin-left: auto;
        margin-right: auto;
    }
    .parameter-label {
        font-size: 0.75em;
    }

    .parameter-input {
        padding: 0.75vh;
        border-radius: 5px;
        cursor: pointer;
        width: 15vw;
        font-size: 0.85em;
    }

    input#limit {
        padding: 0;
        -webkit-appearance: none;
        appearance: none; 
        width: 15vw;
        cursor: pointer;
        outline: none;
        border-radius: 15px;
        height: 0.5vh;
        background: #ccc;
        margin-top: 0;
    }

    input#limit::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none; 
        height: 2vw;
        width: 2vw;
        background-color: rgb(84, 94, 133);
        border-radius: 50%;
        border: none;
        transition: .2s ease-in-out;
    }

    input#limit::-moz-range-thumb {
        height: 2vw;
        width: 2vw;
        background-color: rgb(84, 94, 133);
        border-radius: 50%;
        border: none;
        transition: .2s ease-in-out;
    }

    input#limit::-webkit-slider-thumb:hover {
        box-shadow: 0 0 0 2vw rgba(84, 94, 133, .1)
    }

    input#limit::-moz-range-thumb:hover {
        box-shadow: 0 0 0 2vw rgba(84, 94, 133, .1)
    }
    input#limit:active::-moz-range-thumb {
        box-shadow: 0 0 0 2vw rgba(84, 94, 133, .2)
    }
    input#limit:focus::-moz-range-thumb {
        box-shadow: 0 0 0 2vw rgba(84, 94, 133, .2)    
    }
</style>
