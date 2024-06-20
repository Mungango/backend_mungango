import { AppError } from "../../errors";
import { iHashtag } from "../../interfaces/hashtag.interface";
import Hashtag from "../../models/Hashtag";
import { hashtagSchema } from "../../schemas/hashtag.schema";

const getAllHashtagService = async (): Promise<iHashtag[]> => {
	const retrivedHashtags = await Hashtag.findAll({
		limit: 10,
	});

	if (!retrivedHashtags) {
		throw new AppError("Não foi possível achar a hashtag", 404);
	}

	return hashtagSchema.array().parse(retrivedHashtags);
};

export default getAllHashtagService;
