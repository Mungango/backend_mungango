import { z } from "zod";
import {
	likesPostSchema,
	likesPostCreateSchema,
} from "../schemas/likePost.schema";

type ilikesPost = z.infer<typeof likesPostSchema>;
type ilikesPostCreate = z.infer<typeof likesPostCreateSchema>;

export { ilikesPost, ilikesPostCreate };
