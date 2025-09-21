import { DataTypes } from "sequelize";
import sequelize from "../src/db";
import Category from "./category.model";

// According to the example model:
// "id": 1, <- Serial?
// "title": "Complete coding challenge", <- VarChar 255 maybe
// "description": "Build a full-stack todo application for Industrix", <- Text if not varchar
// "completed": false,
// "category_id": 2, <- category should not be enum, but user-generated hence another table.
// "priority": "high", <-enum
// "due_date": "2024-08-03T23:59:59Z",
// "created_at": "2024-07-31T10:00:00Z",
// "updated_at": "2024-07-31T10:00:00Z"
export default function defineTodoModel() {
  return sequelize.define(
    "Todos",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      priority: {
        type: DataTypes.ENUM("low", "medium", "high"),
        allowNull: false,
        defaultValue: "medium",
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: true, // Should be optional
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
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "Todos",
      timestamps: true,
      underscored: true,
    }
  );
}
