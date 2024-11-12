import type { Track } from "$lib/types/Track.js";
import type { ChordInputNode } from "$lib/types/ChordInputNode.js";
import type { ChordInputLink } from "$lib/types/ChordInputLink.js";
import type { ChordData } from "$lib/types/ChordData.js";

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

export const createGenreObj = (tracks: Track[]) => {
    let obj = {};
        tracks.forEach((track: Track) => {
            let arr = track.genres;
            for (let i = 0; i < arr.length; i++) {
                let genre = arr[i];
                if (!obj[genre]) {
                    // obj[genre] = [`${track.name} - ${track.artist}`]
                    obj[genre] = {
                        'artists': [],
                        'color': '',
                    }
                    obj[genre]['artists'] = [`${track.artist}`]
                }
                if (obj[genre]) {
                    // if (!obj[genre].includes(`${track.name} - ${track.artist}`)) {
                    //     obj[genre].push(`${track.name} - ${track.artist}`);
                    // }
                    if (!obj[genre]['artists'].includes(`${track.artist}`)) {
                        obj[genre]['artists'].push(`${track.artist}`);
                    }
                }
                if (obj[genre]['color'] === '') {
                    obj[genre]['color'] = pickRandomColor();
                }
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