import { injectable } from "inversify";
import { ProductInput } from "../http/controllers/types";
import Order from "../models/Order";
import User from "../models/User";
import Product from "../models/Product";

export interface IOrderService {
  addOrder: (user: User, products: ProductInput[]) => Promise<Order>;
}

@injectable()
export class OrderService implements IOrderService {
  addOrder = async (user: User, products: ProductInput[]) => {
    const productModels: Product[] = await Product.bulkCreate(products);
    const totalPrice = products.reduce((acc: number, product: ProductInput) => {
      return acc + product.price;
    }, 0);
    const order = await Order.create({
      totalPrice,
      userId: user.id,
    });
    order.addProducts(productModels);
    return order.reload({
      include: [
        {
          association: "products",
        },
      ],
    }); // products not working
  };
}
