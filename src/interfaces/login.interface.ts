import { z } from "zod";
import { loginSchema } from "../schemas/login.schema";

type iLogin = z.infer<typeof loginSchema>;

export { iLogin };