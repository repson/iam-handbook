import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import handbookLinks from './scripts/remark-handbook-links.mjs';

const base = (process.env.BASE_PATH || '/iam-handbook').replace(/\/$/, '');

// Override both values for a custom domain or another repository.
export default defineConfig({
  site: process.env.SITE_URL || 'https://repson.github.io',
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: { shikiConfig: { theme: 'github-dark' }, remarkPlugins: [[handbookLinks, { base }]] },
  devToolbar: { enabled: false },
});
