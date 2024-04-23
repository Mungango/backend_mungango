import { z } from "zod";

const usersSchema = z.object({
	id: z.number(),
	name: z.string().min(3).max(255),
	image: z.string().nullish(),
	phone: z.string().max(11),
	email: z.string().email().max(55),
	password: z.string().min(6).max(120),
	createdAt: z.date(),
	updatedAt: z.date(),
	deletedAt: z.date().nullable(),
});

const usersWithoutPassSchema = usersSchema.omit({ password: true });

const usersCreateSchema = usersSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true,
});

const usersUpdateSchema = usersCreateSchema.partial();

export {
	usersSchema,
	usersWithoutPassSchema,
	usersCreateSchema,
	usersUpdateSchema,
};
