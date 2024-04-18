import User from "../../models/User.js";

const createUsersService = async (payload) => {
	const createUser = await User.create(payload);

	return createUser;
};

export default createUsersService;
