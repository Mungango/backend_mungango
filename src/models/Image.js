import { DataTypes } from "sequelize";

import db from "../db/connect.js";

import Post from "./Post.js";

// Definindo a tabela de imagens
const Image = db.define("Image", {
	publicId: {
		type: DataTypes.STRING,
		allowNull: false,
		require: true,
	},
	url: {
		type: DataTypes.STRING,
		allowNull: false,
		require: true,
	},
	secureUrl: {
		type: DataTypes.STRING,
		allowNull: false,
		require: true,
	},
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
		require: true,
    }
},{
	updatedAt: false
});

// Fazendo a relação de um para muitos
Image.belongsTo(Post);
Post.hasMany(Image);

export default Image;
