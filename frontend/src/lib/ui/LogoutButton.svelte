<script>
	import { goto } from '$app/navigation';

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
</script>

<button class="logout-button" on:click={logoutClick}>
    <h4 class="poppins-500">Logout</h4>
</button>

<style>
    .logout-button {
        height: 3.5vh;
        padding-left: 1em;
        padding-right: 1em;
        text-decoration: none;
        cursor: pointer;
        transition: 0.3s;
        margin-top: 2em;
        color: var(--dove-gray);
        background-color: rgb(16, 41, 84);
        border-radius: 4em;
        border: 1px solid #eaeaea4e;
    }

    .logout-button > h4 {
        font-size: 1em;
        margin: 0;
    }

    .logout-button:hover {
        transition: 0.3s;
        color: var(--dove-gray);
        background-color: rgb(10, 26, 54);
        border-radius: 4.5em;
        border: 1px solid rgb(10, 26, 54);
        /* margin-top: 1.45em;
        filter: drop-shadow(0rem 0.5rem black); */
    }
</style>