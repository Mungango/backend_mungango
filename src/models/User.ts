import { DataTypes, Model } from "sequelize";

import sequelize from "../db/connect";
import { hashSync } from "bcrypt";
import { iUser, iUserCreate } from "../interfaces/user.interface";

class User extends Model<iUser, iUserCreate> {
	declare id: number;
	declare name: string;
	declare username: string;
	declare bio: string;
	declare icon: string;
	declare role: string;
	declare image: string | null;
	declare phone: string;
	declare email: string;
	declare password: string;
	declare deletedAt: Date | null;
}

User.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [3, 255], // mínimo de 3 caracteres, máximo de 50 caracteres
			},
		},
		username: {
			type: DataTypes.STRING,
			validate: {
				len: [3, 23],
			},
		},
		bio: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		icon: {
			type: DataTypes.STRING,
		},
		role: {
			type: DataTypes.ENUM,
			values: ["user", "admin"],
			defaultValue: "user",
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
		createdAt: {
			type: DataTypes.DATE,
		},
		updatedAt: { type: DataTypes.DATE },
		deletedAt: {
			type: DataTypes.DATE,
			allowNull: true, // Permitir valor nulo
			defaultValue: null, // Valor padrão é null
		},
	},
	{ sequelize, modelName: "User" }
);

User.beforeCreate(async (user: any) => {
	const hashedPassword = hashSync(user.password, 10);
	user.password = hashedPassword;
});

User.beforeUpdate(async (user: any) => {
	if (user.changed("password")) {
		const hashedPassword = hashSync(user.password, 10);
		user.password = hashedPassword;
	}
});

export default User;
