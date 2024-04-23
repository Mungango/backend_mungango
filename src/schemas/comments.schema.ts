import { z } from "zod";
import { usersWithoutPassSchema } from "./users.schema";

const commentsSchema = z.object({
	id: z.number(),
	message: z.string(),
	likes: z.number(),
	deslikes: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
	postId: z.number(),
	userId: z.number(),
});

const commentUserSchema = commentsSchema.extend({
	User: usersWithoutPassSchema,
});

const commentUserNoUserIdSchema = commentUserSchema.omit({ userId: true });

const commentsCreateSchema = commentsSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	likes: true,
	deslikes: true,
});

const commentsNoIDsSchema = commentsCreateSchema.omit({
	userId: true,
	postId: true,
});

const commentsUpdateSchema = commentsCreateSchema
	.extend({ likes: z.number(), deslikes: z.number() })
	.partial();

export {
	commentsSchema,
	commentUserSchema,
	commentsNoIDsSchema,
	commentsCreateSchema,
	commentsUpdateSchema,
	commentUserNoUserIdSchema,
};
