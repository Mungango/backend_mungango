import { DataTypes } from "sequelize";

import db from "../db/connect.js";

import User from "./User.js";
import Post from "./Post.js";

// Definindo a tabela de commentários

const Comment = db.define("Comment", {
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
Comment.belongsTo(User);
User.hasMany(Comment);

Comment.belongsTo(Post);
Post.hasMany(Comment);

export default Comment;
