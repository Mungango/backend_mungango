import { z } from "zod";
import { usersWithoutPassSchema } from "./users.schema.js";

const postsSchema = z.object({
	id: z.number(),
	message: z.string(),
	images: z.string().array(),
	likes: z.number(),
	deslikes: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

const postUserSchema = postsSchema.omit({ UserId: true }).extend({
	User: usersWithoutPassSchema,
});

const postsCreateSchema = postsSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	likes: true,
	deslikes: true,
});

const postsUpdateSchema = postsSchema.partial();

export { postsSchema, postUserSchema, postsCreateSchema, postsUpdateSchema };
