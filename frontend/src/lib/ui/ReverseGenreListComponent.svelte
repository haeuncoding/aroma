<script>
    export let artist;
    export let genres;
    export let color;
</script>

<div class="list-component-div">
    <div class="artist-div">
        <p class="artist-div-text poppins">{artist}</p>
    </div>
    <ul class="artist-ul" style="color: {color}">
        {#each genres as genre} 
            <li class="artist-li poppins">{genre}</li>
        {/each}
    </ul>
</div>

<style>
    .list-component-div {
        display: flex;
        flex-direction: row;
        margin-bottom: 1vh;
    }

    
    .artist-div {
        width: 15vw;
        text-align: right;
    }

    .artist-div-text {
        font-size: 0.65em;
        margin-top: 0;
        margin-bottom: 0;
    }

    .artist-ul {
        padding-left: 1vw;
        width: 15vw;
        display: flex;
        flex-direction: column;
        min-height: min-content;
        padding-bottom: 0;
        padding-top: 0;
        margin-top: 0;
        margin-bottom: 0;
    }

    .artist-li {
        text-align: left;
        list-style: none;
        padding-bottom: 0vh;
        font-size: 0.65em;
    }
</style>