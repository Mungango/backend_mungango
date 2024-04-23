import { z } from "zod";
import {
  uploadSchema,
  uploadSchemaWithPostId,
uploadWithoutIdSchema} from "../schemas/upload.schema";

type iUpload = z.infer<typeof uploadSchema>;
type iUploadCreate = z.infer<typeof uploadSchemaWithPostId>;
type iUploadUpdate = z.infer<typeof uploadWithoutIdSchema>;

export { iUpload, iUploadCreate, iUploadUpdate };
