import { DataTypes, Model } from "sequelize";

import sequelize from "../db/connect";

import User from "./User";
import Comment from "./Comment";


import {
  ilikesComment,
  ilikesCommentCreate,
} from "../interfaces/likesComment.interface";

class LikesComment extends Model<ilikesComment, ilikesCommentCreate> {
  declare id: number;
  declare type: string;
  declare userId: number;
  declare ownerId: number;
}

// Definindo a tabela de post
LikesComment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: ["like", "dislike"],
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    ownerId: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, modelName: "LikesComment" }
);

// Fazendo a relação de um para muitos
LikesComment.belongsTo(User, { foreignKey: "userId", onDelete: "cascade" });
User.hasMany(LikesComment, { foreignKey: "userId" });

LikesComment.belongsTo(Comment, { foreignKey: "ownerId", onDelete: "cascade" });
Comment.hasMany(LikesComment, { foreignKey: "ownerId" });

export default LikesComment;
