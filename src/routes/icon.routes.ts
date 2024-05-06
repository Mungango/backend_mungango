import {
	getIconController,
	uploadIconController,
	uploadIconPostController,
} from "../controllers/icon.controllers";
import icon from "../middlewares/uploadIcon.middleware";
import ensureExistsMiddleware from "../middlewares/ensureExists.middleware";
import { Router } from "express";
import User from "../models/User";
import { v2 } from "cloudinary";
import ensureIsAdminMiddleware from "../middlewares/ensureIsAdminMiddleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";

const iconRoutes: Router = Router();

iconRoutes.get("/:public_id", getIconController); // exibir um icon

iconRoutes.post(
	"/:id",
	icon.single("icon"),
	ensureTokenIsValidMiddleware,
	ensureIsAdminMiddleware,
	ensureExistsMiddleware(User, "Usuário"),
	uploadIconPostController
); // criar um icone

iconRoutes.post("", icon.single("icon"), uploadIconController);

iconRoutes.delete("/:resource_type", async (req, res) => {
	await v2.uploader.destroy(req.params.resource_type);

	return res.status(204).send();
});

export default iconRoutes;
