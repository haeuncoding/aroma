import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
    server: {
proxy: {
            '/api': {
                target: 'http://localhost:3000', // URL of your Express server
                changeOrigin: true, // needed for virtual hosted sites
                rewrite: (path) => path.replace(/^\/api/, ''), // remove '/api' from proxied request
                secure: false,
            }
        }
    },
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
