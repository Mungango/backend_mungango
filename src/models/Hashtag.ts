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
	
	},
	{ sequelize, modelName: "Hashtag" }
);

// Fazendo a relação de um para muitos
Hashtag.belongsToMany(Post, {
	through: "PostHashtag",
	foreignKey: "hashtagId",
});

export default Hashtag;
