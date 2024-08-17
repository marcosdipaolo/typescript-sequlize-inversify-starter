import { Sequelize } from "@sequelize/core";
import { MariaDbDialect } from "@sequelize/mariadb";
//import User from "./models/User";

const sequelize = new Sequelize({
  host: "127.0.0.1",
  database: "seqtest",
  dialect: MariaDbDialect,
  user: "root",
  password: "seqtest",
  logging: false,
});

export default sequelize;
