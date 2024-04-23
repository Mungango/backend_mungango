import { z } from "zod";
import { usersSchema, usersUpdateSchema } from "../schemas/users.schema";

type iUser = z.infer<typeof usersSchema>;
type iUserUpdate = z.infer<typeof usersUpdateSchema>

export { iUser, iUserUpdate };
