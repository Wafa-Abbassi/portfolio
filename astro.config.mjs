// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Static site with one on-demand route (/api/mcp) served as a Vercel function.
export default defineConfig({
  site: 'https://portfolio-tan-two-89.vercel.app', // change to your own domain once you have one
  output: 'static',
  adapter: vercel(),
  integrations: [react(), mdx(), sitemap()],
  prefetch: true,
});
