import User from "../../models/User.js";

const deleteUsersService = async (id) => {
    const deletedAt = new Date
	
    await User.update({deletedAt}, {where:{id: id}})
};

export default deleteUsersService;