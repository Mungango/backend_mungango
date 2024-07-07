import { z } from "zod";
import {
  postsSchema,
  postsCreateSchema,
  postUserImageLikeSchema,
  postUserImageSchema,
  postsActivityUserImageLikeSchema,
} from "../schemas/posts.schema";

type iPost = z.infer<typeof postsSchema>;
type iPostCreate = z.infer<typeof postsCreateSchema>;
type iPostUpdate = Partial<Pick<iPostCreate, keyof iPostCreate>>;
type iPostUserImageLike = z.infer<typeof postUserImageLikeSchema>;
type iPostUserImage = z.infer<typeof postUserImageSchema>;
type iPostsActivityUserImageLike = z.infer<
  typeof postsActivityUserImageLikeSchema
>;

export {
  iPost,
  iPostCreate,
  iPostUpdate,
  iPostUserImageLike,
  iPostUserImage,
  iPostsActivityUserImageLike,
};
