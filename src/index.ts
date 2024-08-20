import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import sequelize from "./connection";
import logger from "./logger";
import express from "express";
import { container } from "./container";
import { InversifyExpressServer } from "inversify-express-utils";
import morgan from "morgan";
import User from "./models/User";
import Product from "./models/Product";
import Order from "./models/Order";
import OrderProduct from "./models/OrderProduct";

sequelize.addModels([User, Product, Order, OrderProduct]);
sequelize
  .authenticate()
  .then(() => logger.info("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(express.json());
  app.use(morgan("dev"));
});

const port = 3000;

server.build().listen(port, () => {
  logger.info(`Server running at port ${port}`);
});
