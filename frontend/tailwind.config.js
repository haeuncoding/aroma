/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,svelte}', 
    "./src/**/*.svelte",
    './node_modules/svelte-ux/**/*.{svelte,js}',
    './node_modules/layerchart/**/*.{svelte,js}'
  ],
   prefix: 'tw-',
  theme: {
    extend: {},
  },
  plugins: [],
}

