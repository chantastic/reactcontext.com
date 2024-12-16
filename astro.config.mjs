// @ts-check
import { defineConfig } from 'astro/config';
import remark_toc from 'remark-toc';
import * as amdr from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehype_slug from 'rehype-slug';
import astroExpressiveCode from 'astro-expressive-code'


// https://astro.build/config
export default defineConfig({
	integrations: [
		astroExpressiveCode({ themes: ['snazzy-light', 'tokyo-night'] })
	],
	markdown: {
		remarkPlugins: [[remark_toc, { maxDepth: 2 }]],
		rehypePlugins: [
			rehype_slug,
			[
				rehypeAutolinkHeadings,
				{
					behavior: 'append',
					content: {
						type: 'element',
						tagName: 'span',
						properties: {
							className: ['header-anchor-link'],
							style: 'margin-left: .25em;',
						},
						children: [
							{
								type: 'text',
								value: '#'
							}
						],
					}
				},
			],
		],
	},
});
