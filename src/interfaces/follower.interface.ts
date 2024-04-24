import { z } from "zod";
import {
	followersCreateSchema,
	followersSchema,
} from "../schemas/followers.schema";

type iFollower = z.infer<typeof followersSchema>;
type iFollowerCreate = z.infer<typeof followersCreateSchema>;

export { iFollower, iFollowerCreate };
