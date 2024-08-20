import { Container } from "inversify";
import { IUserService, UserService } from "../services/UserService";
import { IOrderService, OrderService } from "../services/OrderService";
import { TYPES } from "./constants";
import "../http/controllers/UserController";
import "../http/controllers/OrderController";
import "../http/controllers/ProductController";

const container = new Container();

container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IOrderService>(TYPES.OrderService).to(OrderService);

export { container };
