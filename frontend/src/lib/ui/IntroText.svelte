<script>
	import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { writable } from 'svelte/store'
    import { navigating } from '$app/stores';

    let accessToken = sessionStorage.getItem('access_token');
	export let userProfile
    let displayName = writable('')

    // let userProfilePicSrc = $userProfile.images[0].url
    async function goToLogin() {
        goto('/login');
	}
    
    $: displayName.set($userProfile.display_name);
    

</script>

{#if !accessToken}
	<div class="">
		<h2 class="red-rose">Please click the button below to go to the login screen.</h2>
	</div>
	<button class="session-button" on:click={goToLogin}>
		<h4 class="poppins">Go to Login</h4>
	</button>
{/if}

{#if accessToken}
    <div class="">
        <div>
            {#if displayName}
                <div>
                    <h1 class="red-rose">What's <strong><em>{$displayName}</em></strong> listening to?</h1>
                </div>
            {/if}
                {#if !displayName}
                <div>
                    <h1 class="red-rose">What have you been listening to?</h1>
                </div>
            {/if}
        </div>
        <div>
            <!-- <img src={userProfilePicSrc} id="user-pic"/> -->
        </div>
        <div>
            <h5 class="poppins">
                a summary of your newest songs on rotation.
                <a href="/" class="poppins"> click me </a>
                to listen along
            </h5>
        </div>
    </div>
{/if}

<style>
    img#user-pic {
        max-width: 5vw;
        border-radius: 50%;
    }
</style>