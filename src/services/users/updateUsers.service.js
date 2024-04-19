import User from "../../models/User.js";

const updateUsersService = async (id, payload) => {
	const updatedUser = await User.update(payload, {
		where: { id, deletedAt: null },
	});

	return updatedUser;
};

export default updateUsersService;
