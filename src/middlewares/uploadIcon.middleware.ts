import multer from "multer";

const icon = multer({
	storage: multer.diskStorage({
		destination: "icon",
		filename: (request, file, callback) => {
			const filename = `${file.originalname}`;

			return callback(null, filename);
		},
	}),
});

export default icon;
