<script>
    import { createEventDispatcher } from 'svelte';
    export let accessToken;
    export let data;

    const dispatch = createEventDispatcher();

    async function getTop(e) {
        e.preventDefault();

        let queryURL = new URL(`api/user/top`, window.location.origin);
        queryURL.searchParams.append('dataType', dataType);
        queryURL.searchParams.append('timeRange', timeRange);
        queryURL.searchParams.append('limit', limit.toString());
        
        const response = await fetch(queryURL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        data = await response.json();
        dispatch('topData', data)
    }

    
    let dataType = 'tracks';
    let timeRange = 'short_term';
    let limit = 10;
</script>

<div 
    class="tw-border tw-border-gray-300 tw-rounded-lg tw-flex tw-flex-col tw-w-28 tw-text-center tw-transition tw-duration-200 tw-ease-in-out tw-h-min tw-py-2 tw-text-xs" 
    id="parameters-div"
    >
    <form 
        class="tw-flex tw-flex-col"
        id="parameters" 
        on:submit={getTop}
        >
        <div class="parameter-container tw-text-center tw-mb-2 tw-flex tw-flex-col">
            <label 
                for="type" 
                class="parameter-label poppins">
                <p 
                    class="parameter-label-text parameter-label-text tw-mb-2">
                    Type of Data:
                </p>
                <select 
                    class="parameter-input poppins tw-py-1.5 tw-w-20 tw-rounded tw-cursor-pointer tw-text-xs tw-text-stone-900" 
                    id="type" 
                    name="type"
                    bind:value={dataType}>
                        <option value="tracks" selected>Tracks</option>
                        <option value="artists">Artists</option>
                </select>
            </label>
        </div>
        <div class="parameter-container tw-text-center tw-mb-2 tw-flex tw-flex-col">
            <label 
                for="time-range" 
                class="parameter-label poppins">
                <p class="parameter-label-text tw-mb-2">
                    Time Range:
                </p>
                <select 
                    id="time-range"
                    class="parameter-input poppins tw-py-1.5 tw-w-20 tw-rounded tw-cursor-pointer tw-text-xs tw-text-stone-900"
                    bind:value={timeRange}>
                    <option value="short_term" selected>1 Month</option>
                    <option value="medium_term">6 Months</option>
                    <option value="long_term">1 Year</option>
                </select>
            </label>
        </div>
        <div class="parameter-container tw-text-center tw-mb-2 tw-flex tw-flex-col">
            <label 
                for="limit" 
                class="parameter-label poppins">
                <p class="parameter-label-text tw-mb-2">
                    {limit} {dataType}
                </p>
                <input 
                    type="range" 
                    class="parameter-input poppins tw-w-20 tw-appearance-none tw-rounded tw-cursor-pointer tw-outline-none tw-bg-gray-300 tw-h-1"
                    id="limit" 
                    placeholder="10"
                    min="10" 
                    max="50"
                    width="10vw"
                    bind:value={limit}/>
            </label>
        </div>
        <div class="submit-button-container tw-flex tw-justify-center tw-items-center">
            <button type="submit" class="poppins tw-border-slate-50 tw-bg-[rgb(16,41,84)] tw-text-white tw-w-20 tw-rounded-full tw-border tw-border-[#eaeaea12] tw-px-4 tw-py-2 tw-text-[1em] tw-transition-all tw-duration-300 tw-ml-auto tw-mr-auto tw-mb-2 hover:tw-bg-[rgb(12,24,45)] hover:tw-rounded-[4.5em] hover:tw-border-[rgb(12,24,45)]">
                let's find out
            </button>
        </div>
    </form>
</div>

<style lang="postcss">
    
</style>
