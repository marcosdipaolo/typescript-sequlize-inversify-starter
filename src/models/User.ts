import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
  NonAttribute,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  sql,
} from "@sequelize/core";
import {
  Attribute,
  NotNull,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  Table,
  Default,
  DeletedAt,
  HasMany,
} from "@sequelize/core/decorators-legacy";
import Order from "./Order";

@Table({
  tableName: "users",
  timestamps: true,
})
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Attribute({
    type: DataTypes.UUID,
    validate: {},
  })
  @Default(sql.uuidV4)
  @PrimaryKey
  @NotNull
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare email: string;

  @HasMany<Order>(() => Order, "userId")
  declare orders: NonAttribute<Order[]>;

  @CreatedAt
  @NotNull
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  @NotNull
  declare updatedAt: CreationOptional<Date>;

  @DeletedAt
  declare deletedAt: CreationOptional<Date | null>;

  declare addOrder: HasManyAddAssociationMixin<Order, Order["id"]>;
  declare getOrders: HasManyGetAssociationsMixin<Order>;
}

export default User;
