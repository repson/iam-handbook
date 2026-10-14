import type { APIRoute } from 'astro';
import { base } from '../lib/content';
export const GET: APIRoute = ({ site }) => new Response(`User-agent: *\nAllow: /\nSitemap: ${new URL(`${base}sitemap-index.xml`, site)}\n`);
