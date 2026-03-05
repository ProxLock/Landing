import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		category: z.string(),
		image: z.string().optional(),
		pubDateOrder: z.number().optional(),
	}),
});

export const collections = {
	'blog': blogCollection,
};
