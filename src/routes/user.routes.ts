import { Router } from "express";
import {
	createUsersController,
	deleteUsersController,
	followUserController,
	getAllUsersController,
	getFollowersUserController,
	getFollowingUserController,
	getUsersController,
	unfollowUserController,
	updateUsersController,
} from "../controllers/user.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureExistsMiddleware from "../middlewares/ensureExists.middleware";
import { usersCreateSchema, usersUpdateSchema } from "../schemas/users.schema";
import User from "../models/User";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";

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
	ensureTokenIsValidMiddleware,
	updateUsersController
);

userRoutes.delete(
	"/:id",
	ensureExistsMiddleware(User, "Usuário"),
	deleteUsersController
);

// User Follower Routes
userRoutes.get(
	"/following/:id",
	// ensureExistsMiddleware(User, "Usuário"),
	getFollowingUserController
);

userRoutes.get(
	"/followers/:id",
	// ensureExistsMiddleware(User, "Usuário"),
	getFollowersUserController
);

userRoutes.post(
	"/follow/:id",
	ensureExistsMiddleware(User, "Usuário"),
	ensureTokenIsValidMiddleware,
	followUserController
);

userRoutes.delete(
	"/follow/:id",
	ensureExistsMiddleware(User, "Usuário"),
	ensureTokenIsValidMiddleware,
	unfollowUserController
);

export default userRoutes;
