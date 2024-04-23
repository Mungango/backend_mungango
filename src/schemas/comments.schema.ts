import { z } from "zod";
import { usersWithoutPassSchema } from "./users.schema";

const commentsSchema = z.object({
	id: z.number(),
	message: z.string(),
	likes: z.number(),
	deslikes: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

// const commentUserSchema = commentsSchema.omit({ UserId: true }).extend({
//   User: usersWithoutPassSchema,
// });

const commentUserSchema = commentsSchema.extend({
	User: usersWithoutPassSchema,
});

const commentsCreateSchema = commentsSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	likes: true,
	deslikes: true,
});

const commentsUpdateSchema = commentsSchema.partial();

export {
	commentsSchema,
	commentUserSchema,
	commentsCreateSchema,
	commentsUpdateSchema,
};
