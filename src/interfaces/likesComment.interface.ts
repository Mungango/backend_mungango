import { z } from "zod";
import {
	likesCommentSchema,
	likesCommentCreateSchema,
} from "../schemas/likeComment.schema";

type ilikesComment = z.infer<typeof likesCommentSchema>;
type ilikesCommentCreate = z.infer<typeof likesCommentCreateSchema>;

export { ilikesComment, ilikesCommentCreate };
