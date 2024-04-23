import { DataTypes } from "sequelize";

import db from "../db/connect";

import User from "./User";
import Post from "./Post";

// Definindo a tabela de commentários
const Comment = db.define("Comment", {
	message: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	likes: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
	},
	deslikes: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
	},
});

// Fazendo a relação de um para muitos
Comment.belongsTo(User);
User.hasMany(Comment);

Comment.belongsTo(Post, { onDelete: "cascade" });
Post.hasMany(Comment);

export default Comment;
