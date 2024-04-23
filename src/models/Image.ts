import { DataTypes, Model } from "sequelize";

import sequelize from "../db/connect";
import { iUpload, iUploadCreate } from "../interfaces/upload.interface";

import Post from "./Post";

class Image extends Model<iUpload, iUploadCreate> {
  declare id: number;
  declare publicId: string;
  declare url: string;
  declare secureUrl: string;
}

// Definindo a tabela de imagens
Image.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    publicId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secureUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Image", updatedAt: false }
);

// Fazendo a relação de um para muitos
Image.belongsTo(Post, { onDelete: "cascade" });
Post.hasMany(Image);

export default Image;
