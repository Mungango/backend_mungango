import { iExternalIconApiResponse } from "../../interfaces/icon.interface";
import Icon from "../../models/Icon";
import { iconWithoutIdSchema } from "../../schemas/icon.schema";

const iconService = async (icon: iExternalIconApiResponse) => {
	const {
		secure_url: secureUrl,
		public_id: publicId,
		created_at: createdAt,
		...uploadJson
	} = icon;

	const parsedObject = iconWithoutIdSchema.parse({
		publicId,
		secureUrl,
		createdAt: new Date(createdAt),
		...uploadJson,
	});

	const createdIcon = await Icon.create({ ...parsedObject });

	return createdIcon;
};

export default iconService;
