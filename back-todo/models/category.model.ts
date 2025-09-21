import { DataTypes } from "sequelize";
import sequelize from "../src/db";
import Todo from "./todo.model";

// According to the example model:
// "id": 1, <- Serial?
// "name": "Work", <- VarChar 120
// "color": "#3B82F6" <- If be consistent hex then char(7) including the # sign, or maybe not use the # sign?
// "created_at": "2024-07-31T10:00:00Z",
// "updated_at": "2024-07-31T10:00:00Z" <- Additional
export default function defineCategoryModel() {
  return sequelize.define(
    "Categories",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING(7),
        allowNull: false,
        validate: {
          is: /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, // <- RegExp thanks AI.
        },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "Categories",
      timestamps: true,
      underscored: true,
    }
  );
}
