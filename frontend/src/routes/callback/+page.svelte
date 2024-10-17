<script>
	import { onMount, setContext } from "svelte";
    import { writable } from 'svelte/store';

    const authorizationCode = writable()
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    let urlParamsCode = urlParams.get('code');
    $: authorizationCode.set(urlParamsCode);

    onMount(() => {
        if (urlParams) {
            callback();
        } else {

        }
    })
    async function callback() {
        const response = await fetch('/callback')
        let token = await response.json();
        console.log(token)
    }
</script>