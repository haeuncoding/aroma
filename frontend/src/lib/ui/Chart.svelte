<script lang="ts">
    import { VisChordDiagram, VisSingleContainer } from '@unovis/svelte';
    import type { ChordInputNode } from '$lib/types/ChordInputNode.js';
    import type { ChordInputLink } from '$lib/types/ChordInputLink.js';
    import { writable } from 'svelte/store';
    export let data;
    console.log({data})

    const nodeLabel = (d: ChordInputNode) => `${d.nodeLabel}`;
    const nodeColor = (d: ChordInputNode) => `${d.nodeColor}`;
    const linkColor = (d: ChordInputLink) => `${d.linkColor}`;

    const width = writable(screen.width);
    console.log("width", screen.width);

    const padding = writable({});
    const margin = writable({});
    
    const createPaddingMargin = (width: number) => {
        if (width <= 320) {
            padding.set({
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            });

            margin.set({
                top: -120,
                bottom: 0,
                left: -200,
                right: -100,
            });
        };
        if (width >= 320 && width <= 479) {
            padding.set({
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            });

            margin.set({
                top: -120,
                bottom: 0,
                left: -200,
                right: -100,
            });
        };
        if (width >= 480 && width <= 599) {
            padding.set({
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            });

            margin.set({
                top: -120,
                bottom: 0,
                left: -200,
                right: -100,
            });
        };
        if (width >= 600 && width <= 767) {
            padding.set({
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            });

            margin.set({
                top: -120,
                bottom: 0,
                left: -200,
                right: -100,
            });
        };
        if (width >= 768 && width <= 1023) {
            padding.set({
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            });

            margin.set({
                top: -100,
                bottom: 0,
                left: -200,
                right: -50,
            });
        };
        if (width >= 1024 && width <= 1279) {
            padding.set({
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            });

            margin.set({
                top: -120,
                bottom: 0,
                left: -200,
                right: -100,
            });
        };
        if (width >= 1280 && width <= 1439) {
            padding.set({
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            });

            margin.set({
                top: -120,
                bottom: 0,
                left: -200,
                right: -100,
            });
        };
        if (width >= 1440) {
            padding.set({
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            });

            margin.set({
                top: -120,
                bottom: 0,
                left: -200,
                right: -100,
            });
        };

    }

    width.subscribe((value) => {
        createPaddingMargin(value)
        console.log("width", screen.width);
    })
</script>

<div class="chart-div poppins xs-font">
    <VisSingleContainer 
        width="50vw" 
        height="50vw" 
        padding={$padding}
        margin={$margin}
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

    /* 3XS devices (phones, 320px and down) */
    @media only screen and (max-width: 320px) {}

    /* XXS devices (phones, between 321px and 480px) */
    @media only screen and (max-width: 480px) {}

    /* XS devices (phones, between 481px and 600px) */
    @media only screen and (max-width: 600px) {}

    /* Small devices (portrait tablets and large phones, between 601px and 768) */
    @media only screen and (max-width: 768px) {}

    /* Medium devices (landscape tablets, between 769px and 1024px) */
    @media only screen and (max-width: 1024px) {}

    /* Large devices (laptops/desktops, between 1025px and 1280px) */
    @media only screen and (max-width: 1280px) {}

    /* Extra large devices (large laptops and desktops, between 1281px and 1440px) */
    @media only screen and (max-width: 1440px) {}

    /* XXL devices (large laptops and desktops, 1200px and up) */
    @media only screen and (min-width: 1440px) {}
</style>