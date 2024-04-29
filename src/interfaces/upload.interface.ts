import { z } from "zod";
import {
	externalUploadApiResponseSchema,
	uploadSchema,
	uploadSchemaWithPostId,
	uploadWithoutIdSchema,
} from "../schemas/upload.schema";

type iUpload = z.infer<typeof uploadSchema>;
type iUploadCreate = z.infer<typeof uploadSchemaWithPostId>;
type iUploadUpdate = z.infer<typeof uploadWithoutIdSchema>;
type iExternalUploadApiResponse = z.infer<
	typeof externalUploadApiResponseSchema
>;

export { iUpload, iUploadCreate, iUploadUpdate, iExternalUploadApiResponse };
