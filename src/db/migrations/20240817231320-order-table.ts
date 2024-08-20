"use strict";

import { QueryInterface, DataTypes } from "sequelize";
import { Migration } from "sequelize-cli";

export default {
  async up(queryInterface: QueryInterface) {
    queryInterface.sequelize.transaction((transaction) => {
      return queryInterface.createTable(
        "orders",
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          userId: {
            type: DataTypes.UUID,
            references: {
              model: {
                tableName: "users",
              },
              key: "id",
            },
            allowNull: false,
          },
          totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
        },
        { transaction },
      );
    });
  },
  async down(queryInterface: QueryInterface) {
    queryInterface.sequelize.transaction((transaction) => {
      return queryInterface.dropTable("orders", { transaction });
    });
  },
} as Migration;
