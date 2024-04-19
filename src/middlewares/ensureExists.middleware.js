import { AppError } from "../errors.js";

const ensureExistsMiddleware =  (model, tableName) => async (req, res, next) => {
	const id = parseInt(req.params.id);
    
	const search = await model.findOne({
		where: { id },
	});

	if (!search || search?.deletedAt) {
		throw new AppError(`${tableName} não encontrado(a)`, 404);
	}

	return next();
};

export default ensureExistsMiddleware;
