import { z } from "zod";
import { usersWithoutPassSchema } from "./users.schema";
//import { comments } from "./comments.schema";
import { uploadSchema } from "./upload.schema";
import User from "../models/User";

const postsSchema = z.object({
	id: z.number(),
	message: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	userId: z.number(),
});

const postUserImageLikeSchema = postsSchema
	.extend({
		like: z.number(),
		dislike: z.number(),
		Images: uploadSchema.array(),
		User: usersWithoutPassSchema,
	})
	.omit({ userId: true });

const postsCreateSchema = postsSchema
	.omit({
		id: true,
		userId: true,
		createdAt: true,
		updatedAt: true,
	})
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
	postsCreateSchema,
	postsUpdateSchema,
};
