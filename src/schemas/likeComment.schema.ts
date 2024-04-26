import { z } from "zod";

const likesCommentSchema = z.object({
  id: z.number(),
  userId: z.number(),
  type: z.enum(['like', 'dislike']),
  ownerId: z.number(),
});

const likesCommentCreateSchema = likesCommentSchema.omit({ id: true });

export { likesCommentSchema, likesCommentCreateSchema };
