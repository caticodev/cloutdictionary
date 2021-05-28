import preprocess from 'svelte-preprocess';
import WindiCSS from 'vite-plugin-windicss';
import adapterNetlify from '@sveltejs/adapter-netlify'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapterNetlify(),
		target: '#svelte',
		vite: () => ({
      plugins: [
        WindiCSS.default(),
      ],
    }),
	}
};

export default config;
