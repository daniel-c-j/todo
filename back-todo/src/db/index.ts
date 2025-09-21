import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "database_development",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS || "password",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
  }
);

export default sequelize;
