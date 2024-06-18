import { z } from "zod";

const hashtagSchema = z.object({
	id: z.number(),
	name: z.string().max(255),
});

const hashtagCreateSchema = hashtagSchema.omit({ id: true });

export { hashtagSchema, hashtagCreateSchema };
