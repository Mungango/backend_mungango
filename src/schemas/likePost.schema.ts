import { z } from "zod";

const likesPostSchema = z.object({
  id: z.number(),
  type: z.enum(["like", "deslike"]),
  userId: z.number(),
  ownerId: z.number(),
});

const likesPostCreateSchema = likesPostSchema.omit({ id: true });

const likesPostGetSchema = likesPostSchema.omit({
  id: true,
  userId: true,
  ownerId: true,
});


export { likesPostSchema, likesPostCreateSchema, likesPostGetSchema };
