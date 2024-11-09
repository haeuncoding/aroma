let accessToken = sessionStorage.getItem("access_token")
import { Image } from "./Image.js";
export class Artist {
    name: string;
    id: string;
    genres: string[];
    images: Image[]
    constructor(name: string, id: string, genres: string[], images: Image[]) {
        this.name = name;
        this.id = id;
        this.genres = genres;
        this.images = images;
    }
}
