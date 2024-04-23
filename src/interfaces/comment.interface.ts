import { z } from "zod";
import {
	commentUserNoUserIdSchema,
	commentUserSchema,
	commentsCreateSchema,
	commentsNoIDsSchema,
	commentsSchema,
} from "../schemas/comments.schema";

type iComment = z.infer<typeof commentsSchema>;
type iCommentCreate = z.infer<typeof commentsCreateSchema>;
type iCommentCreateNoIDs = z.infer<typeof commentsNoIDsSchema>;
type iCommentUpdate = Partial<Pick<iCommentCreate, keyof iCommentCreate>>;
type iCommentUser = z.infer<typeof commentUserSchema>;
type iCommentUserNoUserId = z.infer<typeof commentUserNoUserIdSchema>;

export {
	iComment,
	iCommentCreate,
	iCommentCreateNoIDs,
	iCommentUpdate,
	iCommentUser,
	iCommentUserNoUserId,
};
