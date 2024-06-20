import { AppError } from "../../errors";
import { iPostCreate } from "../../interfaces/post.interface";

import Post from "../../models/Post";
import { postsSchema } from "../../schemas/posts.schema";
import createHashtagService from "../hashtags/createHashtag.service";

// Lembrar de validar quando usuario não existir mais, mesmo tendo um token válido o usuário pode não
// existir mais, por conta da validade do token de 72h

const createPostsService = async (userId: number, payload: iPostCreate) => {
	const createPayload = { ...payload, userId };
	const createPost = await Post.create(createPayload);

	// função para buscar hashtags no post criado no campo message

	const extractHashtags = async (message: string) => {
		const regex = /#([\p{L}\p{N}_]+(?:[\p{M}]*)?)/gu;
		const hashtags: string[] = [];
		let match;
		while ((match = regex.exec(message)) !== null) {
			hashtags.push(match[0]);
		}
		console.log(hashtags);
		await createHashtagService(hashtags, createPost);
	};

	extractHashtags(createPost.dataValues.message);

	return postsSchema.parse(createPost);
};

export default createPostsService;
