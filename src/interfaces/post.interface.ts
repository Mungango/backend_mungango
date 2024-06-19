import { z } from "zod";
import {
	postsSchema,
	postsCreateSchema,
	postUserImageLikeSchema,
} from "../schemas/posts.schema";

type iPost = z.infer<typeof postsSchema>;
type iPostCreate = z.infer<typeof postsCreateSchema>;
type iPostUpdate = Partial<Pick<iPostCreate, keyof iPostCreate>>;
type iPostUserImageLikeSchema = z.infer<typeof postUserImageLikeSchema>;

export { iPost, iPostCreate, iPostUpdate, iPostUserImageLikeSchema };
