import { BaseHttpController } from "inversify-express-utils";
import { JsonResult } from "inversify-express-utils/lib/results";
import { UserNotFoundError } from "../../services/UserService";
import { Logger } from "winston";
import { createLogger } from "../../logger";

export class BaseController extends BaseHttpController {
  protected logger: Logger = createLogger(this.constructor.name);

  protected handleError(error: Error | unknown): JsonResult {
    this.logger.error(error);
    const isError = error instanceof Error;
    let statusCode = 500;
    if (error instanceof UserNotFoundError) {
      statusCode = 404;
    }
    return this.json(
      {
        error: isError ? error.message : String(error),
        stack: isError ? error.stack : null,
      },
      statusCode,
    );
  }
}
