import { getCollection } from 'astro:content';
import { categories } from './categories';

export const base = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/`;
export const url = (path = '') => `${base}${path.replace(/^\//, '')}`;
export const articleUrl = (id: string) => url(`handbook/${id}/`);
export const categoryUrl = (id: string) => url(`topics/${id}/`);
export const repository = 'https://github.com/repson/iamnotroot';
export const readingMinutes = (body = '') => Math.max(1, Math.ceil(body.split(/\s+/).length / 200));
export const formatDate = (date: Date) => new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date);
export async function articles() {
  const entries = await getCollection('handbook', ({ data }) => !data.draft);
  return entries.sort((a, b) => {
    const category = categories.findIndex(c => c.id === a.data.category) - categories.findIndex(c => c.id === b.data.category);
    return category || a.data.order - b.data.order || a.id.localeCompare(b.id);
  });
}
