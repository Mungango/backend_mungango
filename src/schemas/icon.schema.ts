import { z } from "zod";

const iconSchema = z.object({
	id: z.number(),
	publicId: z.string(),
	url: z.string(),
	secureUrl: z.string(),
	createdAt: z.date(),
});

const iconWithoutIdSchema = iconSchema.omit({ id: true });

const iconSchemaWithPostId = iconWithoutIdSchema.extend({
	userId: z.number(),
});

const externalIconApiResponseSchema = z.object({
	public_id: z.string(),
	url: z.string(),
	secure_url: z.string(),
	created_at: z.string(),
});

export {
	iconSchema,
	iconWithoutIdSchema,
	iconSchemaWithPostId,
	externalIconApiResponseSchema,
};
