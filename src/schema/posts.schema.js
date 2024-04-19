import { z } from "zod";

const postsSchema = z.object({
  id: z.number(),
  message: z.string(),
  likes: z.number(),
  deslikes: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  UserId: z.number(),
});

const postsCreateSchema = postsSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  likes: true,
  deslikes: true,
});

const postsUpdateSchema = postsSchema.partial();

export {
  postsSchema,
  postsCreateSchema,
  postsUpdateSchema,
};
