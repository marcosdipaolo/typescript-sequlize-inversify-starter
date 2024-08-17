import { BaseHttpController } from "inversify-express-utils";
import { JsonResult } from "inversify-express-utils/lib/results";
import { createLogger } from "../../logger";
import { UserNotFoundError } from "../../services/UserService";

export class BaseController extends BaseHttpController {
  protected handleError(error: Error | unknown): JsonResult {
    createLogger(this.constructor.name).error(error);
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
