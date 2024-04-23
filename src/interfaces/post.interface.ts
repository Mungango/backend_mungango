import { z } from "zod";
import { postsSchema, postsCreateSchema, postsUpdateSchema } from "../schemas/posts.schema";

type iPost = z.infer<typeof postsSchema>;
type iPostCreate = z.infer<typeof postsCreateSchema>;
type iPostUpdate = z.infer<typeof postsUpdateSchema>;

export { iPost, iPostCreate, iPostUpdate };
