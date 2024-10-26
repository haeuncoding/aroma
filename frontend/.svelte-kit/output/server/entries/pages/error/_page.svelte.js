import { c as create_ssr_component } from '../../../chunks/ssr.js';
import { error } from 'console';
import { e as escape } from '../../../chunks/escape.js';
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `<h1 data-svelte-h="svelte-1qzyq3v">Whoops!</h1> <h4>Looks like there was a $${escape(error)} error.</h4>`;
});
export { Page as default };
