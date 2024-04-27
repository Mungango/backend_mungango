import { z } from "zod";

const likesPostSchema = z.object({
  id: z.number(),
  type: z.enum(["like", "dislike"]),
  userId: z.number(),
  ownerId: z.number(),
});

const likesPostCreateSchema = likesPostSchema.omit({ id: true });

const likesPostUpdateSchema = likesPostSchema.partial()


export { likesPostSchema, likesPostCreateSchema, likesPostUpdateSchema };
