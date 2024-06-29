import { iPostUserImage } from "../../interfaces/post.interface";
import Comment from "../../models/Comment";
import Follower from "../../models/Follower";
import Image from "../../models/Image";
import Post from "../../models/Post";
import User from "../../models/User";
import LikesPost from "../../models/likesPost";
import {
	postUserImageLikeSchema,
	postUserImageSchema,
} from "../../schemas/posts.schema";

const getAllFollowingPostsService = async (id: number) => {
	const following = await Follower.findAll({
		where: {
			userId: id,
		},
	});

	let posts: iPostUserImage[] = [];

	for (const follow of following) {
		const followPosts = await Post.findAll({
			where: {
				userId: follow.followerId,
			},
			include: [
				{
					model: User,
					where: { deletedAt: null },
				},
				{
					model: Image,
				},
			],
		});

		const parsetFp = postUserImageSchema.array().parse(followPosts);

		posts = posts.concat(parsetFp);
	}

	// Ordena os posts do mais recente para o mais antigo
	posts.sort(
		(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
	);

	// Para cada post, obtemos as contagens de likes e dislikes
	const postsWithLikesDislikesAndComments = await Promise.all(
		posts.map(async (post) => {
			const like = await LikesPost.count({
				where: { ownerId: post.id, type: "like" },
			});

			const dislike = await LikesPost.count({
				where: { ownerId: post.id, type: "dislike" },
			});

			const comment = await Comment.count({
				where: {
					postId: post.id,
				},
			});

			return {
				...post,
				like,
				dislike,
				comment,
			};
		})
	);

	return postUserImageLikeSchema
		.array()
		.parse(postsWithLikesDislikesAndComments);
};

export default getAllFollowingPostsService;
