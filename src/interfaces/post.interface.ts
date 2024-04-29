import { z } from "zod";
import {
	postsSchema,
	postsCreateSchema
} from "../schemas/posts.schema";

type iPost = z.infer<typeof postsSchema>;
type iPostCreate = z.infer<typeof postsCreateSchema>;
type iPostUpdate = Partial<Pick<iPostCreate, keyof iPostCreate>>;

export { iPost, iPostCreate, iPostUpdate };
