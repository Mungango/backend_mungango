import { z } from "zod";
import { likesPostSchema } from "./likePost.schema";

const geralLikesPostCommentSchema = likesPostSchema.omit({
  id: true,
  type: true,
});

const geralLikesPostCommentSchemaWithout = z.object({
  type: z.string(),
});

export { geralLikesPostCommentSchema, geralLikesPostCommentSchemaWithout };
