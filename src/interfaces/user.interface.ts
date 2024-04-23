import { z } from "zod";
import {
	usersSchema,
	usersCreateSchema,
	usersWithoutPassSchema,
	usersUpdateSchema,
} from "../schemas/users.schema";
import { Optional } from "sequelize";

type iUser = z.infer<typeof usersSchema>;
type iUserCreate = z.infer<typeof usersCreateSchema>;
type iUsersWithoutPass = z.infer<typeof usersWithoutPassSchema>;
// type iUserUpdate = Optional<iUser, typeof usersCreateSchema>;

export { iUser, iUserCreate, iUsersWithoutPass };
