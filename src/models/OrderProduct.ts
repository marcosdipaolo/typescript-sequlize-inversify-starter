import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "@sequelize/core";
import { Attribute, Table } from "@sequelize/core/decorators-legacy";
import Product from "./Product";
import Order from "./Order";

@Table({
  tableName: "orderProduct",
  timestamps: false,
})
class OrderProduct extends Model<
  InferAttributes<OrderProduct>,
  InferCreationAttributes<OrderProduct>
> {
  @Attribute({
    type: DataTypes.UUID,
    references: {
      model: Product,
    },
  })
  declare productId: string;
  @Attribute({
    type: DataTypes.UUID,
    references: {
      model: Order,
    },
  })
  declare orderId: string;
}

export default OrderProduct;
