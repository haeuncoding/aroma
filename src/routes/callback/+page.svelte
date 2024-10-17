<script lang="ts">
    import { browser } from '$app/environment';
	import { onMount, setContext } from "svelte";
    import { writable } from 'svelte/store';
    import { redirect } from '@sveltejs/kit';
    import { goto } from '$app/navigation';
    let urlParamsCode    
    
    onMount(() => {
        
        async function retrieveTokens() {
            const response = await fetch(`/callback?code=${urlParamsCode}`)
            let token = await response.json();
            console.log({
                token
            })
            return token
        }
        
        async function onSuccessfulLogin (result: boolean) {
            if (result === true) {
                goto('/')
            } else {
                goto('/login')
            }
        }
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        urlParamsCode = urlParams.get('code');


        retrieveTokens()
        .then((result) => setTokens(result))
        .then((result) => onSuccessfulLogin(result))
    })

    const setTokens = (tokens: any) => {
        const accessToken = tokens.accessToken
        const refreshToken = tokens.refreshToken
        if (accessToken !== null && refreshToken !== null) {
            sessionStorage.setItem('accessToken', accessToken)
            sessionStorage.setItem('refreshToken', refreshToken)
            return true;
        } else {
            return false;
        }
    }
</script>