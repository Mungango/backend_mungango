import { z } from "zod";
import { usersWithoutPassSchema } from "./users.schema";

const commentsSchema = z.object({
  id: z.number(),
  message: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  postId: z.number(),
  userId: z.number(),
});

const commentUserSchema = commentsSchema.extend({
  User: usersWithoutPassSchema,
});

const commentUserNoUserIdSchema = commentsSchema
  .extend({
    User: usersWithoutPassSchema,
  })
  .omit({ userId: true });

const commentsCreateSchema = commentsSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

const commentsNoIDsSchema = commentsCreateSchema.omit({
  userId: true,
  postId: true,
});

const commentsUpdateSchema = commentsCreateSchema
  .partial();

export {
  commentsSchema,
  commentUserSchema,
  commentsNoIDsSchema,
  commentsCreateSchema,
  commentsUpdateSchema,
  commentUserNoUserIdSchema,
};
