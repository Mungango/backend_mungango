import { z } from "zod";
import { iconSchema,
	iconWithoutIdSchema,
	iconSchemaWithPostId,
	externalIconApiResponseSchema} from "../schemas/icon.schema" 

type iIcon = z.infer<typeof iconSchema>;
type iIconCreate = z.infer<typeof iconSchemaWithPostId>;
type iIconUpdate = z.infer<typeof iconWithoutIdSchema>;
type iExternalIconApiResponse = z.infer<typeof externalIconApiResponseSchema>;

export { iIcon, iIconCreate, iIconUpdate, iExternalIconApiResponse };
