import type { Config } from 'tailwindcss';

export default {
	content: [
        './src/**/*.{html,js,svelte,ts}',
        "./src/**/*.svelte",
        './node_modules/svelte-ux/**/*.{svelte,js}',
        './node_modules/layerchart/**/*.{svelte,js}'
    ],
    prefix: 'tw-',
	theme: {
		extend: {}
	},

	plugins: []
} as Config;
