import { z } from "zod";
import {
  usersSchema,
  usersCreateSchema,
  usersWithoutPassSchema,
  usersUpdateSchema,
} from "../schemas/users.schema";

type iUser = z.infer<typeof usersSchema>;
type iUserCreate = z.infer<typeof usersCreateSchema>;
type iUsersWithoutPass = z.infer<typeof usersWithoutPassSchema>;
type iUserUpdate = z.infer<typeof usersUpdateSchema>;

export { iUser, iUserCreate, iUsersWithoutPass, iUserUpdate };
