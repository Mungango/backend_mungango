import { DataTypes, Model } from "sequelize";

import sequelize from "../db/connect";

import User from "./User";
import { iFollower, iFollowerCreate } from "../interfaces/follower.interface";

class Follower extends Model<iFollower, iFollowerCreate> {
	declare follower_id: number;
	declare user_id: number;
}

// Definindo a tabela de post
Follower.init(
	{
		followerId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: false,
		},
		userId: {
			type: DataTypes.INTEGER,
		},
		createdAt: {
			type: DataTypes.DATE,
		},
	},
	{ sequelize, modelName: "Follower" }
);

// Fazendo a relação de um para muitos
Follower.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Follower, { foreignKey: "userId" });

export default Follower;
