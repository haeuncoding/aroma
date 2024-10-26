import { c as create_ssr_component } from '../../../chunks/ssr.js';
/* empty css                  */
import '../../../chunks/client.js';
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `<div class="text-center mlr-auto">${`<h1 class="red-rose" data-svelte-h="svelte-1vnp131">Logging you in...</h1>`} ${``}</div>`;
});
export { Page as default };
