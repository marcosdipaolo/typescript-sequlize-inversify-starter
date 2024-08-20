import { controller, httpGet } from "inversify-express-utils";
import { BaseController } from "./BaseController";
import Product from "../../models/Product";

@controller("/products")
class ProductController extends BaseController {
  @httpGet("/")
  async getProducts() {
    return this.json(await Product.findAll());
  }
}

export default ProductController;
