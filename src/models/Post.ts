import { DataTypes, Model } from "sequelize";

import sequelize from "../db/connect";
import { iPost, iPostCreate } from "../interfaces/post.interface";

import User from "./User";

class Post extends Model<iPost, iPostCreate> {
	declare message: string;
}

// Definindo a tabela de post
Post.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		message: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
		},
		updatedAt: { type: DataTypes.DATE },
		userId: {
			type: DataTypes.INTEGER,
		},
	},
	{ sequelize, modelName: "Post" }
);

// Fazendo a relação de um para muitos
Post.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Post, { foreignKey: "userId" });

export default Post;
