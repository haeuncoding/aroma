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

<button class="session-button" on:click={logoutClick}>
    <h4 class="poppins-500">Logout</h4>
</button>