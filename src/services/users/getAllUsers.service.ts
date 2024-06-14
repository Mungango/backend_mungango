import { iUsersWithoutPass } from "../../interfaces/user.interface";
import User from "../../models/User";
import { usersWithoutPassSchema } from "../../schemas/users.schema";

const getAllUsersService = async (): Promise<iUsersWithoutPass[]> => {
  const retrivedUsers = await User.findAll({
			limit: 10,
			where: { deletedAt: null },
		});

  const userWithoutPass: iUsersWithoutPass[] = usersWithoutPassSchema
    .array()
    .parse(retrivedUsers);

  return userWithoutPass;
};

export default getAllUsersService;
