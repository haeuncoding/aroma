import type { ChordInputNode } from "./ChordInputNode.js"

export type ChordInputLink = {
    source: number | string | ChordInputNode;
    target: number | string | ChordInputNode;
    value: number;
    linkColor?: string;
}