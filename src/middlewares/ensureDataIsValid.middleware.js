const ensureDataIsValidMiddleware = (schema) => (req, res, next) => {
	if (!Object.keys(req.body).length) {
		throw new AppError("Missing object data", 400);
	}

	const validatedData = schema.parse(req.body);

	req.body = validatedData;

	return next();
};

export default ensureDataIsValidMiddleware;
