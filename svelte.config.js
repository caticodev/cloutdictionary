import preprocess from 'svelte-preprocess';
import WindiCSS from 'vite-plugin-windicss';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null
		}),
		target: '#svelte',
		vite: () => ({
      plugins: [
        WindiCSS.default(),
      ],
    }),
	}
};

export default config;
