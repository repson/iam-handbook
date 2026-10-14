import type { APIRoute } from 'astro';
import { articles, articleUrl } from '../lib/content';
import { categories } from '../lib/categories';
export const GET: APIRoute = async () => new Response(JSON.stringify((await articles()).map(entry => ({
  title: entry.data.title,
  description: entry.data.description,
  category: categories.find(c => c.id === entry.data.category)!.name,
  tags: entry.data.tags,
  url: articleUrl(entry.id),
  body: (entry.body || '').replace(/```[\s\S]*?```/g, ' ').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[#*`>|]/g, ' ').replace(/\s+/g, ' ').trim(),
}))), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
