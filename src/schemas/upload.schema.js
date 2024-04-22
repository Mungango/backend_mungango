import { z } from "zod";

const uploadSchema = z.object({
	id: z.number(),
	publicId: z.string(),
	url: z.string(),
	secureUrl: z.string(),
	createdAt: z.date(),
});

const uploadSchemaWithPostId = uploadSchema.extend({
	PostId: z.number(),
});

export { uploadSchema, uploadSchemaWithPostId };
