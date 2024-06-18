import Icon from "../../models/Icon";
import { iconSchema } from "../../schemas/icon.schema";

const getAllIconsService = async () => {
	const retrivedIcons = await Icon.findAll();

	return iconSchema.array().parse(retrivedIcons);
};

export default getAllIconsService;
