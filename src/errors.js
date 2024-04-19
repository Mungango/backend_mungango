class AppError extends Error {
	statusCode;

	constructor(message, statusCode = 400) {
		super(message);
		this.statusCode = statusCode;
	}
}

const handleError = (err, req, res, _) => {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({ message: err.message });
	}

	// if (err instanceof ZodError) {
	// 	return res.status(400).json({ message: err.flatten().fieldErrors });
	// }

	console.log(err);
	return res.status(500).json({
		message: "Internal server error",
	});
};

export { AppError, handleError };
