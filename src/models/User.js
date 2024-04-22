import { DataTypes } from "sequelize";

import db from "../db/connect.js";
import { hashSync } from "bcrypt";

const User = db.define("User", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			len: [3, 255], // mínimo de 3 caracteres, máximo de 50 caracteres
		},
	},
	image: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	phone: {
		type: DataTypes.STRING(11),
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING(55),
		unique: true,
		allowNull: false,
		validate: {
			isEmail: true,
		},
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			len: [6, 120],
		},
	},
	deletedAt: {
		type: DataTypes.DATE,
		allowNull: true, // Permitir valor nulo
		defaultValue: null, // Valor padrão é null
	},
});

User.beforeCreate(async (user) => {
	const hashedPassword = hashSync(user.password, 10);
	user.password = hashedPassword;
});

User.beforeUpdate(async (user) => {
	if (user.changed("password")) {
		const hashedPassword = hashSync(user.password, 10);
		user.password = hashedPassword;
	}
});

export default User;
