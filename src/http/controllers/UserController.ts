import { Request } from "express";
import { createLogger } from "../../logger";
import {
  controller,
  httpPost,
  request,
  httpGet,
  requestParam,
  httpPatch,
  requestBody,
  httpDelete,
} from "inversify-express-utils";
import { IUserService, UserNotFoundError } from "../../services/UserService";
import { inject } from "inversify";
import { TYPES } from "../../container/constants";
import { Logger } from "winston";
import { userCreateValidationMiddleware } from "../validators/users/createValidator";
import { updateUserValidator } from "../validators/users/updateValidator";
import {
  InternalServerErrorResult,
  JsonResult,
  NotFoundResult,
  OkResult,
} from "inversify-express-utils/lib/results";
import { BaseController } from "./BaseController";
import { uuidValidator } from "../validators/uuidValidator";
import { IOrderService } from "../../services/OrderService";
import { ProductInput } from "./types";

@controller("/users")
export class UserController extends BaseController {
  constructor(
    @inject(TYPES.UserService) private userService: IUserService,
    @inject(TYPES.OrderService) private orderService: IOrderService,
  ) {
    super();
  }

  @httpGet("/")
  async getUsers(): Promise<JsonResult | InternalServerErrorResult> {
    try {
      const users = await this.userService.getUsers();
      this.logger.info(`We have ${users.length} users on our database.`);
      return this.json(users);
    } catch (error) {
      this.logger.error(error);
      return this.internalServerError();
    }
  }

  @httpGet("/:id/orders", uuidValidator)
  async getOrders(
    @requestParam("id") id: string,
  ): Promise<JsonResult | InternalServerErrorResult> {
    try {
      const user = await this.userService.getUser(id);
      return this.json(
        await user!.getOrders({
          include: ["products"],
        }),
      );
    } catch (error) {
      this.logger.error(error);
      return this.internalServerError();
    }
  }

  @httpPost("/:id/orders", uuidValidator)
  async addOrder(
    @requestParam("id") id: string,
    @requestBody()
    body: { products: ProductInput[]; totalPrice: number },
  ) {
    try {
      const user = await this.userService.getUser(id);
      if (!user) throw new UserNotFoundError();
      const { products } = body;
      return this.orderService.addOrder(user, products);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @httpGet("/:id", uuidValidator)
  async getUser(
    @requestParam("id") id: string,
  ): Promise<JsonResult | NotFoundResult> {
    try {
      const user = await this.userService.getUser(id);
      return this.json(user);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @httpPost("/", userCreateValidationMiddleware)
  async createUser(@request() req: Request) {
    try {
      return this.json(await this.userService.createUser(req.body));
    } catch (error) {
      return this.handleError(error);
    }
  }

  @httpPatch("/:id", uuidValidator, updateUserValidator)
  async updateUser(
    @requestBody() body: { name?: string; email?: string },
    @requestParam("id") id: string,
  ) {
    try {
      const { name, email } = body;
      const user = await this.userService.getUser(id);
      return this.json(
        await this.userService.updateUser(user!, { name, email }),
      );
    } catch (error) {
      return this.handleError(error);
    }
  }

  @httpDelete("/:id", uuidValidator)
  async deleteUser(
    @requestParam("id") id: string,
  ): Promise<OkResult | NotFoundResult> {
    const success = await this.userService.deleteUser(id);
    if (!success) {
      return this.notFound();
    }
    return this.ok();
  }
}
