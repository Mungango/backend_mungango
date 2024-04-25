import { DataTypes, Model } from "sequelize";

import sequelize from "../db/connect";

import User from "./User";
import Post from "./Post";

import {
  ilikesPost,
  ilikesPostCreate,
} from "../interfaces/likesPost.interface";

class LikesPost extends Model<ilikesPost, ilikesPostCreate> {
  declare userId: number;
  declare ownerId: number;
}

// Definindo a tabela de post
LikesPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: ["like", "deslike"],
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    ownerId: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, modelName: "LikesPost" }
);

// Fazendo a relação de um para muitos
LikesPost.belongsTo(User, { foreignKey: "userId" });
User.hasMany(LikesPost, { foreignKey: "userId" });

LikesPost.belongsTo(Post, { foreignKey: "userId" });
Post.hasMany(LikesPost, { foreignKey: "userId" });

export default LikesPost;
