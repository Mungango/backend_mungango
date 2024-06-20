import { z } from "zod";
import { hashtagSchema, hashtagCreateSchema } from "../schemas/hashtag.schema";

type iHashtag = z.infer<typeof hashtagSchema>;
type iHashtagCreate = z.infer<typeof hashtagCreateSchema>;

export { iHashtag, iHashtagCreate };
