import { z } from "zod";

const uploadSchema = z.object({
	id: z.number(),
	publicId: z.string(),
	url: z.string(),
	secureUrl: z.string(),
	createdAt: z.date(),
});

const uploadWithoutIdSchema = uploadSchema.omit({ id: true });

const uploadSchemaWithPostId = uploadSchema.extend({
	PostId: z.number(),
});

export { uploadSchema, uploadWithoutIdSchema, uploadSchemaWithPostId };
