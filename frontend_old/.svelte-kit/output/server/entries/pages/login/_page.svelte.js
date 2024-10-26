import { c as create_ssr_component } from '../../../chunks/ssr.js';
/* empty css                  */
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `<div class="login-div text-center mlr-auto"><h1 class="title-text red-rose" data-svelte-h="svelte-2my1r5">Let&#39;s get started.</h1> <button class="login-button" data-svelte-h="svelte-d6wlv3"><h3 class="montserrat">Click here to login with your Spotify.</h3></button></div>`;
});
export { Page as default };
