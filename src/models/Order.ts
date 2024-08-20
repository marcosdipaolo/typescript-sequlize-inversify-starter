import {
  BelongsToManyAddAssociationsMixin,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  sql,
} from "@sequelize/core";
import {
  Attribute,
  BelongsTo,
  BelongsToMany,
  Default,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";
import User from "./User";
import Product from "./Product";
import OrderProduct from "./OrderProduct";

@Table({
  tableName: "orders",
  timestamps: true,
})
class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  @Attribute(DataTypes.UUID)
  @Default(sql.uuidV4)
  @PrimaryKey
  declare id: CreationOptional<string>;

  @BelongsTo(() => User, "userId")
  declare user?: NonAttribute<User>;

  @Attribute(DataTypes.UUID)
  @NotNull
  declare userId: string;

  @Attribute(DataTypes.FLOAT)
  @NotNull
  declare totalPrice: number;

  @BelongsToMany(() => Product, { through: OrderProduct })
  declare products?: NonAttribute<Product[]>;

  declare addProducts: BelongsToManyAddAssociationsMixin<
    Product,
    Product["id"]
  >;
}

export default Order;
