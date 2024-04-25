import { DataTypes, Model } from "sequelize";

import sequelize from "../db/connect";

import User from "./User";
import { iFollower, iFollowerCreate } from "../interfaces/follower.interface";

class Follower extends Model<iFollower, iFollowerCreate> {
	declare followerId: number;
	declare userId: number;
}

// Definindo a tabela de post
Follower.init(
	{	
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		followerId: {
			type: DataTypes.INTEGER,
		},
		userId: {
			type: DataTypes.INTEGER,
		},
		createdAt: {
			type: DataTypes.DATE,
		},
	},
	{ sequelize, updatedAt: false, modelName: "Follower" }
);

// Fazendo a relação de um para muitos
Follower.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Follower, { foreignKey: "userId" });

export default Follower;
