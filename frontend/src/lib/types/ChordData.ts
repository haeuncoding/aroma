import type { ChordInputNode } from "./ChordInputNode.js"
import type { ChordInputLink } from "./ChordInputLink.js"

export type ChordData<ChordInputNode, ChordInputLink> = {
  nodes: ChordInputNode[];
  links: ChordInputLink[];
}
