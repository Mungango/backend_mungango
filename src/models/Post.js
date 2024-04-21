import { DataTypes } from "sequelize";

import db from "../db/connect.js";

import User from "./User.js";

// Definindo a tabela de post
const Post = db.define("Post", {
	message: {
		type: DataTypes.TEXT,
		allowNull: false,
		require: true,
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
Post.belongsTo(User);
User.hasMany(Post);

export default Post;
