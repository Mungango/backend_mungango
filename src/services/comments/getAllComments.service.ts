import { iCommentUserNoUserId } from "../../interfaces/comment.interface";
import Comment from "../../models/Comment";
import Post from "../../models/Post";
import User from "../../models/User";
import { commentUserNoUserIdSchema } from "../../schemas/comments.schema";

const getAllCommentsService = async (
	postId: number
): Promise<iCommentUserNoUserId[]> => {
	const retrivedComments = await Comment.findAll({
		where: {
			postId,
		},
		include: [
			{
				model: User,
				where: { deletedAt: null },
			},
			{
				model: Post,
			},
		],
	});

	return commentUserNoUserIdSchema.array().parse(retrivedComments);
};

export default getAllCommentsService;
