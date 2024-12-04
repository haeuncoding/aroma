<script>
    export let artist;
    export let genres;
    export let color;
</script>

<div class="tw-flex tw-flex-row tw-mb-4">
    <div class="tw-w-60 tw-text-right">
        <p class="tw-text-xs poppins">{artist}</p>
    </div>
    <ul class="tw-pl-4 tw-w-60 tw-flex tw-flex-col tw-min-h-min tw-mt-0 tw-mb-0" style="color: {color}">
        {#each genres as genre}
            <li class="poppins tw-text-left tw-list-none tw-pb-0 tw-text-xs">{genre}</li>
        {/each}
    </ul>
</div>
