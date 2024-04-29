import { z } from "zod";

const followersSchema = z.object({
	id: z.number(),
	followerId: z.number(),
	userId: z.number(),
	createdAt: z.date(),
});

const followersCreateSchema = followersSchema.omit({
	id: true,
	createdAt: true,
});

const followResponseSchema = z
	.object({
		count: z.number(),
	})
	.extend({ follow: followersSchema });

export { followersSchema, followersCreateSchema, followResponseSchema };
