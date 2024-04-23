import { z } from "zod";
import {
	usersSchema,
	usersCreateSchema,
	usersWithoutPassSchema,
} from "../schemas/users.schema";

type iUser = z.infer<typeof usersSchema>;
type iUserCreate = z.infer<typeof usersCreateSchema>;
type iUsersWithoutPass = z.infer<typeof usersWithoutPassSchema>;
type iUserUpdate = Partial<Pick<iUserCreate, keyof iUserCreate>>;

export { iUser, iUserCreate, iUsersWithoutPass, iUserUpdate };
