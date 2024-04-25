import { z } from "zod";
import { usersWithoutPassSchema } from "./users.schema";
import { uploadSchema } from "./upload.schema";
import { likesPostGetSchema } from "./likePost.schema";

const postsSchema = z.object({
	id: z.number(),
	message: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

const postUserImageSchema = postsSchema.extend({
	Images: uploadSchema.array(),
	User: usersWithoutPassSchema,
	LikesPost: likesPostGetSchema
});

const postsCreateSchema = postsSchema.omit({
	id: true,
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
