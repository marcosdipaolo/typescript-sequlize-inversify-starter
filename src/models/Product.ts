import {
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
  NotNull,
  PrimaryKey,
  BelongsToMany,
  Table,
  Default,
} from "@sequelize/core/decorators-legacy";
import Order from "./Order";
import OrderProduct from "./OrderProduct";

@Table({
  tableName: "products",
  timestamps: true,
})
class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  @Attribute(DataTypes.UUID)
  @Default(sql.uuidV4)
  @PrimaryKey
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.FLOAT)
  @NotNull
  declare price: number;

  @BelongsToMany(() => Order, { through: OrderProduct })
  declare orders?: NonAttribute<Order[]>;
}

export default Product;
