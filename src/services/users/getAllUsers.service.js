import User from "../../models/User.js";

const getAllUsersService = async () => {
	const retrivedUsers = await User.findAll({where:{deletedAt: null}});

	return retrivedUsers;
};

export default getAllUsersService;
