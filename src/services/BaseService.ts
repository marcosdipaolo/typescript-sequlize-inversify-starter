import { injectable } from "inversify";
import { createLogger } from "../logger";
import { Logger } from "winston";

@injectable()
class BaseService {
  protected logger: Logger = createLogger(this.constructor.name);
}

export default BaseService;
