import { Container } from "inversify";
import { IUserService, UserService } from "../services/UserService";
import { TYPES } from "./constants";
import "../http/controllers/UserController";
import User from "../models/User";

const container = new Container();

container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<typeof User>("Model<User>").toConstantValue(User);

export { container };
