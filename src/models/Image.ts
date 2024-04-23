import { DataTypes } from "sequelize";

import db from "../db/connect";

import Post from "./Post";

// Definindo a tabela de imagens
const Image = db.define(
	"Image",
	{
		publicId: {
			type: DataTypes.STRING,
			allowNull: false
		},
		url: {
			type: DataTypes.STRING,
			allowNull: false
		},
		secureUrl: {
			type: DataTypes.STRING,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
	},
	{
		updatedAt: false,
	}
);

// Fazendo a relação de um para muitos
Image.belongsTo(Post, { onDelete: "cascade" });
Post.hasMany(Image);

export default Image;
