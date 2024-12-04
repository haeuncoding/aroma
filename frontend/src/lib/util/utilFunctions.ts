import type { Track } from "$lib/types/Track.js";
import type { ChordInputNode } from "$lib/types/ChordInputNode.js";
import type { ChordInputLink } from "$lib/types/ChordInputLink.js";
import type { ChordData } from "$lib/types/ChordData.js";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';


const COLOR_LIST = [
    "#BEAB6E",
    "#6F8CFC",
    "#FEB0D9",
    "#CD8DFF",
    "#FFE58D",
    "#FEC185"
];

export const pickRandomColor = () => {
    let min = 0;
    let max = COLOR_LIST.length - 1;
    let i = getRandomInt(min, max);

    return COLOR_LIST[i];
};

export const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const createObjects = (tracks: Track[]) => {
    const returnObjs = {
        "genreObj": {},
        "artistObj": {},
    };

    const genreObj = createGenreObj(tracks);
    const artistObj = createArtistObj(tracks);
    returnObjs.genreObj = genreObj;
    returnObjs.artistObj = artistObj;
    return returnObjs;
}

export const genreExistsInArray = (array, element: string) => {
    let ele = array.find((ele) =>  ele.genre === element);
    if (!ele) return;
    return ele;
}

export const eleExistsInArray = (array: string[], element: string) => {
        let ele = array.find((ele: string) =>  ele === element);
    if (!ele) return;
    return ele;
}

export const createGenreArr = (tracks: Track[]) => {
    let finalArr: object[] = [];
        tracks.forEach((track: Track) => {
            let genreArr = track.genres;
            if (genreArr.length > 0) {
                for (let i = 0; i < genreArr.length; i++) {
                    let genreObj = {
                        genre: '',
                        artists: [],
                        tracks: [],
                    }
                    let genre = genreArr[i];
                    let foundObj = genreExistsInArray(finalArr, genre)
                    if (foundObj) {
                        if (!eleExistsInArray(foundObj.artists, track.artist)) foundObj.artists.push(track.artist);
                        foundObj.tracks.push(track.name);
                    }
                    if (!foundObj) {
                        genreObj.genre = genre;
                        genreObj.artists.push(track.artist);
                        genreObj.tracks.push(track.name);
                        finalArr.push(genreObj);
                    };
                }
            } else {
                    let genreObj = {
                        genre: '',
                        artists: [],
                        tracks: [],
                    }
                    let genre = "no genre given";
                    let foundObj = genreExistsInArray(finalArr, genre)
                    if (foundObj) {
                        if (!eleExistsInArray(foundObj.artists, track.artist)) foundObj.artists.push(track.artist);
                        foundObj.tracks.push(track.name);
                    }
                    if (!foundObj) {
                        genreObj.genre = genre;
                        genreObj.artists.push(track.artist);
                        genreObj.tracks.push(track.name);
                        finalArr.push(genreObj);
                    };
            }
        })
    return finalArr;
};

export const createGenreObj = (tracks: Track[]) => {
    let obj = {};
        tracks.forEach((track: Track) => {
            let arr = track.genres;
            for (let i = 0; i < arr.length; i++) {
                let genre = arr[i];
                if (!obj[genre]) {
                    // obj[genre] = [`${track.name} - ${track.artist}`]
                    obj[genre] = {
                        'tracks': [],
                        'artists': [],
                        'color': '',
                    }
                    obj[genre]['tracks'] = [`${track.name} - ${track.artist}`]
                    obj[genre]['artists'] = [`${track.artist}`]
                }
                if (obj[genre]) {
                    if (!obj[genre]['artists'].includes(`${track.artist}`)) {
                        obj[genre]['artists'].push(`${track.artist}`);
                    }
                    if (!obj[genre]['tracks'].includes(`${track.name} - ${track.artist}`)) {
                        obj[genre]['tracks'].push(`${track.name} - ${track.artist}`);
                    }
                }
                if (obj[genre]['color'] === '') {
                    obj[genre]['color'] = pickRandomColor();
                }
            }
        })
    return obj;
};

export const createArtistObj = (tracks: Track[]) => {
    let obj = {};
    tracks.forEach((track: Track) => {
        let artist = track.artist;

            if (!obj[artist]) {
                // obj[genre] = [`${track.name} - ${track.artist}`]
                obj[artist] = {
                    'tracks': [],
                    'genres': [],
                    'color': '',
                }
                obj[artist]['tracks'] = [`${track.name}`]
                if (track.genres.length > 0) {
                    obj[artist]['genres'] = track.genres
                } else {
                    obj[artist]['genres'] = ['no genre given']
                }
            }
            if (obj[artist]) {
                if (!obj[artist]['tracks'].includes(`${track.name}`)) {
                    obj[artist]['tracks'].push(`${track.name}`);
                }
            }
            if (obj[artist]['color'] === '') {
                obj[artist]['color'] = pickRandomColor();
            }
        })
    return obj;
};

export const convertToChordDataArtists = (genreObj: any) => {
    const genres = Object.keys(genreObj);
    const genreNodes: ChordInputNode[] = [];
    const artistNodes: ChordInputNode[] = [];
    const links: ChordInputLink[] = [];

    genres.forEach((genre: string) => {
        const color = genreObj[genre]['color']
        const genreNode: ChordInputNode = {
            nodeLabel: genre,
            nodeColor: color,
        }
        genreNodes.push(genreNode);
        const artistArr = genreObj[genre]['artists'];
        artistArr.forEach((artist: string) => {
            const artistNode: ChordInputNode = {
                nodeLabel: artist,
                nodeColor: "#EAEAEA",
            };

            if (!artistNodes.find(artist => artist.nodeLabel === artistNode.nodeLabel)){
                artistNodes.push(artistNode);
            };

            const link: ChordInputLink = {
                source: artistNode,
                target: genreNode,
                value: 1,
                linkColor: color,
            };
            links.push(link);
        })
    })
    const data: ChordData<ChordInputNode, ChordInputLink> = {
        nodes: genreNodes.concat(artistNodes),
        links: links,
    }

    return data;
};

export const createPNG = (node: any) => {
    htmlToImage.toPng(node)
    .then(function (dataUrl) {
        download(dataUrl, 'my-node.png');
    });
};