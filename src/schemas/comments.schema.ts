import { z } from "zod";
import { usersWithoutPassSchema } from "./users.schema";

const commentsSchema = z.object({
  id: z.number(),
  message: z.string(),
  postId: z.number(),
  userId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const commentUserSchema = commentsSchema.extend({
  User: usersWithoutPassSchema,
});

const commentUserNoUserIdSchema = z
  .object({
    count: z.number(),
  })
  .extend({
    row: commentsSchema.extend({
      like: z.number(),
      dislike: z.number(),
      User: usersWithoutPassSchema,
    }),
  });

const commentsCreateSchema = commentsSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

const commentsNoIDsSchema = commentsCreateSchema.omit({
  userId: true,
  postId: true,
});

const commentsUpdateSchema = commentsCreateSchema.partial();

export {
  commentsSchema,
  commentUserSchema,
  commentsNoIDsSchema,
  commentsCreateSchema,
  commentsUpdateSchema,
  commentUserNoUserIdSchema,
};
