import { DataTypes, Model } from "sequelize";

import User from "./User";
import Post from "./Post";
import { iComment, iCommentCreate } from "../interfaces/comment.interface";
import sequelize from "../db/connect";

// Definindo a tabela de commentários
class Comment extends Model<iComment, iCommentCreate> {
	declare id: number;
	declare message: string;
	declare likes: number;
	declare deslikes: number;
	declare userId: number;
	declare postId: number;
}

Comment.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		message: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		userId: { type: DataTypes.INTEGER },
		postId: {
			type: DataTypes.INTEGER,
		},
		createdAt: {
			type: DataTypes.DATE,
		},
		updatedAt: { type: DataTypes.DATE },
	},
	{ sequelize, modelName: "Comment" }
);

// Fazendo a relação de um para muitos
Comment.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Comment, { foreignKey: "userId" });

Comment.belongsTo(Post, { onDelete: "cascade", foreignKey: "postId" });
Post.hasMany(Comment, { foreignKey: "postId" });

export default Comment;
