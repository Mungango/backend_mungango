import User from "../../models/User.js";

const getUsersService = async (id) => {
	const retrivedUser = await User.findOne({
		where: { id, deletedAt: null },
	});

	return retrivedUser;
};

export default getUsersService;
