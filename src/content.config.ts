import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    context: z.string(),          // e.g. "Instapro Group (Angi) · Communication Architecture · 2021–2025"
    period: z.string(),
    role: z.string(),
    order: z.number().default(99),
    problem: z.string(),
    didWhat: z.string(),
    outcome: z.string(),
    stack: z.array(z.string()),
    featured: z.boolean().default(true),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    readingTime: z.string().optional(),
  }),
});

export const collections = { work, notes };
