import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./src/routes/**/*/.{html,js,svelte,ts}',
		'./src/routes/login/**/*/.{html,js,svelte,ts}',
		'./src/routes/error/**/*/.{html,js,svelte,ts}'
	],
	theme: {
		screens: {
			xxxs: '320px',
			xxs: '480px',
			xs: '600px',
			sm: '768px',
			md: '1024px',
			lg: '1280px',
			xl: '1440px'
		},
		colors: {
			// 'blackboard': '#252525',
			// 'dove-gray':  '#B9B9B9',
		},
		fontFamily: {
			sans: ['Montserrat', 'sans-serif'],
			serif: ['DM Serif Display', 'serif']
		},
		prefix: 'tw-',
		extend: {}
	},
	plugins: [typography]
} as Config;
