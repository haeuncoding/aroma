<script>
    export let genre;
    export let artists;


</script>

<div class="list-component-div">
    <div class="genre-div">
        <p class="poppins">{genre}</p>
    </div>
    <div class="artist-div">
        <ul>
            {#each artists as artist} 
                <li class="artist-li poppins">{artist}</li>
            {/each}
        </ul>
    </div>
</div>

<style>
    .list-component-div {
        display: flex;
        flex-direction: row;
    }

    .genre-div {
        text-align: right;
    }

    .artist-div {
        display: flex;
        flex-direction: column;
    }

    .artist-li {
        text-align: left;
        list-style: none;
    }
</style>