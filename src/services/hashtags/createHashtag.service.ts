import { AppError } from "../../errors";
import { iHashtag, iHashtagCreate } from "../../interfaces/hashtag.interface";
import { iPost } from "../../interfaces/post.interface";
import Hashtag from "../../models/Hashtag";
import Post from "../../models/Post";
import { hashtagSchema } from "../../schemas/hashtag.schema";

const createHashtagService = async (payload: string[], post: Post) => {
	payload.forEach(async (hashtag) => {
		const [retrivedHashtag, created] = await Hashtag.findOrCreate({ where: { name: hashtag } });
		await post.addHashtag(retrivedHashtag);

	});
};

export default createHashtagService;
