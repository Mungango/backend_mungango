import { z } from "zod";
import {
	iconSchema,
	iconWithoutIdSchema,
	externalIconApiResponseSchema,
} from "../schemas/icon.schema";

type iIcon = z.infer<typeof iconSchema>;
type iIconCreate = z.infer<typeof iconWithoutIdSchema>;
type iIconUpdate = z.infer<typeof iconWithoutIdSchema>;
type iExternalIconApiResponse = z.infer<typeof externalIconApiResponseSchema>;

export { iIcon, iIconCreate, iIconUpdate, iExternalIconApiResponse };
