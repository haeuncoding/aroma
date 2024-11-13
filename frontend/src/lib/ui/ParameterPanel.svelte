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

<div id="parameters-div">
    <form id="parameters" on:submit={getTop}>
        <div class="parameter-container">
            <label 
                for="type" 
                class="parameter-label poppins">
                <p class="parameter-label-text">
                    Type of Data:
                </p>
                <select 
                    class="parameter-input poppins" 
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
                class="parameter-label poppins">
                <p class="parameter-label-text">
                    Time Range:
                </p>
                <select 
                    id="time-range"
                    class="parameter-input poppins"
                    bind:value={timeRange}>
                    <option value="short_term" selected>1 Month</option>
                    <option value="medium_term">6 Months</option>
                    <option value="long_term">1 Year</option>
                </select>
            </label>
        </div>
        <div class="parameter-container">
            <label 
                for="limit" 
                class="parameter-label poppins">
                <p class="parameter-label-text">
                    {limit} {dataType}
                </p>
                <input 
                    type="range" 
                    class="parameter-input poppins"
                    id="limit" 
                    placeholder="10"
                    min="10" 
                    max="50"
                    width="10vw"
                    bind:value={limit}/>
            </label>
        </div>
        <div class="submit-button-container">
            <button type="submit" class="poppins submit-button">
                let's find out
            </button>
        </div>
    </form>
</div>

<style lang="postcss">
    /* 3XS devices (phones, 320px and down) */
    @media only screen and (max-width: 320px) {}

    /* 3XS devices (phones, 320px and down) */
    @media only screen and (min-width: 320px) {
        #parameters-div {
            border: 1px solid #eaeaea6a;
            border-radius: 15px;
            display: flex;
            flex-direction: row;
            width: 100%;
            text-align: center;
            transition: 0.25s;
            height: min-content;
            padding-bottom: 3vh;
            padding-left: 2vw;
            padding-right: 2vw;
        }

        /* div#parameters-div:hover {
            border: 1px solid #eaeaea00;
            background-color: #2b2b2b;
            filter: drop-shadow(0rem 0.5rem black);
            transition: 0.25s;
        } */

        #parameters {
            display: flex;
            flex-direction: row;
        }
        .parameter-container {
            text-align: center;
            margin-bottom: 0.5vh;
            display: flex;
            flex-direction: column;
            /* margin-left: auto;
            margin-right: auto; */
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
    }

    /* XXS devices (phones, between 321px and 480px) */
    @media only screen and (min-width: 480px) {}

    /* XS devices (phones, between 481px and 600px) */
    @media only screen and (min-width: 600px) {
        #parameters-div {
            border: 1px solid #eaeaea6a;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            width: 15vw;
            text-align: center;
            transition: 0.25s;
            height: min-content;
            padding-bottom: 3vh;
            padding-left: 2vw;
            padding-right: 2vw;
        }

        div#parameters-div:hover {
            border: 1px solid #eaeaea00;
            background-color: #2b2b2b;
            filter: drop-shadow(0rem 0.5rem black);
            transition: 0.25s;
        }

        #parameters {
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            width: inherit;
            text-align: center;
            transition: 0.25s;
            min-height: 38vh;
            height: min-content;
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
    }

    /* Small devices (portrait tablets and large phones, between 601px and 768) */
    @media only screen and (min-width: 768px) {
        #parameters-div {
            border: 1px solid #eaeaea6a;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            width: 15vw;
            text-align: center;
            transition: 0.25s;
            height: min-content;
            padding-bottom: 3vh;
            padding-left: 2vw;
            padding-right: 2vw;
        }

        div#parameters-div:hover {
            border: 1px solid #eaeaea00;
            background-color: #2b2b2b;
            filter: drop-shadow(0rem 0.5rem black);
            transition: 0.25s;
        }

        #parameters {
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            width: inherit;
            text-align: center;
            transition: 0.25s;
            min-height: 38vh;
            height: min-content;
        }

        div#parameters:hover {
            border: 1px solid #eaeaea00;
            background-color: #2b2b2b;
            filter: drop-shadow(0rem 0.5rem black);
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
    }

    /* Medium devices (landscape tablets, between 769px and 1024px) */
    @media only screen and (min-width: 1024px) {
        #parameters-div {
            border: 1px solid #eaeaea6a;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            width: 15vw;
            text-align: center;
            transition: 0.25s;
            height: min-content;
            padding-bottom: 3vh;
            padding-left: 2vw;
            padding-right: 2vw;
        }

        div#parameters-div:hover {
            border: 1px solid #eaeaea00;
            background-color: #2b2b2b;
            filter: drop-shadow(0rem 0.5rem black);
            transition: 0.25s;
        }

        #parameters {
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            width: inherit;
            text-align: center;
            transition: 0.25s;
            min-height: 38vh;
            height: min-content;
        }


        div#parameters:hover {
            border: 1px solid #eaeaea00;
            background-color: #2b2b2b;
            filter: drop-shadow(0rem 0.5rem black);
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
    }

    /* Large devices (laptops/desktops, between 1025px and 1280px) */
    @media only screen and (min-width: 1280px) {
        #parameters-div {
            border: 1px solid #eaeaea6a;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            width: 15vw;
            text-align: center;
            transition: 0.25s;
            min-height: 20vh;
            height: min-content;
            padding-bottom: 3vh;
            padding-left: 2vw;
            padding-right: 2vw;
        }

        div#parameters-div:hover {
            border: 1px solid #eaeaea00;
            background-color: #2b2b2b;
            filter: drop-shadow(0rem 0.5rem black);
            transition: 0.25s;
        }

        #parameters {
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            width: inherit;
            text-align: center;
            transition: 0.25s;
            min-height: 38vh;
            height: min-content;
        }


        div#parameters:hover {
            border: 1px solid #eaeaea00;
            background-color: #2b2b2b;
            filter: drop-shadow(0rem 0.5rem black);
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
    }

    /* Extra large devices (large laptops and desktops, between 1281px and 1440px) */
    @media only screen and (min-width: 1440px) {
        #parameters-div {
            border: 1px solid #eaeaea6a;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            width: 15vw;
            text-align: center;
            transition: 0.25s;
            height: min-content;
            padding-bottom: 3vh;
            padding-left: 2vw;
            padding-right: 2vw;
        }

        div#parameters-div:hover {
            border: 1px solid #eaeaea00;
            background-color: #2b2b2b;
            filter: drop-shadow(0rem 0.5rem black);
            transition: 0.25s;
        }

        #parameters {
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            width: inherit;
            text-align: center;
            transition: 0.25s;
            min-height: 38vh;
            height: min-content;
        }


        div#parameters:hover {
            border: 1px solid #eaeaea00;
            background-color: #2b2b2b;
            filter: drop-shadow(0rem 0.5rem black);
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
    }

    /* XXL devices (large laptops and desktops, 1200px and up) */
    @media only screen and (min-width: 1440px) {
        #parameters-div {
            border: 1px solid #eaeaea6a;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            width: 15vw;
            text-align: center;
            transition: 0.25s;
            height: min-content;
            padding-bottom: 3vh;
            padding-left: 2vw;
            padding-right: 2vw;
        }

        div#parameters-div:hover {
            border: 1px solid #eaeaea00;
            background-color: #2b2b2b;
            filter: drop-shadow(0rem 0.5rem black);
            transition: 0.25s;
        }

        #parameters {
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            width: inherit;
            text-align: center;
            transition: 0.25s;
            min-height: 38vh;
            height: min-content;
        }


        div#parameters:hover {
            border: 1px solid #eaeaea00;
            background-color: #2b2b2b;
            filter: drop-shadow(0rem 0.5rem black);
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
    }
</style>
