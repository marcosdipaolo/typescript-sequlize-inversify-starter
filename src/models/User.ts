import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Optional } from "sequelize";

interface UserAttributes {
  id: string;
  name: string;
  email: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

@Table({
  tableName: "users",
  timestamps: false,
})
class User extends Model<UserAttributes, UserCreationAttributes> {
  tableName: string = "users";

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;
}

export default User;
