import { Router } from "express";
import {
	createUsersController,
	deleteUsersController,
	getAllUsersController,
	getUsersController,
	updateUsersController,
} from "../controllers/user.controllers.js";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware.js";
import ensureExistsMiddleware from "../middlewares/ensureExists.middleware.js";
import {
	usersCreateSchema,
	usersUpdateSchema,
} from "../schema/users.schema.js";
import User from "../models/User.js";

const userRoutes = Router();

userRoutes.get("", getAllUsersController);

userRoutes.get(
	"/:id",
	ensureExistsMiddleware(User, "Usuário"),
	getUsersController
);

userRoutes.post(
	"",
	ensureDataIsValidMiddleware(usersCreateSchema),
	createUsersController
);

userRoutes.patch(
	"/:id",
	ensureExistsMiddleware(User, "Usuário"),
	ensureDataIsValidMiddleware(usersUpdateSchema),
	updateUsersController
);

userRoutes.delete(
	"/:id",
	ensureExistsMiddleware(User, "Usuário"),
	deleteUsersController
);

export default userRoutes;
