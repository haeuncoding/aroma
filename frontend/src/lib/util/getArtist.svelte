<script>
    export async function getArtist() {
        let queryURL = new URL(`/api/spotify/artists`, window.location.origin);
        queryURL.searchParams.append('id', artistId);
        const response = await fetch(queryURL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
    
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        data = await response.json();
        return data;
    }
</script>
