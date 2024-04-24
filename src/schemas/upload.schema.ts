import { z } from "zod";

const uploadSchema = z.object({
	id: z.number(),
	publicId: z.string(),
	url: z.string(),
	secureUrl: z.string(),
	createdAt: z.date(),
});

const uploadWithoutIdSchema = uploadSchema.omit({ id: true });

const uploadSchemaWithPostId = uploadWithoutIdSchema.extend({
	postId: z.number(),
});

const externalUploadApiResponseSchema = z.object({
	public_id: z.string(),
	url: z.string(),
	secure_url: z.string(),
	created_at: z.string(),
});

export {
	uploadSchema,
	uploadWithoutIdSchema,
	uploadSchemaWithPostId,
	externalUploadApiResponseSchema,
};
