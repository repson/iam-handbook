import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categoryIds } from './lib/categories';

const handbook = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    category: z.enum(categoryIds),
    order: z.number().int().nonnegative(),
    level: z.enum(['Foundational', 'Intermediate', 'Advanced']).default('Foundational'),
    updated: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '*.md', base: './guides' }),
  schema: z.object({ title: z.string(), description: z.string(), updated: z.coerce.date() }),
});

export const collections = { handbook, guides };
