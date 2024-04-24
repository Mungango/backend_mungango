import { z } from "zod";

const followersSchema = z.object({
	followerId: z.number(),
	userId: z.number(),
	createdAt: z.date(),
});

const followersCreateSchema = followersSchema.omit({ createdAt: true });

export { followersSchema, followersCreateSchema };
