import { z } from "zod";
import { usersWithoutPassSchema } from "./users.schema";
import { uploadSchema } from "./upload.schema";

const postsSchema = z.object({
  id: z.number(),
  message: z.string(),
  likes: z.number(),
  deslikes: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// const postUserImageSchema = postsSchema.omit({ UserId: true }).extend({
// 	Images: uploadSchema.array(),
// 	User: usersWithoutPassSchema,
// });

const postUserImageSchema = postsSchema.extend({
  Images: uploadSchema.array(),
  User: usersWithoutPassSchema,
});

const postsCreateSchema = postsSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  likes: true,
  deslikes: true,
});

const postsUpdateSchema = postsCreateSchema
  .extend({
    likes: z.number(),
    deslikes: z.number(),
  })
  .partial();

export {
  postsSchema,
  postUserImageSchema,
  postsCreateSchema,
  postsUpdateSchema,
};
