import { Router } from "express";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { hashtagCreateSchema } from "../schemas/hashtag.schema";
import {
	// createHashtagController,
	getAllHashtagController,
	getHashtagController,
} from "../controllers/hashtag.controller";

const hashtagRoutes: Router = Router();

// hashtagRoutes.post(
// 	"",
// 	ensureTokenIsValidMiddleware,
// 	ensureDataIsValidMiddleware(hashtagCreateSchema),
// 	createHashtagController
// );

hashtagRoutes.get("/:id", getHashtagController);

hashtagRoutes.get("", getAllHashtagController);


export default hashtagRoutes;
