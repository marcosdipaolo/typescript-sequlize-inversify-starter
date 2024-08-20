import { Container, interfaces } from "inversify";
import { IUserService, UserService } from "../services/UserService";
import { IOrderService, OrderService } from "../services/OrderService";
import { TYPES } from "./constants";
import "../http/controllers/UserController";
import "../http/controllers/OrderController";
import "../http/controllers/ProductController";
import { Logger } from "winston";
import { createLogger } from "../logger";

const container = new Container();

container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IOrderService>(TYPES.OrderService).to(OrderService);
container
  .bind<interfaces.Factory<Logger>>(TYPES.FactoryLogger)
  .toFactory<Logger, ["global"]>(() => {
    return (loggerID: string) => {
      return createLogger(loggerID);
    };
  });

export { container };
