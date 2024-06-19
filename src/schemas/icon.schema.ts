import { z } from "zod";

const iconSchema = z.object({
	id: z.number(),
	name: z.string(),
	publicId: z.string(),
	url: z.string(),
	secureUrl: z.string(),
	createdAt: z.date(),
});

const iconWithoutIdSchema = iconSchema.omit({ id: true });

const externalIconApiResponseSchema = z.object({
	name: z.string(),
	public_id: z.string(),
	url: z.string(),
	secure_url: z.string(),
	created_at: z.string(),
});

export { iconSchema, iconWithoutIdSchema, externalIconApiResponseSchema };
