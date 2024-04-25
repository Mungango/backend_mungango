import { AppError } from "../../errors";
import { iPostCreate } from "../../interfaces/post.interface";
import Post from "../../models/Post";
import { postsSchema } from "../../schemas/posts.schema";

// Lembrar de validar quando usuario não existir mais, mesmo tendo um token válido o usuário pode não
// existir mais, por conta da validade do token de 72h
const createPostsService = async (userId: number, payload: iPostCreate) => {
	const createPayload = { ...payload, userId };
	const createPost = await Post.create(createPayload);

	if (!createPost) {
		throw new AppError("Não foi possível criar o post", 404);
	}

	return postsSchema.parse(createPost);
};

export default createPostsService;
