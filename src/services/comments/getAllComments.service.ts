import { iCommentUserNoUserId } from "../../interfaces/comment.interface";
import Comment from "../../models/Comment";
import Post from "../../models/Post";
import User from "../../models/User";
import LikesComment from "../../models/likesComment";
import { commentUserNoUserIdSchema } from "../../schemas/comments.schema";

const getAllCommentsService = async (
	postId: number,
	page: number,
	limit: number
) => {
	const offset = (page - 1) * limit;
	const retrivedComments = await Comment.findAll({
		limit,
		offset,
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

		order: [["createdAt", "DESC"]],
	});

	// Para cada post, obtemos as contagens de likes e dislikes
	const commentsWithLikesDislikes = await Promise.all(
		retrivedComments.map(async (comment) => {
			const like = await LikesComment.count({
				where: { ownerId: comment.dataValues.id, type: "like" },
			});

			const dislike = await LikesComment.count({
				where: { ownerId: comment.dataValues.id, type: "dislike" },
			});

			const raw = {
				...comment.dataValues,
				like,
				dislike,
			};

			return raw;
		})
	);

	const count = await Comment.count({
		where: {
			postId,
		},
	});

	return commentUserNoUserIdSchema.parse({
		count,
		raw: commentsWithLikesDislikes,
	});
};

export default getAllCommentsService;
