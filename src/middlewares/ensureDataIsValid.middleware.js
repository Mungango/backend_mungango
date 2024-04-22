const ensureDataIsValidMiddleware = (schema) => (req, res, next) => {
	if (!Object.keys(req.body).length) {
		throw new AppError("Dados não podem ser nulos", 400);
	}

	const validatedData = schema.parse(req.body);

	req.body = validatedData;

	return next();
};

export default ensureDataIsValidMiddleware;
