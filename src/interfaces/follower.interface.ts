import { z } from "zod";
import {
	followResponseSchema,
	followersCreateSchema,
	followersSchema,
} from "../schemas/followers.schema";

type iFollower = z.infer<typeof followersSchema>;
type iFollowerCreate = z.infer<typeof followersCreateSchema>;
type iFollowResponse = z.infer<typeof followResponseSchema>;

export { iFollower, iFollowerCreate, iFollowResponse };
