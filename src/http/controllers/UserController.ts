import { Request } from "express";
import { createLogger } from "../../logger";
import {
  controller,
  httpPost,
  BaseHttpController,
  request,
  httpGet,
  requestParam,
  httpPatch,
  requestBody,
} from "inversify-express-utils";
import { IUserService } from "../../services/UserService";
import { inject } from "inversify";
import { TYPES } from "../../container/constants";
import { Logger } from "winston";
import { userCreateValidationMiddleware } from "../validators/users/createValidator";
import { updateUserValidator } from "../validators/users/updateValidator";

@controller("/users")
export class UserController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserService) private userService: IUserService,
    private logger: Logger = createLogger("UserController"),
  ) {
    super();
  }

  @httpGet("/")
  async getUsers() {
    try {
      console.log(
        "this.httpContext",
        await this.httpContext.user.isAuthenticated(),
      );
      return this.json(await this.userService.getUsers());
    } catch (error) {
      return this.handleError(error);
    }
  }

  @httpGet("/:id")
  async getUser(@requestParam("id") id: string) {
    try {
      return this.json(await this.userService.getUser(id));
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

  @httpPatch("/:id", updateUserValidator)
  async updateUser(
    @requestBody() body: { name?: string; email?: string },
    @requestParam("id") id: string,
  ) {
    try {
      const { name, email } = body;
      return this.json(await this.userService.updateUser(id, { name, email }));
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: Error | unknown) {
    this.logger.error(error);
    return this.json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
