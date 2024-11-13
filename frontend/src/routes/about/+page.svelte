<script>
    import cath from '$lib/assets/cath.webp'
    import nathan from '$lib/assets/nathan.jpg'
    import og_draft from '$lib/assets/initial_draft.webp'
    import { slide } from 'svelte/transition';
    import { circInOut } from 'svelte/easing';
</script>

<div transition:slide={{ duration: 500, easing: circInOut }}>
    <div class="top-div">
        <!-- <h3 class="red-rose subtitle-text">
            About
        </h3> -->
    </div>
    <div class="mid-div-sub-one">
        <div class="title-div">
            <h3 class="red-rose subtitle-text">
                What is Aroma?
            </h3>
        </div>
        <div>
            <div class="about-text-div">
                <p class="poppins">
                    Aroma was originally designed by Catherine to create a visual map
                    or correlation between human emotions and the media they consume, 
                    specifically audio media.
                    <br/>
                    <br/>
                    <figure>
                        <img 
                            src={og_draft} 
                            class="initial-draft" 
                            alt=""/>
                        <figcaption
                            class="img-caption">
                            The initial concept Catherine came up with.
                        </figcaption>
                    </figure>
                    Though this functionality does not currently exist, Nathan hopes to
                    incorporate that in the future. Nathan, a long time fan of Catherine's
                    work, asked to collaborate and potentially develop some of Catherine's
                    ideas, and chose this one in particular.
                    <br/>
                    <br/>
                    Currently Aroma takes after other fun Spotify apps such as Receiptify,
                    Judge My Spotify, and Icebergify, and maps the most frequently listened
                    to tracks and artists to genres that Spotify has assigned to them,
                    creating a chord network of frequency of genres and artists listened to.
                    <br/>
                    <br/>
                    Aroma uses the Spotify API, SvelteKit as the frontend, and Express on
                    the backend. It also uses Unovis as its data visualization library.
                </p>
            </div>
        </div>
    </div>
    <div class="mid-div-sub-two">
        <div class="title-div">
            <h3 class="red-rose subtitle-text">
                About the Devs
            </h3>
        </div>
        <div class="team-div">
            <div class="profile-div">
                <div class="image-div">
                    <img 
                        class="profile-pic"
                        src={cath} 
                        alt="A profile picture of the designer, Catherine Liu.">
                </div>
                <div class="bio-div">
                    <div class="name-title-div red-rose">
                        <h4 class="name">
                            Catherine Liu
                        </h4>
                        <h5 class="title">
                            UI/UX Designer
                        </h5>
                    </div>
                    <div>
                        <p class="bio poppins">
                            Catherine is a UI/UX designer who is particularly passionate 
                            about creating digital delight and bringing moments of joy to 
                            user journeys. 
                            <br />
                            <br />
                            In her free time, she is also a craft enthusiast, 
                            and loves to find new niche hobbies to fill up her spare time, 
                            like miniature making, cross stitching, and needle felting. 
                            She also loves to stay at home and hangout with her cats Cloudy 
                            and Stormy!
                        </p>
                    </div>
                </div>
                <div class="link-div">
                    
                </div>
            </div>
                <div class="profile-div">
                <div class="image-div">
                    <img 
                        class="profile-pic"
                        src={nathan} 
                        alt="A profile picture of the developer, Nathan Kwon.">
                </div>
                <div class="bio-div">
                    <div class="name-title-div red-rose">
                        <h4 class="name">
                            Nathan Kwon
                        </h4>
                        <h5 class="title">
                            Front-End Developer
                        </h5>
                    </div>
                    <p class="bio poppins">
                        Nathan is currently a front-end software engineer, but studied as a full
                        stack software engineer, utilizing Svelte, React, Rails, PostgreSQL, and Ruby.
                        He is deeply involved with the arts and is also incredibly passionate about creating
                        products that inspire people to change and interact with the world around them.
                        <br />
                        <br />
                        Outside of coding, he enjoys painting, illustrating, doing music, and reading. He also
                        loves playing with his cats, Artemis and Borie, and eating.
                    </p>
                </div>
                <div class="link-div">
        
                </div>
            </div>
        </div>
    </div>
    <div class="bottom-div">
            <p class="poppins">
                Designed by 
                <a
                    class="poppins website-link"
                    href="https://liucatherine.com/" 
                    target="_blank"
                    >
                        Catherine Liu
                </a> 
                and Developed by 
                <a
                    class="poppins website-link"
                    href="https://haeuncreative.com/" 
                    target="_blank"
                    >
                        Nathan Kwon
                </a>
                </p>
                <p>
                    <a href="/" class="poppins nav-link">
                        Back to the App
                    </a>
                </p>
            
            <!-- <div class="deco-line"/> -->
    </div>
</div>

<style>
    .main-container {
        padding-left: 1em;
        padding-right: 1em;
    }

    .top-div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        text-align: center;
    }

    .top-div > h3 {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }

    .title-div {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }

    .initial-draft {
        width: 40vw;
        filter: drop-shadow(0 0 0.75rem rgb(22, 22, 22));
        margin-bottom: 2vh;
    }

    .img-caption {
        font-size: 0.75em;
        color: rgb(145, 145, 145);
    }

    .about-text-div {
        width: 50vw;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }

    .team-div {
        display: flex;
        flex-direction: row;
        margin-left: auto;
        margin-right: auto;
        width: 60vw;
        justify-content: space-between;
    }

    .profile-div {
        width: 30vw;
        align-items: center;
        text-align: center;
    }

    .profile-pic {
        width: 20vw;
        border-radius: 50%;
    }

    .name {
        font-size: 2em;
        padding: 0;
        margin-top: 0;
        margin-bottom: 0;
    }

    .title {
        font-size: 1em;
        margin-top: 1vh;
        margin-bottom: 0;
    }

    .bio-div {
        min-height: 20vh;
    }

    .bio {
        width: 80%;
        font-size: 0.75em;
        margin-left: auto;
        margin-right: auto;
        text-align: left;
    }
    .name-title-div {

    }
    
    .bottom-div {
        display: flex;
        flex-direction: row;
        bottom: 2vh;
        font-size: 0.75em;
        justify-content: space-between;
    }

    .website-link {
        /* text-decoration: none; */
        color: var(--dove-gray);
        transition: 0.2s;
    }

    .website-link:hover {
        text-decoration: none;
        color: #a7a7a7;
        transition: 0.2s;
    }

    .deco-line {
        width: 75vw;
        border-bottom: 1px solid #eaeaea;
        bottom: 1vh;
    }
</style>
