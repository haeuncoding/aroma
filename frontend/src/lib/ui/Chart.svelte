<script lang="ts">
    // import { scaleBand, scaleUtc } from 'd3-scale';
	import { curveCatmullRomClosed } from 'd3-shape';
    import { VisChordDiagram, VisSingleContainer } from '@unovis/svelte';
    import type { ChordInputNode } from '$lib/types/ChordInputNode.js';
    import type { ChordInputLink } from '$lib/types/ChordInputLink.js';
    import { writable } from 'svelte/store';
    // import { Area, Axis, Chart, Points, Spline, Svg } from 'layerchart';
    export let data = [];
    console.log({data})

    // const screenWidth = writable(screen.width);
    // console.log("width", screen.width);

    const areaOption = writable("artists")
    // let curve = curveLinearClosed;

    $: processedData = (data.length > 0) ?
        data.map((d) => ({
            genre: d.genre, // The genre name
            artists: d.artists.length, // Number of artists in this genre
            tracks: d.tracks.length, // Number of tracks in this genre}
            min: 0,
            avg: d.tracks.length / 2,
            max: d.tracks.length,
        }))
        : []

    $: console.log({processedData})
</script>
{#if (data.length === 0)}
    <div class="chart-div poppins xs-font">

    </div>
{/if}
{#if (data.length > 0)}
    <div class="chart-div poppins tailwind-layout">
        <!-- <Chart
            data={processedData}
            x="genre"
            xScale={scaleBand()}
            y="max"
            yPadding={[0, 10]}
            padding={{ top: 32, bottom: 8 }}
            radial
            >
            <!-- y={`${$areaOption}`}
            radial -->
            <!-- <Svg center class="tailwind-layout"> -->
                <!-- Draw a line for the average number of tracks -->
                
                <!-- Fill the area between the center and the number of tracks -->
                <!-- <Area
                y0={(d) => d.min}
                y1={(d) => d.max}
                curve={curveRadialLinear}
                class="tw-fill-white/40"
                /> -->
                
                <!-- Add labels around the circle for genres -->
                <!-- <Axis 
                placement="angle"
                grid
                tickLength={10}
                format={(d) => d.genre}
                class="tw-stroke-white"
                /> -->
                
                <!-- Add lines from the center to the edges to show counts -->
                <!-- <Axis 
                placement="radius" 
                grid
                rule={{
                        y: (d) => d.max, // Bind to max value
                        class: "tw-stroke-white/20",
                    }}
                />
                <Spline 
                    y={(d) => d[`${$areaOption}`]} 
                    curve={curveRadialLinear} 
                    class="tw-stroke-white" 
                />
                <Points class="fill-primary stroke-surface-200" />
            </Svg>
        </Chart> -->
    </div>
{/if}

<style>
    .chart-div {
        width: auto;
        height: auto;
        padding-left: 3vw;
        padding-right: 3vw;
        color: white;
    }

    /* 3XS devices (phones, 320px and down) */
    @media only screen and (max-width: 320px) {}

    /* XXS devices (phones, between 321px and 480px) */
    @media only screen and (max-width: 480px) {
        /* .chart-div {
            width: 100vw;
            padding-left: 3vw;
            padding-right: 3vw;
            color: white;
            overflow-x: hidden;
            overflow-y: hidden;
        } */
    }

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