import { z } from "zod";
import { geralLikesPostCommentSchema } from "../schemas/geralLike.schema";

type iLikesPostCommentType = z.infer<typeof geralLikesPostCommentSchema>;

export { iLikesPostCommentType };
