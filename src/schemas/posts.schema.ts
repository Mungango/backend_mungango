import { z } from "zod";
import { usersWithoutPassSchema } from "./users.schema";
import { uploadSchema } from "./upload.schema";

const postsSchema = z.object({
	id: z.number(),
	message: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	userId: z.number(),
});

const postUserImageSchema = postsSchema.extend({
	Images: uploadSchema.array(),
	User: usersWithoutPassSchema,
});

const postsCreateSchema = postsSchema.omit({
	id: true,
	userId: true,
	createdAt: true,
	updatedAt: true,
});

const postsUpdateSchema = postsCreateSchema.partial();

export {
	postsSchema,
	postUserImageSchema,
	postsCreateSchema,
	postsUpdateSchema,
};
