export class Track {
    name: string;
    url: string;
    artist: string;
    artistId: string;
    genres: string[];
    artistInfo: {};

    constructor(name: string, url: string, artist: string, artistId: string, genres: string[], artistInfo: Object) {
        this.name = name;
        this.url = url;
        this.artist = artist;
        this.artistId = artistId;
        this.genres = genres;
        this.artistInfo = artistInfo;
    }
}
