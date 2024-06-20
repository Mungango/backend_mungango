import { DataTypes, Model } from "sequelize";

import sequelize from "../db/connect";

import Post from "./Post";
import { iHashtag, iHashtagCreate } from "../interfaces/hashtag.interface";

class Hashtag extends Model<iHashtag, iHashtagCreate> {
	declare postId: number;
}

// Definindo a tabela de post
Hashtag.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			unique: true,
		},
		createdAt: {
			type: DataTypes.DATE,
		},
		updatedAt: { type: DataTypes.DATE },
	},
	{ sequelize, modelName: "Hashtag" }
);

// Fazendo a relação de um para muitos
Hashtag.belongsToMany(Post, {
	through: "PostHashtag",
	foreignKey: "hashtagId",
});

Post.belongsToMany(Hashtag, {
	through: "PostHashtag",
	foreignKey: "postId",
});

export default Hashtag;
