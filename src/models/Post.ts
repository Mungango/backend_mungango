import { DataTypes, Model } from "sequelize";

import sequelize from "../db/connect";
import { iPost, iPostCreate } from "../interfaces/post.interface";

import User from "./User";

class Post extends Model<iPost, iPostCreate> {
  declare id: number;
  declare message: string;
  declare likes: string;
  declare deslikes: number;
}

// Definindo a tabela de post
Post.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: { type: DataTypes.DATE },
  },
  { sequelize, modelName: "Post" }
);

// Fazendo a relação de um para muitos
Post.belongsTo(User);
User.hasMany(Post);

export default Post;
