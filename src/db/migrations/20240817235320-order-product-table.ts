"use strict";

import { QueryInterface, DataTypes } from "sequelize";
import { Migration } from "sequelize-cli";

export default {
  async up(queryInterface: QueryInterface) {
    queryInterface.sequelize.transaction((transaction) => {
      return queryInterface.createTable(
        "orderProduct",
        {
          orderId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: {
                tableName: "orders",
              },
              key: "id",
            },
          },
          productId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: {
                tableName: "products",
              },
              key: "id",
            },
          },
        },
        { transaction },
      );
    });
  },
  async down(queryInterface: QueryInterface) {
    queryInterface.sequelize.transaction((transaction) => {
      return queryInterface.dropTable("orderProduct", { transaction });
    });
  },
} as Migration;
