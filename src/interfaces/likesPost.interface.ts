import { z } from "zod";
import {
	likesPostSchema,
	likesPostCreateSchema, likesPostUpdateSchema
} from "../schemas/likePost.schema";

type ilikesPost = z.infer<typeof likesPostSchema>;
type ilikesPostCreate = z.infer<typeof likesPostCreateSchema>;
type ilikesPostUpdate = Partial<Pick<ilikesPost, keyof ilikesPost>>;

export { ilikesPost, ilikesPostCreate, ilikesPostUpdate };
