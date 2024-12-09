// @ts-check
import { defineConfig } from 'astro/config';
import astroExpressiveCode from 'astro-expressive-code'


// https://astro.build/config
export default defineConfig({
	integrations: [astroExpressiveCode()]
});
