import { z } from "zod";

const hashtagSchema = z.object({
	id: z.number(),
	name: z.string().max(255),
	createdAt: z.date(),
	updatedAt: z.date(),
});

const hashtagCreateSchema = hashtagSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export { hashtagSchema, hashtagCreateSchema };
