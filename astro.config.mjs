// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Static site with one on-demand route (/api/mcp) served as a Vercel function.
export default defineConfig({
  site: 'https://wafaabbassi.dev', // change to your real domain before deploying
  output: 'static',
  adapter: vercel(),
  integrations: [react(), mdx(), sitemap()],
  prefetch: true,
});
