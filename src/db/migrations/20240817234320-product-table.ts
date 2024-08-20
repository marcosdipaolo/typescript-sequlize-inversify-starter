"use strict";

import { QueryInterface, DataTypes } from "sequelize";
import { Migration } from "sequelize-cli";

export default {
  async up(queryInterface: QueryInterface) {
    queryInterface.sequelize.transaction((transaction) => {
      return queryInterface.createTable(
        "products",
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          price: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },
          name: {
            type: DataTypes.STRING,
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
      return queryInterface.dropTable("products", { transaction });
    });
  },
} as Migration;
