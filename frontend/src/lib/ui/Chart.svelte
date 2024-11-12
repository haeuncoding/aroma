<script lang="ts">
    import { VisChordDiagram, VisSingleContainer } from '@unovis/svelte';
    import type { ChordInputNode } from '$lib/types/ChordInputNode.js';
    import type { ChordInputLink } from '$lib/types/ChordInputLink.js';

    export let data;
    console.log({data})
    const nodeLabel = (d: ChordInputNode) => `${d.nodeLabel}`;
    const nodeColor = (d: ChordInputNode) => `${d.nodeColor}`;
    const linkColor = (d: ChordInputLink) => `${d.linkColor}`

    const padding = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }

    const margin = {
        top: -120,
        bottom: 0,
        left: -200,
        right: -100,
    }
</script>

<div class="chart-div poppins xs-font">
    <VisSingleContainer 
        width="50vw" 
        height="50vw" 
        {padding}
        {margin}
        {data}>
        <VisChordDiagram 
            {nodeLabel} 
            {nodeColor} 
            {linkColor} 
            nodeLabelAlignment="perpendicular"
            padAngle={0.025}
            showBackground={false}
            />
    </VisSingleContainer>
</div>

<style>
    .chart-div {
        width: 45vw;
        padding-left: 3vw;
        padding-right: 3vw;
        color: white;
        overflow-x: hidden;
        overflow-y: hidden;
    }
</style>