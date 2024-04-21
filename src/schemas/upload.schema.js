import { z } from "zod";

const uploadSchema = z.object({
	publicId: z.string(),
	url: z.string(),
	secureUrl: z.string(),
	createdAt: z.date(),
});

const uploadSchemaWithPostId = uploadSchema.extend({
	PostId: z.number(),
});

export { uploadSchema, uploadSchemaWithPostId };
