let accessToken = sessionStorage.getItem("access_token")

export class Track {
    name: string;
    url: string;
    artist: string;
    artistId: string;
    genres: string[];
    artistInfo: {};

    constructor(name: string, url: string, artist: string, artistId: string) {
        this.name = name;
        this.url = url;
        this.artist = artist;
        this.artistId = artistId;
        this.genres = [];
        this.artistInfo = {};
    }

    async getArtist() {
        let queryURL = new URL(`/api/spotify/artists`, window.location.origin);
        queryURL.searchParams.append('id', this.artistId);
        const response = await fetch(queryURL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        let data = await response.json();
        this.artistInfo = (data);
        this.genres = this.artistInfo.genres;
    }

    
}
