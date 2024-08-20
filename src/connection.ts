import { Sequelize } from "@sequelize/core";
import { MariaDbDialect } from "@sequelize/mariadb";

// Make sure you have the proper env vars set up.
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  dialect: MariaDbDialect,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: false,
});

export default sequelize;
