import { DataTypes } from "sequelize";

import db from "../db/connect";

const User = db.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 255], // mínimo de 3 caracteres, máximo de 50 caracteres
    },
  },
  telefone: {
    type: DataTypes.STRING(11),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(55),
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true, // Permitir valor nulo
    defaultValue: null, // Valor padrão é null
  },
});

export default User;
