import { z } from "zod";
import { usersWithoutPassSchema } from "./users.schema";
//import { comments } from "./comments.schema";
import { uploadSchema } from "./upload.schema";
import User from "../models/User";
import { raw } from "express";

const postsSchema = z.object({
  id: z.number(),
  message: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.number(),
});

const postUserImageSchema = postsSchema
  .extend({
    Images: uploadSchema.array(),
    User: usersWithoutPassSchema,
  })
  .omit({ userId: true });

const postUserImageLikeSchema = z.object({ count: z.number() }).extend({
  raw: postsSchema
    .extend({
      like: z.number(),
      dislike: z.number(),
      comment: z.number(),
      Images: uploadSchema.array(),
      User: usersWithoutPassSchema,
    })
    .array(),
});

const postsCreateSchema = postsSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});
// .extend({
// 	images: z
// 		.string()
// 		.array()
// 		.min(1, "Deve ser adicionada pelo menos 1 imagem")
// 		.max(5, "Só é permitido no máximo 5 imagens"),
// });

const postsUpdateSchema = postsCreateSchema.partial();

export {
  postsSchema,
  postUserImageLikeSchema,
  postUserImageSchema,
  postsCreateSchema,
  postsUpdateSchema,
};
