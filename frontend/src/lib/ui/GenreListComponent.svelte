<script>
    export let genre;
    export let artists;
    export let color;
</script>

<div class="tw-flex tw-flex-row tw-mb-4">
    <div class="tw-w-60 tw-text-right">
        <p class="poppins tw-text-xs ">{genre}</p>
    </div>
    <ul class="tw-pl-4 tw-w-60 tw-flex tw-flex-col tw-min-h-min tw-mt-0 tw-mb-0" style="color: {color}">
        {#each artists as artist} 
            <li class="poppins tw-text-left tw-list-none tw-pb-0 tw-text-xs">{artist}</li>
        {/each}
    </ul>
</div>
