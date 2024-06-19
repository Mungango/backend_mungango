import { AppError } from "../../errors";
import { iHashtag, iHashtagCreate } from "../../interfaces/hashtag.interface";
import Hashtag from "../../models/Hashtag";
import { hashtagSchema } from "../../schemas/hashtag.schema";

const createHashtagService = async (
	payload: iHashtagCreate
): Promise<iHashtag> => {
	const createHashtag = await Hashtag.create({
		...payload,
	});

	if (!createHashtag) {
		throw new AppError("Não foi possível criar a hashtag", 500);
	}

	return hashtagSchema.parse(createHashtag);
};

export default createHashtagService;