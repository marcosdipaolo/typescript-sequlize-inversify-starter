import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
} from "@sequelize/core";
import {
  Attribute,
  NotNull,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  Table,
  Default,
} from "@sequelize/core/decorators-legacy";

@Table({
  tableName: "users",
  timestamps: true,
})
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @NotNull
  @Default(DataTypes.UUIDV4)
  declare id: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare email: string;

  @CreatedAt
  @NotNull
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  @NotNull
  declare updatedAt: CreationOptional<Date>;
}

export default User;
