<script>
    import { RingLoader } from 'svelte-loading-spinners'
</script>


<div class="mlr-auto text-center loading-div">
    <div class="spin-container">
        <RingLoader size="70" color="#eaeaea" unit="px" duration="4s"/>
    </div>
    <div class="loading-text-div">
        <h1 class="loading-text red-rose">Thinking...</h1>
    </div>
</div>

<style lang="postcss">
    .loading-div {
        text-align: center;
        align-items: center;
    }

    .loading-text-div {
        margin-top: 5vh;
    }

    .loading-text {
        font-size: 1.5em;
    }

    .spin-container {
        margin-left: auto;
        margin-right: auto;
        width: fit-content;
        min-height: max-content;
    }
</style>