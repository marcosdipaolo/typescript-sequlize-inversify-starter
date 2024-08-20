import { controller, httpGet, requestParam } from "inversify-express-utils";
import { BaseController } from "./BaseController";
import Order from "../../models/Order";
import { uuidValidator } from "../validators/uuidValidator";

@controller("/orders")
export class OrderController extends BaseController {
  @httpGet("/")
  async getOrders() {
    return this.json(await Order.findAll({ include: ["user"] }));
  }
  @httpGet("/:id", uuidValidator)
  async getOrder(@requestParam("id") id: string) {
    return this.json(
      await Order.findByPk(id, { include: ["user", "products"] }),
    );
  }
}
