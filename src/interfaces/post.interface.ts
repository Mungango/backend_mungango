import { z } from "zod";
import {
	postsSchema,
	postsCreateSchema,
	postUserImageLikeSchema,
	postUserImageSchema,
} from "../schemas/posts.schema";

type iPost = z.infer<typeof postsSchema>;
type iPostCreate = z.infer<typeof postsCreateSchema>;
type iPostUpdate = Partial<Pick<iPostCreate, keyof iPostCreate>>;
type iPostUserImageLike = z.infer<typeof postUserImageLikeSchema>;
type iPostUserImage = z.infer<typeof postUserImageSchema>;

export { iPost, iPostCreate, iPostUpdate, iPostUserImageLike, iPostUserImage };
