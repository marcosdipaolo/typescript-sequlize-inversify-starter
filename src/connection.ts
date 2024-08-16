import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  host: "127.0.0.1",
  database: "seqtest",
  dialect: "mysql",
  username: "root",
  password: "seqtest",
  models: [__dirname + "/models"],
  logging: false,
});

export default sequelize;
