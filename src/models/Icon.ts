import { DataTypes, Model } from "sequelize";

import sequelize from "../db/connect";
import { iIcon, iIconCreate } from "../interfaces/icon.interface";

import User from "./User";

class Icon extends Model<iIcon, iIconCreate> {
  declare id: number;
  declare publicId: string;
  declare url: string;
  declare secureUrl: string;
}

// Definindo a tabela de Icon
Icon.init(
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
  { sequelize, modelName: "Icon", updatedAt: false }
);

// Fazendo a relação de um para muitos
Icon.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Icon, { foreignKey: "userId" });

export default Icon;
