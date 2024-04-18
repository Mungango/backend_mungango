import User from "../../models/User.js";

const updateUsersService = async (payload) => {
    await User.update(payload, {where:{id: id}})
};

export default updateUsersService;