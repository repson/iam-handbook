import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import handbookLinks from './scripts/remark-handbook-links.mjs';

const base = (process.env.BASE_PATH || '/iam-handbook').replace(/\/$/, '');

// Override both values for a custom domain or another repository.
export default defineConfig({
  site: process.env.SITE_URL || 'https://repson.github.io',
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  // The link plugin is a remark plugin, so Markdown runs on the unified processor.
  markdown: { shikiConfig: { theme: 'github-dark' }, processor: unified({ remarkPlugins: [[handbookLinks, { base }]] }) },
  devToolbar: { enabled: false },
});
