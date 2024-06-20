import { AppError } from "../../errors";
import { iHashtag } from "../../interfaces/hashtag.interface";
import Hashtag from "../../models/Hashtag";
import { hashtagSchema } from "../../schemas/hashtag.schema";

const getHashtagService = async (id: number): Promise<iHashtag> => {
	const retrivedHashtag = await Hashtag.findOne({ where: { id } });

	if (!retrivedHashtag) {
		throw new AppError("Não foi possível achar a hashtag", 404);
	}

	return hashtagSchema.parse(retrivedHashtag);
};

export default getHashtagService;
