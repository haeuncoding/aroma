<script lang="ts">
    /** @type {import('./$types').PageData} */
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store'
	import './app.css'
    import { goto } from '$app/navigation';

    // User profile info:

	let userProfile = writable({});
    let displayName;
    let accessToken = sessionStorage.getItem('access_token');
    
	async function logoutClick() {
        fetch(`http://localhost:3000/auth/logout`)
            .then((response) => {
                return response.json()
            })
            .then ((res) => {
                if (res.status === 200) {
                    sessionStorage.clear();
                    goto('/login')
                }
            })
	}

	async function goToLogin() {
		goto('/login');
	}

    async function getUser() {
        const response = await fetch('/api/user/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        console.log(response)
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        return await response.json();
    }

    let dataType = 'tracks';
    let timeRange = 'short-term';
    let limit = 10;

    async function getTop(e) {
        e.preventDefault();
        const response = await fetch('/api/user/top', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                type: dataType,
                time_range: timeRange,
                limit: limit,
            })
        });
        console.log(response)
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        return await response.json();
    }

	// On mount, check for an access token in localStorage
	onMount(async () => {
		if (accessToken !== null) {
            // Fetch the user's Spotify profile using the access token
            const userData = await getUser();
            userProfile.set(userData);
		}
	});

    $: console.log('userProfile: ', $userProfile)
    $: displayName = $userProfile.display_name;

</script>

{#if !accessToken}
	<div class="">
		<h2 class="red-rose">Please click the button below to go to the login screen.</h2>
	</div>
	<button class="session-button" on:click={goToLogin}>
		<h4 class="montserrat">Go to Login</h4>
	</button>
{/if}

{#if accessToken}
    <div class="">
        {#if displayName}
        <div>
            <h1 class="red-rose">What's <strong><em>{displayName}</em></strong> listening to?</h1>
        </div>
        {/if}
        {#if !displayName}
        <div>
            <h1 class="red-rose">What have you been listening to?</h1>
        </div>
        {/if}
        <div>
            <h5 class="montserrat">
                a summary of your newest songs on rotation.
                <a href="/" class="montserrat"> click me </a>
                to listen along
            </h5>
        </div>
    </div>

    <div id="parameters">
        <form on:submit={getTop}>
            <div class="parameter-container">
                <label 
                    for="type" 
                    class="parameter-label montserrat">
                    <p class="parameter-label-text">
                        Type of Data:
                    </p>
                    <select 
                        class="parameter-input montserrat" 
                        id="type" 
                        name="type"
                        bind:value={dataType}>
                            <option value="tracks" selected>Tracks</option>
                            <option value="artists">Artists</option>
                    </select>
                </label>
            </div>
            <div class="parameter-container">
                <label 
                    for="time-range" 
                    class="parameter-label montserrat">
                    <p class="parameter-label-text">
                        Time Range:
                    </p>
                    <select 
                        id="time-range"
                        class="parameter-input montserrat"
                        bind:value={timeRange}>
                        <option value="short-term" selected>1 Month</option>
                        <option value="medium-term">6 Months</option>
                        <option value="long-term">1 Year</option>
                    </select>
                </label>
            </div>
            <div class="parameter-container">
                <label 
                    for="limit" 
                    class="parameter-label montserrat">
                    <p class="parameter-label-text">
                        {limit} {dataType}
                    </p>
                    <input 
                        type="range" 
                        class="parameter-input montserrat"
                        id="limit" 
                        placeholder="10"
                        min="10" 
                        max="50"
                        width="10vw"
                        bind:value={limit}/>
                </label>
            </div>
            <div class="submit-button-container">
                <button type="submit" class="montserrat submit-button">
                    let's find out
                </button>
            </div>
        </form>
    </div>
    


    <button class="session-button" on:click={logoutClick}>
        <h4 class="montserrat-500">Logout</h4>
    </button>
{/if}

<style lang="postcss">
    #parameters {
        border: 1px solid #eaeaea6a;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        width: 25vw;
        text-align: center;
        transition: 0.25s;
        min-height: 38vh;
    }

    div#parameters:hover {
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
        width: 20vw;
        font-size: 0.85em;
    }

    input#limit {
        padding: 0;
        -webkit-appearance: none;
        appearance: none; 
        width: 20vw;
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
    input#limit:active::-webkit-slider-thumb {
        box-shadow: 0 0 0 2vw rgba(84, 94, 133 .2)
    }
    input#limit:focus::-webkit-slider-thumb {
        box-shadow: 0 0 0 2vw rgba(84, 94, 133, .2)
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
